/* Bounty presentation is separate from sharing. In CORE mode it cannot reward or claim. */
window.CRN_Bounty = (() => {
  const toast = (message, kind) => window.CRNToast?.(message, kind);
  const t = (key, fallback) => window.CRN_I18N?.t(key, fallback) ?? fallback;
  function isActive() { return Boolean(window.APP_CONFIG.bountyEnabled && window.APP_CONFIG.bountyContract && window.bountyCampaigns.some(c => c.status === "ACTIVE" && c.remainingPool > 0)); }
  function render() {
    const mount = document.getElementById("bounty-state"); if (!mount) return;
    if (!isActive()) {
      mount.innerHTML = `<span>${t("bounty.noActive", "NO ACTIVE BOUNTY")}</span><h3>${t("bounty.coreContinues", "CORE CONTINUES")}</h3><p>${t("bounty.coreCopy", "Share, referral attribution, QR, evidence intake and case browsing remain available with no wallet connection.")}</p><button class="button button-ghost small" id="view-bounty" type="button">${t("bounty.view", "VIEW BOUNTY STATUS")}</button>`;
      document.getElementById("view-bounty")?.addEventListener("click", () => window.CRNModal.open("bounty-modal"));
    }
  }
  function recordShareEvent() { /* Future campaign analytics only; never called when bounty is inactive. */ }
  async function claimDemo() {
    if (!isActive()) { toast(t("bounty.claimDisabled", "Claim is disabled: no active campaign or on-chain contract is configured."), "error"); return; }
    const account = await window.CRNWallet.connect();
    if (!account) return;
    toast(t("bounty.claimRequires", "A real claim requires a verifier attestation and contract validation."));
  }
  function bind() { document.getElementById("claim-demo")?.addEventListener("click", claimDemo); }
  return Object.freeze({ bind, render, isActive, recordShareEvent, claimDemo });
})();
