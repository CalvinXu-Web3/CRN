window.CRNSearch = (() => {
  const t = (key, fallback) => window.CRN_I18N?.t(key, fallback) ?? fallback;
  const value = raw => window.CRN_I18N?.value(raw) ?? raw;
  function records() {
    return [
      { type: "CASE", id: window.caseData.id, title: t("search.caseFile", "CRN Case File"), detail: t("search.caseOverview", "Public case overview") },
      ...window.timelineData.map(item => ({ type: "TIMELINE", id: item.id, title: t(`timeline.${item.id}.title`, item.title), detail: value(item.status), action: () => window.CRNTimeline.open(item.id) })),
      ...window.networkData.map(item => ({ type: item.type, id: item.id, title: value(item.name), detail: value(item.status), action: () => window.CRNNetwork.showNode(item.id) }))
    ];
  }
  function find(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return records().filter(item => `${item.type} ${item.id} ${item.title} ${item.detail}`.toLowerCase().includes(normalized));
  }
  function open() {
    window.CRNDrawer?.open(`
      <span class="drawer-type">${t("search.public", "PUBLIC RECORD SEARCH")}</span><h2>${t("search.title", "SEARCH")}</h2>
      <p>${t("search.copy", "Search case ID, public entity name, evidence ID, wallet address or TxID. No private information is indexed.")}</p>
      <label class="search-field"><input id="public-search-input" type="search" placeholder="${t("search.placeholder", "CASE ID, WALLET, TXID, EVIDENCE ID")}" autocomplete="off" /></label>
      <div class="search-results" id="search-results"><p>${t("search.enter", "Enter a search term.")}</p></div>`);
    const input = document.getElementById("public-search-input");
    input?.focus(); input?.addEventListener("input", () => render(input.value));
  }
  function render(query) {
    const mount = document.getElementById("search-results"); if (!mount) return;
    const matches = find(query);
    if (!query.trim()) { mount.innerHTML = `<p>${t("search.enter", "Enter a search term.")}</p>`; return; }
    if (!matches.length) { mount.innerHTML = `<p><strong>${t("search.noResults", "NO PUBLIC RECORD FOUND")}</strong><br />${t("search.noResultsCopy", "Only reviewed public records are available in this demo.")}</p>`; return; }
    mount.innerHTML = matches.map((item, index) => `<button type="button" class="search-result" data-result="${index}"><span>${item.type}</span><strong>${item.title}</strong><small>${item.detail}</small></button>`).join("");
    mount.querySelectorAll("[data-result]").forEach(button => button.addEventListener("click", () => {
      const item = matches[Number(button.dataset.result)];
      if (item.action) item.action();
      else { window.CRNDrawer.open(`<span class="drawer-type">${value("CASE")}</span><h2>${window.caseData.id}</h2><p>${t("search.caseDrawer", "The public case overview is available on this page.")}</p>`); }
    }));
  }
  function bind() { document.getElementById("open-search")?.addEventListener("click", open); document.getElementById("tx-search")?.addEventListener("click", open); }
  return Object.freeze({ bind, open, find });
})();
