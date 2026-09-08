/* ==========================================================================
   DIMARIO BIKE MASTER — chat widget logic
   Проста rule-based бот-консультант для статичного сайту (без бекенду).
   Вміє: відповідати на типові питання (послуги, ціни, процес, контакти,
   про майстра) і провести користувача через міні-форму запису на
   консультацію, після чого сформувати готовий текст для Telegram.

   Як підключити — див. README.md.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- НАЛАШТУВАННЯ: змінюйте під свої контакти ---------- */
  const CONFIG = {
    botName: "DIMARIO BIKE",
    botSubtitle: "Бот-консультант · на зв'язку",
    telegramLink: "https://t.me/+YOs8HjJgr9hkMWZi",
    telegramOrderLink: "https://t.me/+SpzKmo1Z16syNmIy",
    phone: "+380631446701",
    phoneDisplay: "+38 063 144 67 01",
  };

  const SERVICES = [
    { id: "build", label: "Авторська збірка", desc: "Індивідуальний байк з нуля під ваш стиль, вагу і цілі." },
    { id: "consult", label: "Онлайн-консультація · від 300₴", desc: "Діагностика, ремонт, налаштування — по фото і відео." },
    { id: "parts", label: "Підбір компонентів · від 800₴", desc: "Готовий список запчастин з посиланнями під ваш бюджет." },
    { id: "upgrade", label: "Апгрейд байка · від 500₴", desc: "Аудит поточного велосипеда і план покращень." },
    { id: "choose", label: "Байк під задачу", desc: "Підбір оптимального велосипеда під тип їзди й маршрути." },
    { id: "audit", label: "Аудит покупки б/у", desc: "Перевірка стану і ціни велосипеда перед покупкою." },
    { id: "other", label: "Інше / не знаю", desc: "" },
  ];

  const PRICING_TEXT =
    "💳 Вартість послуг:\n\n" +
    "• Консультація — від 300₴ (до 60 хв, Telegram або дзвінок)\n" +
    "• Підбір збірки — від 800₴ ⭐ найпопулярніше (повна специфікація + список деталей)\n" +
    "• Апгрейд байка — від 500₴ (аудит + план покращень)\n\n" +
    "Авторська збірка, підбір байка під задачу та аудит покупки — вартість залежить від задачі, обговорюємо особисто.";

  const PROCESS_TEXT =
    "⚙️ Як проходить робота:\n\n" +
    "01 · Знайомство — пишете в Telegram, розповідаєте про бюджет і мрію\n" +
    "02 · Технічне завдання — складаю специфікацію байка простою мовою\n" +
    "03 · Список деталей — посилання на магазини, знаєте точно за що платите\n" +
    "04 · Підтримка — допомагаю зі збіркою онлайн або в майстерні";

  const ABOUT_TEXT =
    "🎓 Дмитро — сертифікований веломеханік.\n\n" +
    "Пройшов курси у Велопланеті та Veliki.ua — перша в Україні школа веломеханіків. " +
    "Працює повністю дистанційно: допомагає зібрати ідеальний байк з будь-якого куточка України, без переплат посередникам.";

  const CONTACTS_HTML =
    `📍 Зв'язатися напряму:\n\n` +
    `✈️ Telegram: <a href="${CONFIG.telegramLink}" target="_blank" rel="noopener">написати</a>\n` +
    `📞 Телефон: <a href="tel:${CONFIG.phone}">${CONFIG.phoneDisplay}</a> (дзвінок, Viber, WhatsApp)`;

  /* ---------- стан ---------- */
  let state = {
    mode: "menu", // menu | booking
    step: null,
    booking: {},
  };

  let els = {};

  /* ---------- ініціалізація ---------- */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    buildWidget();
    greet();
  }

  function buildWidget() {
    const root = document.createElement("div");
    root.className = "dbm-chat";
    root.id = "dbmChat";
    root.innerHTML = `
      <div class="dbm-chat-window" role="dialog" aria-label="Чат-консультант ${escapeHtml(CONFIG.botName)}">
        <div class="dbm-chat-header">
          <div class="dbm-chat-avatar">🚲</div>
          <div class="dbm-chat-header-text">
            <div class="dbm-chat-title">${escapeHtml(CONFIG.botName)}</div>
            <div class="dbm-chat-status"><span class="dot"></span>${escapeHtml(CONFIG.botSubtitle)}</div>
          </div>
        </div>
        <div class="dbm-chat-body" id="dbmBody"></div>
        <form class="dbm-chat-footer" id="dbmForm">
          <input
            class="dbm-chat-input"
            id="dbmInput"
            type="text"
            placeholder="Напишіть повідомлення…"
            autocomplete="off"
            maxlength="300"
          />
          <button class="dbm-chat-send" type="submit" aria-label="Надіслати">➤</button>
        </form>
        <div class="dbm-chat-hint">Це автоматичний бот-помічник сайту</div>
      </div>
      <button class="dbm-chat-fab" id="dbmFab" aria-label="Відкрити чат">
        <span class="dbm-fab-icon-open">💬</span>
        <span class="dbm-fab-icon-close">✕</span>
        <span class="dbm-fab-dot" id="dbmFabDot"></span>
      </button>
    `;
    document.body.appendChild(root);

    els.root = root;
    els.body = root.querySelector("#dbmBody");
    els.fab = root.querySelector("#dbmFab");
    els.fabDot = root.querySelector("#dbmFabDot");
    els.form = root.querySelector("#dbmForm");
    els.input = root.querySelector("#dbmInput");

    els.fab.addEventListener("click", toggleChat);
    els.form.addEventListener("submit", onSubmit);
  }

  function toggleChat() {
    const opening = !els.root.classList.contains("is-open");
    els.root.classList.toggle("is-open");
    if (opening) {
      els.fabDot.style.display = "none";
      setTimeout(() => els.input.focus(), 150);
    }
  }

  /* ---------- рендер повідомлень ---------- */
  function scrollToBottom() {
    els.body.scrollTop = els.body.scrollHeight;
  }

  function addMessage(text, who) {
    const div = document.createElement("div");
    div.className = "dbm-msg " + who;
    div.innerHTML = text;
    els.body.appendChild(div);
    scrollToBottom();
  }

  function addQuickReplies(options) {
    const wrap = document.createElement("div");
    wrap.className = "dbm-quick";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dbm-quick-btn" + (opt.primary ? " primary" : "");
      btn.textContent = opt.label;
      btn.addEventListener("click", () => {
        wrap.remove();
        addMessage(escapeHtml(opt.label), "user");
        opt.onClick();
      });
      wrap.appendChild(btn);
    });
    els.body.appendChild(wrap);
    scrollToBottom();
  }

  function showTyping(callback, delay) {
    const typing = document.createElement("div");
    typing.className = "dbm-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    els.body.appendChild(typing);
    scrollToBottom();
    setTimeout(() => {
      typing.remove();
      callback();
    }, delay || 500);
  }

  /* ---------- привітання і головне меню ---------- */
  function greet() {
    addMessage(
      "Привіт! 👋 Я бот-консультант <strong>Dimario Bike Master</strong>. " +
        "Підкажу про послуги, ціни та допоможу записатись на консультацію.",
      "bot"
    );
    showMainMenu();
  }

  function showMainMenu() {
    state.mode = "menu";
    addQuickReplies([
      { label: "📋 Послуги", onClick: () => botReply(servicesList) },
      { label: "💳 Ціни", onClick: () => botReply(() => PRICING_TEXT) },
      { label: "⚙️ Як проходить робота", onClick: () => botReply(() => PROCESS_TEXT) },
      { label: "🎓 Про майстра", onClick: () => botReply(() => ABOUT_TEXT) },
      { label: "📍 Контакти", onClick: () => botReply(() => CONTACTS_HTML) },
      { label: "✅ Записатись на консультацію", primary: true, onClick: startBooking },
    ]);
  }

  function servicesList() {
    const lines = SERVICES.filter((s) => s.id !== "other")
      .map((s) => `• <strong>${escapeHtml(s.label)}</strong>${s.desc ? " — " + escapeHtml(s.desc) : ""}`)
      .join("\n");
    return "🔧 Ось що я роблю:\n\n" + lines;
  }

  function botReply(getText) {
    showTyping(() => {
      addMessage(getText(), "bot");
      addQuickReplies([
        { label: "✅ Записатись на консультацію", primary: true, onClick: startBooking },
        { label: "↩️ Назад у меню", onClick: showMainMenu },
      ]);
    });
  }

  /* ---------- сценарій запису на консультацію ---------- */
  function startBooking() {
    state.mode = "booking";
    state.booking = {};
    showTyping(() => {
      addMessage(
        "Чудово! Заповнимо коротку заявку — я підготую текст, і ви одним кліком надішлете його в Telegram.\n\nЯк вас звати?",
        "bot"
      );
      state.step = "name";
    });
  }

  function bookingStep(userText) {
    switch (state.step) {
      case "name":
        state.booking.name = userText;
        addMessage(`Приємно познайомитись, ${escapeHtml(userText)}! 🚴\nЯкий номер телефону для зв'язку?`, "bot");
        state.step = "phone";
        break;

      case "phone":
        state.booking.phone = userText;
        addMessage("Яка послуга цікавить?", "bot");
        addQuickReplies(
          SERVICES.map((s) => ({
            label: s.label,
            onClick: () => {
              state.booking.service = s.label;
              addMessage("Коли вам зручно — дата й час (або «будь-коли»)?", "bot");
              state.step = "time";
            },
          }))
        );
        state.step = "service"; // очікуємо клік по кнопці, текстовий ввід тут ігнорується нижче
        break;

      case "service":
        // Користувач написав текстом замість кліку по кнопці — приймаємо як є
        state.booking.service = userText;
        addMessage("Коли вам зручно — дата й час (або «будь-коли»)?", "bot");
        state.step = "time";
        break;

      case "time":
        state.booking.time = userText;
        addMessage("Останнє: опишіть коротко задачу чи проблему (модель велосипеда, що турбує). Якщо нема що додати — напишіть «-».", "bot");
        state.step = "comment";
        break;

      case "comment":
        state.booking.comment = userText === "-" ? "" : userText;
        finishBooking();
        break;

      default:
        break;
    }
    scrollToBottom();
  }

  function finishBooking() {
    const b = state.booking;
    const summaryHtml =
      "Перевірте заявку:\n\n" +
      `👤 Ім'я: ${escapeHtml(b.name || "—")}\n` +
      `📞 Телефон: ${escapeHtml(b.phone || "—")}\n` +
      `🔧 Послуга: ${escapeHtml(b.service || "—")}\n` +
      `🕒 Зручний час: ${escapeHtml(b.time || "—")}\n` +
      `💬 Коментар: ${escapeHtml(b.comment || "—")}`;

    showTyping(() => {
      addMessage(summaryHtml, "bot");

      const messageForTelegram =
        `Заявка з сайту Dimario Bike Master\n` +
        `Ім'я: ${b.name || "-"}\n` +
        `Телефон: ${b.phone || "-"}\n` +
        `Послуга: ${b.service || "-"}\n` +
        `Зручний час: ${b.time || "-"}\n` +
        `Коментар: ${b.comment || "-"}`;

      addMessage(
        "Все вірно? Тисніть «Відкрити Telegram» — текст заявки вже скопійовано в буфер обміну, просто вставте його (Ctrl+V) і надішліть.",
        "bot"
      );

      addQuickReplies([
        {
          label: "✈️ Відкрити Telegram",
          primary: true,
          onClick: () => {
            copyToClipboard(messageForTelegram);
            window.open(CONFIG.telegramOrderLink, "_blank", "noopener");
            addMessage("Готово! Заявку скопійовано, чекаю на ваше повідомлення в Telegram 🙌", "bot");
            showMainMenu();
          },
        },
        {
          label: "📞 Краще подзвонити",
          onClick: () => {
            window.location.href = "tel:" + CONFIG.phone;
          },
        },
        {
          label: "✏️ Почати заново",
          onClick: startBooking,
        },
      ]);

      state.mode = "menu";
      state.step = null;
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e) {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
  }

  /* ---------- вільний текстовий ввід (простий keyword-пошук) ---------- */
  function onSubmit(e) {
    e.preventDefault();
    const text = els.input.value.trim();
    if (!text) return;
    els.input.value = "";
    addMessage(escapeHtml(text), "user");

    if (state.mode === "booking") {
      showTyping(() => bookingStep(text));
      return;
    }

    showTyping(() => handleFreeText(text));
  }

  function handleFreeText(text) {
    const t = text.toLowerCase();

    const has = (...words) => words.some((w) => t.includes(w));

    if (has("ціна", "цін", "вартість", "коштує", "скільки")) {
      addMessage(PRICING_TEXT, "bot");
    } else if (has("послуг", "робиш", "умієш", "що ви робите", "чим займа")) {
      addMessage(servicesList(), "bot");
    } else if (has("процес", "як працю", "як це працює", "етапи")) {
      addMessage(PROCESS_TEXT, "bot");
    } else if (has("про тебе", "хто ти", "майстер", "дмитро", "досвід", "сертифік")) {
      addMessage(ABOUT_TEXT, "bot");
    } else if (has("контакт", "телефон", "телеграм", "зв'язок", "звязок", "написати")) {
      addMessage(CONTACTS_HTML, "bot");
    } else if (has("запис", "замовити", "консультац", "хочу байк", "зібрати")) {
      startBooking();
      return;
    } else if (has("привіт", "вітаю", "добрий день", "здоров")) {
      addMessage("Привіт! Чим можу допомогти? 🚲", "bot");
    } else if (has("дяк", "спасибі", "красиво")) {
      addMessage("Завжди рада(ий) допомогти! Якщо ще щось цікавить — я тут.", "bot");
    } else {
      addMessage(
        "Хм, поки не зовсім зрозумів(ла) 🙂 Оберіть тему нижче або одразу напишіть у " +
          `<a href="${CONFIG.telegramLink}" target="_blank" rel="noopener">Telegram</a> — там відповість сам Дмитро.`,
        "bot"
      );
    }

    addQuickReplies([
      { label: "✅ Записатись на консультацію", primary: true, onClick: startBooking },
      { label: "↩️ Головне меню", onClick: showMainMenu },
    ]);
  }

  /* ---------- утиліти ---------- */
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
