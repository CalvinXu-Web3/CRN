window.CRNWallet = (() => {
  const toast = (message, kind) => window.CRNToast?.(message, kind);
  const t = (key, fallback, params) => window.CRN_I18N?.t(key, fallback, params) ?? fallback;
  let account = null;
  async function connect() {
    try {
      if (!window.ethereum?.request) throw new Error("No wallet provider detected");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      account = accounts?.[0] || null;
      if (!account) throw new Error("No account selected");
      const shortAccount = `${account.slice(0, 6)}…${account.slice(-4)}`;
      toast(t("wallet.connected", `Wallet connected: ${shortAccount}`, { account: shortAccount }), "success");
      return account;
    } catch (_) { toast(t("wallet.unavailable", "Wallet connection is unavailable. A wallet is only needed for a real on-chain claim."), "error"); return null; }
  }
  return Object.freeze({ connect, getAccount: () => account });
})();
