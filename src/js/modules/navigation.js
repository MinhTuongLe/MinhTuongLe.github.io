/**
 * Sticky header scroll progress bar, scroll-spy active section links
 * (clearing active state in the Hero region), responsive mobile menu,
 * and OS-aware shortcut label.
 */

export function initNavigation() {
  const progressBar = document.getElementById('scrollProgress');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const firstSection = sections[0];
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobilePanel = document.getElementById('mobileNavPanel');
  const cmdKbd = document.getElementById('cmdShortcutLabel');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // OS-aware keyboard shortcut badge
  if (cmdKbd) {
    const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
    cmdKbd.textContent = isMac ? '⌘K' : 'Ctrl K';
  }

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isMatch = Boolean(id) && link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isMatch);
    });
  };

  // Reading progress hairline + clear active link when scrolled back to Hero
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      progressBar.style.width = `${pct.toFixed(1)}%`;
    }

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('is-visible', scrollTop > 520);
    }

    if (firstSection && scrollTop + 160 < firstSection.offsetTop) {
      setActiveLink(null);
    }
  };

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scroll-spy for section nav links
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (firstSection && window.scrollY + 160 < firstSection.offsetTop) {
          setActiveLink(null);
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveLink(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // Mobile navigation toggle
  if (mobileToggle && mobilePanel) {
    const setMobileOpen = (open) => {
      mobilePanel.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.contains('open');
      setMobileOpen(!isOpen);
    });

    mobilePanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMobileOpen(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) setMobileOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    });
  }
}
