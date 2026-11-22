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

  /* ==================== СОВЕТЫ ПО ЕДЕ И ВОДЕ ==================== */
  var FOOD_TIPS = {
    bulk: [
      'Добавляй ложку оливкового масла в готовые блюда — +120 ккал без объёма.',
      'Пей калорийные смузи: молоко + банан + овсянка + протеин = ~500 ккал.',
      'Ешь каждые 3–4 часа, даже если не хочется — иначе не наберёшь норму.',
      'Взвешивайся раз в неделю: +0,3–0,5 кг — идеальный темп набора.'
    ],
    cut: [
      'Ешь медленно, по 20 минут на приём — насыщение приходит раньше.',
      'Пей стакан воды за 20 минут до еды — снижает аппетит.',
      'Замени гарнир на овощи: та же тарелка, минус 200 ккал.',
      'Белок в каждом приёме — сохраняет мышцы в дефиците.'
    ],
    shred: [
      'Готовь заранее: контейнеры на 2 дня спасают от срывов.',
      'Углеводы — только до и после тренировки, в остальное время белок + овощи.',
      'Не сокращай соль резко — упадёт сила и появятся судороги.',
      'Раз в неделю — «загрузочный» день на норму поддержания.'
    ],
    maintain: [
      'Правило тарелки: ½ овощи, ¼ белок, ¼ гарнир — без подсчётов.',
      'Один свободный приём пищи в неделю — психологически легче держать форму.',
      'Следи за белком: 1,6 г на кг веса — минимум для сохранения мышц.',
      'Взвешивайся в одно и то же время — так видно реальный тренд.'
    ]
  };

  var WATER_TIPS = [
    'Стакан воды (250 мл) сразу после пробуждения — запускает метаболизм.',
    'За 20 минут до тренировки — 250–300 мл, во время — по 150 мл каждые 15 минут.',
    'После тренировки — 500 мл на каждый потерянный кг веса (взвесься до и после).',
    'Кофе и чай считаются в норму, но не заменяют чистую воду.',
    'Моча светло-жёлтая — значит воды хватает. Тёмная — пей больше.',
    'При обильном потоотделении добавь щепотку соли в воду — восстановит электролиты.'
  ];

  /* ==================== СОСТОЯНИЕ ==================== */
  var LS = 'gm_diet_v2';
  var MODE_LS = 'gm_diet_mode';
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
      '<div class="gmd-advice">' +
        '<div class="gmd-advice-col">' +
          '<h4>🍽 Совет по еде</h4>' +
          '<ul id="gmdFoodTip"></ul>' +
        '</div>' +
        '<div class="gmd-advice-col">' +
          '<h4>💧 Совет по воде</h4>' +
          '<ul id="gmdWaterTip"></ul>' +
        '</div>' +
      '</div>' +
      '<div class="btn-row">' +
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
    '<div class="card gmd-card gmd-quick" id="gmdQuickCard">' +
      '<h3><span class="ico">➕</span> Что ты съел? Добавь за 5 секунд</h3>' +
      '<div class="gmd-sub">Четыре способа: найти блюдо, снять фото, отсканировать штрихкод или вписать вручную. Везде можно указать вес порции — калории и БЖУ пересчитаются.</div>' +
      '<div class="gmd-tabs" id="gmdQuickTabs">' +
        '<button data-gmd="qtab" data-tab="search">🔍 Поиск</button>' +
        '<button data-gmd="qtab" data-tab="photo">📷 Фото блюда</button>' +
        '<button data-gmd="qtab" data-tab="barcode">🏷 Штрихкод</button>' +
        '<button data-gmd="qtab" data-tab="manual">✍️ Вручную</button>' +
      '</div>' +
      '<div id="gmdQuickBody"></div>' +
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
    '.gmd-advice{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}' +
    '@media(max-width:640px){.gmd-advice{grid-template-columns:1fr}}' +
    '.gmd-advice-col{background:rgba(45,212,191,.07);border:1px solid rgba(45,212,191,.24);border-radius:14px;padding:11px 13px}' +
    '.gmd-advice-col h4{margin:0 0 8px;font-size:12px;color:#5eead4;font-weight:800;letter-spacing:.3px}' +
    '.gmd-advice-col ul{margin:0;padding-left:16px}' +
    '.gmd-advice-col li{font-size:11.5px;line-height:1.6;color:#dbe4f5;margin-bottom:5px}' +
    '.gmd-advice-col li:last-child{margin-bottom:0}' +
    '.gmd-form{margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.07)}' +
    '.gmd-hint{margin-top:12px;font-size:12px;line-height:1.65;color:#c9d5ec;background:rgba(45,212,191,.07);border:1px solid rgba(45,212,191,.24);border-radius:14px;padding:11px 13px}' +
    '.gmd-hint b{color:#5eead4}' +
    '.gmd-quick{scroll-margin-top:84px}' +
    '.gmd-quick #gmdQuickBody{min-height:60px}' +
    '.gmd-quick #gmdSearchList{max-height:46vh}' +
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
    '.gmd-qrow:last-child{border-bottom:none}' +
    '.gmd-tabs{display:flex;gap:6px;overflow-x:auto;margin:14px 0 12px;padding-bottom:2px;scrollbar-width:none}' +
    '.gmd-tabs::-webkit-scrollbar{display:none}' +
    '.gmd-tabs button{flex:0 0 auto;padding:8px 12px;border-radius:11px;border:1px solid rgba(255,255,255,.08);background:#0f1728;color:#8b9ab5;font-size:11.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s;white-space:nowrap}' +
    '.gmd-tabs button:hover{color:#e8eefc}' +
    '.gmd-tabs button.on{background:linear-gradient(135deg,#c4b5fd,#5eead4);color:#0b0f19;border-color:transparent}' +
    '.gmd-upload{display:block;border:1.5px dashed rgba(139,92,246,.5);border-radius:16px;padding:18px;text-align:center;background:rgba(139,92,246,.07);cursor:pointer;transition:.2s}' +
    '.gmd-upload:hover{background:rgba(139,92,246,.13)}' +
    '.gmd-upload input{display:none}' +
    '.gmd-upload .u-ico{font-size:26px;display:block;margin-bottom:6px}' +
    '.gmd-upload b{font-size:13px;display:block}' +
    '.gmd-upload p{font-size:11px;color:#8b9ab5;margin-top:5px}' +
    '.gmd-photo{width:100%;max-height:190px;object-fit:cover;border-radius:14px;border:1px solid rgba(255,255,255,.1);margin-top:10px;display:block}' +
    '.gmd-video{width:100%;aspect-ratio:4/3;background:#04070d;border-radius:14px;object-fit:cover;border:1px solid rgba(255,255,255,.1);display:block}' +
    '.gmd-calc{margin-top:12px;font-size:12px;line-height:1.6;color:#dbe4f5;background:rgba(45,212,191,.08);border:1px solid rgba(45,212,191,.26);border-radius:13px;padding:11px 13px}' +
    '.gmd-calc b{color:#5eead4;font-size:13px}' +
    '.gmd-note{font-size:11.5px;line-height:1.6;color:#8b9ab5;margin-top:8px}' +
    '.gmd-note b{color:#e8eefc}' +
    '.gmd-total{margin-top:10px;font-size:12px;line-height:1.6;color:#dbe4f5;background:rgba(45,212,191,.08);border:1px solid rgba(45,212,191,.26);border-radius:13px;padding:11px 13px}' +
    '.gmd-total b{color:#5eead4;font-size:14px}' +
    '.gmd-qrow input.gmd-g{width:66px;padding:7px 6px;font-size:12px;border-radius:9px;text-align:center;flex:0 0 auto;background:#0e1526;border:1px solid rgba(255,255,255,.09);color:#e8eefc;font-family:inherit}' +
    '.gmd-bc{margin-top:6px}' +
    '.gmd-hl{background:rgba(45,212,191,.32);color:#e8eefc;border-radius:4px;padding:0 2px;font-weight:800}' +
    '.gmd-livecode{font-variant-numeric:tabular-nums;letter-spacing:.4px}' +
    '.gmd-bc .gmd-video{aspect-ratio:4/3;width:100%;background:#04070d;border-radius:14px;object-fit:cover;border:1px solid rgba(255,255,255,.1);display:block}' +
    '.gmd-guess{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:4px}' +
    '.gmd-guess .gmd-mode{font-size:11px;padding:9px 10px;line-height:1.3}' +
    '@media(max-width:430px){.gmd-guess{grid-template-columns:1fr}}' +
    '.gmd-modal.gmd-big{display:flex;flex-direction:column;height:94vh;height:94dvh;max-height:94vh;max-height:94dvh;overflow:hidden;padding:0}' +
    '.gmd-big .gmd-close{top:16px;right:16px;z-index:8}' +
    '.gmd-qhead{flex:0 0 auto;position:relative;z-index:6;padding:18px 56px 12px 18px;background:linear-gradient(170deg,#161e33,#101828);border-bottom:1px solid rgba(255,255,255,.08)}' +
    '.gmd-qhead h3{font-size:17px}' +
    '.gmd-qhead .gmd-tabs{margin:12px 0 0}' +
    '.gmd-big #gmdQuickBody{flex:1 1 auto;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px 18px calc(30px + env(safe-area-inset-bottom))}' +
    '.gmd-searchrow{position:relative}' +
    '.gmd-searchrow input{padding-right:44px;font-size:15px}' +
    '.gmd-sclear{position:absolute;right:7px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:9px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#8b9ab5;font-size:12px;cursor:pointer;font-family:inherit}' +
    '.gmd-qcount{font-size:11px;color:#8b9ab5;font-weight:700;margin:10px 0 2px;line-height:1.5}' +
    '.gmd-qcount b{color:#5eead4}' +
    '.gmd-sec{font-size:10.5px;text-transform:uppercase;letter-spacing:1.1px;color:#7b8aa6;font-weight:800;margin:16px 0 6px;display:flex;align-items:center;gap:7px}' +
    '.gmd-sec i{flex:1;height:1px;background:rgba(255,255,255,.07);display:block}';

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
    renderAdvice();
  }

  /* советы по еде (под режим) и по воде (ротация по дню) */
  function renderAdvice() {
    var foodBox = document.getElementById('gmdFoodTip');
    if (foodBox) {
      var ft = FOOD_TIPS[state.mode] || FOOD_TIPS.maintain;
      var fh = '';
      for (var i = 0; i < ft.length; i++) fh += li(ft[i]);
      foodBox.innerHTML = fh;
    }
    var waterBox = document.getElementById('gmdWaterTip');
    if (waterBox) {
      var start = new Date().getDate() % WATER_TIPS.length;
      var wh = '';
      for (var k = 0; k < 3; k++) wh += li(WATER_TIPS[(start + k) % WATER_TIPS.length]);
      waterBox.innerHTML = wh;
    }
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
      el.innerHTML = '<div class="empty">Пока ничего не добавлено. Добавь блюдо в блоке «Что ты съел?» выше или нажми «Я это съел» на карточке рецепта.</div>';
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
    stopBarcode();
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

  /* ==================== БЛОК «ЧТО СЪЕЛ» (встроен в страницу) ==================== */
  var qTab = 'search';
  var qFocus = false;

  function gotoQuick(tab) {
    if (tab && tab !== qTab) { qTab = tab; qFocus = true; renderQuickTab(); }
    else if (tab) { qFocus = true; renderQuickTab(); }
    var card = document.getElementById('gmdQuickCard');
    if (card && card.scrollIntoView) {
      try { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      catch (e) { card.scrollIntoView(); }
    }
  }

  function renderQuickTab() {
    var tabs = document.querySelectorAll('#gmdQuickTabs button');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('on', tabs[i].getAttribute('data-tab') === qTab);
    }
    if (qTab !== 'barcode') stopBarcode();
    if (qTab === 'search') renderSearchPane(qFocus);
    else if (qTab === 'photo') renderPhotoPane();
    else if (qTab === 'barcode') renderBarcodePane();
    else renderManualPane();
    qFocus = false;
  }

  /* ---------- вес порции и пересчёт ---------- */
  var APPROX_W = { b: 350, l: 550, d: 500, s: 200 };
  var manMode = 'portion';

  function portionWeight(r) { return APPROX_W[r.m] || 400; }

  function per100(r) {
    var w = portionWeight(r);
    return { k: r.k * 100 / w, p: r.p * 100 / w, f: r.f * 100 / w, c: r.c * 100 / w };
  }

  function fromGrams(base, grams) {
    var f = (+grams || 0) / 100;
    return {
      k: Math.round((+base.k || 0) * f),
      p: Math.round((+base.p || 0) * f),
      f: Math.round((+base.f || 0) * f),
      c: Math.round((+base.c || 0) * f)
    };
  }

  function num(id) {
    var el = document.getElementById(id);
    return el ? (Number(el.value) || 0) : 0;
  }

  /* ---------- ВКЛАДКА «ПОИСК» ---------- */
  function dishList(q) {
    q = String(q || '').toLowerCase().trim();
    var own = [], other = [], i;
    for (i = 0; i < R.length; i++) {
      if (q && R[i].n.toLowerCase().indexOf(q) < 0) continue;
      if (!q && R[i].md.indexOf(state.mode) >= 0) own.push(i);
      else other.push(i);
    }
    return own.concat(other);
  }

  function renderSearchPane(focus) {
    var box = document.getElementById('gmdQuickBody');
    if (!box) return;
    box.innerHTML =
      '<div class="field" style="margin-top:4px"><label>Поиск по блюдам</label>' +
      '<input id="gmdSearch" placeholder="творог, курица, овсянка…" autocomplete="off"></div>' +
      '<div class="gmd-note">Впиши вес порции в граммах — калории и БЖУ пересчитаются от базы.</div>' +
      '<div id="gmdSearchList" class="list" style="max-height:46vh;margin-top:8px"></div>';
    fillSearchList('');
    var inp = document.getElementById('gmdSearch');
    if (inp) {
      inp.addEventListener('input', function () { fillSearchList(this.value); });
      if (focus) setTimeout(function () { try { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } catch (e) {} }, 220);
    }
  }

  function fillSearchList(q) {
    var box = document.getElementById('gmdSearchList');
    if (!box) return;
    var idx = dishList(q), h = '';
    for (var i = 0; i < idx.length && i < 14; i++) {
      var r = R[idx[i]];
      var w = portionWeight(r);
      var p100 = per100(r);
      h += '<div class="gmd-qrow">' +
        '<div style="flex:1;min-width:0">' +
          '<b style="font-size:12.5px;display:block;line-height:1.35">' + r.e + ' ' + esc(r.n) + '</b>' +
          '<div class="tiny muted">100 г ≈ ' + Math.round(p100.k) + ' ккал · Б ' + Math.round(p100.p) + ' Ж ' + Math.round(p100.f) + ' У ' + Math.round(p100.c) + '</div>' +
          '<div class="tiny muted">порция ≈ ' + w + ' г · ' + r.k + ' ккал</div>' +
        '</div>' +
        '<input class="gmd-g" type="number" inputmode="numeric" min="1" step="10" value="' + w + '" data-i="' + idx[i] + '" aria-label="Вес порции, г">' +
        '<button class="btn sm teal" data-gmd="addG" data-i="' + idx[i] + '">＋</button>' +
      '</div>';
    }
    box.innerHTML = h || '<div class="empty">Ничего не нашлось — открой вкладку «Вручную».</div>';
  }

  /* ---------- ВКЛАДКА «ФОТО БЛЮДА» ---------- */
  function renderPhotoPane() {
    var box = document.getElementById('gmdQuickBody');
    if (!box) return;
    box.innerHTML =
      '<label class="gmd-upload">' +
        '<input type="file" accept="image/*" capture="environment" id="gmdPhotoIn">' +
        '<span class="u-ico">📷</span>' +
        '<b>Сфотографируй блюдо</b>' +
        '<p>Фото остаётся на устройстве. Дальше выбери, что на нём — и укажи вес, я посчитаю калории.</p>' +
      '</label>' +
      '<div id="gmdPhotoPrev"></div>' +
      '<div id="gmdPhotoRes"></div>';
    var inp = document.getElementById('gmdPhotoIn');
    if (inp) inp.addEventListener('change', onPhotoChosen);
  }

  function onPhotoChosen(ev) {
    var f = ev.target.files && ev.target.files[0];
    if (!f) return;
    if (f.size > 12 * 1048576) { toast('Фото больше 12 МБ'); return; }
    var fr = new FileReader();
    fr.onload = function () {
      var prev = document.getElementById('gmdPhotoPrev');
      if (prev) prev.innerHTML = '<img class="gmd-photo" src="' + fr.result + '" alt="Фото блюда">';
      renderPhotoResult();
    };
    fr.readAsDataURL(f);
    ev.target.value = '';
  }

  function renderPhotoResult() {
    var box = document.getElementById('gmdPhotoRes');
    if (!box) return;
    var idx = dishList(''), h = '<div class="gmd-h4">Что на фото?</div><div class="gmd-guess">';
    for (var i = 0; i < idx.length && i < 8; i++) {
      h += '<button class="gmd-mode" data-gmd="photoPick" data-i="' + idx[i] + '">' + R[idx[i]].e + ' ' + esc(R[idx[i]].n) + '</button>';
    }
    h += '</div><div id="gmdPhotoCalc"></div>';
    box.innerHTML = h;
  }

  function photoPick(i) {
    var r = R[i];
    if (!r) return;
    var box = document.getElementById('gmdPhotoCalc');
    if (!box) return;
    box.innerHTML =
      '<div class="gmd-h4">' + r.e + ' ' + esc(r.n) + '</div>' +
      '<div class="field"><label>Вес порции на фото, г</label>' +
      '<input id="gmdPhotoG" type="number" inputmode="numeric" step="10" value="' + portionWeight(r) + '"></div>' +
      '<div class="gmd-total" id="gmdPhotoOut"></div>' +
      '<div class="btn-row"><button class="btn primary full" data-gmd="photoAdd" data-i="' + i + '">✓ Добавить в дневник</button></div>';
    photoCalc(i);
    var g = document.getElementById('gmdPhotoG');
    if (g) g.addEventListener('input', function () { photoCalc(i); });
  }

  function photoCalc(i) {
    var r = R[i];
    if (!r) return;
    var gEl = document.getElementById('gmdPhotoG');
    var out = document.getElementById('gmdPhotoOut');
    if (!gEl || !out) return;
    var grams = Number(gEl.value) || portionWeight(r);
    var v = fromGrams(per100(r), grams);
    out.innerHTML = '<b>' + v.k + ' ккал</b> за ' + grams + ' г · Б ' + v.p + ' · Ж ' + v.f + ' · У ' + v.c;
  }

  /* ---------- ВКЛАДКА «ШТРИХКОД» ---------- */
  var BC_LS = 'gm_bc_custom';
  /* code — штрихкод (EAN-13), n — название, k — ккал на 100 г, p/f/c — БЖУ на 100 г */
  var BC_BASE = [
    /* ---------- Молочные продукты ---------- */
    { code: '4600494001234', n: 'Творог 5%', k: 121, p: 17, f: 5, c: 3 },
    { code: '4600494001241', n: 'Творог 9%', k: 159, p: 16, f: 9, c: 2 },
    { code: '4600494001258', n: 'Творог обезжиренный', k: 88, p: 18, f: 0.5, c: 1.8 },
    { code: '4600494001265', n: 'Творожная масса с изюмом', k: 271, p: 9, f: 12, c: 32 },
    { code: '4600494001272', n: 'Сырники готовые', k: 285, p: 14, f: 13, c: 26 },
    { code: '4605554443332', n: 'Молоко 2,5%', k: 52, p: 3, f: 2.5, c: 4.7 },
    { code: '4605554443349', n: 'Молоко 3,2%', k: 60, p: 3, f: 3.2, c: 4.7 },
    { code: '4605554443356', n: 'Молоко обезжиренное', k: 34, p: 3, f: 0.2, c: 4.8 },
    { code: '4605554443363', n: 'Кефир 1%', k: 40, p: 3, f: 1, c: 4 },
    { code: '4605554443370', n: 'Ряженка 4%', k: 67, p: 2.9, f: 4, c: 4.2 },
    { code: '4605554443387', n: 'Простокваша 2,5%', k: 53, p: 2.9, f: 2.5, c: 4.1 },
    { code: '4600431002345', n: 'Йогурт греческий 2%', k: 73, p: 8, f: 2, c: 6 },
    { code: '4600431002352', n: 'Йогурт натуральный 3,2%', k: 85, p: 4.5, f: 3.2, c: 9.5 },
    { code: '4600431002369', n: 'Сметана 15%', k: 160, p: 2.6, f: 15, c: 3.6 },
    { code: '4600431002376', n: 'Сметана 20%', k: 206, p: 2.5, f: 20, c: 3.4 },
    { code: '4600431002383', n: 'Сыр «Российский» 50%', k: 364, p: 23, f: 30, c: 0 },
    { code: '4600431002390', n: 'Сыр «Моцарелла» 45%', k: 280, p: 22, f: 20, c: 2 },
    { code: '4600431002406', n: 'Творожный сыр', k: 240, p: 7, f: 22, c: 4 },
    { code: '4600431002413', n: 'Сыр плавленый', k: 257, p: 14, f: 20, c: 4 },
    { code: '4600431002420', n: 'Масло сливочное 82%', k: 748, p: 0.5, f: 82, c: 0.8 },
    { code: '4600431002437', n: 'Сгущённое молоко', k: 320, p: 7.2, f: 8.5, c: 56 },

    /* ---------- Мясо, птица, яйца ---------- */
    { code: '4607001770123', n: 'Куриная грудка охлаждённая', k: 113, p: 23, f: 2, c: 0 },
    { code: '4607001770130', n: 'Куриное бедро без кожи', k: 158, p: 20, f: 8, c: 0 },
    { code: '4607001770147', n: 'Филе индейки', k: 104, p: 21, f: 2, c: 0 },
    { code: '4607001770154', n: 'Фарш индейки', k: 145, p: 19, f: 7, c: 0 },
    { code: '4607001770161', n: 'Говядина, вырезка', k: 187, p: 19, f: 12, c: 0 },
    { code: '4607001770178', n: 'Фарш говяжий', k: 254, p: 17, f: 20, c: 0 },
    { code: '4607001770185', n: 'Свинина, карбонад', k: 234, p: 19, f: 18, c: 0 },
    { code: '4607001770192', n: 'Куриные наггетсы', k: 265, p: 15, f: 15, c: 16 },
    { code: '4604445556667', n: 'Яйцо куриное С1', k: 155, p: 13, f: 11, c: 1 },
    { code: '4604445556674', n: 'Яичный белок', k: 52, p: 11, f: 0.2, c: 0.7 },
    { code: '4604445556681', n: 'Колбаса «Докторская»', k: 257, p: 13, f: 23, c: 1.5 },
    { code: '4604445556698', n: 'Куриная ветчина', k: 147, p: 17, f: 8, c: 2 },

    /* ---------- Рыба и морепродукты ---------- */
    { code: '4603001234567', n: 'Лосось атлантический', k: 208, p: 20, f: 13, c: 0 },
    { code: '4603001234574', n: 'Минтай', k: 72, p: 16, f: 1, c: 0 },
    { code: '4603001234581', n: 'Тунец в собственном соку', k: 96, p: 22, f: 1, c: 0 },
    { code: '4603001234598', n: 'Скумбрия', k: 191, p: 18, f: 13, c: 0 },
    { code: '4603001234604', n: 'Креветки варёные', k: 87, p: 18, f: 1, c: 0 },
    { code: '4603001234611', n: 'Сельдь слабосолёная', k: 217, p: 17, f: 15, c: 0 },
    { code: '4603001234628', n: 'Треска', k: 82, p: 18, f: 0.7, c: 0 },

    /* ---------- Крупы, макароны, хлеб ---------- */
    { code: '4601234567890', n: 'Овсяные хлопья «Геркулес»', k: 352, p: 12, f: 6, c: 62 },
    { code: '4601234567906', n: 'Овсянка быстрого приготовления', k: 366, p: 11, f: 7, c: 64 },
    { code: '4601234567913', n: 'Мюсли с орехами', k: 410, p: 10, f: 12, c: 66 },
    { code: '4602223334445', n: 'Гречка ядрица', k: 343, p: 13, f: 3, c: 62 },
    { code: '4601112223334', n: 'Рис белый', k: 344, p: 7, f: 1, c: 78 },
    { code: '4601112223341', n: 'Рис бурый', k: 337, p: 7.4, f: 1.8, c: 72 },
    { code: '4601112223358', n: 'Булгур', k: 342, p: 12, f: 1.5, c: 76 },
    { code: '4601112223365', n: 'Киноа', k: 368, p: 14, f: 6, c: 64 },
    { code: '4601112223372', n: 'Макароны из твёрдых сортов', k: 350, p: 12, f: 1.5, c: 70 },
    { code: '4601112223389', n: 'Макароны отварные', k: 131, p: 5, f: 1.1, c: 25 },
    { code: '4601112223396', n: 'Перловка', k: 315, p: 9.3, f: 1.1, c: 66 },
    { code: '4608887776665', n: 'Хлеб цельнозерновой', k: 247, p: 8, f: 3.5, c: 41 },
    { code: '4608887776672', n: 'Хлеб ржаной', k: 210, p: 6, f: 1.5, c: 42 },
    { code: '4608887776689', n: 'Батон нарезной', k: 264, p: 7.5, f: 3, c: 51 },
    { code: '4608887776696', n: 'Лаваш тонкий', k: 277, p: 9, f: 1, c: 57 },

    /* ---------- Овощи, фрукты, ягоды ---------- */
    { code: '4606667778889', n: 'Банан', k: 89, p: 1, f: 0, c: 23 },
    { code: '4606667778896', n: 'Яблоко', k: 46, p: 0.4, f: 0.4, c: 10 },
    { code: '4606667778902', n: 'Апельсин', k: 43, p: 0.9, f: 0.2, c: 8.1 },
    { code: '4606667778919', n: 'Огурец', k: 15, p: 0.8, f: 0.1, c: 2.8 },
    { code: '4606667778926', n: 'Помидор', k: 20, p: 1.1, f: 0.2, c: 3.8 },
    { code: '4606667778933', n: 'Брокколи', k: 34, p: 2.8, f: 0.4, c: 6.6 },
    { code: '4606667778940', n: 'Картофель', k: 77, p: 2, f: 0.4, c: 17 },
    { code: '4606667778957', n: 'Морковь', k: 41, p: 0.9, f: 0.2, c: 9.6 },
    { code: '4606667778964', n: 'Авокадо', k: 160, p: 2, f: 15, c: 9 },
    { code: '4606667778971', n: 'Кабачок', k: 17, p: 1.2, f: 0.3, c: 3.1 },
    { code: '4606667778988', n: 'Черника', k: 57, p: 0.7, f: 0.3, c: 14 },
    { code: '4606667778995', n: 'Смесь замороженных овощей', k: 42, p: 2.4, f: 0.5, c: 7 },

    /* ---------- Орехи, семечки, масла ---------- */
    { code: '4609998887775', n: 'Миндаль', k: 579, p: 21, f: 50, c: 22 },
    { code: '4609998887782', n: 'Грецкие орехи', k: 654, p: 15, f: 65, c: 14 },
    { code: '4609998887799', n: 'Арахис', k: 567, p: 26, f: 45, c: 16 },
    { code: '4609998887805', n: 'Тыквенные семечки', k: 556, p: 30, f: 49, c: 11 },
    { code: '4609998887812', n: 'Масло оливковое', k: 884, p: 0, f: 100, c: 0 },
    { code: '4609998887829', n: 'Масло подсолнечное', k: 899, p: 0, f: 100, c: 0 },
    { code: '4609998887836', n: 'Арахисовая паста', k: 588, p: 25, f: 50, c: 20 },

    /* ---------- Бакалея, соусы, сладкое ---------- */
    { code: '4607776665554', n: 'Томатная паста', k: 82, p: 4, f: 1, c: 19 },
    { code: '4607776665561', n: 'Соевый соус', k: 53, p: 6, f: 0, c: 8 },
    { code: '4607776665578', n: 'Майонез 67%', k: 624, p: 0.5, f: 67, c: 2.6 },
    { code: '4607776665585', n: 'Кетчуп', k: 100, p: 1.5, f: 0, c: 23 },
    { code: '4607776665592', n: 'Хумус', k: 210, p: 7, f: 13, c: 16 },
    { code: '4607776665608', n: 'Мёд', k: 329, p: 0.8, f: 0, c: 81 },
    { code: '4607776665615', n: 'Сахар', k: 400, p: 0, f: 0, c: 100 },
    { code: '4603332221111', n: 'Шоколад молочный', k: 540, p: 7, f: 31, c: 57 },
    { code: '4603332221128', n: 'Шоколад тёмный 70%', k: 570, p: 9, f: 40, c: 46 },
    { code: '4603332221135', n: 'Печенье овсяное', k: 450, p: 6, f: 17, c: 68 },
    { code: '4603332221142', n: 'Чипсы картофельные', k: 530, p: 6, f: 34, c: 50 },
    { code: '4603332221159', n: 'Халва подсолнечная', k: 520, p: 12, f: 30, c: 54 },

    /* ---------- Спортпит и готовые блюда ---------- */
    { code: '4609876543210', n: 'Протеиновый батончик', k: 380, p: 30, f: 12, c: 34 },
    { code: '4609876543227', n: 'Сывороточный протеин (порошок)', k: 380, p: 78, f: 5, c: 7 },
    { code: '4609876543234', n: 'Гейнер (порошок)', k: 385, p: 25, f: 5, c: 60 },
    { code: '4609876543241', n: 'Протеиновое печенье', k: 350, p: 25, f: 12, c: 35 },
    { code: '4602224446668', n: 'Бургер с говядиной', k: 295, p: 13, f: 14, c: 28 },
    { code: '4602224446675', n: 'Пицца «Маргарита»', k: 230, p: 10, f: 8, c: 29 },
    { code: '4602224446682', n: 'Шаурма с курицей', k: 215, p: 12, f: 10, c: 17 },
    { code: '4602224446699', n: 'Суши-ролл «Филадельфия»', k: 176, p: 7, f: 8, c: 19 },
    { code: '4602224446705', n: 'Овсяная каша на молоке (готовая)', k: 103, p: 3.2, f: 3.2, c: 15 },
    { code: '4602224446712', n: 'Гречка отварная (готовая)', k: 110, p: 4, f: 1, c: 20 },
    { code: '4602224446729', n: 'Куриная грудка гриль (готовая)', k: 165, p: 28, f: 5, c: 0 }
  ];
  var bcStream = null, bcTimer = null;

  /* ==================== ГЕНЕРАТОР ШТРИХКОДОВ ==================== */
  /* В России штрихкоды начинаются на 460–469, товаров сотни тысяч.
     Держать их строками в файле нельзя, поэтому каталог собирается
     детерминированно: код считается из индекса производителя и товара,
     контрольная цифра — по стандарту EAN-13. Один и тот же код всегда
     даёт один и тот же товар, база не «плывёт» между запусками. */
  var GEN_CATS = [
    {
      packs: ['0,5 л', '1 л'],
      brands: ['Простоквашино', 'Домик в деревне', 'Савушкин', 'Вкуснотеево', 'Активиа', 'Bio Баланс', 'Молочный мир', 'Село Зелёное', 'Белебеевский', 'Рузское молоко'],
      items: [
        { n: 'Молоко 2,5%', k: 52, p: 3, f: 2.5, c: 4.7 },
        { n: 'Молоко 3,2%', k: 60, p: 3, f: 3.2, c: 4.7 },
        { n: 'Молоко обезжиренное', k: 34, p: 3, f: 0.2, c: 4.8 },
        { n: 'Кефир 1%', k: 40, p: 3, f: 1, c: 4 },
        { n: 'Кефир 2,5%', k: 51, p: 2.9, f: 2.5, c: 4 },
        { n: 'Ряженка 4%', k: 67, p: 2.9, f: 4, c: 4.2 },
        { n: 'Снежок 2,5%', k: 58, p: 2.9, f: 2.5, c: 4.5 },
        { n: 'Простокваша 2,5%', k: 53, p: 2.9, f: 2.5, c: 4.1 },
        { n: 'Йогурт натуральный 3,2%', k: 85, p: 4.5, f: 3.2, c: 9.5 },
        { n: 'Йогурт греческий 2%', k: 73, p: 8, f: 2, c: 6 },
        { n: 'Творог 5%', k: 121, p: 17, f: 5, c: 3 },
        { n: 'Творог 9%', k: 159, p: 16, f: 9, c: 2 },
        { n: 'Сметана 15%', k: 160, p: 2.6, f: 15, c: 3.6 },
        { n: 'Сметана 20%', k: 206, p: 2.5, f: 20, c: 3.4 },
        { n: 'Масло сливочное 82%', k: 748, p: 0.5, f: 82, c: 0.8 }
      ]
    },
    {
      packs: ['400 г', '800 г'],
      brands: ['Мираторг', 'Петелинка', 'Приосколье', 'Черкизово', 'Дмитрогорский', 'Останкино', 'Велком', 'Индилайт', 'Ремит', 'Каждый день'],
      items: [
        { n: 'Филе куриной грудки', k: 113, p: 23, f: 2, c: 0 },
        { n: 'Куриное бедро', k: 158, p: 20, f: 8, c: 0 },
        { n: 'Куриные крылья', k: 186, p: 17, f: 13, c: 0 },
        { n: 'Фарш куриный', k: 143, p: 17, f: 7, c: 1 },
        { n: 'Фарш говяжий', k: 254, p: 17, f: 20, c: 0 },
        { n: 'Фарш свиной', k: 263, p: 16, f: 21, c: 0 },
        { n: 'Сосиски молочные', k: 261, p: 11, f: 24, c: 1.6 },
        { n: 'Сардельки говяжьи', k: 257, p: 12, f: 23, c: 1.5 },
        { n: 'Колбаса варёная', k: 257, p: 13, f: 23, c: 1.5 },
        { n: 'Колбаса сырокопчёная', k: 470, p: 25, f: 41, c: 0.5 },
        { n: 'Ветчина куриная', k: 147, p: 17, f: 8, c: 2 },
        { n: 'Филе индейки', k: 104, p: 21, f: 2, c: 0 },
        { n: 'Наггетсы куриные', k: 265, p: 15, f: 15, c: 16 },
        { n: 'Шашлык из свинины', k: 285, p: 17, f: 24, c: 2 },
        { n: 'Говядина тушёная', k: 220, p: 16, f: 17, c: 1 }
      ]
    },
    {
      packs: ['250 г', '400 г'],
      brands: ['Балтийский берег', 'Русское море', 'Санта Бремор', 'Vici', 'Доброфлот', 'Морская планета', 'Вот Это Рыба', 'Крестьянское подворье'],
      items: [
        { n: 'Сельдь слабосолёная', k: 217, p: 17, f: 15, c: 0 },
        { n: 'Скумбрия копчёная', k: 191, p: 18, f: 13, c: 0 },
        { n: 'Тунец в собственном соку', k: 96, p: 22, f: 1, c: 0 },
        { n: 'Сайра в масле', k: 283, p: 18, f: 23, c: 0 },
        { n: 'Шпроты в масле', k: 363, p: 17, f: 32, c: 0 },
        { n: 'Креветки варёно-мороженые', k: 87, p: 18, f: 1, c: 0 },
        { n: 'Филе минтая', k: 72, p: 16, f: 1, c: 0 },
        { n: 'Стейк лосося', k: 208, p: 20, f: 13, c: 0 },
        { n: 'Филе трески', k: 82, p: 18, f: 0.7, c: 0 },
        { n: 'Икра лососевая', k: 245, p: 32, f: 13, c: 3 },
        { n: 'Кальмар очищенный', k: 92, p: 17, f: 1.4, c: 2 },
        { n: 'Горбуша консервированная', k: 168, p: 20, f: 9, c: 0 }
      ]
    },
    {
      packs: ['800 г', '1 кг'],
      brands: ['Увелка', 'Мистраль', 'Макфа', 'Шебекинские', 'Агро-Альянс', 'Царь', 'Жменька', 'Донья', 'Bravolli', 'Barilla'],
      items: [
        { n: 'Гречка ядрица', k: 343, p: 13, f: 3, c: 62 },
        { n: 'Рис круглозёрный', k: 344, p: 7, f: 1, c: 78 },
        { n: 'Рис длиннозёрный', k: 344, p: 7, f: 1, c: 78 },
        { n: 'Рис бурый', k: 337, p: 7.4, f: 1.8, c: 72 },
        { n: 'Овсяные хлопья', k: 352, p: 12, f: 6, c: 62 },
        { n: 'Геркулес', k: 352, p: 12, f: 6, c: 62 },
        { n: 'Пшено', k: 348, p: 11, f: 3, c: 69 },
        { n: 'Перловка', k: 315, p: 9.3, f: 1.1, c: 66 },
        { n: 'Булгур', k: 342, p: 12, f: 1.5, c: 76 },
        { n: 'Кускус', k: 376, p: 13, f: 0.6, c: 77 },
        { n: 'Киноа', k: 368, p: 14, f: 6, c: 64 },
        { n: 'Спагетти', k: 350, p: 12, f: 1.5, c: 70 },
        { n: 'Макароны пенне', k: 350, p: 12, f: 1.5, c: 70 },
        { n: 'Макароны рожки', k: 350, p: 12, f: 1.5, c: 70 },
        { n: 'Чечевица красная', k: 318, p: 24, f: 1, c: 48 }
      ]
    },
    {
      packs: ['300 г', '400 г'],
      brands: ['Хлебный дом', 'Бородино', 'Рижский хлеб', 'Щедрые нивы', 'Каравай', 'Мастер Хлеб', 'Пекарь', 'Булочная №1'],
      items: [
        { n: 'Хлеб ржаной', k: 210, p: 6, f: 1.5, c: 42 },
        { n: 'Хлеб цельнозерновой', k: 247, p: 8, f: 3.5, c: 41 },
        { n: 'Батон нарезной', k: 264, p: 7.5, f: 3, c: 51 },
        { n: 'Хлеб бородинский', k: 208, p: 6.8, f: 1.3, c: 40 },
        { n: 'Лаваш тонкий', k: 277, p: 9, f: 1, c: 57 },
        { n: 'Лаваш армянский', k: 277, p: 9, f: 1, c: 57 },
        { n: 'Багет французский', k: 285, p: 8, f: 2, c: 57 },
        { n: 'Пита', k: 275, p: 9, f: 2.5, c: 54 },
        { n: 'Тортилья пшеничная', k: 300, p: 8, f: 7, c: 50 },
        { n: 'Круассан', k: 406, p: 8, f: 21, c: 46 },
        { n: 'Булочка с маком', k: 320, p: 8, f: 10, c: 50 },
        { n: 'Хлебцы ржаные', k: 300, p: 10, f: 3, c: 58 }
      ]
    },
    {
      packs: ['400 г', '680 г'],
      brands: ['Bonduelle', 'Hortex', '4 сезона', 'Globus', 'Сеньор Помидор', 'Фрау Марта', 'Green Ray', 'Заморозка', 'Магнит'],
      items: [
        { n: 'Горошек зелёный', k: 55, p: 4.5, f: 0.2, c: 9 },
        { n: 'Кукуруза сахарная', k: 58, p: 2.2, f: 0.4, c: 11 },
        { n: 'Фасоль красная', k: 93, p: 6.9, f: 0.5, c: 14 },
        { n: 'Овощная смесь', k: 42, p: 2.4, f: 0.5, c: 7 },
        { n: 'Брокколи замороженная', k: 34, p: 2.8, f: 0.4, c: 6.6 },
        { n: 'Шпинат замороженный', k: 23, p: 2.9, f: 0.4, c: 2 },
        { n: 'Огурцы маринованные', k: 20, p: 0.8, f: 0.1, c: 3 },
        { n: 'Томаты в собственном соку', k: 24, p: 1.1, f: 0.2, c: 4 },
        { n: 'Оливки без косточек', k: 145, p: 1, f: 15, c: 3 },
        { n: 'Маслины', k: 166, p: 1.4, f: 17, c: 3 },
        { n: 'Кабачки консервированные', k: 25, p: 1.2, f: 0.3, c: 3.5 },
        { n: 'Морковь по-корейски', k: 130, p: 1.5, f: 9, c: 11 },
        { n: 'Капуста квашеная', k: 19, p: 1.8, f: 0.1, c: 3 }
      ]
    },
    {
      packs: ['100 г', '200 г'],
      brands: ['Гудвилл', 'От Мартина', 'Ореховая долина', 'Здоровое питание', 'Food Empire', 'Семечка', 'Макадамия', 'Яшкино'],
      items: [
        { n: 'Миндаль', k: 579, p: 21, f: 50, c: 22 },
        { n: 'Грецкий орех', k: 654, p: 15, f: 65, c: 14 },
        { n: 'Арахис жареный', k: 567, p: 26, f: 45, c: 16 },
        { n: 'Кешью', k: 553, p: 18, f: 44, c: 30 },
        { n: 'Фундук', k: 628, p: 15, f: 61, c: 17 },
        { n: 'Тыквенные семечки', k: 556, p: 30, f: 49, c: 11 },
        { n: 'Семечки подсолнечника', k: 578, p: 20, f: 52, c: 11 },
        { n: 'Изюм', k: 299, p: 2.9, f: 0.6, c: 79 },
        { n: 'Курага', k: 241, p: 3.4, f: 0.5, c: 63 },
        { n: 'Чернослив', k: 240, p: 2.2, f: 0.4, c: 64 },
        { n: 'Финики', k: 282, p: 2.5, f: 0.5, c: 75 },
        { n: 'Мюсли с орехами', k: 410, p: 10, f: 12, c: 66 },
        { n: 'Гранола', k: 430, p: 11, f: 15, c: 65 },
        { n: 'Арахисовая паста', k: 588, p: 25, f: 50, c: 20 }
      ]
    },
    {
      packs: ['0,5 л', '1,5 л'],
      brands: ['Сады Придонья', 'Добрый', 'J7', 'Rich', 'Черноголовка', 'Святой источник', 'Aqua Minerale', 'Боржоми', 'Nestea'],
      items: [
        { n: 'Сок яблочный', k: 46, p: 0.5, f: 0.1, c: 11 },
        { n: 'Сок апельсиновый', k: 45, p: 0.7, f: 0.2, c: 10 },
        { n: 'Сок томатный', k: 21, p: 1, f: 0, c: 3.5 },
        { n: 'Нектар персиковый', k: 50, p: 0.3, f: 0, c: 12 },
        { n: 'Вода питьевая', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Вода газированная', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Морс клюквенный', k: 42, p: 0.2, f: 0, c: 10 },
        { n: 'Квас', k: 37, p: 0.3, f: 0, c: 8.5 },
        { n: 'Чай холодный', k: 28, p: 0, f: 0, c: 7 },
        { n: 'Кола', k: 42, p: 0, f: 0, c: 10.6 },
        { n: 'Энергетик', k: 45, p: 0, f: 0, c: 11 },
        { n: 'Кофе в банке', k: 55, p: 1, f: 2, c: 8 },
        { n: 'Молоко кокосовое', k: 197, p: 2, f: 20, c: 3 },
        { n: 'Напиток овсяный', k: 46, p: 1, f: 1.5, c: 7 },
        { n: 'Смузи фруктовый', k: 60, p: 0.6, f: 0.2, c: 14 }
      ]
    },
    {
      packs: ['80 г', '150 г'],
      brands: ['Яшкино', 'Славянка', 'Бабаевский', 'Alpen Gold', 'Milka', 'Snickers', 'Lays', 'Крутт', 'Ferrero'],
      items: [
        { n: 'Шоколад молочный', k: 540, p: 7, f: 31, c: 57 },
        { n: 'Шоколад тёмный', k: 570, p: 9, f: 40, c: 46 },
        { n: 'Батончик протеиновый', k: 380, p: 30, f: 12, c: 34 },
        { n: 'Батончик мюсли', k: 420, p: 6, f: 14, c: 66 },
        { n: 'Печенье овсяное', k: 450, p: 6, f: 17, c: 68 },
        { n: 'Вафли', k: 500, p: 5, f: 25, c: 63 },
        { n: 'Пряники', k: 370, p: 5, f: 9, c: 68 },
        { n: 'Чипсы картофельные', k: 530, p: 6, f: 34, c: 50 },
        { n: 'Сухарики', k: 400, p: 9, f: 12, c: 63 },
        { n: 'Попкорн', k: 400, p: 7, f: 12, c: 68 },
        { n: 'Халва', k: 520, p: 12, f: 30, c: 54 },
        { n: 'Мармелад', k: 320, p: 0.2, f: 0, c: 79 },
        { n: 'Зефир', k: 326, p: 0.8, f: 0.1, c: 79 },
        { n: 'Крекеры', k: 440, p: 9, f: 14, c: 68 },
        { n: 'Конфеты шоколадные', k: 520, p: 6, f: 30, c: 58 }
      ]
    },
    {
      packs: ['500 г', '900 г'],
      brands: ['Сам Самыч', 'Морозко', 'Атяшево', 'Горячая штучка', 'Мираторг', 'Дымов', 'Ремит', 'Chef', 'Перекрёсток'],
      items: [
        { n: 'Пельмени', k: 275, p: 11, f: 12, c: 30 },
        { n: 'Вареники', k: 240, p: 7, f: 6, c: 38 },
        { n: 'Хинкали', k: 250, p: 10, f: 11, c: 27 },
        { n: 'Блинчики с творогом', k: 240, p: 9, f: 8, c: 32 },
        { n: 'Сырники замороженные', k: 285, p: 14, f: 13, c: 26 },
        { n: 'Котлеты куриные', k: 250, p: 15, f: 15, c: 14 },
        { n: 'Наггетсы', k: 265, p: 15, f: 15, c: 16 },
        { n: 'Пицца замороженная', k: 250, p: 10, f: 9, c: 31 },
        { n: 'Голубцы', k: 190, p: 8, f: 10, c: 17 },
        { n: 'Тефтели', k: 240, p: 13, f: 15, c: 13 },
        { n: 'Плов с курицей', k: 200, p: 8, f: 8, c: 24 },
        { n: 'Крем-суп грибной', k: 90, p: 2, f: 4, c: 11 },
        { n: 'Каша овсяная готовая', k: 103, p: 3.2, f: 3.2, c: 15 },
        { n: 'Бургер замороженный', k: 295, p: 13, f: 14, c: 28 }
      ]
    },
    {
      packs: ['200 г', '350 г'],
      brands: ['Heinz', 'Calve', 'Балтимор', 'Астория', 'Махеев', 'Сен Сой', 'Kikkoman', 'Индиана', 'Торчин'],
      items: [
        { n: 'Кетчуп томатный', k: 100, p: 1.5, f: 0, c: 23 },
        { n: 'Майонез 67%', k: 624, p: 0.5, f: 67, c: 2.6 },
        { n: 'Майонез «Провансаль»', k: 630, p: 0.5, f: 68, c: 2.5 },
        { n: 'Соевый соус', k: 53, p: 6, f: 0, c: 8 },
        { n: 'Сметанный соус', k: 180, p: 2, f: 17, c: 4 },
        { n: 'Сырный соус', k: 280, p: 6, f: 26, c: 5 },
        { n: 'Томатная паста', k: 82, p: 4, f: 1, c: 19 },
        { n: 'Аджика', k: 60, p: 1.5, f: 3, c: 6 },
        { n: 'Хрен', k: 90, p: 2, f: 4, c: 10 },
        { n: 'Горчица', k: 143, p: 9.9, f: 6.7, c: 6 },
        { n: 'Смесь перцев', k: 250, p: 10, f: 6, c: 40 },
        { n: 'Соль поваренная', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Приправа для курицы', k: 200, p: 8, f: 5, c: 30 },
        { n: 'Уксус 9%', k: 20, p: 0, f: 0, c: 3 },
        { n: 'Оливковое масло', k: 884, p: 0, f: 100, c: 0 }
      ]
    },
    {
      packs: ['60 г', '900 г'],
      brands: ['Bombbar', 'Chikalab', 'Fit Chef', 'Velle', 'Do Well', 'ProteinRex', 'Power Pro', 'Атлетик Фуд'],
      items: [
        { n: 'Протеиновый батончик', k: 380, p: 30, f: 12, c: 34 },
        { n: 'Протеиновое печенье', k: 350, p: 25, f: 12, c: 35 },
        { n: 'Протеиновый коктейль', k: 120, p: 20, f: 2, c: 5 },
        { n: 'Сывороточный протеин', k: 380, p: 78, f: 5, c: 7 },
        { n: 'Гейнер', k: 385, p: 25, f: 5, c: 60 },
        { n: 'Креатин моногидрат', k: 0, p: 0, f: 0, c: 0 },
        { n: 'BCAA', k: 100, p: 25, f: 0, c: 0 },
        { n: 'L-карнитин', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Омега-3', k: 900, p: 0, f: 100, c: 0 },
        { n: 'Витамин D3', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Магний B6', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Коллаген', k: 350, p: 90, f: 0, c: 0 },
        { n: 'Изотоник', k: 380, p: 5, f: 0, c: 90 },
        { n: 'Какао-порошок', k: 290, p: 24, f: 15, c: 10 },
        { n: 'Панкейки фитнес', k: 360, p: 30, f: 6, c: 45 }
      ]
    }
  ];

  var GEN_CACHE = null;

  function padZ(v, len) {
    var s = String(v);
    while (s.length < len) s = '0' + s;
    return s;
  }

  function ean13From(base12) {
    var s = 0;
    for (var i = 0; i < 12; i++) s += (+base12.charAt(i)) * (i % 2 ? 3 : 1);
    return base12 + ((10 - (s % 10)) % 10);
  }

  function genProducts() {
    if (GEN_CACHE) return GEN_CACHE;
    var out = [], brandIdx = 0, ci, bi, ii, pi, cat, packs, man, itemNo, base12, it;
    for (ci = 0; ci < GEN_CATS.length; ci++) {
      cat = GEN_CATS[ci];
      packs = (cat.packs && cat.packs.length) ? cat.packs : [''];
      for (bi = 0; bi < cat.brands.length; bi++) {
        brandIdx++;
        man = '46' + padZ(brandIdx, 5);
        itemNo = 0;
        for (ii = 0; ii < cat.items.length; ii++) {
          it = cat.items[ii];
          for (pi = 0; pi < packs.length; pi++) {
            itemNo++;
            base12 = man + padZ(itemNo, 5);
            out.push({
              code: ean13From(base12),
              codes: [base12],
              n: cat.brands[bi] + ' ' + it.n + ' · ' + packs[pi],
              k: it.k, p: it.p, f: it.f, c: it.c
            });
          }
        }
      }
    }
    GEN_CACHE = out;
    return out;
  }

  var bcMap = null;
  var lastBcCode = '';

  function customBc() {
    try {
      var o = JSON.parse(localStorage.getItem(BC_LS) || '{}');
      return (o && typeof o === 'object') ? o : {};
    } catch (e) { return {}; }
  }

  /* оставляем только цифры и убираем ведущие нули —
     так один товар находится и по 12-, и по 13-значному коду */
  function normCode(c) {
    var d = String(c || '').replace(/\D/g, '');
    while (d.length > 1 && d.charAt(0) === '0') d = d.slice(1);
    return d;
  }

  function allProducts() {
    var c = customBc(), extra = [];
    Object.keys(c).forEach(function (k) {
      var p = c[k];
      if (p && p.n) extra.push(p);
    });
    return BC_BASE.concat(extra).concat(genProducts());
  }

  function bcIndex() {
    if (bcMap) return bcMap;
    bcMap = {};
    var all = allProducts();
    for (var i = 0; i < all.length; i++) {
      var p = all[i];
      var codes = [p.code].concat(p.codes || []);
      for (var j = 0; j < codes.length; j++) {
        var n = normCode(codes[j]);
        if (!n) continue;
        if (!bcMap[n]) bcMap[n] = p;
        if (n.length === 12 && !bcMap['0' + n]) bcMap['0' + n] = p;
        if (n.length === 13 && !bcMap[n.slice(1)]) bcMap[n.slice(1)] = p;
      }
    }
    return bcMap;
  }

  function findProduct(code) {
    var n = normCode(code);
    if (!n) return null;
    var map = bcIndex();
    if (map[n]) return map[n];
    if (map['0' + n]) return map['0' + n];
    if (n.length === 13 && map[n.slice(1)]) return map[n.slice(1)];
    return null;
  }

  /* похожие коды: тот же производитель (первые 7 цифр) */
  function findSimilar(code) {
    var n = normCode(code), out = [];
    if (!n) return out;
    var pre = n.slice(0, Math.min(7, n.length));
    var all = allProducts();
    for (var i = 0; i < all.length && out.length < 4; i++) {
      var c = normCode(all[i].code);
      if (!c || c === n) continue;
      if (c.slice(0, pre.length) === pre && out.indexOf(all[i]) < 0) out.push(all[i]);
    }
    return out;
  }

  function ean13Ok(code) {
    var d = String(code || '').replace(/\D/g, '');
    if (d.length !== 13) return false;
    var s = 0;
    for (var i = 0; i < 12; i++) s += (+d.charAt(i)) * (i % 2 ? 3 : 1);
    return ((10 - (s % 10)) % 10) === +d.charAt(12);
  }

  function stopBarcode() {
    if (bcTimer) { clearTimeout(bcTimer); bcTimer = null; }
    if (bcStream) {
      try { bcStream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
      bcStream = null;
    }
  }

  function renderBarcodePane() {
    var box = document.getElementById('gmdQuickBody');
    if (!box) return;
    box.innerHTML =
      '<div class="gmd-bc">' +
        '<video id="gmdBcVideo" class="gmd-video" playsinline muted></video>' +
        '<div class="tiny muted" id="gmdBcHint" style="margin-top:7px">Наведи камеру на штрихкод товара или введи цифры вручную.</div>' +
      '</div>' +
      '<div class="btn-row">' +
        '<button class="btn sm teal" data-gmd="bcStart">▶ Включить камеру</button>' +
        '<button class="btn sm ghost" data-gmd="bcStop">■ Стоп</button>' +
      '</div>' +
      '<div class="divider"></div>' +
      '<div class="field"><label>Введи первые цифры штрихкода</label>' +
        '<input id="gmdBcCode" inputmode="numeric" autocomplete="off" placeholder="460…" aria-label="Штрихкод">' +
        '<div class="tiny muted">В базе ' + allProducts().length + ' товаров. Хватит 2–3 цифр — сразу покажу похожие коды.</div>' +
      '</div>' +
      '<div class="gmd-note">Названия брендов используются как справочные ориентиры (как в обычном поиске по товарам). Сами коды в каталоге сгенерированы по стандарту EAN-13 для демонстрации и не являются официальными штрихкодами производителей — свой реальный товар добавляй через «Сохранить в базу», он будет находиться первым.</div>' +
      '<div id="gmdBcLive"></div>' +
      '<div id="gmdBcResult"></div>';

    var codeIn = document.getElementById('gmdBcCode');
    if (codeIn) {
      codeIn.addEventListener('input', function () { bcLive(this.value); });
      codeIn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          barcodeLookup(codeIn.value);
        }
      });
      setTimeout(function () { try { codeIn.focus(); } catch (e) {} }, 220);
    }
  }

  function fillBcPick(q) {
    var box = document.getElementById('gmdBcPickList');
    if (!box) return;
    q = String(q || '').toLowerCase().trim();
    var all = allProducts(), h = '', shown = 0;
    for (var i = 0; i < all.length && shown < 20; i++) {
      var p = all[i];
      if (q && String(p.n).toLowerCase().indexOf(q) < 0) continue;
      shown++;
      h += '<div class="gmd-qrow">' +
        '<div style="flex:1;min-width:0">' +
          '<b style="font-size:12.5px;display:block;line-height:1.35">' + esc(p.n) + '</b>' +
          '<div class="tiny muted">' + Math.round(p.k) + ' ккал · Б ' + p.p + ' Ж ' + p.f + ' У ' + p.c + '</div>' +
        '</div>' +
        '<button class="btn sm teal" data-gmd="bcUse" data-code="' + esc(p.code) + '">Выбрать</button>' +
      '</div>';
    }
    box.innerHTML = h || '<div class="empty">Не нашлось — добавь товар вручную выше.</div>';
  }

  /* ==================== ГЕНЕРАТОР КАТАЛОГА ШТРИХКОДОВ ==================== */
  /* В России штрихкоды начинаются на 460–469, товаров сотни тысяч.
     Хранить их строками нельзя, поэтому каталог собирается детерминированно:
     код считается из номера производителя и товара, контрольная цифра — по EAN-13.
     Один и тот же код всегда даёт один и тот же товар, база не «плывёт». */
  var GEN_CATS = [
    {
      packs: ['500 г', '900 г'],
      brands: ['Простоквашино', 'Домик в деревне', 'Савушкин', 'Вкуснотеево', 'Активиа', 'Bio Баланс', 'Молочный мир', 'Село Зелёное', 'Белебеевский', 'Рузское молоко', 'Экомилк', 'Пискарёвское', 'Тёльное', 'Коровка из Кореновки', 'Ирбитский', 'Милава'],
      items: [
        { n: 'Молоко 2,5%', k: 52, p: 3, f: 2.5, c: 4.7 },
        { n: 'Молоко 3,2%', k: 60, p: 3, f: 3.2, c: 4.7 },
        { n: 'Молоко обезжиренное', k: 34, p: 3, f: 0.2, c: 4.8 },
        { n: 'Молоко топлёное 4%', k: 67, p: 3, f: 4, c: 4.7 },
        { n: 'Кефир 1%', k: 40, p: 3, f: 1, c: 4 },
        { n: 'Кефир 2,5%', k: 51, p: 2.9, f: 2.5, c: 4 },
        { n: 'Ряженка 4%', k: 67, p: 2.9, f: 4, c: 4.2 },
        { n: 'Простокваша 2,5%', k: 53, p: 2.9, f: 2.5, c: 4.1 },
        { n: 'Йогурт натуральный 3,2%', k: 85, p: 4.5, f: 3.2, c: 9.5 },
        { n: 'Йогурт греческий 2%', k: 73, p: 8, f: 2, c: 6 },
        { n: 'Творог 5%', k: 121, p: 17, f: 5, c: 3 },
        { n: 'Творог 9%', k: 159, p: 16, f: 9, c: 2 },
        { n: 'Сметана 15%', k: 160, p: 2.6, f: 15, c: 3.6 },
        { n: 'Сметана 20%', k: 206, p: 2.5, f: 20, c: 3.4 },
        { n: 'Масло сливочное 82%', k: 748, p: 0.5, f: 82, c: 0.8 }
      ]
    },
    {
      packs: ['400 г', '800 г'],
      brands: ['Мираторг', 'Петелинка', 'Приосколье', 'Черкизово', 'Дмитрогорский', 'Останкино', 'Велком', 'Индилайт', 'Ремит', 'Каждый день', 'Дымов', 'Павловская курочка', 'Здоровая ферма', 'Ясные Зори'],
      items: [
        { n: 'Филе куриной грудки', k: 113, p: 23, f: 2, c: 0 },
        { n: 'Куриное бедро', k: 158, p: 20, f: 8, c: 0 },
        { n: 'Куриные крылья', k: 186, p: 17, f: 13, c: 0 },
        { n: 'Фарш куриный', k: 143, p: 17, f: 7, c: 1 },
        { n: 'Фарш говяжий', k: 254, p: 17, f: 20, c: 0 },
        { n: 'Фарш свиной', k: 263, p: 16, f: 21, c: 0 },
        { n: 'Сосиски молочные', k: 261, p: 11, f: 24, c: 1.6 },
        { n: 'Сардельки говяжьи', k: 257, p: 12, f: 23, c: 1.5 },
        { n: 'Колбаса варёная', k: 257, p: 13, f: 23, c: 1.5 },
        { n: 'Колбаса сырокопчёная', k: 470, p: 25, f: 41, c: 0.5 },
        { n: 'Ветчина куриная', k: 147, p: 17, f: 8, c: 2 },
        { n: 'Филе индейки', k: 104, p: 21, f: 2, c: 0 },
        { n: 'Наггетсы куриные', k: 265, p: 15, f: 15, c: 16 },
        { n: 'Шашлык из свинины', k: 285, p: 17, f: 24, c: 2 },
        { n: 'Говядина тушёная', k: 220, p: 16, f: 17, c: 1 }
      ]
    },
    {
      packs: ['250 г', '400 г'],
      brands: ['Балтийский берег', 'Русское море', 'Санта Бремор', 'Vici', 'Доброфлот', 'Морская планета', 'Вот Это Рыба', 'Крестьянское подворье', 'Меридиан', 'Бухта изобилия'],
      items: [
        { n: 'Сельдь слабосолёная', k: 217, p: 17, f: 15, c: 0 },
        { n: 'Скумбрия копчёная', k: 191, p: 18, f: 13, c: 0 },
        { n: 'Тунец в собственном соку', k: 96, p: 22, f: 1, c: 0 },
        { n: 'Сайра в масле', k: 283, p: 18, f: 23, c: 0 },
        { n: 'Шпроты в масле', k: 363, p: 17, f: 32, c: 0 },
        { n: 'Креветки варёно-мороженые', k: 87, p: 18, f: 1, c: 0 },
        { n: 'Филе минтая', k: 72, p: 16, f: 1, c: 0 },
        { n: 'Стейк лосося', k: 208, p: 20, f: 13, c: 0 },
        { n: 'Филе трески', k: 82, p: 18, f: 0.7, c: 0 },
        { n: 'Икра лососевая', k: 245, p: 32, f: 13, c: 3 },
        { n: 'Кальмар очищенный', k: 92, p: 17, f: 1.4, c: 2 },
        { n: 'Горбуша консервированная', k: 168, p: 20, f: 9, c: 0 }
      ]
    },
    {
      packs: ['800 г', '1 кг'],
      brands: ['Увелка', 'Мистраль', 'Макфа', 'Шебекинские', 'Агро-Альянс', 'Царь', 'Жменька', 'Донья', 'Bravolli', 'Barilla'],
      items: [
        { n: 'Гречка ядрица', k: 343, p: 13, f: 3, c: 62 },
        { n: 'Рис круглозёрный', k: 344, p: 7, f: 1, c: 78 },
        { n: 'Рис длиннозёрный', k: 344, p: 7, f: 1, c: 78 },
        { n: 'Рис бурый', k: 337, p: 7.4, f: 1.8, c: 72 },
        { n: 'Овсяные хлопья', k: 352, p: 12, f: 6, c: 62 },
        { n: 'Геркулес', k: 352, p: 12, f: 6, c: 62 },
        { n: 'Пшено', k: 348, p: 11, f: 3, c: 69 },
        { n: 'Перловка', k: 315, p: 9.3, f: 1.1, c: 66 },
        { n: 'Булгур', k: 342, p: 12, f: 1.5, c: 76 },
        { n: 'Кускус', k: 376, p: 13, f: 0.6, c: 77 },
        { n: 'Киноа', k: 368, p: 14, f: 6, c: 64 },
        { n: 'Спагетти', k: 350, p: 12, f: 1.5, c: 70 },
        { n: 'Макароны пенне', k: 350, p: 12, f: 1.5, c: 70 },
        { n: 'Чечевица красная', k: 318, p: 24, f: 1, c: 48 }
      ]
    },
    {
      packs: ['300 г', '400 г'],
      brands: ['Хлебный дом', 'Бородино', 'Рижский хлеб', 'Щедрые нивы', 'Каравай', 'Мастер Хлеб', 'Пекарь', 'Булочная №1'],
      items: [
        { n: 'Хлеб ржаной', k: 210, p: 6, f: 1.5, c: 42 },
        { n: 'Хлеб цельнозерновой', k: 247, p: 8, f: 3.5, c: 41 },
        { n: 'Батон нарезной', k: 264, p: 7.5, f: 3, c: 51 },
        { n: 'Хлеб бородинский', k: 208, p: 6.8, f: 1.3, c: 40 },
        { n: 'Лаваш тонкий', k: 277, p: 9, f: 1, c: 57 },
        { n: 'Багет французский', k: 285, p: 8, f: 2, c: 57 },
        { n: 'Пита', k: 275, p: 9, f: 2.5, c: 54 },
        { n: 'Тортилья пшеничная', k: 300, p: 8, f: 7, c: 50 },
        { n: 'Круассан', k: 406, p: 8, f: 21, c: 46 },
        { n: 'Булочка с маком', k: 320, p: 8, f: 10, c: 50 },
        { n: 'Хлебцы ржаные', k: 300, p: 10, f: 3, c: 58 },
        { n: 'Батон с отрубями', k: 250, p: 8, f: 2.5, c: 48 }
      ]
    },
    {
      packs: ['400 г', '680 г'],
      brands: ['Bonduelle', 'Hortex', '4 сезона', 'Globus', 'Сеньор Помидор', 'Фрау Марта', 'Green Ray', 'Заморозка', 'Магнит'],
      items: [
        { n: 'Горошек зелёный', k: 55, p: 4.5, f: 0.2, c: 9 },
        { n: 'Кукуруза сахарная', k: 58, p: 2.2, f: 0.4, c: 11 },
        { n: 'Фасоль красная', k: 93, p: 6.9, f: 0.5, c: 14 },
        { n: 'Овощная смесь', k: 42, p: 2.4, f: 0.5, c: 7 },
        { n: 'Брокколи замороженная', k: 34, p: 2.8, f: 0.4, c: 6.6 },
        { n: 'Шпинат замороженный', k: 23, p: 2.9, f: 0.4, c: 2 },
        { n: 'Огурцы маринованные', k: 20, p: 0.8, f: 0.1, c: 3 },
        { n: 'Томаты в собственном соку', k: 24, p: 1.1, f: 0.2, c: 4 },
        { n: 'Оливки без косточек', k: 145, p: 1, f: 15, c: 3 },
        { n: 'Маслины', k: 166, p: 1.4, f: 17, c: 3 },
        { n: 'Кабачки консервированные', k: 25, p: 1.2, f: 0.3, c: 3.5 },
        { n: 'Морковь по-корейски', k: 130, p: 1.5, f: 9, c: 11 },
        { n: 'Капуста квашеная', k: 19, p: 1.8, f: 0.1, c: 3 }
      ]
    },
    {
      packs: ['100 г', '200 г'],
      brands: ['Гудвилл', 'От Мартина', 'Ореховая долина', 'Здоровое питание', 'Food Empire', 'Семечка', 'Макадамия', 'Яшкино'],
      items: [
        { n: 'Миндаль', k: 579, p: 21, f: 50, c: 22 },
        { n: 'Грецкий орех', k: 654, p: 15, f: 65, c: 14 },
        { n: 'Арахис жареный', k: 567, p: 26, f: 45, c: 16 },
        { n: 'Кешью', k: 553, p: 18, f: 44, c: 30 },
        { n: 'Фундук', k: 628, p: 15, f: 61, c: 17 },
        { n: 'Тыквенные семечки', k: 556, p: 30, f: 49, c: 11 },
        { n: 'Семечки подсолнечника', k: 578, p: 20, f: 52, c: 11 },
        { n: 'Изюм', k: 299, p: 2.9, f: 0.6, c: 79 },
        { n: 'Курага', k: 241, p: 3.4, f: 0.5, c: 63 },
        { n: 'Чернослив', k: 240, p: 2.2, f: 0.4, c: 64 },
        { n: 'Финики', k: 282, p: 2.5, f: 0.5, c: 75 },
        { n: 'Мюсли с орехами', k: 410, p: 10, f: 12, c: 66 },
        { n: 'Гранола', k: 430, p: 11, f: 15, c: 65 },
        { n: 'Арахисовая паста', k: 588, p: 25, f: 50, c: 20 }
      ]
    },
    {
      packs: ['0,5 л', '1,5 л'],
      brands: ['Сады Придонья', 'Добрый', 'J7', 'Rich', 'Черноголовка', 'Святой источник', 'Aqua Minerale', 'Боржоми', 'Nestea'],
      items: [
        { n: 'Сок яблочный', k: 46, p: 0.5, f: 0.1, c: 11 },
        { n: 'Сок апельсиновый', k: 45, p: 0.7, f: 0.2, c: 10 },
        { n: 'Сок томатный', k: 21, p: 1, f: 0, c: 3.5 },
        { n: 'Нектар персиковый', k: 50, p: 0.3, f: 0, c: 12 },
        { n: 'Вода питьевая', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Вода газированная', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Морс клюквенный', k: 42, p: 0.2, f: 0, c: 10 },
        { n: 'Квас', k: 37, p: 0.3, f: 0, c: 8.5 },
        { n: 'Чай холодный', k: 28, p: 0, f: 0, c: 7 },
        { n: 'Кола', k: 42, p: 0, f: 0, c: 10.6 },
        { n: 'Энергетик', k: 45, p: 0, f: 0, c: 11 },
        { n: 'Кофе в банке', k: 55, p: 1, f: 2, c: 8 },
        { n: 'Молоко кокосовое', k: 197, p: 2, f: 20, c: 3 },
        { n: 'Напиток овсяный', k: 46, p: 1, f: 1.5, c: 7 },
        { n: 'Смузи фруктовый', k: 60, p: 0.6, f: 0.2, c: 14 }
      ]
    },
    {
      packs: ['80 г', '150 г'],
      brands: ['Яшкино', 'Славянка', 'Бабаевский', 'Alpen Gold', 'Milka', 'Snickers', 'Lays', 'Крутт', 'Ferrero', 'Красный Октябрь'],
      items: [
        { n: 'Шоколад молочный', k: 540, p: 7, f: 31, c: 57 },
        { n: 'Шоколад тёмный', k: 570, p: 9, f: 40, c: 46 },
        { n: 'Батончик протеиновый', k: 380, p: 30, f: 12, c: 34 },
        { n: 'Батончик мюсли', k: 420, p: 6, f: 14, c: 66 },
        { n: 'Печенье овсяное', k: 450, p: 6, f: 17, c: 68 },
        { n: 'Вафли', k: 500, p: 5, f: 25, c: 63 },
        { n: 'Пряники', k: 370, p: 5, f: 9, c: 68 },
        { n: 'Чипсы картофельные', k: 530, p: 6, f: 34, c: 50 },
        { n: 'Сухарики', k: 400, p: 9, f: 12, c: 63 },
        { n: 'Попкорн', k: 400, p: 7, f: 12, c: 68 },
        { n: 'Халва', k: 520, p: 12, f: 30, c: 54 },
        { n: 'Мармелад', k: 320, p: 0.2, f: 0, c: 79 },
        { n: 'Зефир', k: 326, p: 0.8, f: 0.1, c: 79 },
        { n: 'Крекеры', k: 440, p: 9, f: 14, c: 68 },
        { n: 'Конфеты шоколадные', k: 520, p: 6, f: 30, c: 58 }
      ]
    },
    {
      packs: ['500 г', '900 г'],
      brands: ['Сам Самыч', 'Морозко', 'Атяшево', 'Горячая штучка', 'Мираторг', 'Дымов', 'Ремит', 'Chef', 'Перекрёсток'],
      items: [
        { n: 'Пельмени', k: 275, p: 11, f: 12, c: 30 },
        { n: 'Вареники', k: 240, p: 7, f: 6, c: 38 },
        { n: 'Хинкали', k: 250, p: 10, f: 11, c: 27 },
        { n: 'Блинчики с творогом', k: 240, p: 9, f: 8, c: 32 },
        { n: 'Сырники замороженные', k: 285, p: 14, f: 13, c: 26 },
        { n: 'Котлеты куриные', k: 250, p: 15, f: 15, c: 14 },
        { n: 'Наггетсы', k: 265, p: 15, f: 15, c: 16 },
        { n: 'Пицца замороженная', k: 250, p: 10, f: 9, c: 31 },
        { n: 'Голубцы', k: 190, p: 8, f: 10, c: 17 },
        { n: 'Тефтели', k: 240, p: 13, f: 15, c: 13 },
        { n: 'Плов с курицей', k: 200, p: 8, f: 8, c: 24 },
        { n: 'Крем-суп грибной', k: 90, p: 2, f: 4, c: 11 },
        { n: 'Каша овсяная готовая', k: 103, p: 3.2, f: 3.2, c: 15 },
        { n: 'Бургер замороженный', k: 295, p: 13, f: 14, c: 28 }
      ]
    },
    {
      packs: ['200 г', '350 г'],
      brands: ['Heinz', 'Calve', 'Балтимор', 'Астория', 'Махеев', 'Сен Сой', 'Kikkoman', 'Индиана', 'Торчин'],
      items: [
        { n: 'Кетчуп томатный', k: 100, p: 1.5, f: 0, c: 23 },
        { n: 'Майонез 67%', k: 624, p: 0.5, f: 67, c: 2.6 },
        { n: 'Майонез «Провансаль»', k: 630, p: 0.5, f: 68, c: 2.5 },
        { n: 'Соевый соус', k: 53, p: 6, f: 0, c: 8 },
        { n: 'Сметанный соус', k: 180, p: 2, f: 17, c: 4 },
        { n: 'Сырный соус', k: 280, p: 6, f: 26, c: 5 },
        { n: 'Томатная паста', k: 82, p: 4, f: 1, c: 19 },
        { n: 'Аджика', k: 60, p: 1.5, f: 3, c: 6 },
        { n: 'Хрен', k: 90, p: 2, f: 4, c: 10 },
        { n: 'Горчица', k: 143, p: 9.9, f: 6.7, c: 6 },
        { n: 'Смесь перцев', k: 250, p: 10, f: 6, c: 40 },
        { n: 'Соль поваренная', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Приправа для курицы', k: 200, p: 8, f: 5, c: 30 },
        { n: 'Уксус 9%', k: 20, p: 0, f: 0, c: 3 },
        { n: 'Оливковое масло', k: 884, p: 0, f: 100, c: 0 }
      ]
    },
    {
      packs: ['60 г', '900 г'],
      brands: ['Bombbar', 'Chikalab', 'Fit Chef', 'Velle', 'Do Well', 'ProteinRex', 'Power Pro', 'Атлетик Фуд'],
      items: [
        { n: 'Протеиновый батончик', k: 380, p: 30, f: 12, c: 34 },
        { n: 'Протеиновое печенье', k: 350, p: 25, f: 12, c: 35 },
        { n: 'Протеиновый коктейль', k: 120, p: 20, f: 2, c: 5 },
        { n: 'Сывороточный протеин', k: 380, p: 78, f: 5, c: 7 },
        { n: 'Гейнер', k: 385, p: 25, f: 5, c: 60 },
        { n: 'Креатин моногидрат', k: 0, p: 0, f: 0, c: 0 },
        { n: 'BCAA', k: 100, p: 25, f: 0, c: 0 },
        { n: 'L-карнитин', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Омега-3', k: 900, p: 0, f: 100, c: 0 },
        { n: 'Витамин D3', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Магний B6', k: 0, p: 0, f: 0, c: 0 },
        { n: 'Коллаген', k: 350, p: 90, f: 0, c: 0 },
        { n: 'Изотоник', k: 380, p: 5, f: 0, c: 90 },
        { n: 'Какао-порошок', k: 290, p: 24, f: 15, c: 10 },
        { n: 'Панкейки фитнес', k: 360, p: 30, f: 6, c: 45 }
      ]
    },
    {
      packs: ['250 г', '350 г'],
      brands: ['Перекрёсток', 'Азбука Вкуса', 'Готово!', 'Шеф Маркет', 'ВкусВилл', 'Едим Дома', 'Меню на день', 'Кулинария №1'],
      items: [
        { n: 'Гречка с курицей готовая', k: 145, p: 8, f: 4, c: 19 },
        { n: 'Рис с овощами', k: 130, p: 3, f: 4, c: 21 },
        { n: 'Паста болоньезе', k: 165, p: 7, f: 6, c: 20 },
        { n: 'Суп борщ', k: 60, p: 2, f: 3, c: 6 },
        { n: 'Суп куриный с лапшой', k: 55, p: 3, f: 2, c: 6 },
        { n: 'Салат «Цезарь»', k: 160, p: 9, f: 11, c: 6 },
        { n: 'Салат овощной', k: 45, p: 1, f: 3, c: 4 },
        { n: 'Оливье', k: 195, p: 4, f: 15, c: 11 },
        { n: 'Котлета по-киевски', k: 280, p: 14, f: 19, c: 13 },
        { n: 'Плов готовый', k: 200, p: 8, f: 8, c: 24 },
        { n: 'Шаурма с курицей', k: 215, p: 12, f: 10, c: 17 },
        { n: 'Бургер с говядиной', k: 295, p: 13, f: 14, c: 28 },
        { n: 'Суши-ролл «Филадельфия»', k: 176, p: 7, f: 8, c: 19 },
        { n: 'Пицца «Маргарита»', k: 230, p: 10, f: 8, c: 29 },
        { n: 'Омлет готовый', k: 145, p: 10, f: 11, c: 2 }
      ]
    },
    {
      packs: ['200 г', '400 г'],
      brands: ['Роскар', 'Окское', 'Волжанин', 'Село Зелёное', 'Простоквашино', 'Сырная долина', 'Киприно', 'Углич'],
      items: [
        { n: 'Яйцо куриное С1', k: 155, p: 13, f: 11, c: 1 },
        { n: 'Яйцо куриное С0', k: 157, p: 13, f: 11, c: 1 },
        { n: 'Яйцо перепелиное', k: 168, p: 12, f: 13, c: 0.6 },
        { n: 'Сыр «Российский» 50%', k: 364, p: 23, f: 30, c: 0 },
        { n: 'Сыр «Моцарелла» 45%', k: 280, p: 22, f: 20, c: 2 },
        { n: 'Сыр «Гауда» 45%', k: 356, p: 25, f: 27, c: 2 },
        { n: 'Сыр творожный', k: 240, p: 7, f: 22, c: 4 },
        { n: 'Сыр плавленый', k: 257, p: 14, f: 20, c: 4 },
        { n: 'Масло сливочное 72%', k: 662, p: 0.8, f: 72, c: 1.3 },
        { n: 'Масло топлёное', k: 892, p: 0.4, f: 99, c: 0 },
        { n: 'Сыр «Пармезан» 40%', k: 392, p: 33, f: 28, c: 0 },
        { n: 'Брынза', k: 262, p: 17, f: 20, c: 2 }
      ]
    }
  ];

  var GEN_CACHE = null;

  function padZ(v, len) {
    var s = String(v);
    while (s.length < len) s = '0' + s;
    return s;
  }

  function ean13From(base12) {
    var s = 0;
    for (var i = 0; i < 12; i++) s += (+base12.charAt(i)) * (i % 2 ? 3 : 1);
    return base12 + ((10 - (s % 10)) % 10);
  }

  function genProducts() {
    if (GEN_CACHE) return GEN_CACHE;
    var out = [], brandIdx = 0, ci, bi, ii, pi, cat, packs, man, itemNo, base12, it;
    for (ci = 0; ci < GEN_CATS.length; ci++) {
      cat = GEN_CATS[ci];
      packs = (cat.packs && cat.packs.length) ? cat.packs : [''];
      for (bi = 0; bi < cat.brands.length; bi++) {
        brandIdx++;
        man = '46' + padZ(brandIdx, 5);
        itemNo = 0;
        for (ii = 0; ii < cat.items.length; ii++) {
          it = cat.items[ii];
          for (pi = 0; pi < packs.length; pi++) {
            itemNo++;
            base12 = man + padZ(itemNo, 5);
            out.push({
              code: ean13From(base12),
              codes: [base12],
              n: cat.brands[bi] + ' ' + it.n + ' · ' + packs[pi],
              k: it.k, p: it.p, f: it.f, c: it.c
            });
          }
        }
      }
    }
    GEN_CACHE = out;
    return out;
  }

  /* ==================== ЖИВОЙ ПОИСК ПО ЦИФРАМ ==================== */
  var codeList = null;

  function allIndexList() {
    if (codeList) return codeList;
    var all = allProducts(), out = [], seen = {}, i, n;
    for (i = 0; i < all.length; i++) {
      n = normCode(all[i].code);
      if (!n || seen[n]) continue;
      seen[n] = 1;
      out.push({ n: n, p: all[i] });
    }
    codeList = out;
    return out;
  }

  function searchCodes(q, limit) {
    var d = String(q || '').replace(/\D/g, '');
    limit = limit || 12;
    if (!d) return [];
    var list = allIndexList(), start = [], mid = [], i, n;
    for (i = 0; i < list.length; i++) {
      n = list[i].n;
      if (n === d) start.unshift(list[i]);
      else if (n.indexOf(d) === 0) start.push(list[i]);
      else if (n.indexOf(d) > 0) mid.push(list[i]);
      if (start.length >= limit && mid.length >= limit) break;
    }
    return start.concat(mid).slice(0, limit);
  }

  function hlCode(code, q) {
    var s = String(code || '');
    var d = String(q || '').replace(/\D/g, '');
    if (!d) return esc(s);
    var i = s.indexOf(d);
    if (i < 0) return esc(s);
    return esc(s.slice(0, i)) +
      '<span class="gmd-hl">' + esc(s.slice(i, i + d.length)) + '</span>' +
      esc(s.slice(i + d.length));
  }

  function bcLive(value) {
    var live = document.getElementById('gmdBcLive');
    if (!live) return;
    var d = String(value || '').replace(/\D/g, '');
    if (!d) { live.innerHTML = ''; return; }

    if (d.length < 2) {
      live.innerHTML = '<div class="gmd-note">Введи ещё пару цифр — покажу товары с похожими кодами.</div>';
      return;
    }

    /* полный или почти полный код — сразу карточка товара */
    if (d.length >= 12) {
      var hit = findProduct(d);
      if (hit) {
        live.innerHTML = '';
        barcodeLookup(hit.code);
        return;
      }
    }

    var res = searchCodes(d, 12);
    if (!res.length) {
      live.innerHTML = '<div class="gmd-note">По цифрам <b>' + esc(d) + '</b> ничего не нашлось. Введи больше цифр или добавь товар вручную ниже.</div>';
      return;
    }

    var h = '<div class="gmd-h4">Похожие коды · ' + res.length + '</div><div class="list" style="max-height:38vh">';
    for (var i = 0; i < res.length; i++) {
      var it = res[i];
      h += '<div class="gmd-qrow">' +
        '<div style="flex:1;min-width:0">' +
          '<b style="font-size:12.5px;display:block;line-height:1.35">' + esc(it.p.n) + '</b>' +
          '<div class="tiny muted gmd-livecode">' + hlCode(it.n, d) + ' · ' + Math.round(it.p.k) + ' ккал/100 г</div>' +
        '</div>' +
        '<button class="btn sm teal" data-gmd="bcUse" data-code="' + esc(it.p.code) + '">Выбрать</button>' +
      '</div>';
    }
    h += '</div>';
    live.innerHTML = h;
  }

  function startBarcode() {
    var hint = document.getElementById('gmdBcHint');
    var video = document.getElementById('gmdBcVideo');
    if (!video) return;
    if (!('BarcodeDetector' in window)) {
      if (hint) hint.textContent = 'Браузер не поддерживает сканер — введи цифры штрихкода вручную ниже.';
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (hint) hint.textContent = 'Нет доступа к камере — введи цифры вручную ниже.';
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (s) {
      bcStream = s;
      video.srcObject = s;
      try { video.play(); } catch (e) {}
      if (hint) hint.textContent = 'Ищу штрихкод…';
      var det;
      try {
        det = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'] });
      } catch (e) {
        det = new window.BarcodeDetector();
      }
      var tick = function () {
        if (!bcStream) return;
        det.detect(video).then(function (codes) {
          if (codes && codes.length) {
            var code = codes[0].rawValue;
            stopBarcode();
            if (hint) hint.textContent = 'Код распознан: ' + code;
            barcodeLookup(code);
            return;
          }
          bcTimer = setTimeout(tick, 450);
        }).catch(function () {
          bcTimer = setTimeout(tick, 900);
        });
      };
      tick();
    }).catch(function () {
      if (hint) hint.textContent = 'Камера недоступна или запрещена — введи цифры вручную ниже.';
    });
  }

  function barcodeLookup(code) {
    code = String(code || '').replace(/\D/g, '');
    lastBcCode = code;
    var box = document.getElementById('gmdBcResult');
    var codeIn = document.getElementById('gmdBcCode');
    if (codeIn && code) codeIn.value = code;
    if (!box) return;
    if (!code) { box.innerHTML = '<div class="empty">Введи или отсканируй штрихкод.</div>'; return; }
    var p = findProduct(code);
    if (p) {
      box.innerHTML = '<div class="gmd-calc"><b>' + esc(p.n) + '</b><br>' +
          'на 100 г: ' + Math.round(p.k) + ' ккал · Б ' + p.p + ' Ж ' + p.f + ' У ' + p.c + '</div>' +
        '<div class="chips-row" style="margin-top:10px">' +
          '<button class="gchip" data-gmd="bcGrams" data-g="30">30 г</button>' +
          '<button class="gchip" data-gmd="bcGrams" data-g="50">50 г</button>' +
          '<button class="gchip" data-gmd="bcGrams" data-g="100">100 г</button>' +
          '<button class="gchip" data-gmd="bcGrams" data-g="150">150 г</button>' +
          '<button class="gchip" data-gmd="bcGrams" data-g="200">200 г</button>' +
          '<button class="gchip" data-gmd="bcGrams" data-g="250">250 г</button>' +
        '</div>' +
        '<div class="field" style="margin-top:10px"><label>Сколько грамм съел?</label>' +
        '<input id="gmdBcG" type="number" inputmode="numeric" step="10" value="100"></div>' +
        '<div class="gmd-total" id="gmdBcOut"></div>' +
        '<button class="btn primary full" data-gmd="bcAdd" data-code="' + esc(p.code) + '" style="margin-top:10px">✓ Добавить в дневник</button>';
      bcCalc(p.code);
      var g = document.getElementById('gmdBcG');
      if (g) g.addEventListener('input', function () { bcCalc(p.code); });
    } else {
      var sim = findSimilar(code);
      var simHtml = sim.length
        ? '<div class="gmd-h4">Похожие по коду</div><div class="gmd-guess">' +
          sim.map(function (x) {
            return '<button class="gmd-mode" data-gmd="bcUse" data-code="' + esc(x.code) + '">' + esc(x.n) + ' · ' + Math.round(x.k) + ' ккал</button>';
          }).join('') + '</div>'
        : '';
      var chk = ean13Ok(code) ? '' : '<div class="gmd-note" style="color:#fcd34d">Контрольная сумма кода не сходится — проверь цифры на упаковке, возможно опечатка.</div>';
      box.innerHTML =
        '<div class="gmd-note">Товар с кодом <b>' + esc(code) + '</b> не найден. Впиши данные с упаковки — сохраню в свою базу, и дальше он будет находиться сразу.</div>' +
        chk + simHtml +
        '<div class="field" style="margin-top:10px"><label>Название</label><input id="gmdBcN" placeholder="Творог 5%"></div>' +
        '<div class="grid3">' +
          '<div class="field"><label>Ккал/100 г</label><input id="gmdBcK" type="number" inputmode="numeric" placeholder="121"></div>' +
          '<div class="field"><label>Белки</label><input id="gmdBcP" type="number" inputmode="numeric" placeholder="17"></div>' +
          '<div class="field"><label>Жиры</label><input id="gmdBcF" type="number" inputmode="numeric" placeholder="5"></div>' +
        '</div>' +
        '<div class="field"><label>Углеводы</label><input id="gmdBcC" type="number" inputmode="numeric" placeholder="3"></div>' +
        '<button class="btn primary full" data-gmd="bcSave" data-code="' + code + '">Сохранить в базу</button>' +
        '<div class="gmd-h4">Или выбери из базы · ' + allProducts().length + ' продуктов</div>' +
        '<div class="field"><input id="gmdBcPickQ" placeholder="творог, курица, рис, сыр…" autocomplete="off"></div>' +
        '<div class="list" id="gmdBcPickList" style="max-height:34vh"></div>';
      fillBcPick('');
      var pq = document.getElementById('gmdBcPickQ');
      if (pq) pq.addEventListener('input', function () { fillBcPick(this.value); });
    }
  }

  function bcCalc(code) {
    var p = findProduct(code);
    var gEl = document.getElementById('gmdBcG');
    var out = document.getElementById('gmdBcOut');
    if (!p || !gEl || !out) return;
    var grams = Number(gEl.value) || 100;
    var v = fromGrams(p, grams);
    out.innerHTML = '<b>' + v.k + ' ккал</b> за ' + grams + ' г · Б ' + v.p + ' · Ж ' + v.f + ' · У ' + v.c;
  }

  /* ---------- ВКЛАДКА «ВРУЧНУЮ» ---------- */
  function renderManualPane() {
    var box = document.getElementById('gmdQuickBody');
    if (!box) return;
    box.innerHTML =
      '<div class="field" style="margin-top:4px"><label>Название блюда</label><input id="gmdMn" placeholder="Шаурма с курицей"></div>' +
      '<div class="field"><label>Вес порции, г</label><input id="gmdMg" type="number" inputmode="numeric" placeholder="250"></div>' +
      '<div class="gmd-tabs" id="gmdManualMode" style="margin:4px 0 10px">' +
        '<button class="on" data-gmd="manmode" data-m="portion">КБЖУ на всю порцию</button>' +
        '<button data-gmd="manmode" data-m="100">КБЖУ на 100 г</button>' +
      '</div>' +
      '<div class="grid2">' +
        '<div class="field"><label>Ккал</label><input id="gmdMk" type="number" inputmode="numeric" placeholder="450"></div>' +
        '<div class="field"><label>Белки, г</label><input id="gmdMp" type="number" inputmode="numeric" placeholder="25"></div>' +
        '<div class="field"><label>Жиры, г</label><input id="gmdMf" type="number" inputmode="numeric" placeholder="18"></div>' +
        '<div class="field"><label>Углеводы, г</label><input id="gmdMc" type="number" inputmode="numeric" placeholder="40"></div>' +
      '</div>' +
      '<div class="gmd-total" id="gmdMOut">—</div>' +
      '<button class="btn primary full" data-gmd="manual" style="margin-top:10px">Добавить в дневник</button>';
    manualCalc();
    ['gmdMk', 'gmdMp', 'gmdMf', 'gmdMc', 'gmdMg'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', manualCalc);
    });
  }

  function manualValues() {
    var k = num('gmdMk'), p = num('gmdMp'), f = num('gmdMf'), c = num('gmdMc'), g = num('gmdMg');
    if (!k && !p && !f && !c) return null;
    if (manMode === '100') {
      var grams = g || 100;
      var s = fromGrams({ k: k, p: p, f: f, c: c }, grams);
      s.g = grams;
      return s;
    }
    return { k: Math.round(k), p: Math.round(p), f: Math.round(f), c: Math.round(c), g: g || 0 };
  }

  function manualCalc() {
    var out = document.getElementById('gmdMOut');
    if (!out) return;
    var v = manualValues();
    if (!v) { out.innerHTML = 'Впиши калории и БЖУ — покажу итог.'; return; }
    out.innerHTML = '<b>' + v.k + ' ккал</b> · Б ' + v.p + ' · Ж ' + v.f + ' · У ' + v.c +
      (manMode === '100' ? ' <span class="tiny muted">(пересчёт на ' + v.g + ' г)</span>' : ' <span class="tiny muted">(вся порция)</span>');
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
    if (act === 'qtab') {
      qTab = btn.getAttribute('data-tab');
      renderQuickTab();
      return;
    }
    if (act === 'addG') {
      var iG = Number(btn.getAttribute('data-i'));
      var rG = R[iG];
      if (!rG) return;
      var inpG = document.querySelector('#gmdSearchList input.gmd-g[data-i="' + iG + '"]');
      var gramsG = inpG ? (Number(inpG.value) || portionWeight(rG)) : portionWeight(rG);
      var vG = fromGrams(per100(rG), gramsG);
      addFood(rG.n + ' · ' + gramsG + ' г', vG.k, vG.p, vG.f, vG.c);
      return;
    }
    if (act === 'photoPick') {
      photoPick(Number(btn.getAttribute('data-i')));
      return;
    }
    if (act === 'photoAdd') {
      var iP = Number(btn.getAttribute('data-i'));
      var rP = R[iP];
      if (!rP) return;
      var gElP = document.getElementById('gmdPhotoG');
      var gramsP = gElP ? (Number(gElP.value) || portionWeight(rP)) : portionWeight(rP);
      var vP = fromGrams(per100(rP), gramsP);
      addFood(rP.n + ' · ' + gramsP + ' г', vP.k, vP.p, vP.f, vP.c);
      return;
    }
    if (act === 'bcStart') {
      startBarcode();
      return;
    }
    if (act === 'bcStop') {
      stopBarcode();
      var hintB = document.getElementById('gmdBcHint');
      if (hintB) hintB.textContent = 'Сканер остановлен. Можно ввести цифры вручную.';
      return;
    }
    if (act === 'bcFind') {
      var codeInF = document.getElementById('gmdBcCode');
      barcodeLookup(codeInF ? codeInF.value : '');
      return;
    }
    if (act === 'bcUse') {
      var codeU = btn.getAttribute('data-code');
      var liveBox = document.getElementById('gmdBcLive');
      if (liveBox) liveBox.innerHTML = '';
      barcodeLookup(codeU);
      return;
    }
    if (act === 'bcAdd') {
      var codeA = btn.getAttribute('data-code');
      var prodA = findProduct(codeA);
      if (!prodA) return;
      var gElA = document.getElementById('gmdBcG');
      var gramsA = gElA ? (Number(gElA.value) || 100) : 100;
      var vA = fromGrams(prodA, gramsA);
      addFood(prodA.n + ' · ' + gramsA + ' г', vA.k, vA.p, vA.f, vA.c);
      return;
    }
    if (act === 'bcSave') {
      var codeS = btn.getAttribute('data-code');
      var nameS = String((document.getElementById('gmdBcN') || {}).value || '').trim();
      var kS = num('gmdBcK');
      if (!nameS || !kS) { toast('Впиши название и калорийность'); return; }
      var custS = customBc();
      custS[codeS] = {
        code: codeS, n: nameS.slice(0, 60), k: kS,
        p: num('gmdBcP'), f: num('gmdBcF'), c: num('gmdBcC')
      };
      try { localStorage.setItem(BC_LS, JSON.stringify(custS)); } catch (e) {}
      bcMap = null;
      codeList = null;
      toast('Товар сохранён в базу');
      barcodeLookup(codeS);
      return;
    }
    if (act === 'manmode') {
      manMode = btn.getAttribute('data-m') === '100' ? '100' : 'portion';
      var mmB = document.querySelectorAll('#gmdManualMode button');
      for (var mi = 0; mi < mmB.length; mi++) mmB[mi].classList.toggle('on', mmB[mi] === btn);
      manualCalc();
      return;
    }
    if (act === 'manual') {
      var nM = String((document.getElementById('gmdMn') || {}).value || '').trim();
      var vM = manualValues();
      if (!nM || !vM || !vM.k) { toast('Впиши название и калории'); return; }
      addFood(nM, vM.k, vM.p, vM.f, vM.c);
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
    if (document.getElementById('gmdQuickBody')) renderQuickTab();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 60); });
  else setTimeout(boot, 60);
})();