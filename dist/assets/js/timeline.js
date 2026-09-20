window.CRNTimeline = (() => {
  const t = (key, fallback, params) => window.CRN_I18N?.t(key, fallback, params) ?? fallback;
  const value = raw => window.CRN_I18N?.value(raw) ?? raw;
  const titleFor = item => t(`timeline.${item.id}.title`, item.title);
  const summaryFor = item => t(`timeline.${item.id}.summary`, item.summary);
  function render() {
    const list = document.getElementById("timeline-list");
    if (!list) return;
    list.innerHTML = window.timelineData.map(item => `
      <article class="timeline-item reveal">
        <div class="timeline-date">${value(item.date)}</div>
        <div class="timeline-content"><h3>${titleFor(item)}</h3><p>${summaryFor(item)}</p></div>
        <button class="timeline-open" type="button" data-timeline-id="${item.id}">${t("timeline.open", "OPEN")} ↗</button>
      </article>`).join("");
    list.querySelectorAll("[data-timeline-id]").forEach(button => button.addEventListener("click", () => open(button.dataset.timelineId)));
  }
  function open(id) {
    const item = window.timelineData.find(entry => entry.id === id); if (!item) return;
    window.CRNDrawer?.open(`<span class="drawer-type">${t("timeline.record", "TIMELINE RECORD")}</span><h2>${titleFor(item)}</h2><p>${summaryFor(item)}</p><div class="drawer-details"><div><span>${t("timeline.date", "DATE")}</span><strong>${value(item.date)}</strong></div><div><span>${t("timeline.status", "STATUS")}</span><strong>${value(item.status)}</strong></div><div><span>${t("timeline.source", "SOURCE")}</span><strong>${value(item.source)}</strong></div><div><span>${t("timeline.updatedAt", "UPDATED AT")}</span><strong>${item.updatedAt}</strong></div></div>`);
  }
  return Object.freeze({ render, open });
})();
