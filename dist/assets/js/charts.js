window.CRNCharts = (() => {
  const t = (key, fallback) => window.CRN_I18N?.t(key, fallback) ?? fallback;
  function renderFundFlow() {
    const mount = document.getElementById("fund-flow");
    if (!mount) return;
    mount.className = "fund-flow";
    mount.innerHTML = `
      <svg viewBox="0 0 1080 340" role="img" aria-label="${t("onchain.flowAria", "Structural fund flow view, marked data pending")}">
        <defs><linearGradient id="sankeyGradient" x1="0" x2="1"><stop stop-color="#F5C76A"/><stop offset=".52" stop-color="#4DA3FF"/><stop offset="1" stop-color="#8793A3"/></linearGradient></defs>
        <path class="flow-link" d="M186 170 C280 170 290 170 390 170"/><path class="flow-link" d="M524 170 C618 170 630 170 730 170"/><path class="flow-link" d="M864 170 C935 170 945 170 1000 170"/>
        <g class="flow-node case"><rect x="42" y="127" width="144" height="86" rx="0"/><text x="60" y="158">${t("chart.investorFunds", "INVESTOR FUNDS")}</text><text x="60" y="182">${t("hero.dataPending", "DATA PENDING")}</text></g>
        <g class="flow-node"><rect x="390" y="127" width="134" height="86"/><text x="408" y="158">${t("chart.wallet", "WALLET")}</text><text x="408" y="182">${t("chart.notPublished", "NOT PUBLISHED")}</text></g>
        <g class="flow-node"><rect x="730" y="127" width="134" height="86"/><text x="748" y="158">${t("chart.aggregation", "AGGREGATION")}</text><text x="748" y="182">${t("hero.dataPending", "DATA PENDING")}</text></g>
        <g class="flow-node"><rect x="940" y="127" width="120" height="86"/><text x="958" y="158">${t("chart.destination", "DESTINATION")}</text><text x="958" y="182">${t("hero.dataPending", "PENDING")}</text></g>
        <text x="220" y="147" fill="#8793A3" font-family="monospace" font-size="10">${t("chart.noAmount", "NO AMOUNT")}</text><text x="556" y="147" fill="#8793A3" font-family="monospace" font-size="10">${t("chart.noTxid", "NO TXID")}</text><text x="885" y="147" fill="#8793A3" font-family="monospace" font-size="10">${t("chart.noChain", "NO CHAIN")}</text>
      </svg>`;
  }
  function renderWallet() {
    const mount = document.getElementById("wallet-profile");
    if (!mount) return;
    const fields = [["chart.address", "ADDRESS"], ["chart.chain", "CHAIN"], ["chart.firstSeen", "FIRST SEEN"], ["chart.lastSeen", "LAST SEEN"]];
    mount.innerHTML = `<div class="wallet-lead"><span class="section-index">${t("chart.walletProfile", "WALLET PROFILE")}</span><h3>${t("chart.publicPending", "PUBLIC DATA PENDING")}</h3></div>${fields.map(([key, fallback]) => `<div class="wallet-data"><span>${t(key, fallback)}</span><strong>${t("hero.dataPending", "DATA PENDING")}</strong></div>`).join("")}`;
  }
  function runCounters() {
    document.querySelectorAll("[data-counter]").forEach(node => { if (node.dataset.counted) return; node.dataset.counted = "true"; });
  }
  return Object.freeze({ renderFundFlow, renderWallet, runCounters });
})();
