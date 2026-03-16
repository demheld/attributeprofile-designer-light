export function createNoticeService({ documentRef, statusBanner }) {
  let centerNoticeTimer = null;

  function showStatus(msg, type = "info") {
    statusBanner.textContent = msg;
    statusBanner.className = `status-banner ${type}`;
  }

  function showCenterNotice(msg, type = "info", timeoutMs = 2000) {
    let notice = documentRef.getElementById("centerNotice");
    if (!notice) {
      notice = documentRef.createElement("div");
      notice.id = "centerNotice";
      notice.className = "center-notice hidden";
      notice.innerHTML = `
        <div class="center-notice-card">
          <p class="center-notice-text" id="centerNoticeText"></p>
        </div>
      `;
      documentRef.body.appendChild(notice);
    }

    const text = notice.querySelector("#centerNoticeText");
    if (text) text.textContent = msg;
    notice.className = `center-notice ${type}`;

    if (centerNoticeTimer) {
      clearTimeout(centerNoticeTimer);
    }
    centerNoticeTimer = setTimeout(() => {
      notice.className = "center-notice hidden";
    }, Math.max(800, Number(timeoutMs) || 2000));
  }

  function hideStatus() {
    statusBanner.className = "status-banner hidden";
  }

  return {
    showStatus,
    showCenterNotice,
    hideStatus,
  };
}