(() => {
  const runtimeIdCounts = new Map();
  const assignRuntimeIds = root => {
    if (!(root instanceof Element)) return;
    [root, ...root.querySelectorAll("*")].forEach(element => {
      if (element.id) return;
      const tag = element.tagName.toLowerCase();
      const next = (runtimeIdCounts.get(tag) ?? 0) + 1;
      runtimeIdCounts.set(tag, next);
      element.id = `crn-runtime-${tag}-${String(next).padStart(3, "0")}`;
    });
  };
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(assignRuntimeIds)))
    .observe(document.documentElement, { childList: true, subtree: true });

  let lastFocused = null;
  let activeModal = null;
  const t = (key, fallback, params) => window.CRN_I18N?.t(key, fallback, params) ?? fallback;
  const value = raw => window.CRN_I18N?.value(raw) ?? raw;

  window.CRNToast = (message, kind = "") => {
    const region = document.getElementById("toast-region"); if (!region) return;
    const toast = document.createElement("div"); toast.className = `toast ${kind}`; toast.textContent = message;
    region.append(toast); setTimeout(() => { toast.classList.add("fade"); setTimeout(() => toast.remove(), 250); }, 4200);
  };
  window.CRNModal = {
    open(id) {
      const modal = document.getElementById(id); const backdrop = document.getElementById("modal-backdrop"); if (!modal || !backdrop) return;
      lastFocused = document.activeElement; activeModal = modal; modal.hidden = false; backdrop.hidden = false; document.body.style.overflow = "hidden";
      const focusTarget = modal.querySelector("input, button, textarea, select, [tabindex]"); setTimeout(() => focusTarget?.focus(), 0);
    },
    close() {
      if (activeModal) { activeModal.hidden = true; activeModal = null; }
      document.getElementById("modal-backdrop").hidden = true; document.body.style.overflow = ""; lastFocused?.focus?.();
    }
  };
  window.CRNDrawer = {
    open(content) { const drawer = document.getElementById("detail-drawer"); const mount = document.getElementById("drawer-content"); if (!drawer || !mount) return; mount.innerHTML = content; drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); setTimeout(() => drawer.querySelector("button, [tabindex]")?.focus(), 0); },
    close() { const drawer = document.getElementById("detail-drawer"); drawer?.classList.remove("open"); drawer?.setAttribute("aria-hidden", "true"); }
  };

  function renderCase() {
    document.getElementById("hero-case-id").textContent = window.caseData.id;
    document.getElementById("hero-funds").textContent = window.caseData.estimatedFunds.replace(" USDT", "");
    document.getElementById("footer-year").textContent = new Date().getFullYear();
    const statuses = [[t("status.case", "CASE STATUS"), window.caseData.caseStatus], [t("status.onchain", "ON-CHAIN"), window.caseData.onChainStatus], [t("status.evidence", "EVIDENCE"), window.caseData.evidenceStatus], [t("status.recovery", "RECOVERY"), window.caseData.recoveryStatus]];
    document.getElementById("hero-status").innerHTML = statuses.map(([label, status]) => `<div class="status-block"><span>${label}</span><strong>${value(status)}</strong></div>`).join("");
    document.getElementById("case-metrics").innerHTML = window.caseStats.slice(0, 4).map(([label, metric, note]) => `<article class="metric-card"><span>${value(label)}</span><strong>${value(metric)}</strong><small>${value(note)}</small></article>`).join("");
    document.getElementById("case-meta").innerHTML = [[t("label.caseId", "CASE ID"), window.caseData.id], [t("label.firstReported", "FIRST REPORTED"), window.caseData.firstReported], [t("label.lastUpdated", "LAST UPDATED"), window.caseData.lastUpdated], [t("label.jurisdictions", "JURISDICTIONS"), window.caseData.jurisdictions]].map(([label, item]) => `<div class="meta-item"><span>${label}</span><strong>${value(item)}</strong></div>`).join("");
    document.getElementById("knowledge-grid").innerHTML = window.caseStats.map(([label, metric]) => `<div class="knowledge-stat"><span>${value(label)}</span><strong>${value(metric)}</strong></div>`).join("");
    document.getElementById("updates-grid").innerHTML = `<article class="update-card"><span class="section-index">${t("updates.case", "CASE UPDATES")}</span><h3>${t("updates.pending", "DATA PENDING")}</h3><p>${t("updates.caseDescription", "No source-attributed public updates are currently published.")}</p></article><article class="update-card"><span class="section-index">${t("updates.media", "MEDIA CENTER")}</span><h3>${t("updates.none", "NO MEDIA RECORDS")}</h3><p>${t("updates.mediaDescription", "News and media references are added only with a verifiable source.")}</p></article>`;
  }

  function setupBoot() {
    const screen = document.getElementById("boot-screen"); const message = document.getElementById("boot-message"); let finished = false;
    const finish = () => { if (finished) return; finished = true; screen.classList.add("is-hidden"); setTimeout(() => screen.remove(), 500); };
    setTimeout(() => { if (!finished) message.textContent = t("boot.loading", "LOADING CASE FILE…"); }, 430);
    setTimeout(() => { if (!finished) message.textContent = t("boot.amount", "50,000,000 USDT · ESTIMATED"); }, 910);
    setTimeout(finish, 1550); document.getElementById("skip-boot")?.addEventListener("click", finish);
  }

  function setupCanvas() {
    const canvas = document.getElementById("ambient-canvas"); const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvas || reduce) return;
    const context = canvas.getContext("2d"); if (!context) return;
    let raf = 0; let particles = []; let visible = true;
    const resize = () => { canvas.width = innerWidth * Math.min(devicePixelRatio, 1.5); canvas.height = innerHeight * Math.min(devicePixelRatio, 1.5); context.setTransform(Math.min(devicePixelRatio, 1.5), 0, 0, Math.min(devicePixelRatio, 1.5), 0, 0); const count = innerWidth < 600 ? 20 : 42; particles = Array.from({ length: count }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .14, vy: (Math.random() - .5) * .14, r: Math.random() * 1.2 + .35 })); };
    const frame = () => { if (!visible) return; context.clearRect(0, 0, innerWidth, innerHeight); for (let i = 0; i < particles.length; i++) { const p = particles[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > innerWidth) p.vx *= -1; if (p.y < 0 || p.y > innerHeight) p.vy *= -1; context.fillStyle = i % 5 === 0 ? "rgba(245,199,106,.55)" : "rgba(77,163,255,.34)"; context.beginPath(); context.arc(p.x, p.y, p.r, 0, Math.PI * 2); context.fill(); } raf = requestAnimationFrame(frame); };
    document.addEventListener("visibilitychange", () => { visible = !document.hidden; if (visible) { cancelAnimationFrame(raf); frame(); } else cancelAnimationFrame(raf); });
    addEventListener("resize", resize, { passive: true }); resize(); frame();
  }

  function setupReveal() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".reveal"); if (reduced || !("IntersectionObserver" in window)) { targets.forEach(item => item.classList.add("visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
    targets.forEach(item => observer.observe(item));
  }

  function setupModalControls() {
    document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => { window.CRNModal.close(); window.CRNDrawer.close(); }));
    document.getElementById("modal-backdrop")?.addEventListener("click", () => window.CRNModal.close());
    document.addEventListener("keydown", event => { if (event.key === "Escape") { window.CRNModal.close(); window.CRNDrawer.close(); } });
    document.querySelectorAll("[data-recovery]").forEach(button => button.addEventListener("click", () => {
      document.getElementById("recovery-modal-title").textContent = button.dataset.recovery === "victim" ? t("recovery.reportImpact", "REPORT AN IMPACT") : t("form.shareInformation", "SHARE INFORMATION");
      window.CRNModal.open("recovery-modal");
    }));
    document.getElementById("recovery-form")?.addEventListener("submit", event => { event.preventDefault(); window.CRNToast(t("recovery.localSaved", "Local draft saved on this device session only. No information was sent."), "success"); event.currentTarget.reset(); window.CRNModal.close(); });
  }

  function setupNav() {
    const navbar = document.querySelector(".navbar"); const links = [...document.querySelectorAll(".desktop-nav a")];
    const onScroll = () => { navbar?.classList.toggle("scrolled", scrollY > 20); let active = ""; links.forEach(link => { const section = document.querySelector(link.getAttribute("href")); if (section && section.getBoundingClientRect().top < 150) active = link.getAttribute("href"); }); links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === active)); };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  function init() {
    try {
      renderCase(); window.CRNTimeline.render(); window.CRNNetwork.render(); window.CRNCharts.renderFundFlow(); window.CRNCharts.renderWallet(); window.CRNEvidence.renderEvidence(); window.CRN_Bounty.render();
      window.CRNShare.bind(); window.CRNCard.bind(); window.CRNSearch.bind(); window.CRNEvidence.bind(); window.CRN_Bounty.bind(); setupModalControls(); setupCanvas(); setupReveal(); setupNav(); setupBoot();
      document.addEventListener("crn-language-changed", () => {
        renderCase(); window.CRNTimeline.render(); window.CRNNetwork.render(); window.CRNCharts.renderFundFlow(); window.CRNCharts.renderWallet(); window.CRNEvidence.renderEvidence(); window.CRN_Bounty.render();
      });
    } catch (error) { console.error("CRN initialization error", error); window.CRNToast(t("error.initialization", "Some interface elements could not initialize. Core content remains available."), "error"); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
