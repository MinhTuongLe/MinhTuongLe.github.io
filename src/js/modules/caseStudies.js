/**
 * Case Studies (Single Source of Truth driven):
 * - Renders Tier 1 (Visual) and Tier 2 (Architecture) cards + filter counts from portfolio.js
 * - Tier-aware domain filtering with subtle entrance transitions
 * - Slide-over Case Study Architecture Drawer with URL deep-linking (#case=<id>),
 *   direct link copying, focus trap & focus restoration
 * - High-res Image Lightbox preview with focus trap & restoration
 */

import { CASE_STUDIES_LIST, CASE_STUDIES_MAP, buildArchitectureDiagram } from '../data/portfolio.js';
import { trapFocus } from './a11y.js';
import { copyToClipboard } from './clipboard.js';

function createProjectCardElement(project) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.dataset.category = project.categories.join(' ');
  article.id = `card-${project.id}`;

  const visualHtml =
    project.tier === 'featured'
      ? `
        <div
          class="project-thumb zoomable"
          role="button"
          tabindex="0"
          aria-label="Inspect ${project.title} UI screenshot"
          data-lightbox-src="${project.thumbnail}"
          data-lightbox-title="${project.lightboxTitle}"
        >
          <img src="${project.thumbnail}" alt="${project.thumbnailAlt}" loading="lazy" decoding="async" width="1200" height="750" />
          <span class="thumb-zoom-hint">Inspect UI ↗</span>
        </div>
      `
      : `
        <div class="arch-diagram-banner" aria-label="${project.diagramAriaLabel}">
          ${buildArchitectureDiagram(project.diagramType)}
        </div>
      `;

  const tagsHtml = project.tags.map((t) => `<span class="tag">${t}</span>`).join('');
  const liveLinkHtml = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-live-link">Live Demo ↗</a>`
    : '';

  article.innerHTML = `
    ${visualHtml}
    <div class="project-body">
      <div>
        <div class="project-meta">
          <span>${project.eyebrow}</span>
          <span>${project.platformBadge}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
      </div>
      <div class="arch-box">
        <strong>Engineering &amp; UX Highlight</strong>
        ${project.highlight}
      </div>
      <div class="card-footer">
        <div class="tag-row">${tagsHtml}</div>
        <div class="card-status-bar">
          <span>${project.statusText}</span>
          <div class="card-action-group">
            <button type="button" class="card-inspect-btn" data-open-case="${project.id}">Architecture →</button>
            ${liveLinkHtml}
          </div>
        </div>
      </div>
    </div>
  `;

  return article;
}

