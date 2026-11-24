/**
 * Clipboard helper and non-intrusive toast feedback.
 */

let toastTimer = null;

export function showToast(message) {
  const toastEl = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  if (!toastEl || !toastText) return;

  toastText.textContent = message;
  toastEl.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2400);
}

export async function copyToClipboard(text, feedbackMessage = 'Copied to clipboard') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    showToast(feedbackMessage);
    return true;
  } catch {
    showToast(`Email: ${text}`);
    return false;
  }
}
