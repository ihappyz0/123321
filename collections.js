/* GymMind — Подборки (коллекции) для каждого модуля.
   В каждом модуле не одна подборка, а множество: тренировки, питание, добавки,
   восстановление, видео, прогресс, достижения. Каждая подборка — это набор
   карточек с заголовком, описанием и тегами. Модуль сам встраивает блок
   «Подборки» в нужную секцию и рисует их в стиле Bento Grid. */
(function () {
  'use strict';
  if (window.__gmCollections) return;
  window.__gmCollections = true;

  /* ==================== ДАННЫЕ ПОДБОРОК ==================== */
  var COLLECTIONS = {
    /* ---------- ОБЗОР ---------- */
    overview: [
      {
        id: 'ov-start', ico: '🚀', title: 'Быстрый старт', tag: 'новичкам', color: 'purple',
        desc: 'Три шага, чтобы приложение заработало на тебя с первого дня.',
        items: [
          { n: 'Заполни профиль', d: 'Вес, рост, возраст, цель — от них считаются калории и вода.', tag: '5 мин' },
          { n: 'Запиши первую тренировку', d: 'Даже 3 упражнения — уже данные для карты восстановления.', tag: '10 мин' },
          { n: 'Добавь приём пищи', d: 'Кнопка «Что ты съел?» в разделе Питание.', tag: '1 мин' }
        ]
      },
      {
        id: 'ov-habits', ico: '🔁', title: 'Полезные привычки', tag: 'каждый день', color: 'teal',
        desc: 'Маленькие действия, которые дают 80% результата.',
        items: [
          { n: 'Стакан воды утром', d: '250 мл сразу после пробуждения — запускает метаболизм.', tag: 'вода' },
          { n: 'Белок в каждом приёме', d: '30–40 г: яйца, творог, курица, рыба.', tag: 'питание' },
          { n: '10 000 шагов', d: 'Ходьба — самый недооценённый инструмент жиросжигания.', tag: 'кардио' },
          { n: 'Сон 7–9 часов', d: 'Без сна не растут мышцы и не уходит жир.', tag: 'восстановление' }
        ]
      },
      {
        id: 'ov-mistakes', ico: '⚠️', title: 'Топ-5 ошибок новичка', tag: 'важно', color: 'amber',
        desc: 'На чём чаще всего спотыкаются в первые 3 месяца.',
        items: [
          { n: 'Слишком много упражнений', d: '5–6 на тренировку достаточно. Больше — не лучше.', tag: 'объём' },
          { n: 'Нет прогрессии', d: 'Каждую неделю добавляй вес или повтор — иначе застоя.', tag: 'прогресс' },
          { n: 'Игнор разминки', d: '5–10 минут суставной гимнастики снижают риск травм.', tag: 'техника' },
          { n: 'Скачки веса', d: 'Взвешивайся раз в неделю утром натощак.', tag: 'контроль' },
          { n: 'Голодные диеты', d: 'Дефицит больше 25% — потеря мышц и срывы.', tag: 'питание' }
        ]
      }
    ],

    /* ---------- ПИТАНИЕ ---------- */
    food: [
      {
        id: 'fd-protein', ico: '🥩', title: 'Источники белка', tag: 'мышцы', color: 'green',
        desc: 'Продукты с высоким содержанием белка — база любого режима.',
        items: [
          { n: 'Куриная грудка', d: '23 г белка / 100 г · 113 ккал', tag: 'мясо' },
          { n: 'Творог 5%', d: '17 г белка / 100 г · 121 ккал', tag: 'молочка' },
          { n: 'Яйца', d: '13 г белка / 100 г · 155 ккал', tag: 'яйца' },
          { n: 'Тунец в с/с', d: '22 г белка / 100 г · 96 ккал', tag: 'рыба' },
          { n: 'Индейка', d: '21 г белка / 100 г · 104 ккал', tag: 'мясо' },
          { n: 'Греческий йогурт', d: '8 г белка / 100 г · 73 ккал', tag: 'молочка' }
        ]
      },
      {
        id: 'fd-carbs', ico: '🍚', title: 'Умные углеводы', tag: 'энергия', color: 'amber',
        desc: 'Медленные углеводы для стабильной энергии и сытости.',
        items: [
          { n: 'Гречка', d: '62 г углеводов / 100 г · 343 ккал', tag: 'крупа' },
          { n: 'Овсянка', d: '62 г углеводов / 100 г · 352 ккал', tag: 'крупа' },
          { n: 'Бурый рис', d: '72 г углеводов / 100 г · 337 ккал', tag: 'крупа' },
          { n: 'Батат', d: '20 г углеводов / 100 г · 86 ккал', tag: 'овощ' },
          { n: 'Киноа', d: '64 г углеводов / 100 г · 368 ккал', tag: 'крупа' },
          { n: 'Цельнозерновой хлеб', d: '41 г углеводов / 100 г · 247 ккал', tag: 'хлеб' }
        ]
      },
      {
        id: 'fd-fats', ico: '🥑', title: 'Полезные жиры', tag: 'гормоны', color: 'teal',
        desc: 'Жиры нужны для гормонов и усвоения витаминов — не бойся их.',
        items: [
          { n: 'Авокадо', d: '15 г жиров / 100 г · 160 ккал', tag: 'фрукт' },
          { n: 'Оливковое масло', d: '100 г жиров / 100 г · 884 ккал', tag: 'масло' },
          { n: 'Миндаль', d: '50 г жиров / 100 г · 579 ккал', tag: 'орех' },
          { n: 'Лосось', d: '13 г жиров / 100 г · 208 ккал', tag: 'рыба' },
          { n: 'Грецкие орехи', d: '65 г жиров / 100 г · 654 ккал', tag: 'орех' },
          { n: 'Семена чиа', d: '31 г жиров / 100 г · 486 ккал', tag: 'семена' }
        ]
      },
      {
        id: 'fd-veg', ico: '🥦', title: 'Овощи и клетчатка', tag: 'объём', color: 'green',
        desc: 'Мало калорий, много объёма — насыщение без перебора.',
        items: [
          { n: 'Брокколи', d: '34 ккал / 100 г · 2,8 г белка', tag: 'капуста' },
          { n: 'Огурец', d: '15 ккал / 100 г · 95% воды', tag: 'овощ' },
          { n: 'Шпинат', d: '23 ккал / 100 г · железо', tag: 'зелень' },
          { n: 'Помидор', d: '20 ккал / 100 г · ликопин', tag: 'овощ' },
          { n: 'Кабачок', d: '17 ккал / 100 г · клетчатка', tag: 'овощ' },
          { n: 'Капуста квашеная', d: '19 ккал / 100 г · пробиотики', tag: 'фермент' }
        ]
      },
      {
        id: 'fd-snacks', ico: '🍎', title: 'Правильные перекусы', tag: 'до 200 ккал', color: 'pink',
        desc: 'Когда хочется перекусить — выбирай из этого списка.',
        items: [
          { n: 'Яблоко + 10 миндалин', d: '180 ккал · клетчатка + жиры', tag: 'фрукт' },
          { n: 'Творог с мёдом', d: '200 ккал · 26 г белка', tag: 'белок' },
          { n: 'Протеиновый коктейль', d: '220 ккал · 28 г белка', tag: 'спортпит' },
          { n: 'Хумус с морковью', d: '150 ккал · клетчатка', tag: 'овощ' },
          { n: 'Кефир с зеленью', d: '90 ккал · пробиотики', tag: 'молочка' }
        ]
      }
    ],

    /* ---------- ДОБАВКИ ---------- */
    supps: [
      {
        id: 'sp-base', ico: '💊', title: 'База (всем)', tag: 'must have', color: 'green',
        desc: 'Добавки с доказанной пользой — с них начинают все.',
        items: [
          { n: 'Креатин моногидрат', d: '5 г в день · сила и объём мышц', tag: 'сила' },
          { n: 'Витамин D3', d: '2000–4000 МЕ · иммунитет и тестостерон', tag: 'витамин' },
          { n: 'Омега-3', d: '1–2 г EPA+DHA · сердце, суставы', tag: 'жиры' },
          { n: 'Магний', d: '200–400 мг вечером · сон и судороги', tag: 'минерал' }
        ]
      },
      {
        id: 'sp-mass', ico: '🍚', title: 'Набор массы', tag: 'bulk', color: 'amber',
        desc: 'Что помогает расти, когда цель — плюс килограммы.',
        items: [
          { n: 'Протеин (whey)', d: '1–2 порции в день · 25–30 г белка', tag: 'белок' },
          { n: 'Гейнер', d: 'Если не добираешь калории из еды', tag: 'калории' },
          { n: 'Креатин', d: '5 г ежедневно · самый изученный', tag: 'сила' },
          { n: 'Бета-аланин', d: '3–5 г · выносливость в подходах', tag: 'выносливость' }
        ]
      },
      {
        id: 'sp-cut', ico: '📉', title: 'Похудение и сушка', tag: 'cut', color: 'teal',
        desc: 'Сохранить мышцы и не сойти с ума в дефиците.',
        items: [
          { n: 'Протеин', d: 'Добирает белок без лишних калорий', tag: 'белок' },
          { n: 'L-карнитин', d: '2 г до тренировки · транспорт жиров', tag: 'жиросжигание' },
          { n: 'Кофеин', d: '100–200 мг до тренировки · энергия', tag: 'стимулятор' },
          { n: 'Клетчатка (псиллиум)', d: '5 г · сытость и ЖКТ', tag: 'клетчатка' }
        ]
      },
      {
        id: 'sp-recovery', ico: '🛌', title: 'Восстановление', tag: 'recovery', color: 'purple',
        desc: 'Сон, суставы и нервная система — то, что часто забывают.',
        items: [
          { n: 'Магний глицинат', d: '400 мг перед сном · качество сна', tag: 'сон' },
          { n: 'Коллаген + витамин C', d: '10 г + 500 мг · связки и кожа', tag: 'суставы' },
          { n: 'Глицин', d: '3 г перед сном · нервная система', tag: 'сон' },
          { n: 'ZMA', d: 'Цинк + магний + B6 · восстановление', tag: 'минералы' }
        ]
      }
    ],

    /* ---------- ТРЕНИРОВКИ ---------- */
    workout: [
      {
        id: 'wk-strength', ico: '🏋️', title: 'Силовые программы', tag: 'сила', color: 'purple',
        desc: 'Классические схемы для роста силы и массы.',
        items: [
          { n: '5×5 (Стронга)', d: '5 упражнений · 5 подходов · 5 повторов', tag: '3 раза/нед' },
          { n: 'Верх / Низ', d: '4 тренировки в неделю · баланс объёма', tag: '4 раза/нед' },
          { n: 'Push / Pull / Legs', d: 'Жим / тяга / ноги по кругу', tag: '3–6 раз/нед' },
          { n: 'Full Body', d: 'Всё тело за тренировку · новичкам', tag: '2–3 раза/нед' }
        ]
      },
      {
        id: 'wk-home', ico: '🏠', title: 'Домашние тренировки', tag: 'без зала', color: 'teal',
        desc: 'Только вес тела и минимум инвентаря.',
        items: [
          { n: 'Круговая на всё тело', d: '5 упражнений × 3 круга · 25 мин', tag: 'без инвентаря' },
          { n: 'Отжимания + приседания', d: 'Классика · 4 подхода каждого', tag: 'база' },
          { n: 'Планка + скручивания', d: 'Пресс и кор · 10 минут', tag: 'пресс' },
          { n: 'Резинки (band)', d: 'Тяга, разведения, приседы', tag: 'инвентарь' }
        ]
      },
      {
        id: 'wk-cardio', ico: '🔥', title: 'Кардио и жиросжигание', tag: 'жиросжигание', color: 'amber',
        desc: 'Сжечь калории и укрепить сердце.',
        items: [
          { n: 'HIIT 20 минут', d: '8 интервалов 30/30 · после силовой', tag: 'интенсив' },
          { n: 'Ходьба 10 000 шагов', d: 'LISS · сжигает жир без стресса', tag: 'низкая' },
          { n: 'Скакалка', d: '3×60 сек · координация + кардио', tag: 'инвентарь' },
          { n: 'Гребля 20 мин', d: 'Всё тело + кардио', tag: 'тренажёр' }
        ]
      },
      {
        id: 'wk-mobility', ico: '🧘', title: 'Мобильность и разминка', tag: 'профилактика', color: 'green',
        desc: '5–10 минут перед тренировкой — меньше травм.',
        items: [
          { n: 'Суставная гимнастика', d: 'Шея, плечи, локти, кисти · 3 мин', tag: 'разминка' },
          { n: 'Динамическая растяжка', d: 'Махи ногами, выпады с поворотом', tag: 'перед треней' },
          { n: 'Кошка-корова', d: 'Мобильность позвоночника · 10 повторов', tag: 'спина' },
          { n: 'Растяжка после', d: '5 минут на проработанные мышцы', tag: 'заминка' }
        ]
      }
    ],

    /* ---------- ВОССТАНОВЛЕНИЕ ---------- */
    recovery: [
      {
        id: 'rc-sleep', ico: '😴', title: 'Гигиена сна', tag: '7–9 часов', color: 'purple',
        desc: 'Сон — главный анаболик. Без него не растут мышцы.',
        items: [
          { n: 'Одно и то же время', d: 'Ложись и вставай в одно время ±30 мин', tag: 'режим' },
          { n: 'Без экранов за час', d: 'Синий свет рушит мелатонин', tag: 'ритуал' },
          { n: 'Темно и прохладно', d: '18–20 °C · полная темнота', tag: 'спальня' },
          { n: 'Кофеин до 14:00', d: 'Период полураспада — 5–6 часов', tag: 'стимулятор' }
        ]
      },
      {
        id: 'rc-active', ico: '🚶', title: 'Активное восстановление', tag: 'лёгкое', color: 'teal',
        desc: 'Движение ускоряет восстановление лучше, чем полный покой.',
        items: [
          { n: 'Прогулка 30 мин', d: 'Кровоток в мышцах · без нагрузки', tag: 'ходьба' },
          { n: 'Плавание', d: 'Разгружает суставы · работает всё тело', tag: 'вода' },
          { n: 'Велотренажёр 15 мин', d: 'Легкий темп · пульс 100–120', tag: 'кардио' },
          { n: 'Йога / стретчинг', d: '20 минут · фокус на дыхании', tag: 'гибкость' }
        ]
      },
      {
        id: 'rc-body', ico: '💆', title: 'Работа с телом', tag: 'массаж', color: 'amber',
        desc: 'Снимаем зажимы и ускоряем заживление.',
        items: [
          { n: 'Массажный ролл', d: '5 мин на группу · после тренировки', tag: 'фоам' },
          { n: 'Массажный пистолет', d: '30 сек на точку · не на кости', tag: 'перкуссия' },
          { n: 'Контрастный душ', d: '30 сек горячий / 30 холодный ×3', tag: 'сосуды' },
          { n: 'Баня / сауна', d: '10–15 мин · не сразу после трени', tag: 'тепло' }
        ]
      }
    ],

    /* ---------- ВИДЕО ---------- */
    video: [
      {
        id: 'vd-base', ico: '🎯', title: 'База техники', tag: 'обязательно', color: 'purple',
        desc: 'Упражнения, которые надо освоить в первую очередь.',
        items: [
          { n: 'Приседания со штангой', d: 'Колени, спина, глубина · 12 мин', tag: 'ноги' },
          { n: 'Жим штанги лёжа', d: 'Хват, лопатки, траектория · 10 мин', tag: 'грудь' },
          { n: 'Становая тяга', d: 'Спина, таз, гриф · 15 мин', tag: 'спина' },
          { n: 'Подтягивания', d: 'Хват, лопатки, негативы · 8 мин', tag: 'спина' }
        ]
      },
      {
        id: 'vd-fix', ico: '🛠', title: 'Исправление ошибок', tag: 'техника', color: 'amber',
        desc: 'Разбор частых ошибок — смотри перед подходом.',
        items: [
          { n: 'Круглая спина в тяге', d: 'Как включить широчайшие · 6 мин', tag: 'спина' },
          { n: 'Вальгус коленей', d: 'Приседания без завала · 7 мин', tag: 'ноги' },
          { n: 'Локти в стороны в жиме', d: 'Правильный хват · 5 мин', tag: 'грудь' },
          { n: 'Раскачка в бицепсе', d: 'Изоляция без читинга · 4 мин', tag: 'руки' }
        ]
      },
      {
        id: 'vd-advanced', ico: '🚀', title: 'Продвинутые приёмы', tag: 'опытным', color: 'teal',
        desc: 'Дроп-сеты, суперсеты, кластеры — когда база освоена.',
        items: [
          { n: 'Дроп-сеты', d: 'Сброс веса в подходе · 8 мин', tag: 'объём' },
          { n: 'Суперсеты антагонистов', d: 'Бицепс + трицепс · 6 мин', tag: 'время' },
          { n: 'Кластерные подходы', d: 'Микро-отдыхи внутри подхода · 10 мин', tag: 'сила' },
          { n: 'Пиковое сокращение', d: 'Пауза в верхней точке · 5 мин', tag: 'техника' }
        ]
      }
    ],

    /* ---------- ПРОГРЕСС ---------- */
    progress: [
      {
        id: 'pr-metrics', ico: '📏', title: 'Что измерять', tag: 'контроль', color: 'teal',
        desc: 'Метрики, которые реально показывают прогресс.',
        items: [
          { n: 'Вес тела', d: 'Раз в неделю утром натощак', tag: 'вес' },
          { n: 'Обхваты', d: 'Грудь, талия, бёдра, руки · раз в 2 нед', tag: 'объёмы' },
          { n: 'Рабочие веса', d: 'Каждую тренировку · главный индикатор', tag: 'сила' },
          { n: 'Фото раз в месяц', d: 'Одно и то же освещение и поза', tag: 'визуал' }
        ]
      },
      {
        id: 'pr-goals', ico: '🎯', title: 'Как ставить цели', tag: 'SMART', color: 'purple',
        desc: 'Цель должна быть конкретной и измеримой.',
        items: [
          { n: 'Конкретная', d: '«Жим 100 кг», а не «стать сильнее»', tag: 'S' },
          { n: 'Измеримая', d: 'Есть цифра и способ проверить', tag: 'M' },
          { n: 'Достижимая', d: '+5 кг в месяц — реально', tag: 'A' },
          { n: 'С дедлайном', d: 'К 1 июня · 3 месяца', tag: 'T' }
        ]
      }
    ],

    /* ---------- ДОСТИЖЕНИЯ ---------- */
    ach: [
      {
        id: 'ac-first', ico: '🥇', title: 'Первые шаги', tag: 'старт', color: 'green',
        desc: 'Простые достижения, с которых всё начинается.',
        items: [
          { n: 'Первая тренировка', d: 'Запиши любую тренировку', tag: '1' },
          { n: 'Первый приём пищи', d: 'Добавь еду в дневник', tag: '1' },
          { n: 'Первый литр воды', d: 'Выпей 1000 мл за день', tag: 'вода' },
          { n: 'Профиль заполнен', d: 'Вес, рост, возраст, цель', tag: 'профиль' }
        ]
      },
      {
        id: 'ac-streak', ico: '🔥', title: 'Серии', tag: 'дисциплина', color: 'amber',
        desc: 'Чем длиннее серия — тем сильнее привычка.',
        items: [
          { n: '3 дня подряд', d: 'Тренировки без пропусков', tag: '3' },
          { n: '7 дней подряд', d: 'Неделя без пропусков', tag: '7' },
          { n: '30 дней подряд', d: 'Месяц дисциплины', tag: '30' },
          { n: '100 дней', d: 'Легенда', tag: '100' }
        ]
      },
      {
        id: 'ac-strength', ico: '💪', title: 'Силовые вехи', tag: 'сила', color: 'purple',
        desc: 'Когда вес на штанге становится поводом для гордости.',
        items: [
          { n: 'Жим 60 кг', d: 'Первый серьёзный рубеж', tag: 'жим' },
          { n: 'Присед 100 кг', d: 'Двух блинов с каждой стороны', tag: 'присед' },
          { n: 'Становая 140 кг', d: 'Три блина с каждой стороны', tag: 'тяга' },
          { n: 'Подтягивания ×10', d: 'Собственный вес', tag: 'турник' }
        ]
      }
    ]
  };

  /* ==================== РЕНДЕР ==================== */
  var CSS_ID = 'gm-coll-css';
  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement('style');
    st.id = CSS_ID;
    st.textContent =
      '.gmc-wrap{margin:16px 0}' +
      '.gmc-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap}' +
      '.gmc-head h3{font-size:15px;display:flex;align-items:center;gap:8px;margin:0}' +
      '.gmc-head .gmc-count{font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:rgba(139,92,246,.16);color:#c4b5fd;border:1px solid rgba(139,92,246,.3)}' +
      '.gmc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}' +
      '.gmc-card{background:linear-gradient(160deg,#141b2d,#111827);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:16px;transition:transform .22s ease,box-shadow .22s ease,border-color .22s;box-shadow:0 10px 26px rgba(0,0,0,.22)}' +
      '.gmc-card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.14);box-shadow:0 18px 40px rgba(0,0,0,.4)}' +
      '.gmc-card-top{display:flex;align-items:flex-start;gap:11px;margin-bottom:10px}' +
      '.gmc-ico{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:20px;flex:0 0 auto;background:linear-gradient(135deg,rgba(139,92,246,.4),rgba(45,212,191,.3))}' +
      '.gmc-card.purple .gmc-ico{background:linear-gradient(135deg,rgba(139,92,246,.5),rgba(99,102,241,.35))}' +
      '.gmc-card.teal .gmc-ico{background:linear-gradient(135deg,rgba(45,212,191,.5),rgba(6,182,212,.35))}' +
      '.gmc-card.amber .gmc-ico{background:linear-gradient(135deg,rgba(251,191,36,.5),rgba(245,158,11,.35))}' +
      '.gmc-card.green .gmc-ico{background:linear-gradient(135deg,rgba(52,211,153,.5),rgba(34,197,94,.35))}' +
      '.gmc-card.pink .gmc-ico{background:linear-gradient(135deg,rgba(244,114,182,.5),rgba(236,72,153,.35))}' +
      '.gmc-title{flex:1;min-width:0}' +
      '.gmc-title b{display:block;font-size:14px;font-weight:800;line-height:1.3;margin-bottom:3px}' +
      '.gmc-title p{font-size:11.5px;color:#8b9ab5;line-height:1.5;margin:0}' +
      '.gmc-tag{display:inline-block;font-size:10px;font-weight:800;padding:3px 8px;border-radius:999px;background:rgba(139,92,246,.16);color:#c4b5fd;border:1px solid rgba(139,92,246,.3);text-transform:uppercase;letter-spacing:.4px;white-space:nowrap;flex:0 0 auto}' +
      '.gmc-items{display:flex;flex-direction:column;gap:8px;margin-top:12px}' +
      '.gmc-item{display:flex;align-items:flex-start;gap:9px;padding:9px 11px;border-radius:11px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.05);transition:.15s}' +
      '.gmc-item:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1)}' +
      '.gmc-item.gmc-clickable{cursor:pointer}' +
      '.gmc-item.gmc-clickable:hover{background:rgba(139,92,246,.14);border-color:rgba(139,92,246,.45);transform:translateX(2px)}' +
      '.gmc-item.gmc-clickable:active{transform:scale(.99)}' +
      '.gmc-modal{position:fixed;inset:0;z-index:120;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(5,8,14,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}' +
      '.gmc-modal.open{display:flex}' +
      '.gmc-modal-box{width:min(520px,100%);max-height:90vh;overflow-y:auto;background:linear-gradient(170deg,#141b2d,#0f1728);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:20px;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:gmcFade .25s ease}' +
      '@keyframes gmcFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
      '.gmc-modal-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px}' +
      '.gmc-modal-ico{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;font-size:24px;flex:0 0 auto;background:linear-gradient(135deg,rgba(139,92,246,.5),rgba(45,212,191,.35))}' +
      '.gmc-modal-head h3{font-size:16px;margin:0 0 4px;line-height:1.3}' +
      '.gmc-modal-head p{font-size:12px;color:#8b9ab5;line-height:1.5;margin:0}' +
      '.gmc-modal-close{margin-left:auto;width:32px;height:32px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#e8eefc;font-size:14px;cursor:pointer;font-family:inherit;flex:0 0 auto}' +
      '.gmc-modal-info{background:rgba(45,212,191,.08);border:1px solid rgba(45,212,191,.26);border-radius:13px;padding:12px 14px;margin-bottom:14px;font-size:12.5px;line-height:1.6;color:#dbe4f5}' +
      '.gmc-modal-info b{color:#5eead4}' +
      '.gmc-modal-list{margin:0 0 14px;padding:0;list-style:none;display:flex;flex-direction:column;gap:7px}' +
      '.gmc-modal-list li{font-size:12.5px;line-height:1.55;color:#dbe4f5;padding:9px 12px;border-radius:11px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:8px}' +
      '.gmc-modal-list li::before{content:"▸";color:#8b5cf6;font-weight:800}' +
      '.gmc-ex{border-radius:13px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);overflow:hidden;transition:.2s}' +
      '.gmc-ex.open{border-color:rgba(139,92,246,.45);background:rgba(139,92,246,.07)}' +
      '.gmc-ex-head{display:flex;align-items:center;gap:9px;padding:11px 12px;cursor:pointer;user-select:none}' +
      '.gmc-ex-head:hover{background:rgba(255,255,255,.03)}' +
      '.gmc-ex-arrow{color:#8b5cf6;font-weight:800;font-size:11px;transition:transform .2s;flex:0 0 auto}' +
      '.gmc-ex.open .gmc-ex-arrow{transform:rotate(90deg)}' +
      '.gmc-ex-name{flex:1;min-width:0;font-size:12.5px;font-weight:700;line-height:1.3}' +
      '.gmc-ex-sets{font-size:10.5px;font-weight:800;color:#5eead4;white-space:nowrap;flex:0 0 auto}' +
      '.gmc-ex-body{display:none;padding:0 12px 13px}' +
      '.gmc-ex.open .gmc-ex-body{display:block}' +
      '.gmc-ex-media{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}' +
      '@media(max-width:480px){.gmc-ex-media{grid-template-columns:1fr}}' +
      '.gmc-ex-gif{aspect-ratio:4/3;border-radius:11px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:linear-gradient(135deg,rgba(139,92,246,.3),rgba(45,212,191,.2));display:grid;place-items:center;position:relative}' +
      '.gmc-ex-gif img{width:100%;height:100%;object-fit:cover;display:block}' +
      '.gmc-ex-gif .gmc-gif-ph{font-size:34px;opacity:.85}' +
      '.gmc-ex-gif .gmc-gif-lbl{position:absolute;left:6px;bottom:6px;font-size:9px;font-weight:800;padding:2px 6px;border-radius:6px;background:rgba(5,8,14,.8);color:#5eead4;text-transform:uppercase;letter-spacing:.4px}' +
      '.gmc-ex-video{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-radius:11px;border:1px solid rgba(248,113,113,.35);background:rgba(248,113,113,.1);color:#fca5a5;font-size:11.5px;font-weight:800;text-decoration:none;transition:.2s;padding:10px;text-align:center}' +
      '.gmc-ex-video:hover{background:rgba(248,113,113,.18);transform:translateY(-1px)}' +
      '.gmc-ex-video .gmc-v-ico{font-size:22px}' +
      '.gmc-ex-tip{font-size:11.5px;line-height:1.6;color:#dbe4f5;margin:0 0 8px}' +
      '.gmc-ex-tip b{color:#5eead4}' +
      '.gmc-ex-steps{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:5px}' +
      '.gmc-ex-steps li{font-size:11px;line-height:1.5;color:#c9d5ec;padding-left:14px;position:relative}' +
      '.gmc-ex-steps li::before{content:"▸";position:absolute;left:0;color:#8b5cf6;font-weight:800}' +
      '.gmc-modal-actions{display:flex;gap:9px;flex-wrap:wrap}' +
      '.gmc-modal-actions button{flex:1 1 auto;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:#1a2236;color:#e8eefc;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}' +
      '.gmc-modal-actions button:hover{transform:translateY(-1px);background:#202b44}' +
      '.gmc-modal-actions button.primary{background:linear-gradient(135deg,#8b5cf6,#6366f1);border-color:transparent;box-shadow:0 8px 22px rgba(139,92,246,.32)}' +
      '.gmc-item .gmc-dot{width:6px;height:6px;border-radius:50%;background:#8b5cf6;flex:0 0 auto;margin-top:6px}' +
      '.gmc-card.teal .gmc-item .gmc-dot{background:#2dd4bf}' +
      '.gmc-card.amber .gmc-item .gmc-dot{background:#fbbf24}' +
      '.gmc-card.green .gmc-item .gmc-dot{background:#34d399}' +
      '.gmc-card.pink .gmc-item .gmc-dot{background:#f472b6}' +
      '.gmc-item-body{flex:1;min-width:0}' +
      '.gmc-item-body b{display:block;font-size:12.5px;font-weight:700;line-height:1.3;margin-bottom:2px}' +
      '.gmc-item-body span{display:block;font-size:11px;color:#8b9ab5;line-height:1.45}' +
      '.gmc-item-tag{font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,.05);color:#94a3b8;border:1px solid rgba(255,255,255,.08);white-space:nowrap;flex:0 0 auto;text-transform:uppercase;letter-spacing:.3px}' +
      '@media(max-width:560px){' +
        '.gmc-grid{grid-template-columns:1fr;gap:12px}' +
        '.gmc-card{padding:14px;border-radius:16px}' +
        '.gmc-ico{width:36px;height:36px;font-size:18px;border-radius:11px}' +
        '.gmc-title b{font-size:13px}' +
        '.gmc-title p{font-size:11px}' +
        '.gmc-item{padding:8px 10px}' +
        '.gmc-item-body b{font-size:12px}' +
        '.gmc-item-body span{font-size:10.5px}' +
      '}';
    document.head.appendChild(st);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderCollection(c, moduleKey) {
    var items = (c.items || []).map(function (it, idx) {
      var clickable = moduleKey === 'workout';
      return '<div class="gmc-item' + (clickable ? ' gmc-clickable' : '') + '"' +
        (clickable ? ' data-gmc-workout="' + esc(c.id) + '" data-gmc-idx="' + idx + '"' : '') + '>' +
        '<span class="gmc-dot"></span>' +
        '<div class="gmc-item-body">' +
          '<b>' + esc(it.n) + '</b>' +
          '<span>' + esc(it.d) + '</span>' +
        '</div>' +
        (it.tag ? '<span class="gmc-item-tag">' + esc(it.tag) + '</span>' : '') +
      '</div>';
    }).join('');
    return '<div class="gmc-card ' + (c.color || 'purple') + '">' +
      '<div class="gmc-card-top">' +
        '<div class="gmc-ico">' + (c.ico || '📌') + '</div>' +
        '<div class="gmc-title">' +
          '<b>' + esc(c.title) + '</b>' +
          '<p>' + esc(c.desc || '') + '</p>' +
        '</div>' +
        (c.tag ? '<span class="gmc-tag">' + esc(c.tag) + '</span>' : '') +
      '</div>' +
      '<div class="gmc-items">' + items + '</div>' +
    '</div>';
  }

  function renderBlock(moduleKey, title) {
    var list = COLLECTIONS[moduleKey];
    if (!list || !list.length) return '';
    return '<div class="gmc-wrap">' +
      '<div class="gmc-head">' +
        '<h3><span>📚</span> ' + esc(title || 'Подборки') + ' <span class="gmc-count">' + list.length + '</span></h3>' +
      '</div>' +
      '<div class="gmc-grid">' + list.map(function (c) { return renderCollection(c, moduleKey); }).join('') + '</div>' +
    '</div>';
  }

  /* ==================== ВСТРАИВАНИЕ В МОДУЛИ ==================== */
  var MOUNTS = [
    { view: 'view-overview', key: 'overview', title: 'Подборки для старта', pos: 'append' },
    { view: 'view-food', key: 'food', title: 'Подборки продуктов', pos: 'append' },
    { view: 'view-workout', key: 'workout', title: 'Подборки тренировок', pos: 'append' },
    { view: 'view-video', key: 'video', title: 'Подборки видео-уроков', pos: 'append' },
    { view: 'view-progress', key: 'progress', title: 'Подборки по прогрессу', pos: 'append' },
    { view: 'view-ach', key: 'ach', title: 'Подборки достижений', pos: 'append' }
  ];

  function mountAll() {
    injectCSS();
    MOUNTS.forEach(function (m) {
      var view = document.getElementById(m.view);
      if (!view) return;
      if (view.querySelector('[data-gmc="' + m.key + '"]')) return;
      var html = renderBlock(m.key, m.title);
      if (!html) return;
      var wrap = document.createElement('div');
      wrap.setAttribute('data-gmc', m.key);
      wrap.innerHTML = html;
      if (m.pos === 'after-banner') {
        var banner = view.querySelector('.banner');
        if (banner && banner.nextSibling) view.insertBefore(wrap, banner.nextSibling);
        else view.insertBefore(wrap, view.firstChild);
      } else {
        view.appendChild(wrap);
      }
    });

    /* доп. подборки в модуле питания — добавки и восстановление */
    var foodView = document.getElementById('view-food');
    if (foodView && !foodView.querySelector('[data-gmc="supps"]')) {
      var sWrap = document.createElement('div');
      sWrap.setAttribute('data-gmc', 'supps');
      sWrap.innerHTML = renderBlock('supps', 'Подборки добавок');
      foodView.appendChild(sWrap);
    }
    var workoutView = document.getElementById('view-workout');
    if (workoutView && !workoutView.querySelector('[data-gmc="recovery"]')) {
      var rWrap = document.createElement('div');
      rWrap.setAttribute('data-gmc', 'recovery');
      rWrap.innerHTML = renderBlock('recovery', 'Подборки восстановления');
      workoutView.appendChild(rWrap);
    }
  }

  /* ==================== КЛИК ПО ТРЕНИРОВКЕ ==================== */
  var WORKOUT_PLANS = {
    '5×5 (Стронга)': { ex: ['Приседания со штангой', 'Жим штанги лёжа', 'Становая тяга', 'Жим стоя (армейский)', 'Тяга штанги в наклоне'], sets: 5, reps: 5, time: '45–60 мин' },
    'Верх / Низ': { ex: ['Жим штанги лёжа', 'Тяга верхнего блока', 'Жим гантелей сидя', 'Подъём на бицепс штангой', 'Французский жим'], sets: 4, reps: 8, time: '50–60 мин' },
    'Push / Pull / Legs': { ex: ['Жим штанги лёжа', 'Жим стоя (армейский)', 'Разгибание на блоке', 'Подтягивания', 'Подъём на бицепс штангой', 'Приседания со штангой'], sets: 4, reps: 10, time: '55–70 мин' },
    'Full Body': { ex: ['Приседания со штангой', 'Жим штанги лёжа', 'Тяга штанги в наклоне', 'Жим стоя (армейский)', 'Планка'], sets: 3, reps: 10, time: '40–50 мин' },
    'Круговая на всё тело': { ex: ['Отжимания от пола', 'Приседания с гантелью (габлет)', 'Выпады с гантелями', 'Планка', 'Подъём ног лёжа'], sets: 3, reps: 12, time: '25–30 мин' },
    'Отжимания + приседания': { ex: ['Отжимания от пола', 'Приседания с гантелью (габлет)', 'Планка'], sets: 4, reps: 15, time: '20–25 мин' },
    'Планка + скручивания': { ex: ['Планка', 'Скручивания на пресс', 'Подъём ног лёжа', 'Боковая планка'], sets: 3, reps: 20, time: '10–15 мин' },
    'Резинки (band)': { ex: ['Тяга резинки к поясу', 'Разведения резинки', 'Приседания с резинкой', 'Отжимания от пола'], sets: 3, reps: 15, time: '20–25 мин' },
    'HIIT 20 минут': { ex: ['HIIT на дорожке', 'Бёрпи', 'Скакалка', 'Махи гирей'], sets: 8, reps: 1, time: '20 мин' },
    'Ходьба 10 000 шагов': { ex: ['Ходьба на дорожке'], sets: 1, reps: 60, time: '60–90 мин' },
    'Скакалка': { ex: ['Скакалка', 'Прыжки на скакалке двойные'], sets: 3, reps: 60, time: '15 мин' },
    'Гребля 20 мин': { ex: ['Гребной тренажёр'], sets: 1, reps: 20, time: '20 мин' },
    'Суставная гимнастика': { ex: ['Вращения плечами', 'Вращения локтями', 'Вращения кистями', 'Вращения тазом'], sets: 2, reps: 10, time: '3–5 мин' },
    'Динамическая растяжка': { ex: ['Махи ногами', 'Выпады с поворотом', 'Круги руками', 'Наклоны корпуса'], sets: 2, reps: 10, time: '5–7 мин' },
    'Кошка-корова': { ex: ['Кошка-корова', 'Наклоны корпуса', 'Вращения тазом'], sets: 2, reps: 10, time: '3–5 мин' },
    'Растяжка после': { ex: ['Растяжка квадрицепса', 'Растяжка бицепса бедра', 'Растяжка груди', 'Растяжка спины'], sets: 1, reps: 30, time: '5 мин' }
  };

  /* ==================== БАЗА ЗНАНИЙ ПО УПРАЖНЕНИЯМ ==================== */
  /* Для каждого упражнения: gif (URL превью), video (ссылка на YouTube),
     tip (главный совет по технике) и steps (пошаговая техника). */
  var EX_GUIDE = {
    'Приседания со штангой': {
      gif: 'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=приседания+со+штангой+техника',
      tip: 'Колени идут по направлению носков, спина прямая, глубина — до параллели бедра с полом.',
      steps: ['Гриф на трапециях, стопы на ширине плеч', 'Вдох, задержка дыхания, таз назад', 'Опускайся до параллели, колени не заваливаются внутрь', 'Мощно встань, выдох в верхней точке']
    },
    'Жим штанги лёжа': {
      gif: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=жим+штанги+лежа+техника',
      tip: 'Лопатки сведены, стопы упираются в пол, гриф опускается на низ груди.',
      steps: ['Ляг так, чтобы глаза были под грифом', 'Сведи лопатки, небольшой прогиб в пояснице', 'Опусти гриф на низ груди, локти ~45°', 'Выжми по дуге к изголовью']
    },
    'Становая тяга': {
      gif: 'https://media.giphy.com/media/3oKIPavRPgJYaNI97W/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=становая+тяга+техника',
      tip: 'Спина прямая на всём протяжении, гриф скользит по ногам, таз и плечи поднимаются одновременно.',
      steps: ['Стопы на ширине таза, гриф над серединой стопы', 'Сядь, возьмись за гриф, выпрями спину', 'Отталкивайся ногами, гриф вдоль голеней', 'Вверху выпрямись, не отклоняйся назад']
    },
    'Жим стоя (армейский)': {
      gif: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=жим+стоя+армейский+техника',
      tip: 'Пресс напряжён, не прогибай поясницу, гриф проходит близко к лицу.',
      steps: ['Штанга на груди, хват чуть шире плеч', 'Напряги пресс и ягодицы', 'Выжми гриф вверх, голову слегка назад', 'Вверху гриф над макушкой']
    },
    'Тяга штанги в наклоне': {
      gif: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=тяга+штанги+в+наклоне+техника',
      tip: 'Корпус наклонён ~45°, тяни к поясу, локти вдоль тела.',
      steps: ['Наклонись, спина прямая, колени чуть согнуты', 'Тяни гриф к низу живота', 'Сведи лопатки в верхней точке', 'Медленно опусти, не бросай']
    },
    'Подтягивания': {
      gif: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=подтягивания+техника',
      tip: 'Начинай движение со сведения лопаток, а не с рук.',
      steps: ['Хват чуть шире плеч, ладони от себя', 'Сведи лопатки, подтянись грудью к перекладине', 'Подбородок выше перекладины', 'Опускайся медленно, полностью выпрямляя руки']
    },
    'Отжимания от пола': {
      gif: 'https://media.giphy.com/media/3o7TKrKjX9cVqZ2c2A/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=отжимания+от+пола+техника',
      tip: 'Тело — прямая линия, локти не разводи широко.',
      steps: ['Упор лёжа, ладони под плечами', 'Напряги пресс и ягодицы', 'Опустись, локти ~45° к корпусу', 'Выжми вверх, не прогибай поясницу']
    },
    'Планка': {
      gif: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=планка+техника',
      tip: 'Таз не провисает и не задирается — тело в одну линию.',
      steps: ['Упор на предплечья и носки', 'Локти под плечами', 'Напряги пресс и ягодицы', 'Дыши ровно, держи 30–60 секунд']
    },
    'Скручивания на пресс': {
      gif: 'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=скручивания+на+пресс+техника',
      tip: 'Скручивайся за счёт пресса, а не тяни шею руками.',
      steps: ['Ляг, колени согнуты, руки за головой', 'На выдохе оторви лопатки от пола', 'Задержись на секунду вверху', 'Медленно опустись, не расслабляй пресс']
    },
    'Подъём ног лёжа': {
      gif: 'https://media.giphy.com/media/3oKIPavRPgJYaNI97W/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=подъем+ног+лежа+пресс',
      tip: 'Поясница прижата к полу — не отрывай её.',
      steps: ['Ляг, руки вдоль тела', 'Подними прямые ноги до 90°', 'Медленно опусти, не касаясь пола', 'Держи поясницу прижатой']
    },
    'Боковая планка': {
      gif: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=боковая+планка+техника',
      tip: 'Тело — прямая линия от головы до стоп.',
      steps: ['Ляг на бок, локоть под плечом', 'Подними таз, тело в линию', 'Держи 30–45 секунд', 'Повтори на другую сторону']
    },
    'Выпады с гантелями': {
      gif: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=выпады+с+гантелями+техника',
      tip: 'Колено передней ноги не выходит за носок.',
      steps: ['Встань прямо, гантели в руках', 'Шагни вперёд, опустись до 90°', 'Колено задней ноги почти касается пола', 'Оттолкнись передней ногой, вернись']
    },
    'Приседания с гантелью (габлет)': {
      gif: 'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=габлет+приседания+техника',
      tip: 'Гантель у груди, локти под ней — помогает держать спину прямой.',
      steps: ['Держи гантель вертикально у груди', 'Стопы на ширине плеч', 'Приседай до параллели', 'Вставай, толкаясь пятками']
    },
    'HIIT на дорожке': {
      gif: 'https://media.giphy.com/media/3o7TKrKjX9cVqZ2c2A/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=hiit+на+дорожке+интервалы',
      tip: '30 секунд спринт / 30 секунд ходьба — 8 кругов.',
      steps: ['Разминка 3 минуты ходьбой', '30 сек быстрый бег на максимум', '30 сек медленная ходьба', 'Повтори 8 раз, затем заминка']
    },
    'Бёрпи': {
      gif: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=берпи+техника',
      tip: 'Держи темп, который можешь сохранить все 8 повторов.',
      steps: ['Из положения стоя присядь, руки на пол', 'Прыжком в упор лёжа', 'Отжимание (по желанию)', 'Прыжком вернись и выпрыгни вверх']
    },
    'Скакалка': {
      gif: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=скакалка+техника',
      tip: 'Прыгай невысоко, вращение — кистями, а не руками.',
      steps: ['Локти прижаты к корпусу', 'Вращай скакалку кистями', 'Прыгай на 2–3 см от пола', 'Приземляйся на носки']
    },
    'Махи гирей': {
      gif: 'https://media.giphy.com/media/3oKIPavRPgJYaNI97W/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=махи+гирей+техника',
      tip: 'Движение идёт от таза, а не от рук.',
      steps: ['Гиря между ног, спина прямая', 'Мощно толкни таз вперёд', 'Гиря взлетает до уровня груди', 'Дай ей вернуться между ног']
    },
    'Суставная гимнастика': {
      gif: 'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=суставная+гимнастика+разминка',
      tip: 'Плавные вращения во всех суставах по 10 раз.',
      steps: ['Вращения головой 10 раз', 'Плечи вперёд/назад по 10', 'Локти и кисти по 10', 'Таз и колени по 10']
    },
    'Динамическая растяжка': {
      gif: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=динамическая+растяжка+перед+тренировкой',
      tip: 'Не задерживайся в позах — двигайся плавно.',
      steps: ['Махи ногами вперёд/назад по 10', 'Круги руками 10 раз', 'Выпады с поворотом корпуса', 'Наклоны корпуса в стороны']
    },
    'Кошка-корова': {
      gif: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=кошка+корова+упражнение',
      tip: 'Синхронизируй движение с дыханием.',
      steps: ['Встань на четвереньки', 'На вдохе прогни спину вниз', 'На выдохе округли спину вверх', '10 медленных повторов']
    },
    'Растяжка после': {
      gif: 'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif',
      video: 'https://www.youtube.com/results?search_query=растяжка+после+тренировки',
      tip: 'Держи каждое положение 20–30 секунд, дыши глубоко.',
      steps: ['Растяжка квадрицепса по 20 сек', 'Растяжка бицепса бедра по 20 сек', 'Растяжка груди в дверном проёме', 'Растяжка спины в наклоне']
    }
  };

  function openWorkoutModal(collId, idx) {
    var coll = null;
    for (var i = 0; i < COLLECTIONS.workout.length; i++) {
      if (COLLECTIONS.workout[i].id === collId) { coll = COLLECTIONS.workout[i]; break; }
    }
    if (!coll || !coll.items[idx]) return;
    var item = coll.items[idx];
    var plan = WORKOUT_PLANS[item.n] || { ex: [item.n], sets: 3, reps: 10, time: '30–40 мин' };

    var old = document.getElementById('gmcWorkoutModal');
    if (old) old.parentNode.removeChild(old);

    var exList = plan.ex.map(function (n) {
      return '<li>' + esc(n) + ' · ' + plan.sets + '×' + plan.reps + '</li>';
    }).join('');

    var modal = document.createElement('div');
    modal.id = 'gmcWorkoutModal';
    modal.className = 'gmc-modal open';
    modal.innerHTML =
      '<div class="gmc-modal-box">' +
        '<div class="gmc-modal-head">' +
          '<div class="gmc-modal-ico">' + (coll.ico || '🏋️') + '</div>' +
          '<div style="flex:1;min-width:0">' +
            '<h3>' + esc(item.n) + '</h3>' +
            '<p>' + esc(item.d || '') + '</p>' +
          '</div>' +
          '<button class="gmc-modal-close" data-gmc-close="1">✕</button>' +
        '</div>' +
        '<div class="gmc-modal-info">' +
          '⏱ <b>' + plan.time + '</b> · ' + plan.ex.length + ' упражнений · ' + plan.sets + ' подхода × ' + plan.reps + ' повторов' +
        '</div>' +
        '<h4 style="font-size:12px;color:#5eead4;margin:0 0 8px;letter-spacing:.3px">📋 План тренировки</h4>' +
        '<ul class="gmc-modal-list">' + exList + '</ul>' +
        '<div class="gmc-modal-actions">' +
          '<button class="primary" data-gmc-start="1">▶ Начать тренировку</button>' +
          '<button data-gmc-close="1">Отмена</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.getAttribute('data-gmc-close')) {
        modal.classList.remove('open');
        setTimeout(function () { if (modal.parentNode) modal.parentNode.removeChild(modal); }, 200);
        return;
      }
      if (e.target.getAttribute('data-gmc-start')) {
        startWorkoutFromPlan(plan);
        modal.classList.remove('open');
        setTimeout(function () { if (modal.parentNode) modal.parentNode.removeChild(modal); }, 200);
      }
    });
  }

  function startWorkoutFromPlan(plan) {
    if (typeof window.switchView === 'function') window.switchView('workout');
    var rows = document.getElementById('exRows');
    if (rows) rows.innerHTML = '';
    if (typeof window.addExRow === 'function') {
      plan.ex.forEach(function (name) {
        window.addExRow({ name: name, sets: plan.sets, reps: plan.reps, weight: '' });
      });
    }
    if (typeof window.toast === 'function') window.toast('Тренировка «' + plan.ex[0] + '» загружена');
    setTimeout(function () {
      var target = document.getElementById('exRows');
      if (target && target.scrollIntoView) {
        try { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
      }
    }, 200);
  }

  document.addEventListener('click', function (e) {
    var item = e.target.closest ? e.target.closest('[data-gmc-workout]') : null;
    if (!item) return;
    openWorkoutModal(item.getAttribute('data-gmc-workout'), +item.getAttribute('data-gmc-idx'));
  });

  /* ==================== API ==================== */
  window.GymMindCollections = {
    data: COLLECTIONS,
    render: function (key, title) { injectCSS(); return renderBlock(key, title); },
    mount: mountAll
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(mountAll, 120); });
  } else {
    setTimeout(mountAll, 120);
  }
})();