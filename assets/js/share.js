window.CRNShare = (() => {
  const t = (key, fallback) => window.CRN_I18N?.t(key, fallback) ?? fallback;
  const platformUrls = {
    x: ({ text, url }) => `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    telegram: ({ text, url }) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    whatsapp: ({ text, url }) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    facebook: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: ({ url }) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    line: ({ text, url }) => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    email: ({ text, url }) => `mailto:?subject=${encodeURIComponent(shareTitle())}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
  };

  const toast = (message, kind) => window.CRNToast?.(message, kind);
  const shareTitle = () => t("meta.title", window.shareData.title);
  const textForShare = () => `${t("share.modalCopy", window.shareData.text)} ${window.caseData.id}.`;
  let activeUrl = "";

  function setQr(url) {
    const qr = document.getElementById("qr-image");
    if (!qr) return;
    // A generated QR service is used solely to encode the current public Case URL;
    // it receives no submission, wallet, or personal data.
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(url)}`;
    qr.onerror = () => { qr.alt = t("share.qrUnavailable", "QR preview unavailable. Use the copy-link control instead."); toast(t("share.qrUnavailable", "QR preview is unavailable; the case link can still be copied."), "error"); };
  }

  function prepareShare() {
    activeUrl = window.CRNReferral.getShareUrl();
    const input = document.getElementById("share-url");
    if (input) input.value = activeUrl;
    setQr(activeUrl);
    return activeUrl;
  }

  async function copyLink(url = activeUrl || prepareShare()) {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else {
        const temporary = document.createElement("textarea");
        temporary.value = url;
        temporary.setAttribute("readonly", "");
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        const copied = document.execCommand("copy");
        temporary.remove();
        if (!copied) throw new Error("Copy command unavailable");
      }
      toast(t("share.copied", "Case link copied to clipboard."), "success");
      trackShare("copy");
    } catch (_) { toast(t("share.copyFailed", "Unable to copy the link. Select it and copy manually."), "error"); }
  }

  function trackShare(platform) {
    if (window.APP_CONFIG.bountyEnabled && window.CRN_Bounty?.recordShareEvent) {
      window.CRN_Bounty.recordShareEvent({ platform, url: activeUrl });
    }
  }

  function shareTo(platform) {
    const url = activeUrl || prepareShare();
    const text = textForShare();
    const target = platformUrls[platform]?.({ text, url });
    if (!target) return;
    try {
      if (platform === "email") location.href = target;
      else window.open(target, "_blank", "noopener,noreferrer,width=700,height=620");
      trackShare(platform);
    } catch (_) { toast(t("share.openFailed", "This share option could not be opened. Copy the case link instead."), "error"); }
  }

  async function nativeShare() {
    const url = activeUrl || prepareShare();
    if (/MicroMessenger/i.test(navigator.userAgent)) {
      toast(t("share.wechat", "In WeChat, tap the ⋯ menu to share with friends or Moments."));
      return;
    }
    if (!navigator.share) { toast(t("share.nativeUnavailable", "Native sharing is not available here. Choose a platform or copy the link.")); return; }
    try {
      await navigator.share({ title: shareTitle(), text: textForShare(), url });
      trackShare("native");
    } catch (error) {
      if (error?.name !== "AbortError") toast(t("share.nativeFailed", "Native sharing was unavailable. Choose another share option."), "error");
    }
  }

  function openShareCenter() {
    prepareShare();
    window.CRNModal?.open("share-modal");
  }

  async function shareFile(file) {
    if (!file) { toast(t("share.generateFirst", "Generate a share card first.")); return; }
    try {
      if (!navigator.share || !navigator.canShare?.({ files: [file] })) {
        toast(t("share.imageUnsupported", "Image sharing is not supported here. Download the card instead."));
        return;
      }
      await navigator.share({ title: shareTitle(), text: textForShare(), files: [file] });
    } catch (error) {
      if (error?.name !== "AbortError") toast(t("share.imageFailed", "The image could not be shared. Download it instead."), "error");
    }
  }

  function bind() {
    document.querySelectorAll("[data-share-open]").forEach(button => button.addEventListener("click", openShareCenter));
    document.getElementById("copy-share-url")?.addEventListener("click", () => copyLink());
    document.getElementById("copy-case-link")?.addEventListener("click", () => copyLink(prepareShare()));
    document.getElementById("native-share")?.addEventListener("click", nativeShare);
    document.querySelectorAll("[data-social]").forEach(button => button.addEventListener("click", () => shareTo(button.dataset.social)));
  }

  return Object.freeze({ bind, openShareCenter, prepareShare, copyLink, nativeShare, shareFile, getActiveUrl: () => activeUrl || prepareShare() });
})();
