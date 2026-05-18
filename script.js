/* ================================================================
   DIMARIO BIKE MASTER — script.js
   ================================================================
   СТРУКТУРА ФАЙЛУ:
   1. Кастомний курсор
   2. Анімації появи секцій при скролі (Intersection Observer)
   3. Ефект навігації при скролі
   4. Плавна поява hero-секції при завантаженні
   5. Підсвічування активного пункту меню при скролі
   ================================================================ */


/* ================================================================
   1. КАСТОМНИЙ КУРСОР
   ================================================================
   Якщо хочете вимкнути — просто видаліть або закоментуйте
   цей блок, і поверніть в style.css: body { cursor: auto; }
   ================================================================ */

const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

// Позиція курсора (dot) — слідкує напряму за мишею
let mouseX = 0;
let mouseY = 0;

// Позиція кільця — трохи відстає (інерція)
let ringX = 0;
let ringY = 0;

// Оновлюємо позицію dot синхронно
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Кільце анімується з інерцією через requestAnimationFrame
function animateCursorRing() {
  // Коефіцієнт 0.12 — швидкість слідування (0.05 = повільно, 0.3 = швидко)
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Збільшуємо кільце при наведенні на інтерактивні елементи
const interactiveElements = document.querySelectorAll(
  'a, button, .service-card, .work-card, .contact-method, .price-btn, .step'
);

interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});


/* ================================================================
   2. АНІМАЦІЇ ПОЯВИ ПРИ СКРОЛІ
   ================================================================
   Елементи з класом .fade-up стають видимими (клас .visible)
   коли потрапляють у зону видимості.

   Щоб додати анімацію до будь-якого елемента в HTML:
   просто додайте клас fade-up → <div class="fade-up">...</div>
   ================================================================ */

const fadeUpElements = document.querySelectorAll('.fade-up');

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Затримка для кожного елемента — стаггер-ефект
        // Щоб збільшити затримку — змініть 80 на більше число (мс)
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);

        // Розкоментуйте якщо хочете щоб анімація грала кожен раз при скролі:
        // scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,      // Спрацьовує коли 10% елемента видно
    rootMargin: '0px',   // Відступ від краю вьюпорту
  }
);

fadeUpElements.forEach((el) => scrollObserver.observe(el));


/* ================================================================
   3. ЕФЕКТ НАВІГАЦІЇ ПРИ СКРОЛІ
   ================================================================
   Навігація змінює вигляд при прокрутці сторінки вниз.
   Зараз: підсвічується нижня рамка акцентним кольором.
   ================================================================ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    // При скролі — підсвічуємо рамку жовтим
    navbar.style.borderBottomColor = 'rgba(232, 255, 71, 0.15)';
  } else {
    // На початку — стандартна рамка
    navbar.style.borderBottomColor = 'var(--color-border)';
  }
});

    const video = document.getElementById('myVideo');
    const wrapper = document.getElementById('videoBox');
    const btn = document.getElementById('playBtn');

    // Клик по кнопке
    btn.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
    });

    // Клик по самому видео тоже управляет воспроизведением
    video.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
    });

    // Синхронизация состояния с CSS-классами
    video.addEventListener('play', () => {
      wrapper.classList.add('playing');
      btn.innerHTML = '⏸️';
    });

    video.addEventListener('pause', () => {
      wrapper.classList.remove('playing');
      btn.innerHTML = '▶️';
    });

/* ================================================================
   4. ПЛАВНА ПОЯВА HERO ПРИ ЗАВАНТАЖЕННІ
   ================================================================
   Hero-секція з'являється з fade-ефектом при завантаженні.
   Щоб прибрати — видаліть цей блок.
   ================================================================ */

window.addEventListener('load', () => {
  const heroLeft = document.querySelector('.hero-left');
  if (!heroLeft) return;

  // Початковий стан
  heroLeft.style.opacity    = '0';
  heroLeft.style.transform  = 'translateY(20px)';
  heroLeft.style.transition = 'opacity 0.9s ease, transform 0.9s ease';

  // Через 100мс — показуємо
  setTimeout(() => {
    heroLeft.style.opacity   = '1';
    heroLeft.style.transform = 'translateY(0)';
  }, 100);
});


/* ================================================================
   5. ПІДСВІЧУВАННЯ АКТИВНОГО ПУНКТУ МЕНЮ ПРИ СКРОЛІ
   ================================================================
   Відслідковує яка секція зараз видима і підсвічує
   відповідний пункт у навігації.

   Щоб вимкнути — видаліть цей блок.
   ================================================================ */

const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach((link) => {
          // Знімаємо активний стан з усіх
          link.style.color = '';

          // Встановлюємо на відповідний пункт
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--color-white)';
          }
        });
      }
    });
  },
  {
    threshold: 0.4, // Секція має бути видима на 40%
  }
);

sections.forEach((section) => sectionObserver.observe(section));


/* ================================================================
   ДОДАТКОВІ ФУНКЦІЇ — розкоментуйте за потреби
   ================================================================ */


/*
  ------------------------------------------------------------------
  КОПІЮВАННЯ НОМЕРА ТЕЛЕФОНУ ПРИ КЛІКУ
  ------------------------------------------------------------------
  Додайте id="phone-link" до тегу <a> з телефоном в HTML
  і розкоментуйте цей блок.

const phoneLink = document.getElementById('phone-link');
if (phoneLink) {
  phoneLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('+380631446701').then(() => {
      // Показуємо підтвердження
      const original = phoneLink.querySelector('strong').textContent;
      phoneLink.querySelector('strong').textContent = 'Скопійовано! ✓';
      setTimeout(() => {
        phoneLink.querySelector('strong').textContent = original;
      }, 2000);
    });
  });
}
*/


/*
  ------------------------------------------------------------------
  ЛІЧИЛЬНИК СТАТИСТИКИ (анімація цифр)
  ------------------------------------------------------------------
  Анімує числа у .stat-num від 0 до цільового значення.
  Розкоментуйте якщо хочете цей ефект.

function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach((el) => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) animateCounter(el, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
*/


/*
  ------------------------------------------------------------------
  ПРОСТИЙ ЛАЙТБОКС ДЛЯ ФОТО ПОРТФОЛІО
  ------------------------------------------------------------------
  При кліку на картку роботи — відкриває фото на весь екран.
  Потребує що в картках є <img class="work-img">.

const workCards = document.querySelectorAll('.work-card');
const lightbox  = document.createElement('div');

lightbox.style.cssText = `
  display: none; position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.95); align-items: center;
  justify-content: center; cursor: zoom-out;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = 'max-width: 90vw; max-height: 90vh; object-fit: contain;';
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

workCards.forEach((card) => {
  card.addEventListener('click', () => {
    const img = card.querySelector('.work-img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});
*/
