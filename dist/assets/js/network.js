window.CRNNetwork = (() => {
  const t = (key, fallback, params) => window.CRN_I18N?.t(key, fallback, params) ?? fallback;
  const value = raw => window.CRN_I18N?.value(raw) ?? raw;
  const find = id => window.networkData.find(node => node.id === id);
  const explorerLinks = Object.freeze({
    "pending-a": { url: "https://etherscan.io/address/0x7a53155f6dfcedc0061eb7247abb4250d691478f", labelKey: "network.openExplorer", labelFallback: "VIEW 4# ON ETHERSCAN" },
    "pending-b": { url: "https://tronscan.org/address/TSCMwyQu9y27zG95deB2nDRkNNuZzkDTnY/transfers", labelKey: "network.openOkxExplorer", labelFallback: "VIEW OKX REFERENCE ON TRONSCAN" },
    "pending-c": { url: "https://tronscan.org/address/TXGP8JAxGLdMpzSSodUEpHBCWT8yrVUJXn/transfers", labelKey: "network.openTronExplorer", labelFallback: "VIEW 1# ON TRONSCAN" },
    "pending-d": { url: "https://tronscan.org/address/TCLNmgHvZcm3kFy3gCKwDVD54z1aK5aCJc/transfers", labelKey: "network.openBinanceExplorer", labelFallback: "VIEW BINANCE REFERENCE ON TRONSCAN" }
  });
  const svgNS = "http://www.w3.org/2000/svg";
  const element = (tag, attrs = {}) => { const node = document.createElementNS(svgNS, tag); Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value)); return node; };

  function showNode(id) {
    const item = find(id);
    if (!item) return;
    const explorer = explorerLinks[id];
    const explorerLink = explorer ? `<a class="button button-ghost small drawer-explorer-link" href="${explorer.url}" target="_blank" rel="noopener noreferrer"><span>${t(explorer.labelKey, explorer.labelFallback)}</span><i aria-hidden="true">↗</i></a>` : "";
    window.CRNDrawer?.open(`
      <span class="drawer-type">${value(item.type)}</span>
      <h2>${value(item.name)}</h2>
      <p>${t("network.publicInfo", "Only public, necessary details are displayed. No sensitive identity, contact, banking or credential information is included.")}</p>
      <div class="drawer-details">
        <div><span>${t("network.entityType", "ENTITY TYPE")}</span><strong>${value(item.type)}</strong></div>
        <div><span>${t("network.publicName", "PUBLIC NAME")}</span><strong>${value(item.name)}</strong></div>
        <div><span>${t("timeline.status", "STATUS")}</span><strong>${value(item.status)}</strong></div>
        <div><span>${t("network.relationship", "RELATIONSHIP")}</span><strong>${value(item.relationship)}</strong></div>
        <div><span>${t("network.evidenceCount", "EVIDENCE COUNT")}</span><strong>${value(item.evidenceCount)}</strong></div>
        <div><span>${t("timeline.updatedAt", "UPDATED AT")}</span><strong>${item.updatedAt}</strong></div>
      </div>${explorerLink}`);
  }

  function render() {
    const mount = document.getElementById("entity-network");
    if (!mount) return;
    const svg = element("svg", { viewBox: "0 0 1000 440", role: "img", "aria-label": t("network.graphAria", "Public relationship graph. All non-case nodes are data pending.") });
    const positions = { case: [500, 220, 75], "pending-a": [186, 98, 46], "pending-b": [194, 343, 46], "pending-c": [818, 99, 46], "pending-d": [810, 342, 46] };
    const defs = element("defs");
    const casePhotoClip = element("clipPath", { id: "case-node-photo-clip" });
    casePhotoClip.appendChild(element("circle", { cx: 500, cy: 220, r: 75 }));
    defs.appendChild(casePhotoClip);
    svg.appendChild(defs);
    const edges = [["case", "pending-a"], ["case", "pending-b"], ["case", "pending-c"], ["case", "pending-d"], ["pending-a", "pending-c"], ["pending-b", "pending-d"]];
    edges.forEach(([from, to]) => {
      const [x1, y1] = positions[from]; const [x2, y2] = positions[to];
      svg.appendChild(element("line", { x1, y1, x2, y2, class: "network-edge" }));
    });
    window.networkData.forEach(node => {
      const [x, y, radius] = positions[node.id];
      const group = element("g", { class: `entity-node ${node.id === "case" ? "case" : ""}`, tabindex: "0", role: "button", "aria-label": t("network.openProfile", `Open ${node.name} public profile`, { name: value(node.name) }) });
      if (node.id === "case") {
        group.append(
          element("image", { href: "assets/images/00.jpeg", x: x - radius, y: y - radius, width: radius * 2, height: radius * 2, preserveAspectRatio: "xMidYMid slice", "clip-path": "url(#case-node-photo-clip)", class: "case-node-photo", "aria-hidden": "true" }),
          element("circle", { cx: x, cy: y, r: radius, class: "case-photo-overlay" })
        );
      } else group.appendChild(element("circle", { cx: x, cy: y, r: radius }));
      if (node.id === "case") { const outer = element("circle", { cx: x, cy: y, r: 98, fill: "none", stroke: "rgba(245,199,106,.18)", "stroke-dasharray": "4 8" }); svg.appendChild(outer); }
      const first = element("text", { x, y: y - 3 }); first.textContent = node.id === "case" ? t("hero.file", "CASE FILE") : t("network.pending", "DATA");
      const second = element("text", { x, y: y + 14 }); second.textContent = node.id === "case" ? window.caseData.id : t("hero.dataPending", "PENDING");
      group.append(first, second);
      group.addEventListener("click", () => showNode(node.id));
      group.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showNode(node.id); } });
      svg.appendChild(group);
    });
    mount.replaceChildren(svg);
    document.querySelectorAll(".hero-node").forEach(node => {
      if (node.dataset.networkBound) return;
      node.dataset.networkBound = "true";
      node.addEventListener("click", () => showNode(node.dataset.node));
      node.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showNode(node.dataset.node); } });
    });
  }
  return Object.freeze({ render, showNode });
})();