function getCaseIdFromHash() {
  const match = window.location.hash.match(/^#case=([a-z0-9-]+)$/i);
  if (!match) return null;
  const id = match[1].toLowerCase();
  return CASE_STUDIES_MAP[id] ? id : null;
}

export function initCaseStudies() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const featuredGrid = document.getElementById('projectsContainer');
  const archTier = document.getElementById('archSystemsTier');
  const archGrid = document.getElementById('archSystemsGrid');

  // Lightbox elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxCard = lightboxModal?.querySelector('.lightbox-card');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');

  // Drawer elements
  const drawerBackdrop = document.getElementById('caseDrawer');
  const drawerPanel = drawerBackdrop?.querySelector('.drawer-panel');
  const drawerEyebrow = document.getElementById('drawerEyebrow');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerSubtitle = document.getElementById('drawerSubtitle');
  const drawerVisual = document.getElementById('drawerVisual');
  const drawerRole = document.getElementById('drawerRole');
  const drawerPlatforms = document.getElementById('drawerPlatforms');
  const drawerProblem = document.getElementById('drawerProblem');
  const drawerDecisions = document.getElementById('drawerDecisions');
  const drawerTags = document.getElementById('drawerTags');
  const drawerOwnership = document.getElementById('drawerOwnership');
  const drawerLiveSlot = document.getElementById('drawerLiveSlot');
  const drawerCopyLink = document.getElementById('drawerCopyLink');
  const drawerClose = document.getElementById('drawerClose');

  let activeCaseId = null;
  let lastDrawerTrigger = null;
  let lastLightboxTrigger = null;

  // Render cards dynamically from Single Source of Truth
  if (featuredGrid && archGrid) {
    featuredGrid.innerHTML = '';
    archGrid.innerHTML = '';
    CASE_STUDIES_LIST.forEach((project) => {
      const card = createProjectCardElement(project);
      if (project.tier === 'featured') {
        featuredGrid.appendChild(card);
      } else {
        archGrid.appendChild(card);
      }
    });
  }

  // Sync filter counts dynamically from CASE_STUDIES_LIST
  filterBtns.forEach((btn) => {
    const filter = btn.dataset.filter;
    const countEl = btn.querySelector('.filter-count');
    if (!countEl) return;
    const count =
      filter === 'all'
        ? CASE_STUDIES_LIST.length
        : CASE_STUDIES_LIST.filter((p) => p.categories.includes(filter)).length;
    countEl.textContent = String(count);
  });

  const syncBodyLock = () => {
    const cmdOpen = document.getElementById('cmdModal')?.classList.contains('open');
    const drawerOpen = drawerBackdrop?.classList.contains('open');
    const lbOpen = lightboxModal?.classList.contains('open');
    document.body.classList.toggle('modal-open', Boolean(cmdOpen || drawerOpen || lbOpen));
  };

  // --- Lightbox ---
  const openLightbox = (src, title, triggerEl = null) => {
    if (!lightboxModal || !lightboxImg || !lightboxTitle) return;
    lastLightboxTrigger = triggerEl || document.activeElement;
    lightboxImg.src = src;
    lightboxTitle.textContent = title;
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    syncBodyLock();
    lightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (!lightboxModal || !lightboxModal.classList.contains('open')) return;
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    syncBodyLock();
    if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === 'function') {
      lastLightboxTrigger.focus();
      lastLightboxTrigger = null;
    }
  };

  document.querySelectorAll('.project-thumb.zoomable').forEach((thumb) => {
    const triggerZoom = () => openLightbox(thumb.dataset.lightboxSrc, thumb.dataset.lightboxTitle, thumb);
    thumb.addEventListener('click', triggerZoom);
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerZoom();
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // --- Case Study Detail Drawer ---
  const closeDrawer = ({ updateUrl = true } = {}) => {
    if (!drawerBackdrop || !drawerBackdrop.classList.contains('open')) return;
    drawerBackdrop.classList.remove('open');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    activeCaseId = null;

    if (updateUrl && window.location.hash.startsWith('#case=')) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    syncBodyLock();
    if (lastDrawerTrigger && typeof lastDrawerTrigger.focus === 'function') {
      lastDrawerTrigger.focus();
      lastDrawerTrigger = null;
    }
  };

  const openCaseStudy = (projectId, triggerEl = null, { updateUrl = true } = {}) => {
    const data = CASE_STUDIES_MAP[projectId];
    if (!data || !drawerBackdrop) return;

    activeCaseId = projectId;
    lastDrawerTrigger = triggerEl || document.activeElement;

    drawerEyebrow.textContent = data.eyebrow;
    drawerTitle.textContent = data.title;
    drawerSubtitle.textContent = data.subtitle;
    drawerRole.textContent = data.role;
    drawerPlatforms.textContent = data.platforms;
    drawerProblem.textContent = data.problem;
    drawerOwnership.textContent = data.ownership;

    // Render visual preview (zoomable screenshot or unique-ID architecture SVG)
    drawerVisual.innerHTML = '';
    if (data.thumbnail) {
      const img = document.createElement('img');
      img.src = data.thumbnail;
      img.alt = data.thumbnailAlt || data.title;
      img.tabIndex = 0;
      img.role = 'button';
      img.title = 'Click to inspect full resolution';
      const zoomFromDrawer = () => openLightbox(data.thumbnail, data.lightboxTitle || data.title, img);
      img.addEventListener('click', zoomFromDrawer);
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          zoomFromDrawer();
        }
      });
      drawerVisual.appendChild(img);
    } else if (data.diagramType) {
      const banner = document.createElement('div');
      banner.className = 'arch-diagram-banner';
      banner.style.borderBottom = 'none';
      banner.innerHTML = buildArchitectureDiagram(data.diagramType, '-drawer');
      drawerVisual.appendChild(banner);
    }

    drawerDecisions.innerHTML = '';
    data.decisions.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      drawerDecisions.appendChild(li);
    });

    drawerTags.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      drawerTags.appendChild(span);
    });

    // Live link ONLY for LexiNote
    drawerLiveSlot.innerHTML = '';
    if (data.liveUrl) {
      const link = document.createElement('a');
      link.href = data.liveUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'btn btn-accent btn-sm';
      link.textContent = 'Open Live Demo ↗';
      drawerLiveSlot.appendChild(link);
    }

    if (updateUrl) {
      history.replaceState(null, '', `#case=${projectId}`);
    }

    drawerBackdrop.classList.add('open');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    syncBodyLock();
    drawerClose?.focus();
  };

  // Bind all case study triggers (both Section 01 Lab headers and Section 02 Cards)
  document.querySelectorAll('[data-open-case]').forEach((btn) => {
    btn.addEventListener('click', () => openCaseStudy(btn.dataset.openCase, btn));
  });

  drawerCopyLink?.addEventListener('click', () => {
    if (!activeCaseId) return;
    const url = `${window.location.origin}${window.location.pathname}#case=${activeCaseId}`;
    copyToClipboard(url, `Copied direct link (#case=${activeCaseId})`);
  });

  drawerClose?.addEventListener('click', () => closeDrawer());
  drawerBackdrop?.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) closeDrawer();
  });

  // URL Deep-Linking on load & hashchange
  const initialCaseId = getCaseIdFromHash();
  if (initialCaseId) {
    openCaseStudy(initialCaseId, null, { updateUrl: false });
  }

  window.addEventListener('hashchange', () => {
    const hashCaseId = getCaseIdFromHash();
    if (hashCaseId) {
      openCaseStudy(hashCaseId, null, { updateUrl: false });
    } else if (drawerBackdrop?.classList.contains('open')) {
      closeDrawer({ updateUrl: false });
    }
  });

  // --- Tier-aware Domain Filter ---
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      const updateGrid = (gridEl) => {
        if (!gridEl) return 0;
        let visibleCount = 0;
        gridEl.querySelectorAll('.project-card').forEach((card) => {
          const match = filter === 'all' || card.dataset.category.split(' ').includes(filter);
          card.style.display = match ? 'flex' : 'none';
          if (match) {
            card.classList.remove('is-entering');
            void card.offsetWidth;
            card.classList.add('is-entering');
            visibleCount++;
          }
        });
        return visibleCount;
      };

      const featuredCount = updateGrid(featuredGrid);
      const archCount = updateGrid(archGrid);

      if (featuredGrid) featuredGrid.style.display = featuredCount > 0 ? 'grid' : 'none';
      if (archTier) {
        archTier.style.display = archCount > 0 ? 'block' : 'none';
        archTier.style.marginTop = featuredCount > 0 ? '36px' : '0';
      }
    });
  });

  // Keyboard handling: Escape closes topmost overlay; Tab is trapped inside active overlay
  document.addEventListener('keydown', (e) => {
    if (lightboxModal?.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else {
        trapFocus(lightboxCard, e);
      }
      return;
    }

    if (drawerBackdrop?.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeDrawer();
      } else {
        trapFocus(drawerPanel, e);
      }
    }
  });

  return { openCaseStudy, closeDrawer, closeLightbox };
}
