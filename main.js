// Navigation and Burger Menu Handler
document.addEventListener('DOMContentLoaded', () => {
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.querySelector('.nav-overlay');

  // Toggle menu
  if (navBurger) {
    navBurger.addEventListener('click', () => {
      const isOpen = navBurger.getAttribute('aria-expanded') === 'true';
      navBurger.setAttribute('aria-expanded', !isOpen);
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
    });
  }

  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navBurger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navBurger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Custom cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
      cursor.classList.add('active');
      cursorRing.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('active');
      cursorRing.classList.remove('active');
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
  });
});

// Check if page is scrolled
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});
