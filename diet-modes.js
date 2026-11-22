/* GymMind — Режимы питания: Набор массы / Похудение / Сушка / Поддержание.
   Сам встраивается в раздел «Питание»: считает калории на день, подбирает рецепты
   под выбранный режим и показывает, сколько ещё нужно добрать после еды. */
(function () {
  'use strict';
  if (window.__gmdBooted) return;
  window.__gmdBooted = true;

  /* ==================== РЕЖИМЫ ==================== */
  var MODES = {
    bulk: {
      id: 'bulk', name: 'Набор массы', ico: '🍚', adj: 1.15, base: 3000, prot: 1.8, fat: 1.0,
      desc: 'Профицит ~15%: едим больше, чем тратим. Углеводов много — они дают силу на тренировке и рост мышц.',
      tips: [
        '5 приёмов пищи: завтрак, обед, ужин + 2 перекуса',
        'Белок 30–40 г в каждом приёме — это ~150 г курицы или 200 г творога',
        'Крупы и картофель ставим до и после тренировки',
        'Вес не растёт 2 недели — добавь 200 ккал в день'
      ]
    },
    cut: {
      id: 'cut', name: 'Похудение', ico: '📉', adj: 0.80, base: 1900, prot: 2.0, fat: 0.9,
      desc: 'Комфортный дефицит 20%: минус 0,5–0,8 кг в неделю без голода. Много белка и овощей, меньше быстрых углеводов.',
      tips: [
        'Не пропускай завтрак — иначе переешь вечером',
        'Половина тарелки — овощи: объём есть, калорий почти нет',
        'Углеводы сдвинь в первую половину дня',
        'Пей 30 мл воды на каждый кг веса'
      ]
    },
    shred: {
      id: 'shred', name: 'Сушка', ico: '🔥', adj: 0.75, base: 1700, prot: 2.2, fat: 0.8,
      desc: 'Жёсткий дефицит 25% при высоком белке: сохраняем мышцы, убираем жир. Углеводов минимум, овощей — максимум.',
      tips: [
        'Белок 2,2 г на кг веса — обязательный минимум',
        'Углеводы только вокруг тренировки',
        'Соль и воду не режем — иначе упадёт сила',
        'Раз в неделю ешь на норму поддержания (загрузка)'
      ]
    },
    maintain: {
      id: 'maintain', name: 'Поддержание формы', ico: '⚖️', adj: 1.00, base: 2300, prot: 1.6, fat: 1.0,
      desc: 'Едим ровно столько, сколько тратим. Вес стабилен, сил хватает — база, к которой возвращаются после диеты.',
      tips: [
        'Взвешивайся 1 раз в неделю утром натощак',
        'Три полноценных приёма + перекус по голоду',
        'Половина тарелки — овощи, четверть — белок, четверть — гарнир',
        'Один свободный приём пищи в неделю допустим'
      ]
    }
  };
  var MODE_ORDER = ['bulk', 'cut', 'shred', 'maintain'];

  /* ==================== РЕЦЕПТЫ (38) ==================== */
  /* m: b — завтрак, l — обед, d — ужин, s — перекус
     md — для каких режимов подходит, k — ккал, p/f/c — БЖУ в граммах, t — минуты */
  var R = [
    /* ---------- ЗАВТРАКИ ---------- */
    { n: 'Овсянка с бананом и орехами', e: '🥣', m: 'b', md: ['bulk', 'maintain'], k: 470, p: 14, f: 12, c: 72, t: 10,
      ing: ['Овсяные хлопья — 60 г (6 ст. л. с горкой)', 'Молоко 2,5% — 250 мл (1 полный стакан)', 'Банан — 1 средний', 'Грецкие орехи — 15 г (3 половинки)', 'Мёд — 1 ч. л.', 'Соль — щепотка'],
      st: ['Хлопья залей молоком в кастрюле, добавь щепотку соли.', 'Доведи до кипения и вари 5 минут, помешивая.', 'Сними с огня, размешай мёд.', 'Сверху выложи кружки банана и орехи.'] },
    { n: 'Омлет из 3 яиц с помидорами', e: '🍳', m: 'b', md: ['cut', 'shred', 'maintain'], k: 300, p: 22, f: 20, c: 6, t: 10,
      ing: ['Яйца — 3 шт.', 'Молоко — 30 мл (2 ст. л.)', 'Помидор — 1 шт.', 'Растительное масло — 1 ч. л.', 'Соль, перец, зелень'],
      st: ['Взбей яйца с молоком, солью и перцем вилкой (30 секунд).', 'Помидор нарежь кружками и обжарь 1 минуту на масле.', 'Залей яйцами, накрой крышкой и готовь 4–5 минут на малом огне.', 'Посыпь зеленью прямо в сковороде.'] },
    { n: 'Сырники из творога с йогуртом', e: '🥞', m: 'b', md: ['bulk', 'maintain'], k: 430, p: 30, f: 14, c: 46, t: 20,
      ing: ['Творог 5% — 200 г', 'Яйцо — 1 шт.', 'Мука — 2 ст. л. + 1 ст. л. для панировки', 'Сахар — 1 ст. л.', 'Соль — щепотка', 'Греческий йогурт — 2 ст. л.'],
      st: ['Смешай творог, яйцо, сахар, соль и 2 ложки муки.', 'Слепи 5–6 лепёшек толщиной ~1,5 см.', 'Обваляй в муке и жарь по 3–4 минуты с каждой стороны на малом огне.', 'Подавай с ложкой греческого йогурта.'] },
    { n: 'Греческий йогурт с ягодами и миндалём', e: '🫐', m: 'b', md: ['cut', 'shred'], k: 240, p: 20, f: 10, c: 18, t: 5,
      ing: ['Греческий йогурт 2% — 200 г (1 стакан)', 'Ягоды — 100 г (горсть)', 'Миндаль — 10 г (10 шт.)', 'Мёд — 1 ч. л.'],
      st: ['Выложи йогурт в миску.', 'Добавь ягоды (замороженные заранее разморозь).', 'Миндаль поруби и посыпь сверху.', 'Полей мёдом и ешь сразу.'] },
    { n: 'Тост с авокадо и яйцом', e: '🥑', m: 'b', md: ['cut', 'maintain'], k: 330, p: 16, f: 19, c: 27, t: 10,
      ing: ['Хлеб цельнозерновой — 2 ломтика (60 г)', 'Авокадо — ½ шт.', 'Яйца — 2 шт.', 'Лимонный сок — 1 ч. л.', 'Соль, перец'],
      st: ['Отвари яйца 7–8 минут или пожарь без масла.', 'Авокадо разомни вилкой с лимонным соком и солью.', 'Подсуши хлеб в тостере 1–2 минуты.', 'Намажь авокадо и выложи сверху яйца.'] },
    { n: 'Протеиновые панкейки', e: '🥞', m: 'b', md: ['bulk', 'cut'], k: 380, p: 31, f: 9, c: 42, t: 15,
      ing: ['Овсяная мука — 50 г (5 ст. л.)', 'Протеин — 30 г (1 мерная ложка)', 'Яйцо — 1 шт.', 'Кефир — 100 мл (½ стакана)', 'Разрыхлитель — ½ ч. л.'],
      st: ['Смешай муку, протеин и разрыхлитель.', 'Добавь яйцо и кефир, размешай до однородности.', 'Жарь на сухой антипригарной сковороде по 1,5–2 минуты с каждой стороны.', 'Получится 3–4 панкейка.'] },
    { n: 'Шакшука из 2 яиц', e: '🍅', m: 'b', md: ['cut', 'shred', 'maintain'], k: 300, p: 18, f: 18, c: 16, t: 20,
      ing: ['Помидоры — 400 г (4 шт.)', 'Яйца — 2 шт.', 'Лук — 1 шт.', 'Чеснок — 2 зубчика', 'Масло — 1 ст. л.', 'Паприка — ½ ч. л., соль, перец'],
      st: ['Обжарь лук кубиком 3 минуты на масле.', 'Добавь чеснок с паприкой, через 30 секунд — помидоры.', 'Туши 8–10 минут, пока соус не загустеет.', 'Сделай 2 лунки, разбей яйца, накрой крышкой и готовь 4 минуты.'] },
    { n: 'Рисовая каша с яблоком', e: '🍎', m: 'b', md: ['bulk'], k: 420, p: 9, f: 7, c: 80, t: 25,
      ing: ['Рис круглый — 60 г (⅓ стакана)', 'Молоко — 300 мл (1,2 стакана)', 'Яблоко — 1 шт.', 'Корица — ½ ч. л.', 'Мёд — 1 ч. л.'],
      st: ['Промой рис, залей молоком, доведи до кипения.', 'Вари на минимальном огне 18–20 минут, помешивая.', 'Яблоко натри на крупной тёрке и добавь за 2 минуты до конца.', 'Сними с огня, добавь корицу и мёд.'] },
    { n: 'Овсяноблин с творогом', e: '🥞', m: 'b', md: ['cut', 'maintain'], k: 320, p: 24, f: 10, c: 34, t: 15,
      ing: ['Овсяные хлопья — 40 г (4 ст. л.)', 'Яйца — 2 шт.', 'Молоко — 50 мл (¼ стакана)', 'Творог 5% — 100 г', 'Соль — щепотка'],
      st: ['Измельчи хлопья в блендере (30 секунд).', 'Смешай с яйцами и молоком до состояния теста.', 'Вылей на сухую разогретую сковороду, готовь по 2–3 минуты с каждой стороны под крышкой.', 'Внутрь положи творог и сверни пополам.'] },
    { n: 'Творог с бананом и какао', e: '🍫', m: 'b', md: ['bulk', 'shred'], k: 320, p: 27, f: 6, c: 40, t: 5,
      ing: ['Творог 5% — 200 г', 'Банан — 1 шт.', 'Какао — 1 ч. л.', 'Мёд — 1 ч. л. (по желанию)'],
      st: ['Выложи творог в миску.', 'Банан нарежь кружками и добавь сверху.', 'Посыпь какао и полей мёдом.', 'Перемешай перед едой.'] },

    /* ---------- ОБЕДЫ ---------- */
    { n: 'Курица с гречкой и салатом', e: '🍗', m: 'l', md: ['bulk', 'cut', 'maintain'], k: 520, p: 48, f: 12, c: 55, t: 30,
      ing: ['Куриная грудка — 150 г', 'Гречка — 70 г сухой (⅓ стакана)', 'Помидор — 1 шт., огурец — 1 шт.', 'Оливковое масло — 1 ст. л.', 'Соль, перец, паприка'],
      st: ['Гречку залей 150 мл воды и вари 12 минут под крышкой.', 'Грудку разрежь вдоль, посоли, посыпь паприкой.', 'Обжарь на сухой сковороде по 4–5 минут с каждой стороны.', 'Овощи нарежь, заправь маслом, собери всё на тарелке.'] },
    { n: 'Индейка с рисом и брокколи', e: '🥦', m: 'l', md: ['cut', 'shred', 'maintain'], k: 470, p: 42, f: 10, c: 52, t: 30,
      ing: ['Филе индейки — 150 г', 'Рис — 70 г (⅓ стакана)', 'Брокколи — 200 г', 'Соевый соус — 1 ст. л.', 'Масло — 1 ч. л.'],
      st: ['Свари рис 12–15 минут.', 'Индейку нарежь полосками и обжарь 6–7 минут на масле.', 'Брокколи отвари 4 минуты или приготовь на пару.', 'Смешай всё и полей соевым соусом.'] },
    { n: 'Паста с тунцом и томатами', e: '🍝', m: 'l', md: ['bulk'], k: 610, p: 36, f: 16, c: 80, t: 20,
      ing: ['Макароны — 90 г сухих', 'Тунец в собственном соку — 1 банка (150 г)', 'Помидоры — 300 г (3 шт.)', 'Чеснок — 2 зубчика', 'Оливковое масло — 1 ст. л.'],
      st: ['Поставь вариться макароны (8–10 минут).', 'На масле обжарь чеснок 30 секунд, добавь помидоры.', 'Туши 5 минут, добавь тунец без жидкости, прогрей 2 минуты.', 'Смешай с макаронами прямо в сковороде.'] },
    { n: 'Суп-пюре из тыквы с курицей', e: '🍲', m: 'l', md: ['cut', 'shred'], k: 330, p: 28, f: 10, c: 30, t: 35,
      ing: ['Тыква — 400 г', 'Куриное филе — 150 г', 'Лук — 1 шт.', 'Сливки 10% — 100 мл', 'Масло — 1 ст. л.', 'Соль, перец'],
      st: ['Обжарь лук 3 минуты, добавь тыкву кубиком и готовь 5 минут.', 'Залей 500 мл воды, добавь курицу и вари 20 минут.', 'Достань курицу, разбери на волокна, овощи пробей блендером.', 'Влей сливки, верни курицу, согрей 2 минуты.'] },
    { n: 'Боул с рисом, яйцом и овощами', e: '🥗', m: 'l', md: ['maintain'], k: 480, p: 22, f: 14, c: 64, t: 25,
      ing: ['Рис — 70 г (⅓ стакана)', 'Яйца — 2 шт.', 'Морковь — 1 шт., огурец — 1 шт.', 'Кукуруза консервированная — 3 ст. л.', 'Соевый соус — 1 ст. л.'],
      st: ['Свари рис (12–15 минут) и яйца вкрутую (8 минут).', 'Морковь натри на крупной тёрке, огурец нарежь соломкой.', 'Собери: рис внизу, сверху овощи, кукуруза и половинки яиц.', 'Полей соевым соусом.'] },
    { n: 'Говядина тушёная с гречкой', e: '🥘', m: 'l', md: ['bulk'], k: 580, p: 42, f: 20, c: 58, t: 45,
      ing: ['Говядина — 150 г', 'Гречка — 70 г сухой', 'Лук — 1 шт., морковь — 1 шт.', 'Томатная паста — 1 ст. л.', 'Масло — 1 ст. л.'],
      st: ['Обжарь говядину кубиками 5 минут на масле.', 'Добавь лук и морковь, готовь 5 минут.', 'Добавь томатную пасту и 200 мл воды, туши под крышкой 25 минут.', 'Отдельно свари гречку и подавай с мясом и соусом.'] },
    { n: 'Салат «Цезарь» с курицей', e: '🥗', m: 'l', md: ['cut', 'shred'], k: 380, p: 36, f: 18, c: 18, t: 20,
      ing: ['Куриная грудка — 150 г', 'Салат айсберг/романо — 150 г', 'Помидоры черри — 100 г', 'Пармезан — 20 г', 'Натуральный йогурт — 3 ст. л.', 'Сухарики — 20 г'],
      st: ['Грудку посоли и обжарь по 4 минуты с каждой стороны, нарежь полосками.', 'Йогурт смешай с солью, перцем и давленым чесноком — это соус.', 'Порви салат, добавь черри и сухарики.', 'Сверху курица, соус и тёртый пармезан.'] },
    { n: 'Рыба, запечённая с картофелем', e: '🐟', m: 'l', md: ['maintain', 'bulk'], k: 500, p: 36, f: 16, c: 50, t: 40,
      ing: ['Картофель — 300 г (3 шт.)', 'Филе белой рыбы — 180 г', 'Оливковое масло — 1 ст. л.', 'Лимон — 2 дольки', 'Соль, перец, паприка'],
      st: ['Разогрей духовку до 200 °C.', 'Картофель дольками посоли, сбрызни маслом, запекай 20 минут.', 'Добавь рыбу, посыпь паприкой, сбрызни лимоном.', 'Запекай ещё 15–18 минут.'] },
    { n: 'Куриный суп с лапшой', e: '🍜', m: 'l', md: ['cut', 'shred'], k: 340, p: 30, f: 9, c: 34, t: 40,
      ing: ['Куриное бедро без кожи — 150 г', 'Лапша — 40 г сухой', 'Картофель — 1 шт.', 'Морковь — 1 шт., лук — 1 шт.', 'Соль, лавровый лист, зелень'],
      st: ['Курицу залей 700 мл воды, вари 20 минут, снимая пену.', 'Добавь картофель кубиком, морковь и лук — вари 10 минут.', 'Всыпь лапшу и вари ещё 3 минуты.', 'Посоли, добавь лавровый лист и зелень.'] },
    { n: 'Буррито с фаршем и фасолью', e: '🌯', m: 'l', md: ['bulk'], k: 600, p: 36, f: 22, c: 62, t: 25,
      ing: ['Лаваш тонкий — 1 лист (70 г)', 'Фарш — 120 г', 'Фасоль консервированная — 100 г', 'Помидор — 1 шт.', 'Сыр — 30 г', 'Специи, соль'],
      st: ['Обжарь фарш 7 минут, добавь специи и 2 ст. л. воды.', 'Добавь фасоль и помидор, туши 3 минуты.', 'Выложи начинку на лаваш, посыпь сыром, сверни конвертом.', 'Прогрей на сухой сковороде по 2 минуты с каждой стороны.'] },

    /* ---------- УЖИНЫ ---------- */
    { n: 'Рыба с овощами в духовке', e: '🐟', m: 'd', md: ['cut', 'shred', 'maintain'], k: 400, p: 38, f: 16, c: 24, t: 35,
      ing: ['Филе рыбы — 180 г', 'Кабачок — 1 небольшой (200 г)', 'Перец болгарский — 1 шт.', 'Оливковое масло — 1 ст. л.', 'Соль, перец, лимон'],
      st: ['Разогрей духовку до 200 °C.', 'Овощи нарежь крупно, посоли, сбрызни маслом, выложи на противень.', 'Запекай 12 минут, затем добавь рыбу и дольки лимона.', 'Запекай ещё 15 минут.'] },
    { n: 'Куриное филе в творожном соусе', e: '🍗', m: 'd', md: ['cut', 'shred'], k: 360, p: 44, f: 12, c: 16, t: 30,
      ing: ['Куриное филе — 180 г', 'Творог 5% — 100 г', 'Сметана 10% — 2 ст. л.', 'Чеснок — 1 зубчик', 'Зелень, соль, перец'],
      st: ['Филе разрежь вдоль, слегка отбей, посоли.', 'Обжарь по 5 минут с каждой стороны до корочки.', 'Творог смешай со сметаной, чесноком и зеленью.', 'Выложи соус на филе, накрой крышкой и прогрей 3 минуты.'] },
    { n: 'Омлет с грибами и сыром', e: '🍄', m: 'd', md: ['cut', 'shred'], k: 340, p: 26, f: 23, c: 8, t: 15,
      ing: ['Яйца — 3 шт.', 'Шампиньоны — 150 г', 'Сыр — 30 г', 'Масло — 1 ч. л.', 'Соль, перец'],
      st: ['Обжарь нарезанные грибы на масле 6–7 минут до румяности.', 'Взбей яйца с солью и перцем, залей грибы.', 'Готовь на малом огне под крышкой 5 минут.', 'Посыпь сыром и дай расплавиться.'] },
    { n: 'Тушёные овощи с индейкой', e: '🥘', m: 'd', md: ['cut', 'maintain'], k: 380, p: 36, f: 11, c: 32, t: 30,
      ing: ['Филе индейки — 180 г', 'Кабачок — 1 шт., перец — 1 шт.', 'Помидоры — 2 шт.', 'Лук — 1 шт.', 'Масло — 1 ст. л.', 'Соль, паприка'],
      st: ['Обжарь индейку кусочками 5 минут на масле.', 'Добавь лук, перец и кабачок, готовь 5 минут.', 'Добавь помидоры и специи, влей 100 мл воды.', 'Туши под крышкой 15 минут.'] },
    { n: 'Лосось с брокколи', e: '🥩', m: 'd', md: ['maintain', 'bulk'], k: 480, p: 40, f: 30, c: 12, t: 20,
      ing: ['Стейк лосося — 180 г', 'Брокколи — 200 г', 'Оливковое масло — 1 ст. л.', 'Лимон — ½ шт.', 'Соль, перец'],
      st: ['Разогрей сковороду-гриль, смажь маслом.', 'Лосось посоли и обжарь кожей вниз 4 минуты, переверни и готовь ещё 3 минуты.', 'Брокколи отвари 4 минуты или на пару.', 'Сбрызни лимоном и подавай сразу.'] },
    { n: 'Котлеты из индейки на пару', e: '🍖', m: 'd', md: ['cut', 'shred'], k: 360, p: 38, f: 13, c: 22, t: 35,
      ing: ['Фарш индейки — 200 г', 'Лук — ½ шт.', 'Яйцо — 1 шт.', 'Овсяные хлопья — 2 ст. л.', 'Соль, перец', 'Овощи для гарнира — 200 г'],
      st: ['Смешай фарш, тёртый лук, яйцо, хлопья и специи.', 'Сформируй 4 котлеты.', 'Готовь на пару 25 минут.', 'Подавай со свежими или тушёными овощами.'] },
    { n: 'Овощное рагу с фасолью', e: '🍲', m: 'd', md: ['cut', 'shred'], k: 300, p: 16, f: 8, c: 40, t: 30,
      ing: ['Фасоль консервированная — 200 г', 'Кабачок — 1 шт.', 'Морковь — 1 шт.', 'Лук — 1 шт.', 'Томатная паста — 1 ст. л.', 'Масло — 1 ст. л.'],
      st: ['Обжарь лук и морковь 5 минут на масле.', 'Добавь кабачок кубиком и томатную пасту.', 'Влей 150 мл воды и туши 12 минут.', 'Добавь фасоль, посоли и прогрей 5 минут.'] },
    { n: 'Куриный шашлык в духовке', e: '🍢', m: 'd', md: ['bulk', 'maintain'], k: 390, p: 40, f: 16, c: 14, t: 35,
      ing: ['Куриное филе — 200 г', 'Кефир — 100 мл (½ стакана)', 'Лук — 1 шт.', 'Паприка — 1 ч. л.', 'Соль, перец', 'Шпажки'],
      st: ['Нарежь филе кусочками, залей кефиром со специями на 15 минут.', 'Нанизывай на шпажки, чередуя с луком.', 'Разогрей духовку до 200 °C.', 'Запекай 20–25 минут, перевернув один раз.'] },
    { n: 'Творожная запеканка без муки', e: '🍰', m: 'd', md: ['bulk', 'maintain'], k: 340, p: 30, f: 12, c: 26, t: 50,
      ing: ['Творог 5% — 400 г', 'Яйца — 2 шт.', 'Манка — 2 ст. л.', 'Сахар — 1 ст. л.', 'Ванилин — щепотка', 'Сметана — 2 ст. л.'],
      st: ['Разогрей духовку до 180 °C.', 'Смешай творог, яйца, манку, сахар и ванилин.', 'Выложи в смазанную форму.', 'Запекай 30–35 минут, подай со сметаной.'] },
    { n: 'Гречка с грибами и луком', e: '🍄', m: 'd', md: ['cut', 'maintain'], k: 350, p: 14, f: 10, c: 50, t: 25,
      ing: ['Гречка — 70 г сухой', 'Шампиньоны — 200 г', 'Лук — 1 шт.', 'Масло — 1 ст. л.', 'Соль, перец'],
      st: ['Свари гречку (12 минут под крышкой).', 'Обжарь лук 3 минуты, добавь грибы и готовь 7 минут.', 'Смешай с гречкой.', 'Посоли, поперчи, прогрей минуту вместе.'] },

    /* ---------- ПЕРЕКУСЫ ---------- */
    { n: 'Яблоко и 10 миндалин', e: '🍏', m: 's', md: ['cut', 'shred'], k: 180, p: 4, f: 11, c: 18, t: 1,
      ing: ['Яблоко — 1 среднее (180 г)', 'Миндаль — 10 шт. (10 г)'],
      st: ['Яблоко помой и нарежь дольками.', 'Отсчитай ровно 10 миндалин — это 1 порция.', 'Ешь медленно, с кожурой яблока.'] },
    { n: 'Протеиновый коктейль', e: '🥛', m: 's', md: ['bulk', 'cut'], k: 220, p: 28, f: 3, c: 18, t: 3,
      ing: ['Протеин — 30 г (1 мерная ложка)', 'Молоко 1,5% — 250 мл (1 стакан)', 'Лёд — 3 кубика (по желанию)'],
      st: ['Налил молоко в шейкер.', 'Добавь ложку протеина и лёд.', 'Взбалтывай 20 секунд.', 'Пей сразу после тренировки.'] },
    { n: 'Творог 5% с мёдом', e: '🍶', m: 's', md: ['bulk', 'shred'], k: 200, p: 26, f: 6, c: 12, t: 3,
      ing: ['Творог 5% — 180 г', 'Мёд — 1 ч. л.', 'Корица — щепотка'],
      st: ['Выложи творог в миску.', 'Добавь ложку мёда и корицу.', 'Перемешай и ешь.'] },
    { n: 'Банан и 2 грецких ореха', e: '🍌', m: 's', md: ['bulk'], k: 210, p: 3, f: 8, c: 32, t: 1,
      ing: ['Банан — 1 шт.', 'Грецкие орехи — 2 шт.'],
      st: ['Очисти банан.', 'Съешь с двумя ядрами грецкого ореха.', 'Идеально за 40 минут до тренировки.'] },
    { n: 'Кефир 1% с зеленью', e: '🥤', m: 's', md: ['cut', 'shred'], k: 90, p: 9, f: 2, c: 8, t: 3,
      ing: ['Кефир 1% — 250 мл (1 стакан)', 'Укроп — 2 веточки', 'Огурец — ½ шт.', 'Соль — щепотка'],
      st: ['Огурец натри на мелкой тёрке.', 'Смешай с кефиром и рубленым укропом.', 'Посоли и размешай.', 'Пей охлаждённым.'] },
    { n: 'Ржаной тост с сыром', e: '🍞', m: 's', md: ['maintain'], k: 180, p: 9, f: 8, c: 17, t: 4,
      ing: ['Хлеб ржаной — 1 ломтик (35 г)', 'Сыр 45% — 25 г', 'Огурец — ½ шт.'],
      st: ['Подсуши хлеб в тостере.', 'Положи ломтик сыра и прогрей 20 секунд.', 'Сверху кружки огурца.'] },
    { n: 'Тыквенные семечки', e: '🌰', m: 's', md: ['maintain'], k: 160, p: 7, f: 13, c: 4, t: 1,
      ing: ['Тыквенные семечки — 25 г (1 горсть, ~2 ст. л.)'],
      st: ['Отмерь ровно горсть — не ешь прямо из пакета.', 'Можно слегка подсушить на сухой сковороде 2 минуты.', 'Хороший источник цинка и магния.'] },
    { n: 'Хумус с морковью', e: '🥕', m: 's', md: ['maintain', 'cut'], k: 150, p: 6, f: 9, c: 12, t: 5,
      ing: ['Хумус — 50 г (2 ст. л.)', 'Морковь — 2 шт.', 'Паприка — щепотка'],
      st: ['Морковь нарежь палочками.', 'Выложи хумус в мисочку, посыпь паприкой.', 'Макай морковь в хумус.'] }
  ];

  /* ==================== СОСТОЯНИЕ ==================== */
  var LS = 'gm_diet_v2';
  var state = { mode: 'maintain', log: {}, profile: null };
  (function load() {
    try {
      var raw = localStorage.getItem(LS);
      if (!raw) return;
      var o = JSON.parse(raw);
      if (!o || typeof o !== 'object') return;
      if (o.mode && MODES[o.mode]) state.mode = o.mode;
      if (o.log && typeof o.log === 'object') state.log = o.log;
      if (o.profile && typeof o.profile === 'object') state.profile = o.profile;
    } catch (e) {}
  })();
  function save() {
    try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {}
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function todayLog() {
    var k = todayKey();
    if (!state.log[k] || !Array.isArray(state.log[k])) state.log[k] = [];
    return state.log[k];
  }

  /* ==================== ПРОФИЛЬ И НОРМЫ ==================== */
  var PROFILE_KEYS = ['gm_profile', 'gymmind_profile', 'gm_user', 'gymmind_user', 'profile', 'user', 'gm_anketa'];
  var F = {
    weight: ['weight', 'вес', 'w', 'mass'],
    height: ['height', 'рост', 'h'],
    age: ['age', 'возраст', 'years'],
    sex: ['sex', 'пол', 'gender'],
    activity: ['activity', 'активность', 'act', 'activityLevel']
  };
  function pick(o, names) {
    for (var i = 0; i < names.length; i++) {
      var v = o[names[i]];
      if (v !== undefined && v !== null && v !== '') return v;
    }
    return '';
  }
  function readForeignProfile() {
    for (var i = 0; i < PROFILE_KEYS.length; i++) {
      var raw = null;
      try { raw = localStorage.getItem(PROFILE_KEYS[i]); } catch (e) {}
      if (!raw) continue;
      try {
        var o = JSON.parse(raw);
        if (!o || typeof o !== 'object') continue;
        var p = o.profile || o.anketa || o.data || o;
        var w = Number(pick(p, F.weight)) || 0;
        var h = Number(pick(p, F.height)) || 0;
        var a = Number(pick(p, F.age)) || 0;
        if (w || h || a) {
          return { weight: w, height: h, age: a, sex: String(pick(p, F.sex) || ''), activity: pick(p, F.activity) || '' };
        }
      } catch (e) {}
    }
    return null;
  }
  function activeProfile() {
    if (state.profile && (state.profile.weight || state.profile.height || state.profile.age)) return state.profile;
    return readForeignProfile();
  }
  function actFactor(v) {
    var n = parseFloat(v);
    if (!isNaN(n) && n > 1 && n < 2.5) return n;
    var s = String(v || '').toLowerCase();
    if (/низк|low|сидяч|min/.test(s)) return 1.3;
    if (/высок|high|очень|very/.test(s)) return 1.7;
    if (/сред|medium|moder/.test(s)) return 1.5;
    return 1.45;
  }
  function targets() {
    var m = MODES[state.mode];
    var p = activeProfile();
    var kcal;
    if (p && p.weight && p.height && p.age) {
      var s = String(p.sex).toLowerCase();
      var isF = /^(f|ж|жен|female)/.test(s);
      var bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + (isF ? -161 : 5);
      kcal = bmr * actFactor(p.activity) * m.adj;
    } else {
      kcal = m.base;
    }
    kcal = Math.round(kcal / 10) * 10;
    var w = (p && p.weight) ? p.weight : (state.mode === 'bulk' ? 75 : 70);
    var prot = Math.round(m.prot * w);
    var fat = Math.round(m.fat * w);
    var carb = Math.round((kcal - prot * 4 - fat * 9) / 4);
    if (carb < 30) carb = 30;
    return { kcal: kcal, p: prot, f: fat, c: carb };
  }
  function eaten() {
    var list = todayLog(), o = { k: 0, p: 0, f: 0, c: 0 };
    for (var i = 0; i < list.length; i++) {
      o.k += Number(list[i].k) || 0;
      o.p += Number(list[i].p) || 0;
      o.f += Number(list[i].f) || 0;
      o.c += Number(list[i].c) || 0;
    }
    return o;
  }

  /* ==================== УТИЛИТЫ ==================== */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function li(x) { return '<li>' + esc(x) + '</li>'; }
  var MEALS = { b: 'Завтрак', l: 'Обед', d: 'Ужин', s: 'Перекус' };
  function toast(msg) {
    var t = document.getElementById('gmdToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'gmdToast';
      t.className = 'gmd-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t.__tm);
    t.__tm = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* ==================== РАЗМЕТКА ==================== */
  var HTML =
    '<div class="card gmd-card">' +
      '<h3><span class="ico">🎯</span> Режим питания и калории на день</h3>' +
      '<div class="gmd-modes" id="gmdModes"></div>' +
      '<div class="gmd-desc" id="gmdDesc"></div>' +
      '<div class="gmd-kpis">' +
        '<div class="gmd-kpi"><b id="gmdTarget">—</b><span>ккал цель</span></div>' +
        '<div class="gmd-kpi amber"><b id="gmdLeft">—</b><span>осталось добрать</span></div>' +
        '<div class="gmd-kpi pink"><b id="gmdEaten">—</b><span>съедено</span></div>' +
      '</div>' +
      '<div class="bar"><i id="gmdBar" style="width:0%"></i></div>' +
      '<div class="gmd-macros">' +
        '<div class="gmd-m"><span>Белки</span><b id="gmdPv">—</b><div class="gmd-mb"><i id="gmdPb"></i></div></div>' +
        '<div class="gmd-m"><span>Жиры</span><b id="gmdFv">—</b><div class="gmd-mb"><i id="gmdFb"></i></div></div>' +
        '<div class="gmd-m"><span>Углеводы</span><b id="gmdCv">—</b><div class="gmd-mb"><i id="gmdCb"></i></div></div>' +
      '</div>' +
      '<div class="gmd-tips" id="gmdTips"></div>' +
      '<div class="btn-row">' +
        '<button class="btn sm primary" data-gmd="quick">＋ Что съел</button>' +
        '<button class="btn sm" data-gmd="profile">⚙️ Мои данные</button>' +
        '<button class="btn sm ghost" data-gmd="reset">↺ Сброс дня</button>' +
      '</div>' +
      '<div class="gmd-form" id="gmdProfileForm" hidden>' +
        '<div class="grid2">' +
          '<div class="field"><label>Вес, кг</label><input id="gmdW" type="number" inputmode="decimal" placeholder="72"></div>' +
          '<div class="field"><label>Рост, см</label><input id="gmdH" type="number" inputmode="numeric" placeholder="178"></div>' +
          '<div class="field"><label>Возраст</label><input id="gmdA" type="number" inputmode="numeric" placeholder="28"></div>' +
          '<div class="field"><label>Пол</label><select id="gmdS"><option value="m">Мужской</option><option value="f">Женский</option></select></div>' +
        '</div>' +
        '<div class="field"><label>Активность</label><select id="gmdAct">' +
          '<option value="1.3">Низкая — сидячая работа, без тренировок</option>' +
          '<option value="1.45" selected>Средняя — 3–4 тренировки в неделю</option>' +
          '<option value="1.6">Высокая — 5–6 тренировок в неделю</option>' +
          '<option value="1.75">Очень высокая — ежедневно + физическая работа</option>' +
        '</select></div>' +
        '<button class="btn primary full" data-gmd="saveProfile">Сохранить и пересчитать</button>' +
      '</div>' +
    '</div>' +
    '<div class="card gmd-card">' +
      '<h3><span class="ico">📋</span> Съедено сегодня</h3>' +
      '<div id="gmdLogList"></div>' +
      '<div class="gmd-hint" id="gmdLeftHint"></div>' +
    '</div>' +
    '<div class="card gmd-card">' +
      '<h3><span class="ico">🍽</span> Рецепты под твой режим</h3>' +
      '<div class="gmd-sub" id="gmdRecDesc"></div>' +
      '<div class="seg" id="gmdMealSeg">' +
        '<button class="on" data-gmd="meal" data-meal="all">Все</button>' +
        '<button data-gmd="meal" data-meal="b">Завтрак</button>' +
        '<button data-gmd="meal" data-meal="l">Обед</button>' +
        '<button data-gmd="meal" data-meal="d">Ужин</button>' +
        '<button data-gmd="meal" data-meal="s">Перекус</button>' +
      '</div>' +
      '<div class="gmd-grid" id="gmdGrid"></div>' +
      '<button class="btn full" id="gmdMore" data-gmd="more" style="margin-top:14px">Показать ещё</button>' +
    '</div>';

  var CSS =
    '.gmd-host{display:flex;flex-direction:column;gap:16px;margin-bottom:16px}' +
    '.gmd-modes{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:12px}' +
    '.gmd-mode{border:1px solid rgba(255,255,255,.07);background:#0f1728;border-radius:14px;padding:11px 12px;cursor:pointer;text-align:left;color:#8b9ab5;font-family:inherit;font-size:12px;font-weight:700;transition:.2s;display:flex;align-items:center;gap:8px}' +
    '.gmd-mode b{font-size:16px}' +
    '.gmd-mode:hover{border-color:rgba(139,92,246,.5);color:#e8eefc;transform:translateY(-1px)}' +
    '.gmd-mode.on{background:linear-gradient(135deg,rgba(139,92,246,.28),rgba(45,212,191,.2));border-color:rgba(139,92,246,.55);color:#e8eefc;box-shadow:0 8px 22px rgba(139,92,246,.22)}' +
    '.gmd-desc{font-size:12px;line-height:1.6;color:#c9d5ec;background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.24);border-radius:14px;padding:11px 13px;margin-bottom:14px}' +
    '.gmd-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:6px}' +
    '.gmd-kpi{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:11px}' +
    '.gmd-kpi b{display:block;font-size:24px;font-weight:800;letter-spacing:-.5px;background:linear-gradient(135deg,#c4b5fd,#5eead4);-webkit-background-clip:text;background-clip:text;color:transparent}' +
    '.gmd-kpi.amber b{background:linear-gradient(135deg,#fde68a,#fbbf24);-webkit-background-clip:text;background-clip:text;color:transparent}' +
    '.gmd-kpi.pink b{background:linear-gradient(135deg,#f9a8d4,#f472b6);-webkit-background-clip:text;background-clip:text;color:transparent}' +
    '.gmd-kpi span{display:block;font-size:10px;color:#8b9ab5;margin-top:4px;font-weight:600}' +
    '.gmd-macros{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}' +
    '.gmd-m{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:10px}' +
    '.gmd-m span{font-size:10px;color:#8b9ab5;font-weight:700;text-transform:uppercase;letter-spacing:.6px}' +
    '.gmd-m b{display:block;font-size:13px;font-weight:800;margin-top:4px}' +
    '.gmd-mb{height:5px;border-radius:99px;background:#0d1424;overflow:hidden;margin-top:7px}' +
    '.gmd-mb i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#8b5cf6,#2dd4bf);transition:width .45s}' +
    '.gmd-tips{margin-top:14px;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.24);border-radius:14px;padding:11px 13px}' +
    '.gmd-tips ul{margin:0;padding-left:16px}' +
    '.gmd-tips li{font-size:11.5px;line-height:1.6;color:#dbe4f5;margin-bottom:3px}' +
    '.gmd-form{margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.07)}' +
    '.gmd-hint{margin-top:12px;font-size:12px;line-height:1.65;color:#c9d5ec;background:rgba(45,212,191,.07);border:1px solid rgba(45,212,191,.24);border-radius:14px;padding:11px 13px}' +
    '.gmd-hint b{color:#5eead4}' +
    '.gmd-sub{font-size:12px;color:#8b9ab5;margin-bottom:12px;line-height:1.55}' +
    '.gmd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}' +
    '.gmd-rc{background:#0f1728;border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden;cursor:pointer;transition:.22s;display:flex;flex-direction:column}' +
    '.gmd-rc:hover{transform:translateY(-3px);border-color:rgba(139,92,246,.5);box-shadow:0 14px 34px rgba(0,0,0,.42)}' +
    '.gmd-cover{aspect-ratio:16/10;display:grid;place-items:center;font-size:40px;position:relative;background:linear-gradient(135deg,rgba(139,92,246,.34),rgba(45,212,191,.2))}' +
    '.gmd-kcalbadge{position:absolute;right:8px;bottom:8px;font-size:10px;font-weight:800;padding:3px 8px;border-radius:8px;background:rgba(5,8,14,.8);color:#fcd34d}' +
    '.gmd-tagmode{position:absolute;left:8px;top:8px;font-size:9px;font-weight:800;padding:3px 7px;border-radius:8px;background:rgba(5,8,14,.72);color:#5eead4;text-transform:uppercase;letter-spacing:.5px}' +
    '.gmd-rb{padding:11px 12px 13px}' +
    '.gmd-rb b{font-size:12.5px;display:block;line-height:1.35;margin-bottom:4px}' +
    '.gmd-rowright{display:flex;align-items:center;gap:8px}' +
    '.gmd-x{width:26px;height:26px;border-radius:9px;border:1px solid rgba(248,113,113,.35);background:rgba(248,113,113,.12);color:#fca5a5;font-size:11px;cursor:pointer;font-family:inherit;flex:0 0 auto}' +
    '.gmd-overlay{position:fixed;inset:0;z-index:120;background:rgba(5,8,14,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;padding:0}' +
    '.gmd-modal{width:100%;max-width:520px;max-height:88vh;overflow-y:auto;background:linear-gradient(170deg,#141b2d,#0f1728);border:1px solid rgba(255,255,255,.1);border-radius:22px 22px 0 0;padding:20px 18px calc(26px + env(safe-area-inset-bottom));position:relative;animation:gmdUp .28s cubic-bezier(.2,.8,.2,1)}' +
    '@media(min-width:560px){.gmd-overlay{align-items:center;padding:20px}.gmd-modal{border-radius:22px}}' +
    '@keyframes gmdUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}' +
    '.gmd-close{position:absolute;right:14px;top:14px;width:32px;height:32px;border-radius:11px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#e8eefc;font-size:13px;cursor:pointer;font-family:inherit}' +
    '.gmd-mcover{font-size:52px;text-align:center;padding:10px 0 6px}' +
    '.gmd-modal h3{font-size:17px;margin-bottom:10px;line-height:1.3}' +
    '.gmd-mmeta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}' +
    '.gmd-h4{font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8b9ab5;margin:14px 0 8px}' +
    '.gmd-ul,.gmd-ol{margin:0;padding-left:18px}' +
    '.gmd-ul li,.gmd-ol li{font-size:12.5px;line-height:1.7;color:#dbe4f5;margin-bottom:4px}' +
    '.gmd-toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,30px);opacity:0;pointer-events:none;background:#1d2942;border:1px solid rgba(139,92,246,.5);color:#e8eefc;padding:12px 20px;border-radius:14px;font-size:13px;font-weight:600;z-index:200;transition:.32s cubic-bezier(.2,.8,.2,1);box-shadow:0 16px 40px rgba(0,0,0,.55);max-width:88vw;text-align:center}' +
    '.gmd-toast.show{opacity:1;transform:translate(-50%,0)}' +
    '.gmd-qrow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.06)}' +
    '.gmd-qrow:last-child{border-bottom:none}';

  /* ==================== ПОИСК КОНТЕЙНЕРА ==================== */
  function findRoot() {
    var ids = ['view-nutrition', 'view-food', 'view-nutri', 'nutrition', 'food'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el) return el;
    }
    var tabs = document.querySelectorAll('.tab,[data-tab],[data-view]');
    for (var j = 0; j < tabs.length; j++) {
      var t = (tabs[j].textContent || '').toLowerCase();
      var key = tabs[j].getAttribute('data-tab') || tabs[j].getAttribute('data-view');
      if (key && /питани|еда|food|meal|нутри/.test(t)) {
        var v = document.getElementById('view-' + key) || document.querySelector('[data-view="' + key + '"]');
        if (v && v !== tabs[j]) return v;
      }
    }
    var views = document.querySelectorAll('[id^="view"]');
    for (var k = 0; k < views.length; k++) {
      if (/питани/i.test((views[k].textContent || '').slice(0, 300))) return views[k];
    }
    return document.querySelector('main') || document.body;
  }

  /* ==================== ЛОГИКА РЕЦЕПТОВ ==================== */
  var mealFilter = 'all';
  var visible = 4;

  function recipesFor(mode, meal) {
    var out = [];
    for (var i = 0; i < R.length; i++) {
      var r = R[i];
      if (r.md.indexOf(mode) < 0) continue;
      if (meal !== 'all' && r.m !== meal) continue;
      out.push(r);
    }
    if (out.length < 6) {
      for (var j = 0; j < R.length; j++) {
        var x = R[j];
        if (out.indexOf(x) >= 0) continue;
        if (meal !== 'all' && x.m !== meal) continue;
        out.push(x);
      }
    }
    return out;
  }

  function suggestFor(left) {
    if (left <= 0) return null;
    var best = null, diff = 1e9;
    for (var i = 0; i < R.length; i++) {
      if (R[i].md.indexOf(state.mode) < 0) continue;
      var d = Math.abs(R[i].k - left);
      if (d < diff) { diff = d; best = R[i]; }
    }
    return best;
  }

  /* ==================== РЕНДЕР ==================== */
  function renderModes() {
    var box = document.getElementById('gmdModes');
    if (!box) return;
    var h = '';
    for (var i = 0; i < MODE_ORDER.length; i++) {
      var m = MODES[MODE_ORDER[i]];
      h += '<button class="gmd-mode' + (state.mode === m.id ? ' on' : '') + '" data-gmd="mode" data-mode="' + m.id + '"><b>' + m.ico + '</b>' + esc(m.name) + '</button>';
    }
    box.innerHTML = h;
    document.getElementById('gmdDesc').textContent = MODES[state.mode].desc;
    var tips = MODES[state.mode].tips, th = '';
    for (var j = 0; j < tips.length; j++) th += li(tips[j]);
    document.getElementById('gmdTips').innerHTML = '<ul>' + th + '</ul>';
  }

  function renderKpi() {
    var tg = targets(), eat = eaten();
    var leftK = Math.max(0, tg.kcal - eat.k);
    var leftP = Math.max(0, tg.p - eat.p);
    var leftF = Math.max(0, tg.f - eat.f);
    var leftC = Math.max(0, tg.c - eat.c);
    var pct = Math.min(100, Math.round(eat.k / tg.kcal * 100));

    document.getElementById('gmdTarget').textContent = tg.kcal;
    document.getElementById('gmdLeft').textContent = leftK;
    document.getElementById('gmdEaten').textContent = eat.k;
    document.getElementById('gmdBar').style.width = pct + '%';
    document.getElementById('gmdPv').textContent = Math.round(eat.p) + ' / ' + tg.p + ' г';
    document.getElementById('gmdFv').textContent = Math.round(eat.f) + ' / ' + tg.f + ' г';
    document.getElementById('gmdCv').textContent = Math.round(eat.c) + ' / ' + tg.c + ' г';
    document.getElementById('gmdPb').style.width = Math.min(100, Math.round(eat.p / tg.p * 100)) + '%';
    document.getElementById('gmdFb').style.width = Math.min(100, Math.round(eat.f / tg.f * 100)) + '%';
    document.getElementById('gmdCb').style.width = Math.min(100, Math.round(eat.c / tg.c * 100)) + '%';

    var hint = '';
    if (eat.k === 0) {
      hint = 'Норма на сегодня — <b>' + tg.kcal + ' ккал</b>. Добавь первый приём пищи, и я покажу, сколько останется.';
    } else if (leftK <= 0) {
      hint = 'Норма закрыта: съедено <b>' + eat.k + ' ккал</b> из ' + tg.kcal + '. Дальше — только вода и зелень, иначе режим не сработает.';
    } else {
      var s = suggestFor(leftK);
      hint = 'Осталось добрать <b>' + leftK + ' ккал</b> · Б ' + leftP + ' г · Ж ' + leftF + ' г · У ' + leftC + ' г.';
      if (s) hint += ' Ближе всего по калориям — «' + esc(s.n) + '» (' + s.k + ' ккал).';
    }
    document.getElementById('gmdLeftHint').innerHTML = hint;
  }

  function renderLog() {
    var el = document.getElementById('gmdLogList');
    if (!el) return;
    var list = todayLog();
    if (!list.length) {
      el.innerHTML = '<div class="empty">Пока ничего не добавлено. Нажми «＋ Что съел» или «Я это съел» на карточке рецепта.</div>';
      return;
    }
    var h = '';
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      h += '<div class="row"><div><b>' + esc(it.n) + '</b>' +
        '<div class="tiny muted">Б ' + (it.p || 0) + ' · Ж ' + (it.f || 0) + ' · У ' + (it.c || 0) + '</div></div>' +
        '<div class="gmd-rowright"><span class="tag amber">' + (it.k || 0) + ' ккал</span>' +
        '<button class="gmd-x" data-gmd="del" data-ts="' + it.ts + '">✕</button></div></div>';
    }
    el.innerHTML = h;
  }

  function renderGrid() {
    var el = document.getElementById('gmdGrid');
    if (!el) return;
    var list = recipesFor(state.mode, mealFilter);
    var shown = list.slice(0, visible);
    var h = '';
    for (var i = 0; i < shown.length; i++) {
      var r = shown[i];
      var own = r.md.indexOf(state.mode) >= 0;
      h += '<div class="gmd-rc" data-gmd="open" data-i="' + R.indexOf(r) + '">' +
        '<div class="gmd-cover">' + r.e +
          '<span class="gmd-tagmode">' + (own ? MODES[state.mode].name : 'универсально') + '</span>' +
          '<span class="gmd-kcalbadge">' + r.k + ' ккал</span>' +
        '</div>' +
        '<div class="gmd-rb"><b>' + esc(r.n) + '</b>' +
          '<div class="tiny muted">' + MEALS[r.m] + ' · ' + r.t + ' мин · Б ' + r.p + ' Ж ' + r.f + ' У ' + r.c + '</div>' +
        '</div></div>';
    }
    el.innerHTML = h;
    var more = document.getElementById('gmdMore');
    if (list.length > visible) {
      more.style.display = '';
      more.textContent = 'Показать ещё (' + (list.length - visible) + ')';
    } else {
      more.style.display = 'none';
    }
    var sub = document.getElementById('gmdRecDesc');
    sub.innerHTML = 'Подобрано под режим <b>' + MODES[state.mode].name + '</b>: ' + list.length +
      ' рецептов. Каждый — с точными граммами и ложками, калориями и видео, как готовить.';
  }

  function renderAll() {
    renderModes();
    renderKpi();
    renderLog();
    renderGrid();
  }

  /* ==================== МОДАЛКИ ==================== */
  function closeModal() {
    var ov = document.getElementById('gmdOverlay');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
  }
  function showModal(inner) {
    closeModal();
    var ov = document.createElement('div');
    ov.id = 'gmdOverlay';
    ov.className = 'gmd-overlay';
    ov.innerHTML = '<div class="gmd-modal"><button class="gmd-close" data-gmd="close">✕</button>' + inner + '</div>';
    ov.addEventListener('click', function (e) {
      if (e.target === ov) closeModal();
    });
    document.body.appendChild(ov);
    ov.querySelector('.gmd-modal').scrollTop = 0;
  }

  function openRecipe(idx) {
    var r = R[idx];
    if (!r) return;
    var h = '<div class="gmd-mcover">' + r.e + '</div>' +
      '<h3>' + esc(r.n) + '</h3>' +
      '<div class="gmd-mmeta">' +
        '<span class="tag amber">' + r.k + ' ккал</span>' +
        '<span class="tag green">Б ' + r.p + ' г</span>' +
        '<span class="tag red">Ж ' + r.f + ' г</span>' +
        '<span class="tag teal">У ' + r.c + ' г</span>' +
        '<span class="tag">⏱ ' + r.t + ' мин</span>' +
        '<span class="tag">' + MEALS[r.m] + '</span>' +
      '</div>' +
      '<div class="gmd-h4">Что взять (на 1 порцию)</div>' +
      '<ul class="gmd-ul">' + r.ing.map(li).join('') + '</ul>' +
      '<div class="gmd-h4">Как готовить — по шагам</div>' +
      '<ol class="gmd-ol">' + r.st.map(li).join('') + '</ol>' +
      '<div class="btn-row">' +
        '<button class="btn primary full" data-gmd="eat" data-i="' + idx + '">✓ Я это съел</button>' +
        '<button class="btn full" data-gmd="video" data-i="' + idx + '">▶ Видео, как готовить</button>' +
      '</div>';
    showModal(h);
  }

  function openQuick() {
    var h = '<h3>Что ты съел?</h3>' +
      '<div class="field" style="margin-top:12px"><label>Поиск по блюдам</label>' +
      '<input id="gmdSearch" placeholder="например: творог, курица, овсянка" autocomplete="off"></div>' +
      '<div id="gmdSearchList" class="list" style="max-height:250px"></div>' +
      '<div class="divider"></div>' +
      '<div class="gmd-h4">Или впиши вручную</div>' +
      '<div class="field"><label>Название</label><input id="gmdMn" placeholder="Шаурма с курицей"></div>' +
      '<div class="grid3">' +
        '<div class="field"><label>Ккал</label><input id="gmdMk" type="number" inputmode="numeric" placeholder="450"></div>' +
        '<div class="field"><label>Белки, г</label><input id="gmdMp" type="number" inputmode="numeric" placeholder="25"></div>' +
        '<div class="field"><label>Жиры, г</label><input id="gmdMf" type="number" inputmode="numeric" placeholder="18"></div>' +
      '</div>' +
      '<div class="field"><label>Углеводы, г</label><input id="gmdMc" type="number" inputmode="numeric" placeholder="40"></div>' +
      '<button class="btn primary full" data-gmd="manual">Добавить в дневник</button>';
    showModal(h);
    filterQuick('');
    var inp = document.getElementById('gmdSearch');
    if (inp) {
      inp.addEventListener('input', function () { filterQuick(this.value); });
      setTimeout(function () { inp.focus(); }, 250);
    }
  }

  function filterQuick(q) {
    var box = document.getElementById('gmdSearchList');
    if (!box) return;
    q = String(q || '').toLowerCase().trim();
    var out = [], i;
    for (i = 0; i < R.length; i++) {
      if (R[i].md.indexOf(state.mode) < 0) continue;
      if (q && R[i].n.toLowerCase().indexOf(q) < 0) continue;
      out.push(i);
    }
    if (!out.length) {
      for (i = 0; i < R.length; i++) {
        if (q && R[i].n.toLowerCase().indexOf(q) < 0) continue;
        out.push(i);
      }
    }
    var h = '';
    for (i = 0; i < out.length && i < 10; i++) {
      var r = R[out[i]];
      h += '<div class="gmd-qrow"><div><b style="font-size:13px">' + r.e + ' ' + esc(r.n) + '</b>' +
        '<div class="tiny muted">' + r.k + ' ккал · Б ' + r.p + ' Ж ' + r.f + ' У ' + r.c + '</div></div>' +
        '<button class="btn sm teal" data-gmd="eat" data-i="' + out[i] + '">＋</button></div>';
    }
    box.innerHTML = h || '<div class="empty">Ничего не нашлось — впиши блюдо вручную ниже.</div>';
  }

  /* ==================== ДЕЙСТВИЯ ==================== */
  function addFood(name, k, p, f, c) {
    var list = todayLog();
    list.push({ n: String(name).slice(0, 60), k: Math.round(+k || 0), p: Math.round(+p || 0), f: Math.round(+f || 0), c: Math.round(+c || 0), ts: Date.now() + Math.random() });
    save();
    renderKpi();
    renderLog();
    toast('Добавлено: ' + name + ' · ' + Math.round(+k || 0) + ' ккал');
  }

  function addRecipe(idx) {
    var r = R[idx];
    if (!r) return;
    addFood(r.n, r.k, r.p, r.f, r.c);
    closeModal();
  }

  function openVideo(idx) {
    var r = R[idx];
    if (!r) return;
    var q = encodeURIComponent('рецепт ' + r.n + ' как готовить');
    window.open('https://www.youtube.com/results?search_query=' + q, '_blank');
  }

  function fillProfileForm() {
    var p = activeProfile() || {};
    var w = document.getElementById('gmdW');
    if (!w) return;
    w.value = p.weight || '';
    document.getElementById('gmdH').value = p.height || '';
    document.getElementById('gmdA').value = p.age || '';
    var sex = String(p.sex || 'm').toLowerCase();
    document.getElementById('gmdS').value = /^(f|ж|жен)/.test(sex) ? 'f' : 'm';
    var act = parseFloat(p.activity);
    if (!isNaN(act)) document.getElementById('gmdAct').value = String(act);
  }

  function saveProfile() {
    var p = {
      weight: Number(document.getElementById('gmdW').value) || 0,
      height: Number(document.getElementById('gmdH').value) || 0,
      age: Number(document.getElementById('gmdA').value) || 0,
      sex: document.getElementById('gmdS').value,
      activity: document.getElementById('gmdAct').value
    };
    state.profile = p;
    save();
    renderKpi();
    toast('Данные сохранены — нормы пересчитаны');
  }

  /* ==================== СОБЫТИЯ ==================== */
  function onClick(e) {
    var t = e.target;
    var btn = t.closest ? t.closest('[data-gmd]') : null;
    if (!btn) return;
    var act = btn.getAttribute('data-gmd');

    if (act === 'mode') {
      var m = btn.getAttribute('data-mode');
      if (MODES[m]) {
        state.mode = m;
        save();
        visible = 4;
        renderModes();
        renderKpi();
        renderGrid();
        toast('Режим: ' + MODES[m].name);
      }
      return;
    }
    if (act === 'meal') {
      mealFilter = btn.getAttribute('data-meal');
      visible = 4;
      var segs = document.querySelectorAll('#gmdMealSeg button');
      for (var i = 0; i < segs.length; i++) segs[i].classList.toggle('on', segs[i] === btn);
      renderGrid();
      return;
    }
    if (act === 'more') {
      visible += 8;
      renderGrid();
      return;
    }
    if (act === 'open') {
      openRecipe(Number(btn.getAttribute('data-i')));
      return;
    }
    if (act === 'eat') {
      addRecipe(Number(btn.getAttribute('data-i')));
      return;
    }
    if (act === 'video') {
      openVideo(Number(btn.getAttribute('data-i')));
      return;
    }
    if (act === 'del') {
      var ts = Number(btn.getAttribute('data-ts'));
      var list = todayLog();
      for (var j = list.length - 1; j >= 0; j--) {
        if (Number(list[j].ts) === ts) list.splice(j, 1);
      }
      save();
      renderKpi();
      renderLog();
      toast('Удалено из дневника');
      return;
    }
    if (act === 'reset') {
      if (!window.confirm('Очистить дневник за сегодня?')) return;
      state.log[todayKey()] = [];
      save();
      renderKpi();
      renderLog();
      toast('Дневник дня очищен');
      return;
    }
    if (act === 'profile') {
      var form = document.getElementById('gmdProfileForm');
      form.hidden = !form.hidden;
      if (!form.hidden) fillProfileForm();
      return;
    }
    if (act === 'saveProfile') {
      saveProfile();
      return;
    }
    if (act === 'quick') {
      openQuick();
      return;
    }
    if (act === 'manual') {
      var n = document.getElementById('gmdMn').value.trim();
      var k = Number(document.getElementById('gmdMk').value) || 0;
      if (!n || !k) { toast('Впиши название и калории'); return; }
      addFood(n, k,
        Number(document.getElementById('gmdMp').value) || 0,
        Number(document.getElementById('gmdMf').value) || 0,
        Number(document.getElementById('gmdMc').value) || 0);
      closeModal();
      return;
    }
    if (act === 'close') {
      closeModal();
      return;
    }
  }

  function onKey(e) {
    if (e.key === 'Escape') closeModal();
  }

  /* ==================== СТАРТ ==================== */
  function boot() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var host = document.createElement('div');
    host.className = 'gmd-host';
    host.innerHTML = HTML;
    var root = findRoot();
    if (root && root.firstChild) root.insertBefore(host, root.firstChild);
    else root.appendChild(host);

    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey);
    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 60); });
  else setTimeout(boot, 60);
})();