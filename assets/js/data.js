/*
 * First-phase public demo data.
 * Never place personal identifiers, private contact information, secret material,
 * unverified wallet addresses, TxIDs, chain balances or legal claims in this file.
 */
window.APP_CONFIG = Object.freeze({
  appMode: "CORE",
  shareEnabled: true,
  bountyEnabled: false,
  bountyContract: "",
  chainId: null,
  tokenAddress: ""
});

window.caseData = Object.freeze({
  id: "CRN-2026-XXXX",
  estimatedFunds: "50,000,000 USDT",
  estimatedFundsLabel: "ESTIMATED FIGURE · PUBLIC SOURCE PENDING",
  caseStatus: "ACTIVE",
  onChainStatus: "TRACKING",
  evidenceStatus: "COLLECTING",
  recoveryStatus: "IN PROGRESS",
  firstReported: "DATA PENDING",
  lastUpdated: "2026-09-20",
  jurisdictions: "DATA PENDING / Multiple",
  status: "UNDER REVIEW",
  source: "PUBLIC SOURCE PENDING",
  updatedAt: "2026-09-20"
});

window.caseStats = Object.freeze([
  ["ESTIMATED FUNDS", "50,000,000 USDT", "ESTIMATED · PUBLIC SOURCE PENDING"],
  ["AFFECTED INVESTORS", "DATA PENDING", "NO VERIFIED COUNT PUBLISHED"],
  ["WALLETS TRACKED", "DATA PENDING", "NO VERIFIED ADDRESSES PUBLISHED"],
  ["TRANSACTIONS", "DATA PENDING", "NO VERIFIED TXIDS PUBLISHED"],
  ["EVIDENCE ITEMS", "DATA PENDING", "UNDER CONTROLLED REVIEW"],
  ["JURISDICTIONS", "DATA PENDING", "PUBLIC SOURCE PENDING"]
]);

window.timelineData = Object.freeze([
  { id: "TL-PENDING-01", date: "DATA PENDING", title: "Case chronology awaiting source validation", summary: "No dated event is published until a public source can be identified and reviewed.", source: "PUBLIC SOURCE PENDING", status: "DATA PENDING", updatedAt: "2026-09-20" },
  { id: "TL-PENDING-02", date: "DATA PENDING", title: "Evidence intake is available", summary: "Affected investors and information holders may prepare materials for controlled review.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-20" },
  { id: "TL-PENDING-03", date: "DATA PENDING", title: "On-chain review pending published records", summary: "Wallet, transaction and flow information will remain unavailable until independently verified.", source: "PUBLIC SOURCE PENDING", status: "DATA PENDING", updatedAt: "2026-09-20" }
]);

window.personsData = Object.freeze([]);
window.walletData = Object.freeze([]);
window.transactionData = Object.freeze([]);
window.evidenceData = Object.freeze([]);
window.updatesData = Object.freeze([]);
window.bountyCampaigns = Object.freeze([]);
window.shareData = Object.freeze({ title: "CRN — Case & Recovery Network", text: "Review carefully labeled public case information and contribute verified materials where appropriate." });

window.networkData = Object.freeze([
  { id: "case", type: "CASE", name: "CRN CASE FILE", status: "UNDER REVIEW", relationship: "CENTRAL CASE RECORD", evidenceCount: "DATA PENDING", updatedAt: "2026-09-20" },
  { id: "pending-a", type: "ENTITY", name: "PUBLIC ENTITY DATA", status: "DATA PENDING", relationship: "NOT PUBLISHED", evidenceCount: "DATA PENDING", updatedAt: "2026-09-20" },
  { id: "pending-b", type: "WALLET", name: "WALLET DATA", status: "DATA PENDING", relationship: "NOT PUBLISHED", evidenceCount: "DATA PENDING", updatedAt: "2026-09-20" },
  { id: "pending-c", type: "TRANSACTION", name: "TRANSACTION DATA", status: "DATA PENDING", relationship: "NOT PUBLISHED", evidenceCount: "DATA PENDING", updatedAt: "2026-09-20" },
  { id: "pending-d", type: "EXCHANGE", name: "DESTINATION DATA", status: "DATA PENDING", relationship: "NOT PUBLISHED", evidenceCount: "DATA PENDING", updatedAt: "2026-09-20" }
]);
