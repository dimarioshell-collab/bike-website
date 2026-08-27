/* ==========================================================================
   DIMARIO BIKE MASTER — interactions
   1) custom crosshair cursor (desktop only)
   2) navbar background on scroll
   3) fade-up scroll reveal (IntersectionObserver)
   4) video play/pause button on the works section
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbarScroll();
  initMobileMenu();
  initFadeUp();
  initVideoPlayer();
});

/* ---------- 1) custom cursor ---------- */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  // skip on touch devices — no real pointer to track
  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (isCoarsePointer) return;

  let ringX = 0;
  let ringY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveSelector = 'a, button, .service-card, .price-card, .work-card, .contact-method';
  document.querySelectorAll(interactiveSelector).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* ---------- 2) navbar background on scroll ---------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- 2b) mobile hamburger menu ---------- */
function initMobileMenu() {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  if (!burger || !links || !overlay) return;

  const closeMenu = () => {
    burger.classList.remove('is-open');
    links.classList.remove('is-open');
    overlay.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    burger.classList.add('is-open');
    links.classList.add('is-open');
    overlay.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  burger.addEventListener('click', () => {
    if (links.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  // закрити меню, якщо екран стало ширшим за мобільний брейкпоінт
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

/* ---------- 3) fade-up reveal on scroll ---------- */
function initFadeUp() {
  const items = document.querySelectorAll('.fade-up');
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- 4) works video player ---------- */
function initVideoPlayer() {
  const video = document.getElementById('myVideo');
  const playBtn = document.getElementById('playBtn');
  if (!video || !playBtn) return;

  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playBtn.classList.add('is-hidden');
    } else {
      video.pause();
      playBtn.classList.remove('is-hidden');
    }
  });

  video.addEventListener('click', () => {
    if (!video.paused) {
      video.pause();
      playBtn.classList.remove('is-hidden');
    }
  });

  video.addEventListener('ended', () => {
    playBtn.classList.remove('is-hidden');
  });
}
