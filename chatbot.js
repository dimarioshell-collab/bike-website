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
    siteUrl: "https://dimario.online",
  };

  /* ---------- ПРОМПТ / БАЗА ЗНАНЬ (для rule-based бота + майбутнього LLM) ---------- */
  const SYSTEM_PROMPT = `
Ти — офіційний консультант Dimario Bike Master.
Допомагаєш з дистанційною збіркою MTB, Enduro, Downhill, Freeride, Dirt, Fatbike по всій Україні.
Майстер: Дмитро (сертифікований, курси Велопланета та Veliki.ua).
Сайт: https://dimario.online
Послуги: консультація від 300₴, підбір збірки від 800₴, апгрейд від 500₴.
Відповідай українською, просто і дружньо. Не вигадуй ціни та наявність.
Складні питання спрямовуй у Telegram до Дмитра.
`.trim();

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
    "• Підбір збірки — від 800₴ ⭐ найпопулярніше (повна специфікація + список деталей з посиланнями)\n" +
    "• Апгрейд байка — від 500₴ (аудит + план покращень)\n\n" +
    "Авторська збірка, підбір байка під задачу та аудит покупки — вартість залежить від задачі, обговорюємо особисто.\n\n" +
    "Самі запчастини ви купуєте самостійно — я даю лише список і посилання.";

  const PROCESS_TEXT =
    "⚙️ Як проходить робота:\n\n" +
    "01 · Знайомство — пишете в Telegram, розповідаєте стиль їзди, ріст, вагу, бюджет і мрію\n" +
    "02 · Технічне завдання — складаю специфікацію байка простою мовою\n" +
    "03 · Список деталей — посилання на магазини, знаєте точно за що платите\n" +
    "04 · Підтримка — збираєте вдома або в майстерні з моєю онлайн-допомогою";

  const ABOUT_TEXT =
    "🎓 Дмитро — сертифікований веломеханік.\n\n" +
    "Пройшов курси у Велопланеті та Veliki.ua. " +
    "Працює повністю дистанційно по всій Україні: допомагає зібрати ідеальний байк без переплат посередникам.\n\n" +
    "Переваги дистанційної збірки:\n" +
    "• точний підбір під ваш стиль, ріст і бюджет\n" +
    "• прозорий список деталей з посиланнями\n" +
    "• перевірка сумісності рами, вилки, трансмісії та гальм\n" +
    "• підтримка на всіх етапах";

  const WHY_REMOTE_TEXT =
    "💡 Чому вигідно збирати дистанційно?\n\n" +
    "Готовий байк з магазину часто має «середні» комплектуючі і націнку. " +
    "Дистанційна збірка дає точний підбір під вас: ви платите лише за потрібні деталі, бачите ціни відкрито і можете замінити будь-який вузол.\n\n" +
    "Я перевіряю сумісність усього заздалегідь — щоб нічого не довелося переробляти.";

  const CONTACTS_HTML =
    `📍 Зв'язатися напряму:\n\n` +
    `✈️ Telegram: <a href="${CONFIG.telegramLink}" target="_blank" rel="noopener">написати</a>\n` +
    `📞 Телефон: <a href="tel:${CONFIG.phone}">${CONFIG.phoneDisplay}</a> (дзвінок, Viber, WhatsApp)\n` +
    `🌐 Сайт: <a href="${CONFIG.siteUrl}" target="_blank" rel="noopener">${CONFIG.siteUrl.replace("https://", "")}</a>`;

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
      "Привіт! 👋 Я консультант <strong>Dimario Bike Master</strong>.\n\n" +
        "Допоможу з дистанційною збіркою MTB, Downhill і Freeride: розкажу про послуги, ціни, процес і допоможу записатись до майстра Дмитра.",
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
      { label: "💡 Чому дистанційно", onClick: () => botReply(() => WHY_REMOTE_TEXT) },
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
        "Чудово! Заповнимо коротку заявку — я підготую текст, і ви одним кліком надішлете його Дмитру в Telegram.\n\nЯк вас звати?",
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
              addMessage(
                "Який стиль їзди? (наприклад: XC, Trail, Enduro, Downhill, Freeride, місто) або напишіть своїми словами.",
                "bot"
              );
              state.step = "style";
            },
          }))
        );
        state.step = "service";
        break;

      case "service":
        state.booking.service = userText;
        addMessage(
          "Який стиль їзди? (наприклад: XC, Trail, Enduro, Downhill, Freeride, місто) або напишіть своїми словами.",
          "bot"
        );
        state.step = "style";
        break;

      case "style":
        state.booking.style = userText;
        addMessage("Який орієнтовний бюджет на байк / апгрейд? (або «поки не визначився»)", "bot");
        state.step = "budget";
        break;

      case "budget":
        state.booking.budget = userText;
        addMessage("Коли вам зручно зв'язатись — дата й час (або «будь-коли»)?", "bot");
        state.step = "time";
        break;

      case "time":
        state.booking.time = userText;
        addMessage(
          "Останнє: опишіть коротко задачу (модель байка, ріст/вага, що турбує). Якщо нема що додати — напишіть «-».",
          "bot"
        );
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
      `🚵 Стиль їзди: ${escapeHtml(b.style || "—")}\n` +
      `💰 Бюджет: ${escapeHtml(b.budget || "—")}\n` +
      `🕒 Зручний час: ${escapeHtml(b.time || "—")}\n` +
      `💬 Коментар: ${escapeHtml(b.comment || "—")}`;

    showTyping(() => {
      addMessage(summaryHtml, "bot");

      const messageForTelegram =
        `Заявка з сайту Dimario Bike Master\n` +
        `Ім'я: ${b.name || "-"}\n` +
        `Телефон: ${b.phone || "-"}\n` +
        `Послуга: ${b.service || "-"}\n` +
        `Стиль їзди: ${b.style || "-"}\n` +
        `Бюджет: ${b.budget || "-"}\n` +
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

    if (has("ціна", "цін", "вартість", "коштує", "скільки", "прайс")) {
      addMessage(PRICING_TEXT, "bot");
    } else if (has("послуг", "робиш", "умієш", "що ви робите", "чим займа", "що пропонуєте")) {
      addMessage(servicesList(), "bot");
    } else if (has("процес", "як працю", "як це працює", "етапи", "порядок")) {
      addMessage(PROCESS_TEXT, "bot");
    } else if (has("дистанц", "онлайн", "чому так", "навіщо дистанц", "переваг", "вигод")) {
      addMessage(WHY_REMOTE_TEXT, "bot");
    } else if (has("про тебе", "хто ти", "майстер", "дмитро", "досвід", "сертифік", "про майстра")) {
      addMessage(ABOUT_TEXT, "bot");
    } else if (has("контакт", "телефон", "телеграм", "зв'язок", "звязок", "написати", "сайт")) {
      addMessage(CONTACTS_HTML, "bot");
    } else if (has("запис", "замовити", "консультац", "хочу байк", "зібрати", "заявка", "підбір")) {
      startBooking();
      return;
    } else if (has("привіт", "вітаю", "добрий день", "доброго", "здоров", "хай")) {
      addMessage("Привіт! 🚲 Чим можу допомогти — послуги, ціни, процес чи одразу запис?", "bot");
    } else if (has("дяк", "спасибі", "дякую", "красиво")) {
      addMessage("Завжди радий допомогти! Якщо ще щось цікавить — я тут 🙌", "bot");
    } else if (has("mtb", "даунхіл", "downhill", "freeride", "фрірайд", "ендуро", "enduro", "fatbike", "фатбайк")) {
      addMessage(
        "Так, працюю з MTB, Enduro, Downhill, Freeride, Dirt і Fatbike.\n\n" +
          "Розкажіть стиль їзди, бюджет і чи є вже рама — або одразу запишіться на консультацію, і Дмитро підбере варіант під вас.",
        "bot"
      );
    } else {
      addMessage(
        "Поки не зовсім зрозумів 🙂 Оберіть тему нижче або напишіть напряму в " +
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
