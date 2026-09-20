window.CRNCard = (() => {
  let cardFile = null;
  const toast = (message, kind) => window.CRNToast?.(message, kind);
  const t = (key, fallback) => window.CRN_I18N?.t(key, fallback) ?? fallback;

  function loadImage(url, anonymous = false) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      if (anonymous) image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }

  function drawNetwork(ctx, width, height) {
    const points = [[820,122],[943,95],[1065,182],[909,294],[1104,346],[765,435],[1000,503],[1148,536]];
    ctx.save();
    points.forEach(([x, y], i) => {
      points.slice(i + 1).forEach(([toX, toY], j) => {
        if ((i + j) % 3 !== 0) return;
        ctx.strokeStyle = i % 2 ? "rgba(77,163,255,.28)" : "rgba(245,199,106,.22)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 7]);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(toX, toY); ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(x, y, i % 2 ? 7 : 9, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 ? "#4DA3FF" : "#F5C76A";
      ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(x, y, i % 2 ? 18 : 22, 0, Math.PI * 2);
      ctx.strokeStyle = i % 2 ? "rgba(77,163,255,.35)" : "rgba(245,199,106,.35)"; ctx.stroke();
    });
    ctx.restore();
  }

  async function generate() {
    const canvas = document.getElementById("share-card-canvas");
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) { toast(t("card.unavailable", "Share card generation is unavailable in this browser."), "error"); return null; }
    const { width, height } = canvas;
    const shareUrl = window.CRNShare.getActiveUrl();
    try {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#05070B"); gradient.addColorStop(.55, "#090e16"); gradient.addColorStop(1, "#101008");
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255,255,255,.045)"; ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for (let y = 0; y < height; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
      const halo = ctx.createRadialGradient(916, 285, 10, 916, 285, 340);
      halo.addColorStop(0, "rgba(77,163,255,.17)"); halo.addColorStop(1, "rgba(77,163,255,0)"); ctx.fillStyle = halo; ctx.fillRect(0, 0, width, height);
      drawNetwork(ctx, width, height);

      const mono = "'Microsoft YaHei UI', 'PingFang SC', monospace";
      const sans = "'Microsoft YaHei', 'PingFang SC', Arial, sans-serif";
      ctx.fillStyle = "#F5C76A"; ctx.font = `600 17px ${mono}`; ctx.letterSpacing = "3px"; ctx.fillText(t("card.network", "CASE & RECOVERY NETWORK"), 74, 83);
      ctx.fillStyle = "#8793A3"; ctx.font = `15px ${mono}`; ctx.fillText(t("card.estimate", "ESTIMATED FIGURE · PUBLIC SOURCE PENDING"), 74, 120);
      ctx.fillStyle = "#F4F7FA"; ctx.font = `600 84px ${sans}`; ctx.fillText("50,000,000", 70, 232);
      ctx.fillStyle = "#F5C76A"; ctx.font = `600 28px ${mono}`; ctx.fillText("USDT", 75, 276);
      ctx.fillStyle = "#F4F7FA"; ctx.font = `600 37px ${sans}`; ctx.fillText(t("card.recovery1", "INVESTOR"), 74, 360); ctx.fillText(t("card.recovery2", "RECOVERY CASE"), 74, 402);
      ctx.fillStyle = "#4DA3FF"; ctx.font = `600 16px ${mono}`; ctx.fillText(t("card.investigation", "ON-CHAIN INVESTIGATION"), 76, 446);
      ctx.fillStyle = "#F4F7FA"; ctx.font = `18px ${mono}`; ctx.fillText(window.caseData.id, 76, 514);
      ctx.fillStyle = "#8793A3"; ctx.font = `14px ${mono}`; ctx.fillText(t("card.tags", "EVIDENCE  /  TRANSPARENCY  /  RECOVERY"), 76, 551);
      ctx.strokeStyle = "rgba(245,199,106,.55)"; ctx.strokeRect(72, 51, 11, 11);

      // The card uses the same current Case URL as the on-screen QR preview.
      let qrDrawn = false;
      try {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=190x190&margin=8&data=${encodeURIComponent(shareUrl)}`;
        const qr = await loadImage(qrUrl, true);
        ctx.fillStyle = "#fff"; ctx.fillRect(988, 405, 156, 156); ctx.drawImage(qr, 994, 411, 144, 144); qrDrawn = true;
      } catch (_) { /* Canvas remains usable; the interactive share center retains its QR image. */ }
      if (!qrDrawn) {
        ctx.strokeStyle = "rgba(245,199,106,.45)"; ctx.strokeRect(994, 411, 144, 144);
        ctx.fillStyle = "#8793A3"; ctx.font = `11px ${mono}`; ctx.fillText(t("card.qr", "QR IN SHARE CENTER"), 1005, 485);
      }
      ctx.fillStyle = "#8793A3"; ctx.font = `11px ${mono}`; ctx.fillText(new URL(shareUrl).host || t("share.qr", "CURRENT CASE URL"), 989, 580);

      const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("Card export failed")), "image/png"));
      cardFile = new File([blob], `${window.caseData.id}-share-card.png`, { type: "image/png" });
      document.getElementById("download-card").disabled = false;
      document.getElementById("share-card-file").disabled = false;
      toast(t("card.generated", "Share card generated locally."), "success");
      return cardFile;
    } catch (_) { toast(t("card.failed", "Unable to generate the share card. Try again."), "error"); return null; }
  }

  function download() {
    if (!cardFile) { toast(t("share.generateFirst", "Generate a share card first.")); return; }
    try {
      const url = URL.createObjectURL(cardFile); const link = document.createElement("a");
      link.href = url; link.download = cardFile.name; document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (_) { toast(t("card.downloadFailed", "The card could not be downloaded."), "error"); }
  }

  function bind() {
    document.getElementById("generate-card")?.addEventListener("click", generate);
    document.getElementById("download-card")?.addEventListener("click", download);
    document.getElementById("share-card-file")?.addEventListener("click", () => window.CRNShare.shareFile(cardFile));
  }
  return Object.freeze({ bind, generate, download, getFile: () => cardFile });
})();
