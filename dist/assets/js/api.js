/* A single, intentionally inert adapter point for future production APIs. */
window.CRNApi = Object.freeze({
  configured: false,
  async request() {
    throw new Error("No production API is configured in CORE mode.");
  },
  async submitEvidence() {
    throw new Error("Evidence upload is local demo mode only; no server-side storage is configured.");
  }
});
