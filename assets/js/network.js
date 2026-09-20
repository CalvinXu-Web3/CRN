window.CRNNetwork = (() => {
  const t = (key, fallback, params) => window.CRN_I18N?.t(key, fallback, params) ?? fallback;
  const value = raw => window.CRN_I18N?.value(raw) ?? raw;
  const find = id => window.networkData.find(node => node.id === id);
  const svgNS = "http://www.w3.org/2000/svg";
  const element = (tag, attrs = {}) => { const node = document.createElementNS(svgNS, tag); Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value)); return node; };

  function showNode(id) {
    const item = find(id);
    if (!item) return;
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
      </div>`);
  }

  function render() {
    const mount = document.getElementById("entity-network");
    if (!mount) return;
    const svg = element("svg", { viewBox: "0 0 1000 440", role: "img", "aria-label": t("network.graphAria", "Public relationship graph. All non-case nodes are data pending.") });
    const positions = { case: [500, 220, 75], "pending-a": [186, 98, 46], "pending-b": [194, 343, 46], "pending-c": [818, 99, 46], "pending-d": [810, 342, 46] };
    const edges = [["case", "pending-a"], ["case", "pending-b"], ["case", "pending-c"], ["case", "pending-d"], ["pending-a", "pending-c"], ["pending-b", "pending-d"]];
    edges.forEach(([from, to]) => {
      const [x1, y1] = positions[from]; const [x2, y2] = positions[to];
      svg.appendChild(element("line", { x1, y1, x2, y2, class: "network-edge" }));
    });
    window.networkData.forEach(node => {
      const [x, y, radius] = positions[node.id];
      const group = element("g", { class: `entity-node ${node.id === "case" ? "case" : ""}`, tabindex: "0", role: "button", "aria-label": t("network.openProfile", `Open ${node.name} public profile`, { name: value(node.name) }) });
      group.appendChild(element("circle", { cx: x, cy: y, r: radius }));
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
