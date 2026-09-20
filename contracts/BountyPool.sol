// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/*
 * Reference implementation for phase two. It is deliberately not wired to the
 * Core-mode H5 and must be audited before any deployment or real funds.
 */
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract BountyPool is AccessControl, Pausable, ReentrancyGuard, EIP712 {
    using SafeERC20 for IERC20;

    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant CLAIM_TYPEHASH = keccak256(
        "RewardClaim(uint256 campaignId,address sharer,uint256 amount,uint256 nonce,uint256 deadline,bytes32 claimId,uint256 ruleVersion,bytes32 metricsHash)"
    );

    enum CampaignStatus { DRAFT, FUNDING, ACTIVE, PAUSED, DEPLETED, EXPIRED, CLOSED }

    struct Campaign {
        address sponsor;
        uint128 funded;
        uint128 remainingPool;
        uint128 rewarded;
        uint128 perUserCap;
        uint64 startAt;
        uint64 endAt;
        CampaignStatus status;
    }

    IERC20 public immutable rewardToken;
    uint256 public nextCampaignId;
    mapping(uint256 => Campaign) public campaigns;
    mapping(bytes32 => bool) public claimed;
    mapping(bytes32 => bool) public frozen;
    mapping(uint256 => mapping(uint256 => bool)) public usedNonce;
    mapping(uint256 => mapping(address => uint256)) public userRewarded;

    event CampaignCreated(uint256 indexed campaignId, address indexed sponsor, uint256 perUserCap, uint64 startAt, uint64 endAt);
    event CampaignFunded(uint256 indexed campaignId, address indexed sponsor, uint256 amount, uint256 remainingPool);
    event CampaignPaused(uint256 indexed campaignId, address indexed actor);
    event CampaignUnpaused(uint256 indexed campaignId, address indexed actor);
    event CampaignClosed(uint256 indexed campaignId, address indexed actor);
    event AttestationSubmitted(bytes32 indexed claimId, uint256 indexed campaignId, address indexed sharer, uint256 amount, uint256 ruleVersion, bytes32 metricsHash);
    event RewardClaimed(bytes32 indexed claimId, uint256 indexed campaignId, address indexed sharer, uint256 amount);
    event RewardFrozen(bytes32 indexed claimId, uint256 indexed campaignId, address indexed actor);
    event RewardRefunded(uint256 indexed campaignId, address indexed sponsor, uint256 amount);

    error InvalidCampaign();
    error InvalidSchedule();
    error NotSponsor();
    error NotClaimable();
    error ClaimExpired();
    error Replay();
    error Frozen();
    error InvalidVerifier();
    error InvalidSharer();
    error CapExceeded();
    error InsufficientPool();

    constructor(IERC20 token, address admin, address verifier) EIP712("CRN BountyPool", "1") {
        rewardToken = token;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(VERIFIER_ROLE, verifier);
    }

    function createCampaign(uint128 perUserCap, uint64 startAt, uint64 endAt) external returns (uint256 campaignId) {
        if (startAt >= endAt || endAt <= block.timestamp) revert InvalidSchedule();
        campaignId = nextCampaignId++;
        campaigns[campaignId] = Campaign({
            sponsor: msg.sender,
            funded: 0,
            remainingPool: 0,
            rewarded: 0,
            perUserCap: perUserCap,
            startAt: startAt,
            endAt: endAt,
            status: CampaignStatus.FUNDING
        });
        emit CampaignCreated(campaignId, msg.sender, perUserCap, startAt, endAt);
    }

    function fundCampaign(uint256 campaignId, uint128 amount) external nonReentrant {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.sponsor == address(0)) revert InvalidCampaign();
        if (campaign.sponsor != msg.sender) revert NotSponsor();
        if (campaign.status == CampaignStatus.CLOSED || campaign.status == CampaignStatus.EXPIRED) revert NotClaimable();
        bool wasPaused = campaign.status == CampaignStatus.PAUSED;
        rewardToken.safeTransferFrom(msg.sender, address(this), amount);
        campaign.funded += amount;
        campaign.remainingPool += amount;
        // A top-up can revive DEPLETED, but it never silently unpauses a campaign.
        if (!wasPaused) _activateIfEligible(campaign);
        emit CampaignFunded(campaignId, msg.sender, amount, campaign.remainingPool);
    }

    function pauseCampaign(uint256 campaignId) external {
        Campaign storage campaign = _campaign(campaignId);
        if (campaign.sponsor != msg.sender && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) revert NotSponsor();
        campaign.status = CampaignStatus.PAUSED;
        emit CampaignPaused(campaignId, msg.sender);
    }

    function unpauseCampaign(uint256 campaignId) external {
        Campaign storage campaign = _campaign(campaignId);
        if (campaign.sponsor != msg.sender && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) revert NotSponsor();
        _activateIfEligible(campaign);
        if (campaign.status != CampaignStatus.ACTIVE) revert NotClaimable();
        emit CampaignUnpaused(campaignId, msg.sender);
    }

    function closeCampaign(uint256 campaignId) external {
        Campaign storage campaign = _campaign(campaignId);
        if (campaign.sponsor != msg.sender && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) revert NotSponsor();
        campaign.status = CampaignStatus.CLOSED;
        emit CampaignClosed(campaignId, msg.sender);
    }

    function setVerifier(address verifier, bool enabled) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (enabled) _grantRole(VERIFIER_ROLE, verifier);
        else _revokeRole(VERIFIER_ROLE, verifier);
    }

    function freezeReward(uint256 campaignId, bytes32 claimId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _campaign(campaignId);
        if (claimed[claimId]) revert Replay();
        frozen[claimId] = true;
        emit RewardFrozen(claimId, campaignId, msg.sender);
    }

    function claimReward(
        uint256 campaignId,
        address sharer,
        uint256 amount,
        uint256 nonce,
        uint256 deadline,
        bytes32 claimId,
        uint256 ruleVersion,
        bytes32 metricsHash,
        bytes calldata signature
    ) external whenNotPaused nonReentrant {
        Campaign storage campaign = _campaign(campaignId);
        _syncStatus(campaign);
        if (campaign.status != CampaignStatus.ACTIVE) revert NotClaimable();
        if (msg.sender != sharer) revert InvalidSharer();
        if (block.timestamp > deadline) revert ClaimExpired();
        if (claimed[claimId] || usedNonce[campaignId][nonce]) revert Replay();
        if (frozen[claimId]) revert Frozen();
        if (amount == 0 || amount > campaign.remainingPool) revert InsufficientPool();
        if (campaign.perUserCap > 0 && userRewarded[campaignId][sharer] + amount > campaign.perUserCap) revert CapExceeded();

        bytes32 structHash = keccak256(abi.encode(CLAIM_TYPEHASH, campaignId, sharer, amount, nonce, deadline, claimId, ruleVersion, metricsHash));
        address signer = ECDSA.recover(_hashTypedDataV4(structHash), signature);
        if (!hasRole(VERIFIER_ROLE, signer)) revert InvalidVerifier();

        claimed[claimId] = true;
        usedNonce[campaignId][nonce] = true;
        userRewarded[campaignId][sharer] += amount;
        campaign.remainingPool -= uint128(amount);
        campaign.rewarded += uint128(amount);
        if (campaign.remainingPool == 0) campaign.status = CampaignStatus.DEPLETED;

        emit AttestationSubmitted(claimId, campaignId, sharer, amount, ruleVersion, metricsHash);
        rewardToken.safeTransfer(sharer, amount);
        emit RewardClaimed(claimId, campaignId, sharer, amount);
    }

    function refundRemaining(uint256 campaignId) external nonReentrant {
        Campaign storage campaign = _campaign(campaignId);
        _syncStatus(campaign);
        if (campaign.sponsor != msg.sender) revert NotSponsor();
        if (campaign.status != CampaignStatus.CLOSED && campaign.status != CampaignStatus.EXPIRED && campaign.status != CampaignStatus.DEPLETED) revert NotClaimable();
        uint256 amount = campaign.remainingPool;
        campaign.remainingPool = 0;
        rewardToken.safeTransfer(campaign.sponsor, amount);
        emit RewardRefunded(campaignId, campaign.sponsor, amount);
    }

    function syncCampaign(uint256 campaignId) external { _syncStatus(_campaign(campaignId)); }

    function _campaign(uint256 campaignId) private view returns (Campaign storage campaign) {
        campaign = campaigns[campaignId];
        if (campaign.sponsor == address(0)) revert InvalidCampaign();
    }

    function _syncStatus(Campaign storage campaign) private {
        if (campaign.status == CampaignStatus.ACTIVE && campaign.remainingPool == 0) campaign.status = CampaignStatus.DEPLETED;
        else if (campaign.status == CampaignStatus.ACTIVE && block.timestamp >= campaign.endAt) campaign.status = CampaignStatus.EXPIRED;
    }

    function _activateIfEligible(Campaign storage campaign) private {
        if (campaign.remainingPool == 0) { campaign.status = CampaignStatus.FUNDING; return; }
        if (block.timestamp >= campaign.endAt) { campaign.status = CampaignStatus.EXPIRED; return; }
        if (block.timestamp >= campaign.startAt) campaign.status = CampaignStatus.ACTIVE;
        else campaign.status = CampaignStatus.FUNDING;
    }
}
