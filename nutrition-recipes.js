/* GymMind — Питание: рецепты, фото блюда и сканер штрихкодов.
   Подключается как отдельный модуль и сам встраивается в раздел «Питание». */
(function () {
  'use strict';
  if (window.__gmnBooted) return;
  window.__gmnBooted = true;

  /* ==================== ДАННЫЕ: 48 ПРОСТЫХ РЕЦЕПТОВ ==================== */
  /* m: b — завтрак, l — обед, d — ужин, s — перекус.
     k — ккал на порцию, p/f/c — белки/жиры/углеводы в граммах, t — минуты. */
  var RECIPES = [
    /* ---------- ЗАВТРАКИ ---------- */
    { n: 'Овсянка с бананом и корицей', e: '🌾', m: 'b', k: 380, p: 12, f: 8, c: 62, t: 10,
      i: ['Овсяные хлопья — 50 г (5 ст. л. с горкой)', 'Молоко 2,5% — 200 мл (1 стакан)', 'Банан — 1 средний (~120 г)', 'Корица — ½ ч. л.', 'Мёд — 1 ч. л. (по желанию)', 'Соль — щепотка'],
      s: ['Хлопья и молоко высыпь в кастрюлю, поставь на средний огонь.', 'Доведи до кипения и вари 5–7 минут, помешивая.', 'Сними с огня, добавь щепотку соли и корицу.', 'Сверху выложи банан кружками и полей мёдом.'] },
    { n: 'Омлет из 3 яиц с помидором', e: '🍳', m: 'b', k: 320, p: 22, f: 22, c: 6, t: 10,
      i: ['Яйца — 3 шт.', 'Молоко — 30 мл (2 ст. л.)', 'Помидор — 1 шт. (~100 г)', 'Растительное масло — 1 ч. л.', 'Соль, перец — по вкусу', 'Зелень — небольшой пучок'],
      s: ['Взбей яйца с молоком, солью и перцем вилкой (30 секунд).', 'Помидор нарежь кружками и обжарь 1 минуту на масле.', 'Залей яйцами, накрой крышкой и готовь 4–5 минут на малом огне.', 'Посыпь зеленью прямо в сковороде.'] },
    { n: 'Сырники из творога', e: '🥞', m: 'b', k: 420, p: 28, f: 14, c: 45, t: 20,
      i: ['Творог 5% — 200 г', 'Яйцо — 1 шт.', 'Мука — 2 ст. л. (30 г) + 1 ст. л. для панировки', 'Сахар — 1 ст. л.', 'Соль — щепотка', 'Масло для жарки — 1 ч. л.'],
      s: ['Смешай творог, яйцо, сахар, соль и 2 ложки муки до однородности.', 'Сформируй 5–6 лепёшек толщиной ~1,5 см.', 'Обваляй каждую в оставшейся муке.', 'Жарь по 3–4 минуты с каждой стороны на малом огне.'] },
    { n: 'Греческий йогурт с ягодами', e: '🫐', m: 'b', k: 290, p: 18, f: 12, c: 26, t: 5,
      i: ['Греческий йогурт 2% — 200 г (1 стакан)', 'Ягоды свежие или замороженные — 100 г (горсть)', 'Миндаль — 10 г (10 шт.)', 'Мёд — 1 ч. л.'],
      s: ['Выложи йогурт в миску или стакан.', 'Сверху добавь ягоды (замороженные предварительно разморозь).', 'Миндаль поруби ножом и посыпь сверху.', 'Полей мёдом и ешь сразу.'] },
    { n: 'Тост с авокадо и яйцом', e: '🥑', m: 'b', k: 350, p: 16, f: 20, c: 28, t: 10,
      i: ['Хлеб цельнозерновой — 2 ломтика (~60 г)', 'Авокадо — ½ шт. (~70 г)', 'Яйца — 2 шт.', 'Лимонный сок — 1 ч. л.', 'Соль, перец — по вкусу'],
      s: ['Отвари яйца 7–8 минут (пашот-эффект) или пожарь без масла.', 'Авокадо разомни вилкой с лимонным соком и солью.', 'Подсуши хлеб в тостере или на сухой сковороде 1–2 минуты.', 'Намажь авокадо на тосты и выложи сверху яйца.'] },
    { n: 'Бутерброд с лососем', e: '🐟', m: 'b', k: 310, p: 20, f: 16, c: 22, t: 7,
      i: ['Хлеб цельнозерновой — 2 ломтика (~60 г)', 'Творожный сыр — 2 ст. л. (40 г)', 'Слабосолёный лосось — 50 г (2 тонких ломтика)', 'Огурец — ½ шт.', 'Укроп — пара веточек'],
      s: ['Подсуши хлеб.', 'Намажь творожным сыром каждый ломтик.', 'Сверху положи лосось и тонкие кружки огурца.', 'Посыпь укропом.'] },
    { n: 'Овсяноблин с творогом', e: '🥞', m: 'b', k: 330, p: 24, f: 11, c: 34, t: 15,
      i: ['Овсяные хлопья — 40 г (4 ст. л.)', 'Яйца — 2 шт.', 'Молоко — 50 мл (¼ стакана)', 'Творог 5% — 100 г', 'Соль — щепотка'],
      s: ['Измельчи хлопья в блендере или кофемолке (30 секунд).', 'Смешай с яйцами и молоком до состояния теста.', 'Вылей на разогретую сухую сковороду, накрой крышкой, готовь 2–3 минуты с каждой стороны.', 'Внутрь положи творог, сверни пополам.'] },
    { n: 'Шакшука на скорую руку', e: '🍅', m: 'b', k: 340, p: 18, f: 22, c: 18, t: 20,
      i: ['Помидоры — 400 г (4 шт.)', 'Яйца — 2 шт.', 'Лук — 1 шт.', 'Чеснок — 2 зубчика', 'Масло — 1 ст. л.', 'Паприка — ½ ч. л., соль, перец'],
      s: ['Обжарь нарезанный лук 3 минуты на масле.', 'Добавь чеснок и паприку, через 30 секунд — нарезанные помидоры.', 'Туши 8–10 минут, пока соус не загустеет.', 'Сделай две лунки, разбей туда яйца, накрой крышкой и готовь 4 минуты.'] },
    { n: 'Банановый смузи с овсянкой', e: '🥤', m: 'b', k: 300, p: 12, f: 7, c: 48, t: 5,
      i: ['Банан — 1 шт.', 'Молоко — 250 мл (1 стакан + 2 ст. л.)', 'Овсяные хлопья — 30 г (3 ст. л.)', 'Мёд — 1 ч. л.', 'Корица — щепотка'],
      s: ['Положи все ингредиенты в блендер.', 'Взбивай 40–60 секунд до гладкости.', 'Если густо — добавь ещё 50 мл молока.', 'Пей сразу, пока холодный.'] },
    { n: 'Гречка с молоком', e: '🥣', m: 'b', k: 350, p: 14, f: 8, c: 58, t: 15,
      i: ['Гречка — 60 г (⅓ стакана)', 'Вода — 150 мл', 'Молоко — 150 мл', 'Соль — щепотка', 'Масло сливочное — 5 г (по желанию)'],
      s: ['Промой гречку, залей водой, доведи до кипения.', 'Вари под крышкой 10 минут на малом огне.', 'Влей молоко, добавь соль и вари ещё 3 минуты.', 'Дай постоять 2 минуты под крышкой.'] },
    { n: 'Рисовая каша с яблоком', e: '🍎', m: 'b', k: 340, p: 9, f: 7, c: 60, t: 25,
      i: ['Рис круглый — 50 г (¼ стакана)', 'Молоко — 250 мл (1 стакан)', 'Яблоко — 1 шт.', 'Корица — ½ ч. л.', 'Мёд — 1 ч. л.'],
      s: ['Промой рис, залей молоком и доведи до кипения.', 'Вари на минимальном огне 18–20 минут, помешивая.', 'Яблоко натри на крупной тёрке и добавь за 2 минуты до готовности.', 'Сними с огня, добавь корицу и мёд.'] },
    { n: 'Яичница со шпинатом', e: '🍳', m: 'b', k: 280, p: 18, f: 20, c: 5, t: 8,
      i: ['Яйца — 2 шт.', 'Шпинат — 80 г (2 большие горсти)', 'Масло растительное — 1 ч. л.', 'Соль, перец — по вкусу'],
      s: ['Разогрей масло на сковороде, выложи шпинат.', 'Помешивай 1–2 минуты, пока листья не осядут.', 'Разбей сверху яйца, посоли и поперчи.', 'Накрой крышкой и готовь 3–4 минуты до схватывания белка.'] },
    { n: 'Протеиновые панкейки', e: '🥞', m: 'b', k: 400, p: 30, f: 10, c: 45, t: 15,
      i: ['Овсяная мука — 50 г (5 ст. л.)', 'Протеин — 30 г (1 мерная ложка)', 'Яйцо — 1 шт.', 'Кефир — 100 мл (½ стакана)', 'Разрыхлитель — ½ ч. л.'],
      s: ['Смешай сухие ингредиенты: муку, протеин, разрыхлитель.', 'Добавь яйцо и кефир, размешай до однородного теста.', 'Жарь на сухой антипригарной сковороде по 1,5–2 минуты с каждой стороны.', 'Получится 3–4 небольших панкейка.'] },
    { n: 'Творог с бананом и какао', e: '🍫', m: 'b', k: 330, p: 26, f: 6, c: 42, t: 5,
      i: ['Творог 5% — 200 г', 'Банан — 1 шт.', 'Какао — 1 ч. л.', 'Мёд — 1 ч. л. (по желанию)'],
      s: ['Выложи творог в миску.', 'Банан нарежь кружками и добавь сверху.', 'Посыпь какао и добавь мёд.', 'Перемешай перед едой или ешь слоями.'] },

    /* ---------- ОБЕДЫ ---------- */
    { n: 'Куриная грудка с гречкой и салатом', e: '🍗', m: 'l', k: 520, p: 48, f: 12, c: 55, t: 30,
      i: ['Куриная грудка — 150 г', 'Гречка — 70 г сухой (⅓ стакана)', 'Помидор — 1 шт., огурец — 1 шт.', 'Оливковое масло — 1 ст. л.', 'Соль, перец, паприка'],
      s: ['Гречку залей 150 мл воды, доведи до кипения и вари 12 минут под крышкой.', 'Грудку разрежь вдоль на 2 пласта, посоли и посыпь паприкой.', 'Обжарь на сухой сковороде по 4–5 минут с каждой стороны.', 'Овощи нарежь, заправь маслом, собери всё на тарелке.'] },
    { n: 'Паста с тунцом и томатами', e: '🍝', m: 'l', k: 560, p: 34, f: 16, c: 68, t: 20,
      i: ['Макароны — 80 г сухих', 'Тунец в собственном соку — 1 банка (150 г)', 'Помидоры — 300 г (3 шт.)', 'Чеснок — 2 зубчика', 'Оливковое масло — 1 ст. л.'],
      s: ['Поставь вариться макароны по инструкции (обычно 8–10 минут).', 'На масле обжарь чеснок 30 секунд, добавь нарезанные помидоры.', 'Туши 5 минут, добавь тунец без жидкости и прогрей 2 минуты.', 'Смешай с готовыми макаронами прямо в сковороде.'] },
    { n: 'Плов из курицы (упрощённый)', e: '🍚', m: 'l', k: 590, p: 34, f: 18, c: 70, t: 40,
      i: ['Рис — 80 г (⅓ стакана)', 'Куриное бедро — 150 г', 'Морковь — 1 шт.', 'Лук — 1 шт.', 'Масло — 1 ст. л.', 'Соль, зира, паприка'],
      s: ['Обжарь курицу кусочками 5 минут на масле.', 'Добавь лук кубиком и морковь соломкой, готовь 5 минут.', 'Всыпь специи и рис, залей 160 мл воды.', 'Накрой крышкой и туши 20 минут на малом огне, не перемешивая.'] },
    { n: 'Суп-пюре из тыквы с курицей', e: '🍲', m: 'l', k: 380, p: 28, f: 12, c: 40, t: 35,
      i: ['Тыква — 400 г', 'Куриное филе — 150 г', 'Лук — 1 шт.', 'Сливки 10% — 100 мл', 'Масло — 1 ст. л.', 'Соль, перец'],
      s: ['Обжарь лук 3 минуты, добавь тыкву кубиком и готовь 5 минут.', 'Залей 500 мл воды, добавь курицу и вари 20 минут.', 'Достань курицу, разбери на волокна, овощи пробей блендером.', 'Влей сливки, верни курицу, согрей 2 минуты.'] },
    { n: 'Боул с рисом, яйцом и овощами', e: '🥗', m: 'l', k: 480, p: 22, f: 14, c: 64, t: 25,
      i: ['Рис — 70 г (⅓ стакана)', 'Яйца — 2 шт.', 'Морковь — 1 шт., огурец — 1 шт.', 'Кукуруза консервированная — 3 ст. л.', 'Соевый соус — 1 ст. л.', 'Масло — 1 ч. л.'],
      s: ['Свари рис (12–15 минут) и яйца вкрутую (8 минут).', 'Морковь натри на крупной тёрке, огурец нарежь соломкой.', 'Собери в миске: рис внизу, сверху овощи, кукуруза и половинки яиц.', 'Полей соевым соусом и сбрызни маслом.'] },
    { n: 'Гречка с тушёной говядиной', e: '🥘', m: 'l', k: 560, p: 40, f: 18, c: 58, t: 45,
      i: ['Говядина — 150 г', 'Гречка — 70 г сухой', 'Лук — 1 шт., морковь — 1 шт.', 'Томатная паста — 1 ст. л.', 'Масло — 1 ст. л.', 'Соль, перец'],
      s: ['Нарежь говядину кубиками и обжарь 5 минут на масле.', 'Добавь лук и морковь, готовь 5 минут.', 'Добавь томатную пасту и 200 мл воды, туши под крышкой 25 минут.', 'Отдельно свари гречку и подавай с мясом и соусом.'] },
    { n: 'Салат «Цезарь» с курицей', e: '🥗', m: 'l', k: 470, p: 38, f: 24, c: 24, t: 20,
      i: ['Куриная грудка — 150 г', 'Салат романо/айсберг — 150 г', 'Помидоры черри — 100 г', 'Пармезан — 20 г', 'Йогурт натуральный — 3 ст. л.', 'Сухарики — 30 г'],
      s: ['Грудку посоли и обжарь по 4 минуты с каждой стороны, нарежь полосками.', 'Йогурт смешай с щепоткой соли, перца и давленым чесноком — это соус.', 'Порви салат руками, добавь черри и сухарики.', 'Сверху курица, соус и тёртый пармезан.'] },
    { n: 'Запечённый картофель с рыбой', e: '🐟', m: 'l', k: 500, p: 36, f: 16, c: 50, t: 40,
      i: ['Картофель — 300 г (3 шт.)', 'Филе белой рыбы (минтай/треска) — 180 г', 'Масло оливковое — 1 ст. л.', 'Лимон — 2 дольки', 'Соль, перец, паприка'],
      s: ['Разогрей духовку до 200 °C.', 'Картофель нарежь дольками, посоли, сбрызни маслом, запекай 20 минут.', 'Добавь рыбу на противень, посыпь паприкой и сбрызни лимоном.', 'Запекай ещё 15–18 минут до готовности рыбы.'] },
    { n: 'Индейка с рисом и брокколи', e: '🥦', m: 'l', k: 510, p: 42, f: 12, c: 56, t: 30,
      i: ['Филе индейки — 150 г', 'Рис — 70 г', 'Брокколи — 200 г', 'Соевый соус — 1 ст. л.', 'Масло — 1 ч. л.'],
      s: ['Свари рис (12–15 минут).', 'Индейку нарежь полосками и обжарь 6–7 минут на масле.', 'Брокколи отвари 4 минуты или приготовь на пару.', 'Смешай всё, полей соевым соусом.'] },
    { n: 'Куриный суп с лапшой', e: '🍜', m: 'l', k: 390, p: 30, f: 11, c: 40, t: 40,
      i: ['Куриное бедро без кожи — 150 г', 'Лапша — 40 г сухой', 'Картофель — 1 шт.', 'Морковь — 1 шт., лук — 1 шт.', 'Соль, лавровый лист, зелень'],
      s: ['Курицу залей 700 мл воды, доведи до кипения, снимая пену, вари 20 минут.', 'Добавь картофель кубиком, морковь и лук — вари 10 минут.', 'Всыпь лапшу и вари ещё 3 минуты.', 'Посоли, добавь лавровый лист и зелень, дай постоять 5 минут.'] },
    { n: 'Буррито с фаршем и фасолью', e: '🌯', m: 'l', k: 600, p: 36, f: 22, c: 62, t: 25,
      i: ['Лаваш тонкий — 1 лист (~70 г)', 'Фарш говяжий/индюшиный — 120 г', 'Фасоль консервированная — 100 г', 'Помидор — 1 шт.', 'Сыр — 30 г', 'Специи, соль'],
      s: ['Обжарь фарш 7 минут, добавь специи и 2 ст. л. воды.', 'Добавь фасоль и нарезанный помидор, туши 3 минуты.', 'Выложи начинку на лаваш, посыпь сыром и сверни конвертом.', 'Прогрей на сухой сковороде по 2 минуты с каждой стороны.'] },
    { n: 'Пельмени со сметаной (10 шт.)', e: '🥟', m: 'l', k: 580, p: 26, f: 24, c: 60, t: 15,
      i: ['Пельмени — 10 шт. (~200 г)', 'Сметана 15% — 2 ст. л.', 'Масло сливочное — 5 г', 'Соль, перец, зелень'],
      s: ['Вскипяти 1,5 л воды, посоли.', 'Опусти пельмени, помешай и вари 5–7 минут после всплытия.', 'Слей воду, добавь масло и перемешай.', 'Подавай со сметаной и зеленью.'] },
    { n: 'Тефтели в томатном соусе с рисом', e: '🍛', m: 'l', k: 540, p: 34, f: 18, c: 58, t: 40,
      i: ['Фарш — 150 г', 'Рис — 70 г сухой', 'Лук — 1 шт.', 'Томатная паста — 1,5 ст. л.', 'Мука — 1 ст. л.', 'Соль, перец'],
      s: ['Смешай фарш с половиной лука, солью и перцем, скатай 5 шариков.', 'Обжарь их 3 минуты, чтобы схватились.', 'В 250 мл воды разведи томатную пасту и муку, залей тефтели, туши 20 минут.', 'Отдельно свари рис и подавай с соусом.'] },
    { n: 'Греческий салат с курицей', e: '🥙', m: 'l', k: 420, p: 34, f: 24, c: 18, t: 15,
      i: ['Куриная грудка — 150 г', 'Огурец — 1 шт., помидор — 2 шт.', 'Перец болгарский — ½ шт.', 'Фета — 40 г', 'Маслины — 8 шт.', 'Оливковое масло — 1 ст. л.'],
      s: ['Грудку посоли и обжарь по 4 минуты с каждой стороны, нарежь.', 'Овощи нарежь крупными кусками.', 'Смешай овощи, маслины и курицу.', 'Сверху раскроши фету и полей маслом.'] },

    /* ---------- УЖИНЫ ---------- */
    { n: 'Запечённая рыба с овощами', e: '🐟', m: 'd', k: 420, p: 38, f: 18, c: 24, t: 35,
      i: ['Филе рыбы — 180 г', 'Кабачок — 1 небольшой (200 г)', 'Перец болгарский — 1 шт.', 'Оливковое масло — 1 ст. л.', 'Соль, перец, лимон'],
      s: ['Разогрей духовку до 200 °C.', 'Овощи нарежь крупно, посоли, сбрызни маслом, выложи на противень.', 'Запекай 12 минут, затем добавь рыбу и дольки лимона.', 'Запекай ещё 15 минут до готовности рыбы.'] },
    { n: 'Куриное филе в творожном соусе', e: '🍗', m: 'd', k: 400, p: 44, f: 14, c: 22, t: 30,
      i: ['Куриное филе — 180 г', 'Творог 5% — 100 г', 'Чеснок — 1 зубчик', 'Сметана 10% — 2 ст. л.', 'Зелень, соль, перец'],
      s: ['Филе разрежь вдоль и слегка отбей, посоли.', 'Обжарь по 5 минут с каждой стороны до корочки.', 'Творог смешай со сметаной, чесноком и зеленью.', 'Выложи соус на филе, накрой крышкой и прогрей 3 минуты.'] },
    { n: 'Омлет с грибами и сыром', e: '🍄', m: 'd', k: 360, p: 26, f: 24, c: 8, t: 15,
      i: ['Яйца — 3 шт.', 'Шампиньоны — 150 г', 'Сыр — 30 г', 'Масло — 1 ч. л.', 'Соль, перец'],
      s: ['Обжарь нарезанные грибы на масле 6–7 минут до румяности.', 'Взбей яйца с солью и перцем, залей грибы.', 'Готовь на малом огне под крышкой 5 минут.', 'Посыпь тёртым сыром и дай расплавиться.'] },
    { n: 'Тушёные овощи с индейкой', e: '🥘', m: 'd', k: 400, p: 36, f: 12, c: 32, t: 30,
      i: ['Филе индейки — 180 г', 'Кабачок — 1 шт., перец — 1 шт.', 'Помидоры — 2 шт.', 'Лук — 1 шт.', 'Масло — 1 ст. л.', 'Соль, паприка'],
      s: ['Обжарь индейку кусочками 5 минут на масле.', 'Добавь лук, перец и кабачок, готовь 5 минут.', 'Добавь помидоры и специи, влей 100 мл воды.', 'Туши под крышкой 15 минут.'] },
    { n: 'Творожная запеканка без муки', e: '🍰', m: 'd', k: 340, p: 30, f: 12, c: 26, t: 50,
      i: ['Творог 5% — 400 г', 'Яйца — 2 шт.', 'Манка — 2 ст. л.', 'Сахар — 1 ст. л.', 'Ванилин — щепотка', 'Сметана — 2 ст. л.'],
      s: ['Разогрей духовку до 180 °C.', 'Смешай творог, яйца, манку, сахар и ванилин.', 'Выложи в форму, смазанную маслом.', 'Запекай 30–35 минут, подай со сметаной.'] },
    { n: 'Стейк из лосося с брокколи', e: '🥩', m: 'd', k: 480, p: 40, f: 30, c: 12, t: 20,
      i: ['Стейк лосося — 180 г', 'Брокколи — 200 г', 'Оливковое масло — 1 ст. л.', 'Лимон — ½ шт.', 'Соль, перец'],
      s: ['Разогрей сковороду-гриль, смажь маслом.', 'Лосось посоли и обжарь кожей вниз 4 минуты, переверни и готовь ещё 3 минуты.', 'Брокколи отвари 4 минуты или приготовь на пару.', 'Сбрызни лимоном и подавай сразу.'] },
    { n: 'Котлеты из индейки на пару', e: '🍖', m: 'd', k: 380, p: 38, f: 14, c: 24, t: 35,
      i: ['Фарш индейки — 200 г', 'Лук — ½ шт.', 'Яйцо — 1 шт.', 'Овсяные хлопья — 2 ст. л.', 'Соль, перец', 'Овощи для гарнира — 200 г'],
      s: ['Смешай фарш, тёртый лук, яйцо, хлопья и специи.', 'Сформируй 4 котлеты.', 'Готовь на пару 25 минут (или в пароварке-вкладыше).', 'Подавай со свежими или тушёными овощами.'] },
    { n: 'Салат с тунцом и яйцом', e: '🥗', m: 'd', k: 350, p: 32, f: 18, c: 16, t: 12,
      i: ['Тунец в с/с — 1 банка (150 г)', 'Яйца — 2 шт.', 'Фасоль стручковая — 100 г', 'Помидоры — 2 шт.', 'Йогурт — 2 ст. л.', 'Соль, перец'],
      s: ['Отвари яйца 8 минут и фасоль 4 минуты.', 'Тунец разомни вилкой, яйца нарежь кубиком.', 'Смешай всё с помидорами.', 'Заправь йогуртом с солью и перцем.'] },
    { n: 'Куриный шашлык в духовке', e: '🍢', m: 'd', k: 390, p: 40, f: 16, c: 14, t: 35,
      i: ['Куриное филе — 200 г', 'Кефир — 100 мл', 'Лук — 1 шт.', 'Паприка — 1 ч. л.', 'Соль, перец', 'Шпажки'],
      s: ['Нарежь филе кусочками, залей кефиром со специями на 15 минут.', 'Нанизывай на шпажки, чередуя с луком.', 'Разогрей духовку до 200 °C.', 'Запекай 20–25 минут, перевернув один раз.'] },
    { n: 'Овощное рагу с фасолью', e: '🍲', m: 'd', k: 320, p: 16, f: 9, c: 42, t: 30,
      i: ['Фасоль консервированная — 200 г', 'Кабачок — 1 шт.', 'Морковь — 1 шт.', 'Лук — 1 шт.', 'Томатная паста — 1 ст. л.', 'Масло — 1 ст. л.'],
      s: ['Обжарь лук и морковь 5 минут на масле.', 'Добавь кабачок кубиком и томатную пасту.', 'Влей 150 мл воды и туши 12 минут.', 'Добавь фасоль, посоли и прогрей 5 минут.'] },
    { n: 'Кефирный суп с огурцом', e: '🥤', m: 'd', k: 180, p: 10, f: 6, c: 18, t: 10,
      i: ['Кефир 1% — 300 мл', 'Огурец — 1 шт.', 'Укроп — пучок', 'Чеснок — 1 зубчик', 'Соль — щепотка'],
      s: ['Огурец натри на мелкой тёрке.', 'Смешай с кефиром и давленым чесноком.', 'Добавь мелко рубленый укроп и соль.', 'Охлади 5 минут и подавай.'] },
    { n: 'Гречка с грибами и луком', e: '🍄', m: 'd', k: 350, p: 14, f: 10, c: 50, t: 25,
      i: ['Гречка — 70 г сухой', 'Шампиньоны — 200 г', 'Лук — 1 шт.', 'Масло — 1 ст. л.', 'Соль, перец'],
      s: ['Свари гречку 12 минут под крышкой.', 'Обжарь лук 3 минуты, добавь нарезанные грибы.', 'Готовь грибы 7–8 минут до испарения влаги.', 'Смешай с гречкой, посоли и поперчи.'] },
    { n: 'Фриттата со шпинатом', e: '🍳', m: 'd', k: 330, p: 24, f: 22, c: 8, t: 20,
      i: ['Яйца — 3 шт.', 'Шпинат — 100 г', 'Молоко — 30 мл', 'Сыр — 20 г', 'Масло — 1 ч. л.', 'Соль, перец'],
      s: ['Разогрей духовку до 190 °C.', 'Обжарь шпинат 2 минуты на масле в сковороде с ручкой.', 'Взбей яйца с молоком, солью и перцем, залей шпинат.', 'Посыпь сыром и запекай 12–15 минут.'] },
    { n: 'Грудка с сыром и томатами', e: '🧀', m: 'd', k: 410, p: 46, f: 18, c: 10, t: 30,
      i: ['Куриное филе — 180 г', 'Помидор — 1 шт.', 'Сыр — 30 г', 'Масло — 1 ч. л.', 'Соль, перец, базилик'],
      s: ['Разогрей духовку до 190 °C.', 'Филе разрежь вдоль, не до конца, посоли и поперчи.', 'Вложи внутрь кружки помидора и сыр.', 'Запекай 20–22 минуты.'] },

    /* ---------- ПЕРЕКУСЫ ---------- */
    { n: 'Яблоко и миндаль', e: '🍏', m: 's', k: 160, p: 4, f: 9, c: 18, t: 1,
      i: ['Яблоко — 1 шт. (~180 г)', 'Миндаль — 10 шт. (~10 г)'],
      s: ['Помой яблоко и нарежь дольками.', 'Отвесь 10 орехов — это примерно горсть в один слой.', 'Ешь вместе: клетчатка + жиры держат сытость.'] },
    { n: 'Протеиновый коктейль', e: '🥤', m: 's', k: 180, p: 26, f: 3, c: 12, t: 3,
      i: ['Протеин — 30 г (1 мерная ложка)', 'Вода или молоко — 250 мл (1 стакан)'],
      s: ['Налей жидкость в шейкер.', 'Добавь ложку протеина.', 'Взбалтывай 20–30 секунд.', 'Выпей в течение 30 минут после тренировки.'] },
    { n: 'Творог с зеленью', e: '🥣', m: 's', k: 170, p: 24, f: 6, c: 6, t: 3,
      i: ['Творог 5% — 150 г', 'Укроп — ½ пучка', 'Соль — щепотка'],
      s: ['Выложи творог в миску.', 'Добавь мелко рубленый укроп и соль.', 'Перемешай — готово.'] },
    { n: 'Банан', e: '🍌', m: 's', k: 105, p: 1, f: 0, c: 27, t: 1,
      i: ['Банан — 1 средний (~120 г)'],
      s: ['Быстрый перекус до или после тренировки.', 'Хорошо работает за 40 минут до зала — даёт энергию.'] },
    { n: 'Варёное яйцо с огурцом', e: '🥚', m: 's', k: 110, p: 9, f: 7, c: 4, t: 10,
      i: ['Яйцо — 1 шт.', 'Огурец — 1 шт.', 'Соль — щепотка'],
      s: ['Отвари яйцо 8 минут, остуди в холодной воде.', 'Огурец нарежь кружками.', 'Посоли и ешь вместе.'] },
    { n: 'Хумус с морковью', e: '🥕', m: 's', k: 180, p: 7, f: 10, c: 17, t: 3,
      i: ['Хумус — 2 ст. л. (40 г)', 'Морковь — 1 крупная (~120 г)'],
      s: ['Морковь нарежь палочками длиной с палец.', 'Отвесь 2 ложки хумуса в маленькую мисочку.', 'Макай морковь в хумус.'] }
  ];

  var MEALS = [
    { id: 'b', t: 'Завтрак', e: '🌅' },
    { id: 'l', t: 'Обед', e: '☀️' },
    { id: 'd', t: 'Ужин', e: '🌙' },
    { id: 's', t: 'Перекус', e: '🍎' }
  ];
  var PAGE = 4;
  var state = { meal: 'b', shown: PAGE, open: null };
  var LS_LOG = 'gm_nut_log_v1';
  var LS_BC = 'gm_barcode_cache_v1';

  /* ==================== СТИЛИ ==================== */
  var CSS = ''
    + '.gn-sec{margin-top:18px}'
    + '.gn-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap}'
    + '.gn-head h3{font-size:16px;display:flex;align-items:center;gap:8px;margin:0}'
    + '.gn-sub{font-size:12px;color:var(--muted);margin-top:4px}'
    + '.gn-chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:14px;scrollbar-width:none}'
    + '.gn-chips::-webkit-scrollbar{display:none}'
    + '.gn-chips button{flex:0 0 auto;padding:9px 15px;border-radius:999px;border:1px solid var(--line);background:var(--tile2);color:var(--muted);font-size:12.5px;font-weight:700;font-family:inherit;cursor:pointer;transition:.2s}'
    + '.gn-chips button:hover{color:var(--text)}'
    + '.gn-chips button.on{color:#0b0f19;background:linear-gradient(135deg,#c4b5fd,#5eead4);border-color:transparent;box-shadow:0 6px 18px rgba(139,92,246,.3)}'
    + '.gn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(225px,1fr));gap:14px}'
    + '.gn-card{border-radius:18px;overflow:hidden;background:#0f1728;border:1px solid var(--line);cursor:pointer;text-align:left;padding:0;color:var(--text);font-family:inherit;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s,border-color .22s}'
    + '.gn-card:hover{transform:translateY(-4px);border-color:rgba(139,92,246,.55);box-shadow:0 16px 38px rgba(0,0,0,.45)}'
    + '.gn-photo{position:relative;aspect-ratio:16/10;display:grid;place-items:center;font-size:42px;overflow:hidden;background:linear-gradient(135deg,rgba(139,92,246,.4),rgba(45,212,191,.28))}'
    + '.gn-photo.g0{background:linear-gradient(135deg,#3b2f6b,#175257)}'
    + '.gn-photo.g1{background:linear-gradient(135deg,#4a2a52,#1c3f5e)}'
    + '.gn-photo.g2{background:linear-gradient(135deg,#2b3a63,#1d5347)}'
    + '.gn-photo.g3{background:linear-gradient(135deg,#54341f,#2a3f5c)}'
    + '.gn-photo span{position:relative;z-index:2;filter:drop-shadow(0 6px 14px rgba(0,0,0,.5))}'
    + '.gn-photo .kcal{position:absolute;right:8px;top:8px;z-index:3;font-size:10.5px;font-weight:800;padding:4px 8px;border-radius:9px;background:rgba(5,8,14,.78);border:1px solid rgba(255,255,255,.16)}'
    + '.gn-card-body{padding:11px 13px 14px;display:flex;flex-direction:column;gap:8px}'
    + '.gn-card-body b{font-size:13px;line-height:1.32}'
    + '.gn-meta{display:flex;gap:6px;flex-wrap:wrap;align-items:center}'
    + '.gn-macros{display:flex;gap:10px;font-size:10.5px;color:var(--muted);font-weight:700}'
    + '.gn-more{display:flex;justify-content:center;margin-top:14px}'
    + '.gn-modal{position:fixed;inset:0;z-index:320;display:none;align-items:center;justify-content:center;padding:14px;background:rgba(5,8,14,.84);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}'
    + '.gn-modal.on{display:flex}'
    + '.gn-box{width:min(720px,100%);max-height:92dvh;overflow:auto;border-radius:22px;padding:16px;background:linear-gradient(160deg,#141b2d,#0e1526);border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 80px rgba(0,0,0,.72)}'
    + '.gn-box .gn-x{float:right;width:34px;height:34px;border-radius:10px;border:1px solid var(--line);background:var(--tile2);color:var(--text);font-size:16px;cursor:pointer;display:grid;place-items:center;margin-left:8px}'
    + '.gn-hero-photo{aspect-ratio:16/9;border-radius:16px;display:grid;place-items:center;font-size:64px;background:linear-gradient(135deg,rgba(139,92,246,.42),rgba(45,212,191,.3));clear:both;margin-bottom:12px;position:relative;overflow:hidden}'
    + '.gn-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}'
    + '@media(max-width:520px){.gn-stats{grid-template-columns:repeat(2,1fr)}}'
    + '.gn-stat{background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:9px;text-align:center}'
    + '.gn-stat .l{font-size:10px;color:var(--muted);font-weight:700;margin-bottom:3px}'
    + '.gn-stat .v{font-size:14px;font-weight:800}'
    + '.gn-box h4{font-size:13px;margin:16px 0 8px;color:#c4b5fd}'
    + '.gn-box ul{margin:0;padding-left:18px}'
    + '.gn-box li{font-size:12.5px;line-height:1.65;color:#d4dff3;margin-bottom:4px}'
    + '.gn-box ol{margin:0;padding-left:18px}'
    + '.gn-box ol li{color:#dbe4f5}'
    + '.gn-form{display:grid;grid-template-columns:1fr 1fr;gap:10px}'
    + '@media(max-width:560px){.gn-form{grid-template-columns:1fr}}'
    + '.gn-form .full{grid-column:1/-1}'
    + '.gn-form label{display:block;font-size:11px;color:var(--muted);font-weight:700;margin-bottom:5px}'
    + '.gn-form input{padding:10px 12px;font-size:13px}'
    + '.gn-photo-drop{border:1.5px dashed rgba(139,92,246,.5);border-radius:14px;padding:16px;text-align:center;background:rgba(139,92,246,.07);cursor:pointer;display:block;transition:.2s}'
    + '.gn-photo-drop:hover{background:rgba(139,92,246,.14)}'
    + '.gn-photo-drop input{display:none}'
    + '.gn-photo-drop b{font-size:12.5px;display:block;margin-bottom:4px}'
    + '.gn-photo-drop small{font-size:11px;color:var(--muted)}'
    + '.gn-thumbs{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}'
    + '.gn-thumb-item{position:relative;width:56px;height:56px;border-radius:12px;overflow:hidden;border:1px solid var(--line)}'
    + '.gn-thumb-item img{width:100%;height:100%;object-fit:cover;display:block}'
    + '.gn-scan-box{position:relative;border-radius:16px;overflow:hidden;background:#000;aspect-ratio:4/3;margin-bottom:10px}'
    + '.gn-scan-box video{width:100%;height:100%;object-fit:cover;display:block}'
    + '.gn-scan-box .frame{position:absolute;inset:16% 12%;border:2px solid rgba(94,234,212,.9);border-radius:14px;box-shadow:0 0 0 999px rgba(0,0,0,.42);pointer-events:none}'
    + '.gn-log-row{display:flex;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}'
    + '.gn-log-row:last-child{border-bottom:none}'
    + '.gn-log-pic{width:40px;height:40px;border-radius:10px;flex:0 0 auto;display:grid;place-items:center;font-size:18px;background:rgba(139,92,246,.18);border:1px solid var(--line);overflow:hidden}'
    + '.gn-log-pic img{width:100%;height:100%;object-fit:cover}'
    + '.gn-log-row .n{font-size:12.5px;font-weight:700;line-height:1.3}'
    + '.gn-log-row .k{font-size:11px;color:var(--muted);margin-top:2px}'
    + '.gn-del{background:transparent;border:none;color:#fca5a5;font-size:16px;cursor:pointer;padding:4px 6px;font-family:inherit}'
    + '.gn-warn{font-size:11px;color:#fcd34d;line-height:1.5;margin-top:6px}';

  function injectCSS() {
    if (document.getElementById('gn-style')) return;
    var s = document.createElement('style');
    s.id = 'gn-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(x) {
    return String(x).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function toast(msg) {
    if (typeof window.toast === 'function') return window.toast(msg);
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* ==================== ХРАНИЛИЩЕ ==================== */
  function readLog() {
    try { var a = JSON.parse(localStorage.getItem(LS_LOG) || '[]'); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function writeLog(list) {
    try { localStorage.setItem(LS_LOG, JSON.stringify(list.slice(-60))); } catch (e) {}
  }
  function todayKey() { return new Date().toISOString().slice(0, 10); }
  function isToday(item) { return (item.day || '') === todayKey(); }

  /* ==================== ПОИСК РАЗДЕЛА «ПИТАНИЕ» ==================== */
  function findNutritionView() {
    var views = document.querySelectorAll('.view');
    var i, key, tabs, tgt, oncl, m, n;
    for (i = 0; i < views.length; i++) {
      key = (views[i].id || '') + ' ' + (views[i].getAttribute('data-view') || '') + ' ' + (views[i].getAttribute('data-name') || '') + ' ' + (views[i].getAttribute('data-tab') || '');
      if (/nutri|food|meal|diet|eat|питан|рацион|калор/i.test(key)) return views[i];
    }
    tabs = document.querySelectorAll('.tab,[data-tab],[data-view]');
    for (i = 0; i < tabs.length; i++) {
      var txt = (tabs[i].textContent || '').toLowerCase();
      if (txt.indexOf('пита') > -1 || txt.indexOf('еда') > -1 || txt.indexOf('рацион') > -1) {
        tgt = tabs[i].getAttribute('data-view') || tabs[i].getAttribute('data-tab') || tabs[i].getAttribute('data-target');
        if (tgt) {
          n = document.getElementById(tgt) || document.querySelector('.view[data-view="' + tgt + '"]');
          if (n) return n;
        }
        oncl = tabs[i].getAttribute('onclick') || '';
        m = oncl.match(/['"]([A-Za-z0-9_-]+)['"]/);
        if (m) {
          n = document.getElementById(m[1]) || document.getElementById('view-' + m[1]);
          if (n) return n;
        }
      }
    }
    return null;
  }

  /* ==================== РЕНДЕР РЕЦЕПТОВ ==================== */
  function listFor(meal) {
    return RECIPES.filter(function (r) { return r.m === meal; });
  }

  function cardHTML(r) {
    var idx = RECIPES.indexOf(r);
    var g = 'g' + (idx % 4);
    return ''
      + '<button type="button" class="gn-card" data-r="' + idx + '">'
      +   '<div class="gn-photo ' + g + '">'
      +     '<span class="kcal">' + r.k + ' ккал</span>'
      +     '<span>' + r.e + '</span>'
      +   '</div>'
      +   '<div class="gn-card-body">'
      +     '<b>' + esc(r.n) + '</b>'
      +     '<div class="gn-meta">'
      +       '<span class="tag teal">' + r.t + ' мин</span>'
      +       '<span class="tag amber">Б ' + r.p + ' · Ж ' + r.f + ' · У ' + r.c + '</span>'
      +     '</div>'
      +   '</div>'
      + '</button>';
  }

  function renderRecipes() {
    var grid = document.getElementById('gn-grid');
    if (!grid) return;
    var list = listFor(state.meal);
    grid.innerHTML = list.slice(0, state.shown).map(cardHTML).join('');
    var more = document.getElementById('gn-more');
    if (!more) return;
    if (list.length > state.shown) {
      more.innerHTML = '<button type="button" class="btn" id="gn-more-btn">Показать ещё (' + (list.length - state.shown) + ')</button>';
      document.getElementById('gn-more-btn').addEventListener('click', function () {
        state.shown += PAGE * 2;
        renderRecipes();
      });
    } else if (list.length > PAGE) {
      more.innerHTML = '<button type="button" class="btn ghost sm" id="gn-less-btn">Свернуть</button>';
      document.getElementById('gn-less-btn').addEventListener('click', function () {
        state.shown = PAGE;
        renderRecipes();
      });
    } else {
      more.innerHTML = '';
    }
  }

  function renderChips() {
    var box = document.getElementById('gn-chips');
    if (!box) return;
    box.innerHTML = MEALS.map(function (m) {
      return '<button type="button" class="' + (m.id === state.meal ? 'on' : '') + '" data-m="' + m.id + '">' + m.e + ' ' + m.t + '</button>';
    }).join('');
    box.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        state.meal = b.getAttribute('data-m');
        state.shown = PAGE;
        renderChips();
        renderRecipes();
      });
    });
  }

  /* ==================== МОДАЛКА РЕЦЕПТА ==================== */
  function openRecipe(idx) {
    var r = RECIPES[idx];
    if (!r) return;
    var modal = document.getElementById('gn-modal');
    if (!modal) return;
    var ings = r.i.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    var steps = r.s.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    var q = encodeURIComponent(r.n + ' рецепт как приготовить');
    modal.innerHTML = ''
      + '<div class="gn-box" role="dialog" aria-label="' + esc(r.n) + '">'
      +   '<button type="button" class="gn-x" id="gn-close" aria-label="Закрыть">✕</button>'
      +   '<div class="gn-hero-photo"><span>' + r.e + '</span></div>'
      +   '<h3 style="font-size:17px;margin-bottom:6px">' + esc(r.n) + '</h3>'
      +   '<div class="gn-meta">'
      +     '<span class="tag">' + (r.m === 'b' ? '🌅 Завтрак' : r.m === 'l' ? '☀️ Обед' : r.m === 'd' ? '🌙 Ужин' : '🍎 Перекус') + '</span>'
      +     '<span class="tag teal">' + r.t + ' мин</span>'
      +     '<span class="tag amber">1 порция</span>'
      +   '</div>'
      +   '<div class="gn-stats">'
      +     '<div class="gn-stat"><div class="l">ККАЛ</div><div class="v">' + r.k + '</div></div>'
      +     '<div class="gn-stat"><div class="l">БЕЛКИ</div><div class="v">' + r.p + ' г</div></div>'
      +     '<div class="gn-stat"><div class="l">ЖИРЫ</div><div class="v">' + r.f + ' г</div></div>'
      +     '<div class="gn-stat"><div class="l">УГЛЕВОДЫ</div><div class="v">' + r.c + ' г</div></div>'
      +   '</div>'
      +   '<h4>🛒 Что купить (на 1 порцию)</h4>'
      +   '<ul>' + ings + '</ul>'
      +   '<h4>👨‍🍳 Как готовить</h4>'
      +   '<ol>' + steps + '</ol>'
      +   '<div class="btn-row">'
      +     '<button type="button" class="btn teal" id="gn-add-recipe">＋ В дневник питания</button>'
      +     '<a class="btn" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + q + '">▶ Видео-рецепт</a>'
      +     '<a class="btn ghost" target="_blank" rel="noopener" href="https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(r.n) + '">🖼 Фото блюда</a>'
      +   '</div>'
      + '</div>';
    modal.classList.add('on');
    document.getElementById('gn-close').addEventListener('click', closeModal);
    document.getElementById('gn-add-recipe').addEventListener('click', function () {
      addEntry({ name: r.n, kcal: r.k, p: r.p, f: r.f, c: r.c, grams: 0, photo: '', emoji: r.e });
      closeModal();
      toast('«' + r.n + '» добавлено в дневник');
    });
    modal.addEventListener('click', function (ev) { if (ev.target === modal) closeModal(); }, { once: true });
  }

  function closeModal() {
    var modal = document.getElementById('gn-modal');
    if (modal) { modal.classList.remove('on'); modal.innerHTML = ''; }
    stopScan();
  }

  /* ==================== ДНЕВНИК ПИТАНИЯ ==================== */
  function addEntry(entry) {
    var list = readLog();
    entry.id = 'e' + Date.now() + Math.random().toString(36).slice(2, 6);
    entry.day = todayKey();
    entry.ts = Date.now();
    list.push(entry);
    writeLog(list);
    renderLog();
    try { document.dispatchEvent(new CustomEvent('gm:meal-added', { detail: entry })); } catch (e) {}
    return entry;
  }

  function renderLog() {
    var box = document.getElementById('gn-log');
    var sumEl = document.getElementById('gn-log-sum');
    if (!box) return;
    var today = readLog().filter(isToday).reverse();
    if (sumEl) sumEl.textContent = today.reduce(function (s, x) { return s + (Number(x.kcal) || 0); }, 0) + ' ккал';
    if (!today.length) {
      box.innerHTML = '<div class="empty" style="padding:16px">Пока пусто. Добавь блюдо из рецепта, по фото или через штрихкод.</div>';
      return;
    }
    box.innerHTML = today.map(function (x) {
      var pic = x.photo ? '<img src="' + x.photo + '" alt="">' : (x.emoji || '🍽');
      return ''
        + '<div class="gn-log-row">'
        +   '<div class="gn-log-pic">' + pic + '</div>'
        +   '<div style="flex:1;min-width:0">'
        +     '<div class="n">' + esc(x.name) + '</div>'
        +     '<div class="k">' + (Number(x.kcal) || 0) + ' ккал · Б ' + (x.p || 0) + ' Ж ' + (x.f || 0) + ' У ' + (x.c || 0) + (x.grams ? ' · ' + x.grams + ' г' : '') + '</div>'
        +   '</div>'
        +   '<button type="button" class="gn-del" data-del="' + esc(x.id) + '" aria-label="Удалить">✕</button>'
        + '</div>';
    }).join('');
    box.querySelectorAll('[data-del]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-del');
        writeLog(readLog().filter(function (x) { return x.id !== id; }));
        renderLog();
        toast('Запись удалена');
      });
    });
  }

  /* ==================== СЖАТИЕ ФОТО ==================== */
  function shrinkPhoto(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 480;
        var w = img.width, h = img.height;
        if (w > h && w > max) { h = Math.round(h * max / w); w = max; }
        else if (h >= w && h > max) { w = Math.round(w * max / h); h = max; }
        var cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        try { cb(cv.toDataURL('image/jpeg', 0.62)); } catch (e) { cb(''); }
      };
      img.onerror = function () { cb(''); };
      img.src = reader.result;
    };
    reader.onerror = function () { cb(''); };
    reader.readAsDataURL(file);
  }

  /* ==================== ШТРИХКОД ==================== */
  var scanStream = null, scanTimer = null;

  function stopScan() {
    if (scanTimer) { clearInterval(scanTimer); scanTimer = null; }
    if (scanStream) {
      scanStream.getTracks().forEach(function (t) { try { t.stop(); } catch (e) {} });
      scanStream = null;
    }
  }

  function openScanner() {
    var modal = document.getElementById('gn-modal');
    if (!modal) return;
    modal.innerHTML = ''
      + '<div class="gn-box" role="dialog" aria-label="Сканер штрихкода">'
      +   '<button type="button" class="gn-x" id="gn-close2" aria-label="Закрыть">✕</button>'
      +   '<h3 style="font-size:16px;margin-bottom:8px">📷 Сканер штрихкода</h3>'
      +   '<p class="gn-sub" style="margin-bottom:10px">Наведи камеру на штрихкод упаковки — калории подставятся автоматически.</p>'
      +   '<div class="gn-scan-box" id="gn-scan-box">'
      +     '<video id="gn-video" playsinline muted autoplay></video>'
      +     '<div class="frame"></div>'
      +   '</div>'
      +   '<div class="gn-form">'
      +     '<div class="full"><label>Штрихкод (можно ввести вручную)</label>'
      +       '<input id="gn-bc-input" type="tel" inputmode="numeric" placeholder="Например, 4600000000000"></div>'
      +     '<div class="full"><button type="button" class="btn primary full" id="gn-bc-find">🔍 Найти продукт</button></div>'
      +   '</div>'
      +   '<p class="gn-warn">Если браузер не поддерживает распознавание — введи 8–13 цифр с упаковки и нажми «Найти продукт». База Open Food Facts.</p>'
      + '</div>';
    modal.classList.add('on');
    document.getElementById('gn-close2').addEventListener('click', closeModal);
    document.getElementById('gn-bc-find').addEventListener('click', function () {
      var code = (document.getElementById('gn-bc-input').value || '').replace(/\D/g, '');
      if (code.length < 8) { toast('Введи 8–13 цифр штрихкода'); return; }
      lookupBarcode(code);
    });

    var video = document.getElementById('gn-video');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      document.getElementById('gn-scan-box').innerHTML = '<div class="empty">Камера недоступна. Введи штрихкод вручную.</div>';
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
      .then(function (stream) {
        scanStream = stream;
        video.srcObject = stream;
        video.play().catch(function () {});
        if (!('BarcodeDetector' in window)) return;
        var det = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'] });
        scanTimer = setInterval(function () {
          det.detect(video).then(function (codes) {
            if (codes && codes.length && codes[0].rawValue) {
              var code = String(codes[0].rawValue).replace(/\D/g, '');
              stopScan();
              var inp = document.getElementById('gn-bc-input');
              if (inp) inp.value = code;
              lookupBarcode(code);
            }
          }).catch(function () {});
        }, 420);
      })
      .catch(function () {
        document.getElementById('gn-scan-box').innerHTML = '<div class="empty">Нет доступа к камере. Введи штрихкод вручную.</div>';
      });
  }

  function lookupBarcode(code) {
    var cache = {};
    try { cache = JSON.parse(localStorage.getItem(LS_BC) || '{}'); } catch (e) { cache = {}; }
    if (cache[code]) { fillFromProduct(cache[code]); return; }
    var box = document.querySelector('#gn-modal .gn-box');
    if (box) {
      var old = document.getElementById('gn-bc-status');
      if (old) old.remove();
      var st = document.createElement('p');
      st.id = 'gn-bc-status';
      st.className = 'gn-sub';
      st.style.marginTop = '10px';
      st.textContent = 'Ищу продукт в базе…';
      box.appendChild(st);
    }
    fetch('https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(code) + '.json?fields=product_name,brands,nutriments,image_front_small_url')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || data.status === 0 || !data.product) {
          var st2 = document.getElementById('gn-bc-status');
          if (st2) st2.textContent = 'Продукт не найден. Введи данные вручную ниже.';
          return;
        }
        var p = data.product;
        var n = p.nutriments || {};
        var product = {
          name: (p.product_name || 'Продукт') + (p.brands ? ' (' + p.brands.split(',')[0] + ')' : ''),
          kcal: Math.round(Number(n['energy-kcal_100g'] || (Number(n.energy_100g || 0) / 4.184) || 0)),
          p: Math.round(Number(n.proteins_100g || 0) * 10) / 10,
          f: Math.round(Number(n.fat_100g || 0) * 10) / 10,
          c: Math.round(Number(n.carbohydrates_100g || 0) * 10) / 10,
          photo: p.image_front_small_url || ''
        };
        cache[code] = product;
        try { localStorage.setItem(LS_BC, JSON.stringify(cache)); } catch (e) {}
        fillFromProduct(product);
      })
      .catch(function () {
        var st3 = document.getElementById('gn-bc-status');
        if (st3) st3.textContent = 'Нет сети. Введи данные вручную.';
      });
  }

  function fillFromProduct(product) {
    stopScan();
    var inp = document.getElementById('gn-name');
    var kcal = document.getElementById('gn-kcal');
    var p = document.getElementById('gn-p');
    var f = document.getElementById('gn-f');
    var c = document.getElementById('gn-c');
    var g = document.getElementById('gn-grams');
    var photoBox = document.getElementById('gn-photo-preview');
    var photoVal = document.getElementById('gn-photo-value');

    if (g && !g.value) g.value = 100;
    var factor = 1;
    if (g && g.value) factor = Math.max(1, Number(g.value) || 100) / 100;

    if (inp) inp.value = product.name || '';
    if (kcal) kcal.value = Math.round((product.kcal || 0) * factor);
    if (p) p.value = Math.round((product.p || 0) * factor * 10) / 10;
    if (f) f.value = Math.round((product.f || 0) * factor * 10) / 10;
    if (c) c.value = Math.round((product.c || 0) * factor * 10) / 10;
    if (product.photo && photoVal) {
      photoVal.value = product.photo;
      if (photoBox) photoBox.innerHTML = '<div class="gn-thumb-item"><img src="' + product.photo + '" alt=""></div>';
    }
    closeModal();
    toast('Данные продукта подставлены');
  }

  /* ==================== СБОРКА БЛОКА ==================== */
  function sectionHTML() {
    return ''
      + '<div class="gn-sec" id="gn-sec">'
      +   '<div class="gn-head">'
      +     '<div>'
      +       '<h3>🍳 Простые рецепты</h3>'
      +       '<p class="gn-sub">Готовые блюда с калориями и пошаговыми инструкциями — завтрак, обед, ужин и перекусы.</p>'
      +     '</div>'
      +     '<span class="tag teal">48 рецептов</span>'
      +   '</div>'
      +   '<div class="gn-chips" id="gn-chips"></div>'
      +   '<div class="gn-grid" id="gn-grid"></div>'
      +   '<div class="gn-more" id="gn-more"></div>'

      +   '<div class="gn-head" style="margin-top:26px">'
      +     '<div>'
      +       '<h3>📸 Добавить приём пищи</h3>'
      +       '<p class="gn-sub">Сфотографируй блюдо или отсканируй штрихкод — калории подставятся сами.</p>'
      +     '</div>'
      +     '<span class="tag amber">Сегодня: <b id="gn-log-sum">0 ккал</b></span>'
      +   '</div>'

      +   '<div class="card" style="margin-bottom:14px">'
      +     '<div class="gn-form">'
      +       '<div class="full"><label>Название блюда</label><input id="gn-name" type="text" placeholder="Например, овсянка с бананом" autocomplete="off"></div>'
      +       '<div><label>Калории, ккал</label><input id="gn-kcal" type="number" inputmode="numeric" placeholder="380"></div>'
      +       '<div><label>Вес порции, г</label><input id="gn-grams" type="number" inputmode="numeric" placeholder="250"></div>'
      +       '<div><label>Белки, г</label><input id="gn-p" type="number" inputmode="decimal" placeholder="12"></div>'
      +       '<div><label>Жиры, г</label><input id="gn-f" type="number" inputmode="decimal" placeholder="8"></div>'
      +       '<div><label>Углеводы, г</label><input id="gn-c" type="number" inputmode="decimal" placeholder="62"></div>'
      +       '<div class="full">'
      +         '<label>Фото блюда</label>'
      +         '<label class="gn-photo-drop">'
      +           '<input id="gn-photo-input" type="file" accept="image/*" capture="environment">'
      +           '<b>📷 Сделать фото или выбрать из галереи</b>'
      +           '<small>Фото сохранится вместе с записью</small>'
      +         '</label>'
      +         '<input id="gn-photo-value" type="hidden" value="">'
      +         '<div class="gn-thumbs" id="gn-photo-preview"></div>'
      +       '</div>'
      +     '</div>'
      +     '<div class="btn-row">'
      +       '<button type="button" class="btn primary" id="gn-save">＋ Добавить в дневник</button>'
      +       '<button type="button" class="btn teal" id="gn-scan">📷 Сканировать штрихкод</button>'
      +     '</div>'
      +   '</div>'

      +   '<div class="card">'
      +     '<h3><span class="ico">📋</span> Съедено сегодня</h3>'
      +     '<div class="list" id="gn-log"></div>'
      +   '</div>'

      +   '<div class="gn-modal" id="gn-modal"></div>'
      + '</div>';
  }

  function bind() {
    var grid = document.getElementById('gn-grid');
    if (grid) {
      grid.addEventListener('click', function (ev) {
        var btn = ev.target.closest ? ev.target.closest('.gn-card') : null;
        if (!btn) return;
        openRecipe(Number(btn.getAttribute('data-r')));
      });
    }

    var photoInput = document.getElementById('gn-photo-input');
    if (photoInput) {
      photoInput.addEventListener('change', function () {
        var file = photoInput.files && photoInput.files[0];
        if (!file) return;
        shrinkPhoto(file, function (data) {
          var val = document.getElementById('gn-photo-value');
          var box = document.getElementById('gn-photo-preview');
          if (val) val.value = data || '';
          if (box) {
            box.innerHTML = data
              ? '<div class="gn-thumb-item"><img src="' + data + '" alt=""></div>'
              : '<div class="gn-sub">Не удалось обработать фото</div>';
          }
        });
      });
    }

    var save = document.getElementById('gn-save');
    if (save) {
      save.addEventListener('click', function () {
        var name = (document.getElementById('gn-name').value || '').trim();
        var kcal = Number(document.getElementById('gn-kcal').value) || 0;
        if (!name) { toast('Введи название блюда'); return; }
        if (!kcal) { toast('Введи калории'); return; }
        var photoVal = document.getElementById('gn-photo-value');
        addEntry({
          name: name,
          kcal: kcal,
          p: Number(document.getElementById('gn-p').value) || 0,
          f: Number(document.getElementById('gn-f').value) || 0,
          c: Number(document.getElementById('gn-c').value) || 0,
          grams: Number(document.getElementById('gn-grams').value) || 0,
          photo: photoVal ? photoVal.value : '',
          emoji: '🍽'
        });
        ['gn-name', 'gn-kcal', 'gn-grams', 'gn-p', 'gn-f', 'gn-c'].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.value = '';
        });
        if (photoVal) photoVal.value = '';
        var prev = document.getElementById('gn-photo-preview');
        if (prev) prev.innerHTML = '';
        if (photoInput) photoInput.value = '';
        toast('Добавлено в дневник питания');
      });
    }

    var scan = document.getElementById('gn-scan');
    if (scan) scan.addEventListener('click', openScanner);
  }

  function mount() {
    injectCSS();
    var host = findNutritionView();
    if (!host) host = document.querySelector('main') || document.body;

    var existing = document.getElementById('gn-sec');
    if (existing) existing.remove();

    var wrap = document.createElement('div');
    wrap.innerHTML = sectionHTML();
    var sec = wrap.firstElementChild;
    host.appendChild(sec);

    renderChips();
    renderRecipes();
    renderLog();
    bind();
  }

  /* ==================== СТАРТ ==================== */
  function boot() {
    try { mount(); } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 60); });
  } else {
    setTimeout(boot, 60);
  }

  /* Если приложение перерисовывает вкладки — блок вернётся сам */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest ? ev.target.closest('.tab,[data-tab]') : null;
    if (!t) return;
    setTimeout(function () {
      if (!document.getElementById('gn-sec')) boot();
      else { renderLog(); }
    }, 120);
  });

  window.GymMindNutrition = {
    recipes: RECIPES,
    add: addEntry,
    log: readLog,
    refresh: mount
  };
})();