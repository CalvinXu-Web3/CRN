/* Referral attribution is privacy-minimised and never blocks sharing. */
window.CRNReferral = (() => {
  const sessionKey = "crn_anonymous_session";
  const shareKey = "crn_last_share";
  const makeId = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase()}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase()}`;

  function safeStorage(get, set) {
    try {
      const value = sessionStorage.getItem(get);
      if (value) return value;
      const next = makeId("ANON");
      sessionStorage.setItem(set, next);
      return next;
    } catch (_) { return makeId("ANON"); }
  }

  function getAnonymousSession() { return safeStorage(sessionKey, sessionKey); }

  function createShare() {
    const share = { campaignId: null, sharerId: getAnonymousSession(), shareId: makeId("SH"), timestamp: new Date().toISOString(), landingPage: location.pathname, referrer: document.referrer || "" };
    try { sessionStorage.setItem(shareKey, JSON.stringify(share)); } catch (_) { /* local analytics is optional */ }
    return share;
  }

  function getShareUrl() {
    const share = createShare();
    const url = new URL(location.href);
    url.searchParams.set("case", window.caseData.id);
    url.searchParams.set("ref", share.shareId);
    return url.toString();
  }

  return Object.freeze({ getAnonymousSession, createShare, getShareUrl });
})();
