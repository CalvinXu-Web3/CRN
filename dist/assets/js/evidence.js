window.CRNEvidence = (() => {
  const t = (key, fallback, params) => window.CRN_I18N?.t(key, fallback, params) ?? fallback;
  const value = raw => window.CRN_I18N?.value(raw) ?? raw;
  let selectedFiles = [];
  const allowedExtensions = new Set(["jpg","jpeg","png","webp","pdf","docx","xlsx","csv","txt","mp4","mov","mp3","wav","zip"]);
  const toast = (message, kind) => window.CRNToast?.(message, kind);
  const formatSize = bytes => bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  function renderEvidence(filter = "ALL") {
    const mount = document.getElementById("evidence-grid"); if (!mount) return;
    const items = window.evidenceData.filter(item => filter === "ALL" || item.type.includes(filter));
    mount.innerHTML = items.length ? items.map(item => `<article class="evidence-card"><span class="evidence-id">${item.id}</span><h3>${value(item.type)}</h3><p>${item.summary}</p><div class="evidence-meta"><span>${value(item.status)}</span><span>·</span><span>${value(item.source)}</span></div></article>`).join("") : `<article class="evidence-card empty"><span class="evidence-id">${t("evidence.register", "PUBLIC EVIDENCE REGISTER")}</span><h3>${t("evidence.emptyTitle", "DATA PENDING")}</h3><p>${t("evidence.emptyCopy", "No public evidence summary is published in this first-phase case file. Use the secure intake entry to prepare information for review.")}</p><div class="evidence-meta"><span>${t("evidence.status", "STATUS")}: ${t("hero.dataPending", "DATA PENDING")}</span><span>·</span><span>${t("evidence.source", "SOURCE")}: ${t("value.publicSourcePending", "PUBLIC SOURCE PENDING")}</span></div></article>`;
  }
  function renderFiles() {
    const mount = document.getElementById("file-list"); if (!mount) return;
    mount.innerHTML = selectedFiles.map((file, index) => `<div class="file-row"><b title="${file.name}">${file.name}</b><span>${formatSize(file.size)}</span><progress max="100" value="100" aria-label="${t("evidence.previewReady", "Local preview ready")}"></progress><button type="button" data-file-retry="${index}">${t("evidence.retry", "RETRY")}</button><button type="button" data-file-remove="${index}" aria-label="${t("evidence.remove", `Remove ${file.name}`, { name: file.name })}">${t("evidence.removeShort", "REMOVE")}</button></div>`).join("");
    mount.querySelectorAll("[data-file-remove]").forEach(button => button.addEventListener("click", () => { selectedFiles.splice(Number(button.dataset.fileRemove), 1); renderFiles(); }));
    mount.querySelectorAll("[data-file-retry]").forEach(button => button.addEventListener("click", () => { const file = selectedFiles[Number(button.dataset.fileRetry)]; toast(t("evidence.previewRefreshed", `Local preview refreshed for ${file.name}.`, { name: file.name }), "success"); }));
  }
  function acceptFiles(files) {
    const accepted = [];
    Array.from(files || []).forEach(file => {
      const extension = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "";
      if (!allowedExtensions.has(extension)) toast(t("evidence.invalidType", `${file.name} is not a permitted file type.`, { name: file.name }), "error");
      else accepted.push(file);
    });
    selectedFiles = [...selectedFiles, ...accepted]; renderFiles();
  }
  function open() { selectedFiles = []; renderFiles(); window.CRNModal?.open("evidence-modal"); }
  function bind() {
    document.querySelectorAll("[data-evidence-open]").forEach(button => button.addEventListener("click", open));
    document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("active", item === button)); renderEvidence(button.dataset.filter);
    }));
    const input = document.getElementById("evidence-files"); const drop = document.getElementById("file-drop");
    input?.addEventListener("change", event => acceptFiles(event.target.files));
    ["dragenter", "dragover"].forEach(type => drop?.addEventListener(type, event => { event.preventDefault(); drop.classList.add("drag-over"); }));
    ["dragleave", "drop"].forEach(type => drop?.addEventListener(type, event => { event.preventDefault(); drop.classList.remove("drag-over"); }));
    drop?.addEventListener("drop", event => acceptFiles(event.dataTransfer.files));
    document.getElementById("evidence-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const id = `EV-LOCAL-${Date.now().toString(36).toUpperCase()}`;
      toast(t("evidence.created", `Local evidence record ${id} created. No files were uploaded.`, { id }), "success");
      window.CRNModal.close(); event.currentTarget.reset(); selectedFiles = []; renderFiles();
    });
  }
  return Object.freeze({ bind, open, renderEvidence });
})();
