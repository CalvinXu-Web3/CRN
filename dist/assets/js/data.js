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
  id: "CRN-2026-0703",
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
  { id: "TL-JUN-27", date: "06 / 27", title: "Reported related travel", summary: "Submitted materials describe related overseas travel connected to later case events. Names, flight details and locations are withheld.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" },
  { id: "TL-JUL-01", date: "07 / 01", title: "Reported loss of contact", summary: "Submitted materials report that contact with a related individual ceased on this date. Independent verification remains pending.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" },
  { id: "TL-JUL-02-03", date: "07 / 02–03", title: "Reported overseas-meeting lead", summary: "Submitted materials raise a possible overseas meeting between related individuals. It has not been independently confirmed.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" },
  { id: "TL-JUL-03", date: "07 / 03", title: "Reported detention claim circulated", summary: "Submitted materials report that a detention claim and a location were circulated. The claim has not been independently confirmed.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" },
  { id: "TL-JUL-03-VERIFY", date: "07 / 03+", title: "Reported follow-up verification", summary: "Submitted materials describe legal consultation and on-site checking after the claim circulated. Public conclusions remain pending source documentation.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" },
  { id: "TL-JUL-12", date: "07 / 12", title: "Message record retained", summary: "Submitted materials retain a message associated with the case dispute. Original content remains under controlled review.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" },
  { id: "TL-JUL-15", date: "07 / 15", title: "Additional message record retained", summary: "Submitted materials retain later messages and screenshots. Original content remains under controlled review.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" },
  { id: "TL-JUL-22", date: "07 / 22", title: "Latest reported message activity", summary: "Submitted materials report the latest visible message activity on this date. The original wording and identity details are withheld.", source: "CRN PUBLIC INTAKE", status: "UNDER REVIEW", updatedAt: "2026-09-21" }
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
