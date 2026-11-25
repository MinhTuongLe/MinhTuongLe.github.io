/**
 * Keyboard-first Command Palette (Ctrl+K / Cmd+K):
 * - Populates case study commands dynamically from portfolio.js
 * - Supports instant search filtering, ArrowUp/ArrowDown/Enter selection
 * - Includes focus trap & focus restoration on close
 */

import { PROFILE, CASE_STUDIES_LIST } from '../data/portfolio.js';
import { copyToClipboard } from './clipboard.js';
import { trapFocus } from './a11y.js';

export function initCommandPalette({ openCaseStudy, closeDrawer, closeLightbox }) {
  const cmdModal = document.getElementById('cmdModal');
  const cmdDialog = cmdModal?.querySelector('.cmd-modal');
  const openCmdBtn = document.getElementById('openCmd');
  const cmdCloseBtn = document.getElementById('cmdClose');
  const cmdSearch = document.getElementById('cmdSearch');
  const cmdList = document.getElementById('cmdList');
  const cmdCasesSlot = document.getElementById('cmdCasesSlot');
  const cmdEmpty = document.getElementById('cmdEmpty');

  if (!cmdModal || !openCmdBtn || !cmdSearch || !cmdList) return;

  const syncVisualViewport = () => {
    const vv = window.visualViewport;
    if (!vv || !cmdModal.classList.contains('open')) return;
    cmdModal.style.setProperty('--cmd-vw', `${Math.round(vv.width)}px`);
    cmdModal.style.setProperty('--cmd-vh', `${Math.round(vv.height)}px`);
    cmdModal.style.setProperty('--cmd-vl', `${Math.max(0, Math.round(vv.offsetLeft))}px`);
    cmdModal.style.setProperty('--cmd-vt', `${Math.max(0, Math.round(vv.offsetTop))}px`);
  };

  const resetVisualViewport = () => {
    cmdModal.style.removeProperty('--cmd-vw');
    cmdModal.style.removeProperty('--cmd-vh');
    cmdModal.style.removeProperty('--cmd-vl');
    cmdModal.style.removeProperty('--cmd-vt');
  };

  // Hydrate email label from Single Source of Truth
  cmdList.querySelectorAll('[data-profile-email]').forEach((el) => {
    el.textContent = PROFILE.email;
  });

  // Populate Case Study commands from Single Source of Truth
  if (cmdCasesSlot) {
    cmdCasesSlot.innerHTML = '';
    CASE_STUDIES_LIST.forEach((project) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cmd-item';
      btn.dataset.group = 'cases';
      btn.dataset.caseId = project.id;
      btn.dataset.keywords = `${project.cmdKeywords} ${project.tags.join(' ').toLowerCase()}`;
      btn.innerHTML = `<span>${project.cmdTitle}</span><span class="kbd">DRAWER</span>`;
      cmdCasesSlot.appendChild(btn);
    });
  }

  const allItems = Array.from(cmdList.querySelectorAll('.cmd-item'));
  const groupLabels = Array.from(cmdList.querySelectorAll('.cmd-group-label'));
  let activeIndex = 0;
  let lastTriggerEl = null;

  const getVisibleItems = () => allItems.filter((item) => item.style.display !== 'none');

  const updateActiveItem = (nextIndex, { scroll = false } = {}) => {
    const visible = getVisibleItems();
    allItems.forEach((item) => item.classList.remove('is-active'));
    if (visible.length === 0) {
      activeIndex = -1;
      return;
    }
    activeIndex = ((nextIndex % visible.length) + visible.length) % visible.length;
    const activeEl = visible[activeIndex];
    activeEl.classList.add('is-active');
    if (scroll) {
      const itemTop = activeEl.offsetTop;
      const itemBottom = itemTop + activeEl.offsetHeight;
      if (itemTop < cmdList.scrollTop) {
        cmdList.scrollTop = itemTop - 8;
      } else if (itemBottom > cmdList.scrollTop + cmdList.clientHeight) {
        cmdList.scrollTop = itemBottom - cmdList.clientHeight + 8;
      }
    }
  };

  const syncGroupsVisibility = () => {
    groupLabels.forEach((label) => {
      const groupName = label.dataset.group;
      const hasVisible = allItems.some(
        (item) => item.dataset.group === groupName && item.style.display !== 'none'
      );
      label.style.display = hasVisible ? 'block' : 'none';
    });
  };

  const filterCommands = (query) => {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;
    allItems.forEach((item) => {
      const match = item.textContent.toLowerCase().includes(q) || (item.dataset.keywords || '').includes(q);
      item.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });
    syncGroupsVisibility();
    if (cmdEmpty) cmdEmpty.hidden = visibleCount > 0;
    cmdList.scrollTop = 0;
    updateActiveItem(0);
  };

  const toggleCmd = (show, { restoreFocus = true } = {}) => {
    if (show) {
      lastTriggerEl = document.activeElement;
    }

    cmdModal.classList.toggle('open', show);
    cmdModal.setAttribute('aria-hidden', String(!show));
    document.body.classList.toggle('modal-open', show);

    if (show) {
      cmdSearch.value = '';
      filterCommands('');
      syncVisualViewport();
      cmdSearch.focus({ preventScroll: true });
    } else {
      resetVisualViewport();
      if (restoreFocus && lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
        lastTriggerEl.focus({ preventScroll: true });
        lastTriggerEl = null;
      }
    }
  };

  const executeItem = (item) => {
    if (!item) return;

    if (item.dataset.caseId && openCaseStudy) {
      const trigger = lastTriggerEl;
      toggleCmd(false, { restoreFocus: false });
      openCaseStudy(item.dataset.caseId, trigger);
      return;
    }

    toggleCmd(false);

    if (item.dataset.action === 'copy-email') {
      copyToClipboard(PROFILE.email, `Copied ${PROFILE.email}`);
      return;
    }

    if (item.tagName === 'A') {
      const href = item.getAttribute('href');
      if (item.target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  openCmdBtn.addEventListener('click', () => {
    closeLightbox?.();
    closeDrawer?.();
    toggleCmd(true);
  });

  cmdCloseBtn?.addEventListener('click', () => toggleCmd(false));

  window.visualViewport?.addEventListener('resize', syncVisualViewport);
  window.visualViewport?.addEventListener('scroll', syncVisualViewport);

  cmdModal.addEventListener('click', (e) => {
    if (e.target === cmdModal) toggleCmd(false);
  });

  cmdSearch.addEventListener('input', (e) => filterCommands(e.target.value));

  cmdSearch.addEventListener('keydown', (e) => {
    const visible = getVisibleItems();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      updateActiveItem(activeIndex + 1, { scroll: true });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      updateActiveItem(activeIndex - 1, { scroll: true });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visible[activeIndex]) executeItem(visible[activeIndex]);
    }
  });

  allItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const visible = getVisibleItems();
      const idx = visible.indexOf(item);
      if (idx >= 0) updateActiveItem(idx);
    });

    item.addEventListener('click', (e) => {
      e.preventDefault();
      executeItem(item);
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      closeLightbox?.();
      closeDrawer?.();
      toggleCmd(!cmdModal.classList.contains('open'));
      return;
    }

    if (cmdModal.classList.contains('open')) {
      if (e.key === 'Escape') {
        toggleCmd(false);
      } else {
        trapFocus(cmdDialog, e);
      }
    }
  });
}
