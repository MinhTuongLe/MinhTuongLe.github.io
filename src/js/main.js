/**
 * Portfolio Application Bootstrapper
 */

import { PROFILE } from './data/portfolio.js';
import { copyToClipboard } from './modules/clipboard.js';
import { initNavigation } from './modules/navigation.js';
import { initSandboxes } from './modules/sandboxes.js';
import { initCaseStudies } from './modules/caseStudies.js';
import { initCommandPalette } from './modules/commandPalette.js';

function initEmailTriggers() {
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await copyToClipboard(PROFILE.email, `Copied ${PROFILE.email}`);
      const labelEl = btn.querySelector('[data-copy-label]');
      if (labelEl) {
        const original = labelEl.textContent;
        labelEl.textContent = 'Copied ✓';
        setTimeout(() => {
          labelEl.textContent = original;
        }, 1800);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSandboxes();
  const caseApi = initCaseStudies();
  initCommandPalette(caseApi);
  initEmailTriggers();
});
