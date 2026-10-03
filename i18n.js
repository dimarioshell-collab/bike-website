// Многоязычность для сайта
const translations = {
  ru: {
    // НАВІГАЦІЯ
    'nav.services': 'Услуги',
    'nav.about': 'Обо мне',
    'nav.works': 'Работы',
    'nav.process': 'Процесс',
    'nav.pricing': 'Цены',
    'nav.faq': 'FAQ',
    'nav.order': 'Заказать →',
    
    // HERO
    'hero.tag': 'Авторская сборка велосипедов',
    'hero.title.1': 'DIMARIO',
    'hero.title.accent': 'BIKE',
    'hero.title.outline': 'MASTER',
    'hero.desc': 'Собираю велосипеды <strong>под вас</strong> — под ваш стиль езды, телосложение, бюджет и мечту. Онлайн-консультация + готовый список запчастей. Никаких лишних деталей, только то, что действительно нужно.',
    'hero.desc.extra': 'Почему дистанционно? Вы получаете экспертный подбор компонентов без поездок в мастерскую, экономите время и деньги, а я контролирую совместимость рамы, вилки, трансмиссии и тормозов под ваш рост, вес и маршруты — от XC-тропок до downhill-трасс по всей Украине.',
    'hero.btn.telegram': 'Написать в Telegram →',
    'hero.btn.works': 'Посмотреть работы',
    'hero.stat.bikes': 'Собранных байков',
    'hero.stat.format': 'Онлайн-формат',
    'hero.stat.location': 'По всей Украине',
    
    // MARQUEE
    'marquee.item.1': 'МТБ сборка',
    'marquee.item.2': 'Гравель',
    'marquee.item.3': 'Шоссейный',
    'marquee.item.4': 'Городской',
    'marquee.item.5': 'Онлайн-консультация',
    'marquee.item.6': 'Подбор компонентов',
    'marquee.item.7': 'Сертифицированный механик',
    'marquee.item.8': 'Велопланета',
    
    // УСЛУГИ
    'services.title': 'ЧТО Я ДЕЛАЮ',
    'services.desc': 'Полный спектр услуг — от идеи к готовому байку в ваших руках',
    'services.card.1.title': 'Авторская сборка',
    'services.card.1.desc': 'Составляю индивидуальный байк с нуля. Подбираю раму, вилку, трансмиссию, тормоза — каждую деталь отдельно, под ваш стиль, вес, геометрию и цели.',
    'services.card.2.title': 'Онлайн-консультация',
    'services.card.2.desc': 'Диагностика, ремонт, настройка и советы — всё онлайн по фото и видео. Для новичков, продвинутых и опытных райдеров.',
    'services.card.3.title': 'Подбор компонентов',
    'services.card.3.desc': 'Готовый список запчастей под ваш бюджет со ссылками на магазины. Вы просто заказываете — а я уже всё продумал за вас.',
    'services.card.4.title': 'Апгрейд байка',
    'services.card.4.desc': 'Хотите улучшить текущий велосипед? Подскажу, что стоит менять, а что нет. Определю слабые места и порекомендую оптимальные замены.',
    'services.card.5.title': 'Байк под задачу',
    'services.card.5.desc': 'МТБ для эндуро, гравель для путешествий, городской для ежедневных поездок — подберу оптимальный байк под конкретный тип езды и маршруты.',
    'services.card.6.title': 'Аудит покупки',
    'services.card.6.desc': 'Хотите купить б/у велосипед? Отправьте фото и описание — проанализирую состояние, цену, потенциальные проблемы. Защищу от неудачной покупки.',
    
    // КОНСУЛЬТАЦИЯ
    'consult.title': 'Что входит в услугу',
    'consult.intro': 'Помогаю велосипедистам любого уровня — от первого байка до серьёзных апгрейдов. Всё онлайн: по фото, видео и описанию проблемы.',
    'consult.level.1': '01 — Новички',
    'consult.level.2': '02 — Продвинутые',
    'consult.level.3': '03 — Опытные',
    'consult.all': '<strong>Полезно всем:</strong> консультации по выбору велосипеда и апгрейдам, сезонной подготовке, безопасности и экипировке. Отправляйте фото или короткое видео — разберёмся и дадим чёткий план действий.',
    
    // ОБОЩЕЙА ИНФОРМАЦИЯ
    'section.services': 'УСЛУГИ',
    'section.about': 'ОБО МНЕ',
    'section.works': 'ПОРТФОЛИО',
    'section.process': 'КАК ЭТО РАБОТАЕТ',
    'section.pricing': 'ЦЕНЫ',
    'section.testimonials': 'ОТЗЫВЫ',
    
    // ОБО МНЕ
    'about.title': 'ДМИТРО,',
    'about.text.1': 'Я увлекаюсь велосипедами не как хобби — а как настоящее ремесло. Каждый байк, который я собираю, это не просто набор деталей, а <strong>"Велосипед мечты" под конкретного человека</strong>.',
    'about.text.2': 'Прошёл <strong>курсы веломеханика в Велопланете, а также в Veliki.ua</strong> — одной из лучших веломастерских Украины. Знаю, как всё устроено изнутри: от геометрии рамы до настройки подвески.',
    'about.text.3': 'Практикую <strong>дистанционную работу</strong> — даже из любого уголка Украины я помогаю вам собрать идеальный байк без лишних расходов на посредников.',
    'about.cert': 'Сертифицированный веломеханик',
    
    // РОБОТИ
    'works.desc': 'Реальные проекты — от бюджетных сборок к премиум-билдам',
    'works.1.title': 'МТБ downhill',
    'works.1.spec': 'Specialized Big Hit 3 · SRAM X4 · 27.5"',
    'works.1.desc': 'Полная downhill-сборка: рама Big Hit 3, надёжная трансмиссия SRAM X4, колёса 27.5" под агрессивные трассы. Подобрано под вес райдера и стиль езды — от парка к природным спускам.',
    'works.2.title': 'City Adventure',
    'works.2.spec': 'SRAM X4 · 26"',
    'works.2.desc': 'Универсальная сборка для города и dirt-прыжков: лёгкая рама Magellan, трансмиссия SRAM X4, колёса 26". Удобная геометрия для ежедневных поездок и трюков на памп-треке.',
    'works.3.title': 'МТБ Freeride сборка',
    'works.3.spec': 'SRAM X4 · Marzocchi Sport RCV Z1 · 26"',
    'works.3.desc': 'Freeride-билд на основе Kona: вилка Marzocchi Sport RCV Z1 с хорошим ходом, трансмиссия SRAM X4, колёса 26". Рассчитано на прыжки, дропы и технические спуски без лишнего веса.',
    'works.4.title': 'Fatbike Hardtail',
    'works.4.spec': 'Acera 8sp · 26"',
    'works.4.desc': 'Fatbike hardtail с широкими покрышками для песка, снега и мягкого грунта. Трансмиссия Acera 8sp, надёжная рама — идеальный вариант для зимних и прибрежных маршрутов.',
    'works.all': 'Смотреть все работы в Telegram →',
    'works.constructor': 'Собрать свой байк →',
    'works.cta.title': 'Конструктор байка',
    'works.cta.desc': 'Соберите велосипед под свой бюджет самостоятельно — узел за узлом, с расчётом в реальном времени.',
    
    // ПРОЦЕСС
    'process.desc': 'Прозрачно и понятно от первого слова к готовому байку',
    'process.step.1': 'Знакомство',
    'process.step.1.desc': 'Пишете мне в Telegram или звоните. Рассказываете — где ездите, какой опыт, бюджет, мечта. Без лишних вопросов.',
    'process.step.2': 'Техническое задание',
    'process.step.2.desc': 'Составляю спецификацию байка — рама, компоненты, размеры. Объясняю каждый выбор простым языком.',
    'process.step.3': 'Список деталей',
    'process.step.3.desc': 'Получаете полный список со ссылками на магазины. Знаете точно, сколько и за что платите.',
    'process.step.4': 'Поддержка',
    'process.step.4.desc': 'После получения деталей — собирайте с моей поддержкой онлайн или несите в мастерскую с готовым заданием.',
    
    // ЦЕНЫ
    'pricing.desc': 'Честные цены без скрытых доплат',
    'pricing.plan.1': 'Консультация',
    'pricing.plan.1.desc': 'Для тех, кто хочет разобраться сам и нуждается в правильном векторе',
    'pricing.plan.1.amount': 'от 300₴',
    'pricing.plan.1.period': 'разовая консультация',
    'pricing.plan.1.feature.1': 'До 60 минут общения',
    'pricing.plan.1.feature.2': 'Ответы на все вопросы',
    'pricing.plan.1.feature.3': 'Базовые рекомендации',
    'pricing.plan.1.feature.4': 'Telegram или звонок',
    
    'pricing.plan.2': 'Подбор сборки',
    'pricing.plan.2.label': '⭐ Самое популярное',
    'pricing.plan.2.desc': 'Полная разработка спецификации вашего будущего байка',
    'pricing.plan.2.amount': 'от 800₴',
    'pricing.plan.2.period': 'полная сборка под ключ',
    'pricing.plan.2.feature.1': 'Анализ ваших потребностей',
    'pricing.plan.2.feature.2': 'Подбор всех компонентов',
    'pricing.plan.2.feature.3': 'Список со ссылками',
    'pricing.plan.2.feature.4': 'Обоснование каждого выбора',
    'pricing.plan.2.feature.5': 'Поддержка после получения',
    
    'pricing.plan.3': 'Апгрейд',
    'pricing.plan.3.desc': 'Аудит текущего байка и план улучшений',
    'pricing.plan.3.amount': 'от 500₴',
    'pricing.plan.3.period': 'анализ + рекомендации',
    'pricing.plan.3.feature.1': 'Анализ текущего байка',
    'pricing.plan.3.feature.2': 'Слабые места и приоритеты',
    'pricing.plan.3.feature.3': 'Список замен с бюджетом',
    'pricing.plan.3.feature.4': 'Объяснение что и зачем',
    
    // ОТЗЫВЫ
    'testimonials.desc': 'Реальные люди, реальные байки',
    'testimonials.1.text': 'Увидел велосипед вживую — всё очень нравится, чудесная работа!',
    'testimonials.1.author': 'Николай',
    'testimonials.2.text': 'По совету Дмитра собрал ещё более крутой байк: шатун 105 на 175 мм, оси и звёзды 52/36 под 11 скоростей. Даже не пришлось регулировать — потянул тросик, и всё заработало как часы. Ход теперь плавный, будто по маслу, а на большой звезде стало заметно легче крутить педали. Ты настоящий спец 💪🏻',
    'testimonials.2.author': 'Саша',
    'testimonials.3.text': 'Обратился за апгрейдом старого Cross-Country. Дмитро честно сказал что стоит менять, а что нет. Без лишних трат байк стал совсем другой машиной.',
    'testimonials.3.author': 'Сергей М.',
  },
  
  en: {
    // NAVIGATION
    'nav.services': 'Services',
    'nav.about': 'About me',
    'nav.works': 'Works',
    'nav.process': 'Process',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.order': 'Order →',
    
    // HERO
    'hero.tag': 'Custom bike assembly',
    'hero.title.1': 'DIMARIO',
    'hero.title.accent': 'BIKE',
    'hero.title.outline': 'MASTER',
    'hero.desc': 'I build bikes <strong>for you</strong> — for your riding style, body type, budget and dreams. Online consultation + ready parts list. No unnecessary details, only what you really need.',
    'hero.desc.extra': 'Why remote? You get expert component selection without trips to the workshop, save time and money, and I control the compatibility of frame, fork, drivetrain and brakes for your height, weight and routes — from XC trails to downhill runs across Ukraine.',
    'hero.btn.telegram': 'Write to Telegram →',
    'hero.btn.works': 'See my works',
    'hero.stat.bikes': 'Built bikes',
    'hero.stat.format': 'Online format',
    'hero.stat.location': 'All over Ukraine',
    
    // MARQUEE
    'marquee.item.1': 'MTB assembly',
    'marquee.item.2': 'Gravel',
    'marquee.item.3': 'Road bike',
    'marquee.item.4': 'City bike',
    'marquee.item.5': 'Online consultation',
    'marquee.item.6': 'Component selection',
    'marquee.item.7': 'Certified mechanic',
    'marquee.item.8': 'BikeloPlanet',
    
    // SERVICES
    'services.title': 'WHAT I DO',
    'services.desc': 'Full range of services — from idea to ready bike in your hands',
    'services.card.1.title': 'Custom Assembly',
    'services.card.1.desc': 'I build individual bikes from scratch. I select frame, fork, drivetrain, brakes — each part separately, for your style, weight, geometry and goals.',
    'services.card.2.title': 'Online Consultation',
    'services.card.2.desc': 'Diagnostics, repair, setup and advice — all online via photo and video. For beginners, intermediate and experienced riders.',
    'services.card.3.title': 'Component Selection',
    'services.card.3.desc': 'Ready parts list for your budget with links to shops. You just order — I\'ve already thought it all through for you.',
    'services.card.4.title': 'Bike Upgrade',
    'services.card.4.desc': 'Want to improve your current bike? I\'ll advise what\'s worth changing and what\'s not. I\'ll identify weak spots and recommend optimal upgrades.',
    'services.card.5.title': 'Bike for Purpose',
    'services.card.5.desc': 'MTB for enduro, gravel for touring, city for daily rides — I\'ll select the optimal bike for your specific riding type and routes.',
    'services.card.6.title': 'Purchase Audit',
    'services.card.6.desc': 'Want to buy a used bike? Send photos and description — I\'ll analyze condition, price, potential issues. Protect you from a bad purchase.',
    
    // CONSULTATION
    'consult.title': 'What\'s Included',
    'consult.intro': 'I help cyclists at any level — from first bike to serious upgrades. Everything online: via photo, video and problem description.',
    'consult.level.1': '01 — Beginners',
    'consult.level.2': '02 — Intermediate',
    'consult.level.3': '03 — Advanced',
    'consult.all': '<strong>Useful for everyone:</strong> advice on bike selection and upgrades, seasonal prep, safety and gear. Send photos or a short video — we\'ll figure it out and give a clear action plan.',
    
    // SECTION HEADERS
    'section.services': 'SERVICES',
    'section.about': 'ABOUT ME',
    'section.works': 'PORTFOLIO',
    'section.process': 'HOW IT WORKS',
    'section.pricing': 'PRICING',
    'section.testimonials': 'TESTIMONIALS',
    
    // ABOUT
    'about.title': 'DMITRO,',
    'about.text.1': 'I\'m passionate about bikes not as a hobby — but as a real craft. Every bike I build is not just parts, but a <strong>"Dream Bike" for a specific person</strong>.',
    'about.text.2': 'I took <strong>bike mechanic courses at BikuloPlanet and Veliki.ua</strong> — one of Ukraine\'s best bike shops. I know how everything works inside: from frame geometry to suspension setup.',
    'about.text.3': 'I practice <strong>remote work</strong> — from anywhere in Ukraine, I help you build the perfect bike without unnecessary middleman costs.',
    'about.cert': 'Certified bike mechanic',
    
    // WORKS
    'works.desc': 'Real projects — from budget builds to premium setups',
    'works.1.title': 'MTB downhill',
    'works.1.spec': 'Specialized Big Hit 3 · SRAM X4 · 27.5"',
    'works.1.desc': 'Complete downhill build: Big Hit 3 frame, reliable SRAM X4 drivetrain, 27.5" wheels for aggressive trails. Built for rider weight and style — from bike park to natural descents.',
    'works.2.title': 'City Adventure',
    'works.2.spec': 'SRAM X4 · 26"',
    'works.2.desc': 'Versatile city and dirt jump setup: light Magellan frame, SRAM X4 drivetrain, 26" wheels. Comfortable geometry for daily commuting and pump track tricks.',
    'works.3.title': 'MTB Freeride Build',
    'works.3.spec': 'SRAM X4 · Marzocchi Sport RCV Z1 · 26"',
    'works.3.desc': 'Freeride build based on Kona: Marzocchi Sport RCV Z1 fork with good travel, SRAM X4 drivetrain, 26" wheels. Built for jumps, drops and technical descents without extra weight.',
    'works.4.title': 'Fatbike Hardtail',
    'works.4.spec': 'Acera 8sp · 26"',
    'works.4.desc': 'Fatbike hardtail with wide tires for sand, snow and soft terrain. Acera 8sp drivetrain, reliable frame — perfect for winter and beach rides.',
    'works.all': 'See all works in Telegram →',
    'works.constructor': 'Build your own bike →',
    'works.cta.title': 'Bike Constructor',
    'works.cta.desc': 'Build your bike to your budget yourself — component by component, with real-time costing.',
    
    // PROCESS
    'process.desc': 'Transparent and clear from first word to ready bike',
    'process.step.1': 'Meet',
    'process.step.1.desc': 'Write to me in Telegram or call. Tell me — where you ride, your experience, budget, dream. No unnecessary questions.',
    'process.step.2': 'Specification',
    'process.step.2.desc': 'I create your bike spec — frame, components, sizes. I explain each choice in simple terms.',
    'process.step.3': 'Parts List',
    'process.step.3.desc': 'You get complete list with shop links. You know exactly what and how much you\'re paying.',
    'process.step.4': 'Support',
    'process.step.4.desc': 'After parts arrive — build with my online support or take to your workshop with ready specs.',
    
    // PRICING
    'pricing.desc': 'Honest prices with no hidden fees',
    'pricing.plan.1': 'Consultation',
    'pricing.plan.1.desc': 'For those who want to figure it out and need guidance',
    'pricing.plan.1.amount': 'from 300₴',
    'pricing.plan.1.period': 'one-time consultation',
    'pricing.plan.1.feature.1': 'Up to 60 minutes',
    'pricing.plan.1.feature.2': 'Answer all questions',
    'pricing.plan.1.feature.3': 'Basic recommendations',
    'pricing.plan.1.feature.4': 'Telegram or call',
    
    'pricing.plan.2': 'Build Selection',
    'pricing.plan.2.label': '⭐ Most popular',
    'pricing.plan.2.desc': 'Complete specification for your future bike',
    'pricing.plan.2.amount': 'from 800₴',
    'pricing.plan.2.period': 'full build turnkey',
    'pricing.plan.2.feature.1': 'Analyze your needs',
    'pricing.plan.2.feature.2': 'Select all components',
    'pricing.plan.2.feature.3': 'List with links',
    'pricing.plan.2.feature.4': 'Explain each choice',
    'pricing.plan.2.feature.5': 'Post-delivery support',
    
    'pricing.plan.3': 'Upgrade',
    'pricing.plan.3.desc': 'Audit current bike and improvement plan',
    'pricing.plan.3.amount': 'from 500₴',
    'pricing.plan.3.period': 'analysis + recommendations',
    'pricing.plan.3.feature.1': 'Analyze current bike',
    'pricing.plan.3.feature.2': 'Weak spots and priorities',
    'pricing.plan.3.feature.3': 'Upgrade list with budget',
    'pricing.plan.3.feature.4': 'Explain what and why',
    
    // TESTIMONIALS
    'testimonials.desc': 'Real people, real bikes',
    'testimonials.1.text': 'Saw the bike in person — everything is awesome, great work!',
    'testimonials.1.author': 'Nikolai',
    'testimonials.2.text': 'On Dmitro\'s advice, I built an even cooler bike: 105 crank at 175mm, 52/36 chainrings for 11 speed. Didn\'t even need adjustments — just pulled the cable and it works like clockwork. Smooth action, like silk, and pedaling on the big ring got noticeably easier. You\'re a true pro 💪🏻',
    'testimonials.2.author': 'Sasha',
    'testimonials.3.text': 'Asked for upgrade advice on my old Cross-Country. Dmitro was honest about what\'s worth changing and what\'s not. Without unnecessary spending, the bike became a whole different machine.',
    'testimonials.3.author': 'Sergey M.',
  },
  
  uk: {
    // НАВІГАЦІЯ
    'nav.services': 'Послуги',
    'nav.about': 'Про мене',
    'nav.works': 'Роботи',
    'nav.process': 'Процес',
    'nav.pricing': 'Ціни',
    'nav.faq': 'FAQ',
    'nav.order': 'Замовити →',
    
    // HERO
    'hero.tag': 'Авторська збірка велосипедів',
    'hero.title.1': 'DIMARIO',
    'hero.title.accent': 'BIKE',
    'hero.title.outline': 'MASTER',
    'hero.desc': 'Збираю велосипеди <strong>під вас</strong> — під ваш стиль їзди, тіло, бюджет і мрію. Онлайн-консультація + готовий список запчастин. Жодної зайвої деталі, тільки те, що справді потрібно.',
    'hero.desc.extra': 'Чому дистанційно? Ви отримуєте експертний підбір компонентів без поїздок у майстерню, економите час і гроші, а я контролюю сумісність рами, вилки, трансмісії та гальм під ваш ріст, вагу й маршрути — від XC-стежок до downhill-трас по всій Україні.',
    'hero.btn.telegram': 'Написати в Telegram →',
    'hero.btn.works': 'Дивитись роботи',
    'hero.stat.bikes': 'Зібраних байків',
    'hero.stat.format': 'Онлайн-формат',
    'hero.stat.location': 'По всій Україні',
    
    // MARQUEE
    'marquee.item.1': 'МТБ збірка',
    'marquee.item.2': 'Гравель',
    'marquee.item.3': 'Шосейний',
    'marquee.item.4': 'Міський',
    'marquee.item.5': 'Онлайн-консультація',
    'marquee.item.6': 'Підбір компонентів',
    'marquee.item.7': 'Сертифікований механік',
    'marquee.item.8': 'Велопланета',
    
    // ПОСЛУГИ
    'services.title': 'ЩО Я РОБЛЮ',
    'services.desc': 'Повний спектр послуг — від ідеї до готового байка у вас в руках',
    'services.card.1.title': 'Авторська збірка',
    'services.card.1.desc': 'Складаю індивідуальний байк з нуля. Підбираю раму, вилку, трансмісію, гальма — кожну деталь окремо, під ваш стиль, вагу, геометрію та цілі.',
    'services.card.2.title': 'Онлайн-консультація',
    'services.card.2.desc': 'Діагностика, ремонт, налаштування та поради — усе онлайн за фото і відео. Для новачків, продовжуючих і досвідчених райдерів.',
    'services.card.3.title': 'Підбір компонентів',
    'services.card.3.desc': 'Готовий список запчастин під ваш бюджет з посиланнями на магазини. Ви просто замовляєте — а я вже все продумав за вас.',
    'services.card.4.title': 'Апгрейд байка',
    'services.card.4.desc': 'Хочете покращити поточний велосипед? Підкажу, що варто міняти, а що ні. Визначу слабкі місця та порекомендую оптимальні заміни.',
    'services.card.5.title': 'Байк під задачу',
    'services.card.5.desc': 'МТБ для ендуро, гравель для подорожей, міський для щоденних поїздок — підберу оптимальний байк під конкретний тип їзди та маршрути.',
    'services.card.6.title': 'Аудит покупки',
    'services.card.6.desc': 'Хочете купити б/у велосипед? Надішліть фото та опис — проаналізую стан, ціну, потенційні проблеми. Захищу від невдалої покупки.',
    
    // КОНСУЛЬТАЦІЯ
    'consult.title': 'Що входить у послугу',
    'consult.intro': 'Допомагаю велосипедистам будь-якого рівня — від першого байка до серйозних апгрейдів. Усе онлайн: по фото, відео та опису проблеми.',
    'consult.level.1': '01 — Початківці',
    'consult.level.2': '02 — Продовжуючі',
    'consult.level.3': '03 — Досвідчені',
    'consult.all': '<strong>Корисно всім:</strong> консультації з вибору велосипеда та апгрейдів, сезонної підготовки, безпеки та екіпіровки. Надсилайте фото або коротке відео — розберемося і дамо чіткий план дій.',
    
    // HEADERS
    'section.services': 'ПОСЛУГИ',
    'section.about': 'ПРО МЕНЕ',
    'section.works': 'ПОРТФОЛІО',
    'section.process': 'ЯК ЦЕ ПРАЦЮЄ',
    'section.pricing': 'ЦІНИ',
    'section.testimonials': 'ВІДГУКИ',
    
    // ПРО МЕНЕ
    'about.title': 'ДМИТРО,',
    'about.text.1': 'Я захоплююся велосипедами не як хобі — а як справжнім ремеслом. Кожен байк, який я збираю, це не просто набір деталей, а <strong>"Велосипед мрії" під конкретну людину</strong>.',
    'about.text.2': 'Пройшов <strong>курси веломеханіка у Велопланеті, а також у Veliki.ua</strong> — одній з найкращих веломайстерень України. Знаю, як все влаштовано зсередини: від геометрії рами до налаштування підвіски.',
    'about.text.3': 'Практикую <strong>дистанційну роботу</strong> — навіть з будь-якого куточка України, я допомагаю вам зібрати ідеальний байк без зайвих витрат на посередників.',
    'about.cert': 'Сертифікований веломеханік',
    
    // РОБОТИ
    'works.desc': 'Реальні проекти — від бюджетних збірок до преміум-білдів',
    'works.1.title': 'МТБ downhill',
    'works.1.spec': 'Specialized Big Hit 3 · SRAM X4 · 27.5"',
    'works.1.desc': 'Повна downhill-збірка: рама Big Hit 3, надійна трансмісія SRAM X4, колеса 27.5" під агресивні траси. Підібрано під вагу райдера та стиль їзди — від парку до природних спусків.',
    'works.2.title': 'City Adventure',
    'works.2.spec': 'SRAM X4 · 26"',
    'works.2.desc': 'Універсальна збірка для міста та dirt-стрибків: легка рама Magellan, трансмісія SRAM X4, колеса 26". Комфортна геометрія для щоденних поїздок і трюків на памп-треку.',
    'works.3.title': 'МТБ Freeride збірка',
    'works.3.spec': 'SRAM X4 · Marzocchi Sport RCV Z1 · 26"',
    'works.3.desc': 'Freeride-білд на базі Kona: вилка Marzocchi Sport RCV Z1 з хорошим ходом, трансмісія SRAM X4, колеса 26". Розраховано на стрибки, дропи та технічні спуски без зайвої ваги.',
    'works.4.title': 'Fatbike Hardtail',
    'works.4.spec': 'Acera 8sp · 26"',
    'works.4.desc': 'Fatbike hardtail з широкими покришками для піску, снігу та м\'якого ґрунту. Трансмісія Acera 8sp, надійна рама — ідеальний варіант для зимових і прибережних маршрутів.',
    'works.all': 'Дивитись усі роботи в Telegram →',
    'works.constructor': 'Зібрати свій байк →',
    'works.cta.title': 'Конструктор байка',
    'works.cta.desc': 'Зберіть велосипед під свій бюджет самостійно — вузол за вузлом, з кошторисом у реальному часі.',
    
    // ПРОЦЕС
    'process.desc': 'Прозоро і зрозуміло від першого слова до готового байка',
    'process.step.1': 'Знайомство',
    'process.step.1.desc': 'Пишете мені в Telegram або дзвоните. Розповідаєте — де їздите, який досвід, бюджет, мрія. Без зайвих питань.',
    'process.step.2': 'Технічне завдання',
    'process.step.2.desc': 'Складаю специфікацію байка — рама, компоненти, розміри. Пояснюю кожен вибір простою мовою.',
    'process.step.3': 'Список деталей',
    'process.step.3.desc': 'Отримуєте повний список із посиланнями на магазини. Знаєте точно, скільки і за що платите.',
    'process.step.4': 'Підтримка',
    'process.step.4.desc': 'Після отримання деталей — збирайте з моєю підтримкою онлайн або несіть до майстерні з готовим завданням.',
    
    // ЦІНИ
    'pricing.desc': 'Чесні ціни без прихованих доплат',
    'pricing.plan.1': 'Консультація',
    'pricing.plan.1.desc': 'Для тих, хто хоче розібратися сам і потребує правильного вектора',
    'pricing.plan.1.amount': 'від 300₴',
    'pricing.plan.1.period': 'разова консультація',
    'pricing.plan.1.feature.1': 'До 60 хвилин спілкування',
    'pricing.plan.1.feature.2': 'Відповіді на всі питання',
    'pricing.plan.1.feature.3': 'Базові рекомендації',
    'pricing.plan.1.feature.4': 'Telegram або дзвінок',
    
    'pricing.plan.2': 'Підбір збірки',
    'pricing.plan.2.label': '⭐ Найпопулярніше',
    'pricing.plan.2.desc': 'Повна розробка специфікації вашого майбутнього байка',
    'pricing.plan.2.amount': 'від 800₴',
    'pricing.plan.2.period': 'повна збірка під ключ',
    'pricing.plan.2.feature.1': 'Аналіз ваших потреб',
    'pricing.plan.2.feature.2': 'Підбір усіх компонентів',
    'pricing.plan.2.feature.3': 'Список із посиланнями',
    'pricing.plan.2.feature.4': 'Обґрунтування кожного вибору',
    'pricing.plan.2.feature.5': 'Підтримка після отримання',
    
    'pricing.plan.3': 'Апгрейд',
    'pricing.plan.3.desc': 'Аудит поточного байка та план покращень',
    'pricing.plan.3.amount': 'від 500₴',
    'pricing.plan.3.period': 'аналіз + рекомендації',
    'pricing.plan.3.feature.1': 'Аналіз поточного байка',
    'pricing.plan.3.feature.2': 'Слабкі місця та пріоритети',
    'pricing.plan.3.feature.3': 'Список замін з бюджетом',
    'pricing.plan.3.feature.4': 'Пояснення що і навіщо',
    
    // ВІДГУКИ
    'testimonials.desc': 'Реальні люди, реальні байки',
    'testimonials.1.text': 'Побачив велосипед наживо — все дуже подобається, чудова робота!',
    'testimonials.1.author': 'Микола',
    'testimonials.2.text': 'За порадою Дмитра зібрав ще крутіший байк. Знайшов в Одесі шатун 105 на 175 мм, зібрав вісь і зірки 52/36 під 11 швидкостей. Навіть не довелося регулювати — потягнув тросик, і все запрацювало як годинник. Хід тепер плавний, наче по маслу, а на великій зірці стало помітно легше крутити педалі. Ти справжній спец 💪🏻',
    'testimonials.2.author': 'Саша',
    'testimonials.3.text': 'Звернувся за апгрейдом старого Cross-Country. Дмитро чесно сказав що варто міняти, а що ні. Без зайвих витрат байк став іншою машиною.',
    'testimonials.3.author': 'Сергій М.',
  }
};

// Получить текущий язык из localStorage или из браузера
function getCurrentLanguage() {
  let saved = localStorage.getItem('lang');
  if (saved && Object.keys(translations).includes(saved)) return saved;
  
  // Использовать русский по умолчанию
  return 'ru';
}

// Установить язык
function setLanguage(lang) {
  if (!Object.keys(translations).includes(lang)) lang = 'ru';
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  updatePageContent(lang);
  updateLanguageSwitcher(lang);
}

// Переведѐти содержимое страницы
function updatePageContent(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const text = translations[lang][key];
    
    if (text) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else if (element.innerHTML.includes('<')) {
        // Если есть HTML, используем innerHTML
        element.innerHTML = text;
      } else {
        element.textContent = text;
      }
    }
  });
}

// Обновить переключатель языков
function updateLanguageSwitcher(lang) {
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  setLanguage(currentLang);
  
  // Обработчики для кнопок переключателя языка
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
});
