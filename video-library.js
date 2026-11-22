/* GymMind — Библиотека видео-уроков
   Готовые уроки с превью и встроенным плеером + поиск по любому упражнению. */
(function () {
  'use strict';
  if (window.__gmvBooted) return;
  window.__gmvBooted = true;

  /* ==================== ДАННЫЕ БИБЛИОТЕКИ ==================== */
  var LIB = [
    { t: 'Жим штанги лёжа', m: 'Грудь', l: 'Средний', d: '8:12', y: 'rT7DgCr-3pg',
      k: ['Лопатки сведены, стопы плотно в полу.', 'Опускай гриф к середине груди, локти ~45°.'] },
    { t: 'Жим гантелей лёжа', m: 'Грудь', l: 'Лёгкий', d: '5:40', y: 'VmB1G1K7v94',
      k: ['Гантели на уровне груди, кисти смотрят вперёд.', 'Не выпрямляй локти до конца — держи напряжение.'] },
    { t: 'Отжимания от пола', m: 'Грудь', l: 'Лёгкий', d: '4:20', y: 'IODxDxX7oi4',
      k: ['Корпус — одна линия от пяток до головы.', 'Локти прижаты, амплитуда полная.'] },
    { t: 'Разведения гантелей лёжа', m: 'Грудь', l: 'Лёгкий', d: '6:05', y: 'QENKPHOeWAM',
      k: ['Работает только плечевой сустав, локти чуть согнуты.', 'Веса небольшие, растяжка в нижней точке.'] },
    { t: 'Подтягивания на турнике', m: 'Спина', l: 'Средний', d: '7:30', y: 'eGo4IYlbE5g',
      k: ['Тянись грудью к перекладине, а не подбородком.', 'Плечи опущены вниз и назад.'] },
    { t: 'Тяга штанги в наклоне', m: 'Спина', l: 'Средний', d: '6:48', y: 'kBWAon7ItDw',
      k: ['Наклон ~45°, спина прямая.', 'Тяни штангу к поясу, сводя лопатки.'] },
    { t: 'Тяга гантели одной рукой', m: 'Спина', l: 'Лёгкий', d: '5:12', y: 'pYcpY20QaE8',
      k: ['Опора на скамью, спина параллельна полу.', 'Не разворачивай корпус при подъёме.'] },
    { t: 'Тяга верхнего блока', m: 'Спина', l: 'Лёгкий', d: '4:55', y: 'CAwf7n6Luuc',
      k: ['Хват шире плеч, тяни к верху груди.', 'Опускай плавно, без рывка.'] },
    { t: 'Становая тяга', m: 'Ноги', l: 'Сложный', d: '11:20', y: 'ytGaGIn3SjE',
      k: ['Гриф у голени, спина нейтральная.', 'Толкай пятками, не тяни спиной.'] },
    { t: 'Приседания со штангой', m: 'Ноги', l: 'Средний', d: '9:15', y: 'aclHkVaku9U',
      k: ['Колени идут в сторону носков.', 'Глубина — бёдра до параллели.'] },
    { t: 'Выпады с гантелями', m: 'Ноги', l: 'Лёгкий', d: '6:10', y: 'QOVaHwm-Q6U',
      k: ['Колено передней ноги не выходит за носок.', 'Корпус вертикально, шаг широкий.'] },
    { t: 'Румынская тяга', m: 'Ноги', l: 'Средний', d: '7:02', y: 'JCXUYuzwNrM',
      k: ['Тяни таз назад, ноги чуть согнуты.', 'Чувствуй растяжение задней поверхности бедра.'] },
    { t: 'Болгарский сплит-присед', m: 'Ноги', l: 'Средний', d: '8:24', y: '2C-uNgKwPLE',
      k: ['Опорная нога впереди, носок сзади на скамье.', 'Опускайся строго вертикально.'] },
    { t: 'Жим ногами', m: 'Ноги', l: 'Лёгкий', d: '5:33', y: 'IZaUzVKeSLc',
      k: ['Поясница прижата к спинке.', 'Не выключай колени в замок.'] },
    { t: 'Сгибание ног лёжа', m: 'Ноги', l: 'Лёгкий', d: '4:44', y: '1Tq3QdYUuHs',
      k: ['Таз прижат, движение плавное.', 'В верхней точке — секунда паузы.'] },
    { t: 'Разгибание ног в тренажёре', m: 'Ноги', l: 'Лёгкий', d: '4:12', y: 'YyvSfVjQeL0',
      k: ['Не разгоняй вес рывком.', 'Полное разгибание — короткая пауза.'] },
    { t: 'Ягодичный мост', m: 'Ноги', l: 'Лёгкий', d: '5:20', y: 'wPM8icPu6H8',
      k: ['В верхней точке сожми ягодицы на 2 сек.', 'Не переразгибай поясницу.'] },
    { t: 'Подъём на носки', m: 'Ноги', l: 'Лёгкий', d: '4:30', y: '-M4-G8p8fmc',
      k: ['Полная амплитуда: глубоко вниз, высоко вверх.', 'Задержка в верхней точке.'] },
    { t: 'Жим штанги стоя', m: 'Плечи', l: 'Средний', d: '7:10', y: 'qEwKCR5JCog',
      k: ['Пресс напряжён, корпус не прогибается.', 'Гриф идёт по дуге над головой.'] },
    { t: 'Махи гантелями в стороны', m: 'Плечи', l: 'Лёгкий', d: '5:05', y: '3VcKaXpzqRo',
      k: ['Локти чуть выше кистей.', 'Веса небольшие, без раскачки корпусом.'] },
    { t: 'Тяга к лицу (face pull)', m: 'Плечи', l: 'Лёгкий', d: '4:20', y: 'rep-qVOkqgk',
      k: ['Тяни канат к уровню глаз, разводя руки.', 'Работает задняя дельта — полезно для осанки.'] },
    { t: 'Шраги с гантелями', m: 'Плечи', l: 'Лёгкий', d: '3:50', y: 'cJRVVxmytaM',
      k: ['Поднимай только плечи, не сгибай локти.', 'Пауза в верхней точке 1 сек.'] },
    { t: 'Подъём штанги на бицепс', m: 'Руки', l: 'Лёгкий', d: '6:00', y: 'ykJmrZ5v0Oo',
      k: ['Локти зафиксированы у корпуса.', 'Без маха корпусом — работает бицепс.'] },
    { t: 'Молотковые сгибания', m: 'Руки', l: 'Лёгкий', d: '4:35', y: 'TwD-YGVP4Bk',
      k: ['Хват нейтральный, ладони друг к другу.', 'Опускай медленно, 2–3 секунды.'] },
    { t: 'Французский жим лёжа', m: 'Руки', l: 'Средний', d: '5:50', y: 'd_KZxkY_0cM',
      k: ['Локти смотрят в потолок и не расходятся.', 'Опускай за голову, растягивая трицепс.'] },
    { t: 'Разгибание на трицепс на блоке', m: 'Руки', l: 'Лёгкий', d: '4:10', y: '2-LAMcpzODU',
      k: ['Локти прижаты к бокам.', 'Внизу — полное разгибание и пауза.'] },
    { t: 'Отжимания на брусьях', m: 'Руки', l: 'Средний', d: '6:25', y: '0326dy_-CzM',
      k: ['Небольшой наклон корпуса вперёд.', 'Опускайся до угла 90° в локте.'] },
    { t: 'Скручивания на пресс', m: 'Пресс', l: 'Лёгкий', d: '3:40', y: 'Xyd_fa5zoEU',
      k: ['Тянись рёбрами к тазу, а не головой.', 'Поясница остаётся на полу.'] },
    { t: 'Планка', m: 'Пресс', l: 'Лёгкий', d: '3:15', y: 'pSHjTRCQxIw',
      k: ['Локти строго под плечами.', 'Не проваливай поясницу, ягодицы напряжены.'] },
    { t: 'Боковая планка', m: 'Пресс', l: 'Лёгкий', d: '3:00', y: 'K2VljzCC16g',
      k: ['Корпус — прямая линия, таз не провисает.', 'Локоть под плечом, взгляд прямо.'] },
    { t: 'Русский твист', m: 'Пресс', l: 'Средний', d: '4:05', y: 'wkD8rjkodUI',
      k: ['Поворачивай корпус, а не только руки.', 'Спина прямая, движение медленное.'] },
    { t: 'Подъём ног в висе', m: 'Пресс', l: 'Средний', d: '5:15', y: 'Pr1ieGZ5atk',
      k: ['Не раскачивайся, работай прессом.', 'Колени можно сгибать на начальном уровне.'] },
    { t: 'Бёрпи', m: 'Кардио', l: 'Средний', d: '4:00', y: 'dZgVxmf6jkA',
      k: ['Приземляйся мягко на носки.', 'Темп подбери так, чтобы держать дыхание.'] },
    { t: 'Скакалка', m: 'Кардио', l: 'Лёгкий', d: '5:30', y: 'u3zgHI8QnqE',
      k: ['Прыгай низко, крутит кисть, а не рука целиком.', 'Колени мягкие, приземление на носки.'] },
    { t: 'Маунтин климберс', m: 'Кардио', l: 'Лёгкий', d: '3:35', y: 'nmwgirgXLYM',
      k: ['Плечи над кистями, таз не поднимается.', 'Колени тяни к груди поочерёдно.'] },
    { t: 'Махи гирей', m: 'Кардио', l: 'Средний', d: '6:45', y: 'YSxHifyI6s8',
      k: ['Движение идёт от таза, руки только держат.', 'В верхней точке — мощное сжатие ягодиц.'] },
    { t: 'Разминка перед тренировкой', m: 'Мобильность', l: 'Лёгкий', d: '6:00', y: 'ZR1C0omLvXc',
      k: ['5–8 минут: суставы, лёгкое кардио.', 'Не растягивайся статически до тяжёлых подходов.'] },
    { t: 'Растяжка всего тела', m: 'Мобильность', l: 'Лёгкий', d: '10:00', y: 'sTxC3J3gQEU',
      k: ['Держи положение 30–40 секунд.', 'Дыши ровно, без резкой боли.'] }
  ];

  var MUSCLES = ['Все', 'Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки', 'Пресс', 'Кардио', 'Мобильность'];
  var PAGE = 9;
  var state = { muscle: 'Все', q: '', shown: PAGE };

  /* ==================== СТИЛИ ==================== */
  var CSS = ''
    + '.gmv-panel{margin-bottom:16px}'
    + '.gmv-hero{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:20px;margin-bottom:14px;'
    + 'background:linear-gradient(120deg,rgba(139,92,246,.24),rgba(45,212,191,.16));border:1px solid rgba(139,92,246,.35)}'
    + '.gmv-hero .ic{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;font-size:22px;background:linear-gradient(135deg,var(--purple),var(--teal));box-shadow:0 8px 22px rgba(139,92,246,.35);flex:0 0 auto}'
    + '.gmv-hero b{display:block;font-size:15px;margin-bottom:3px}'
    + '.gmv-hero span{font-size:12px;color:#c9d5ec;line-height:1.5}'
    + '.gmv-top{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px}'
    + '.gmv-search{position:relative;flex:1 1 250px;min-width:200px}'
    + '.gmv-search input{padding-left:40px;padding-right:14px}'
    + '.gmv-search .ic{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:14px;opacity:.75;pointer-events:none}'
    + '.gmv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:14px}'
    + '.gmv-card{border-radius:18px;overflow:hidden;background:#0f1728;border:1px solid var(--line);cursor:pointer;'
    + 'transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;display:flex;flex-direction:column;text-align:left;padding:0;font-family:inherit;color:var(--text)}'
    + '.gmv-card:hover{transform:translateY(-4px);border-color:rgba(139,92,246,.55);box-shadow:0 16px 38px rgba(0,0,0,.45)}'
    + '.gmv-thumb{position:relative;aspect-ratio:16/9;background:linear-gradient(135deg,#3b2f6b,#175257);overflow:hidden}'
    + '.gmv-thumb img{width:100%;height:100%;object-fit:cover;display:block}'
    + '.gmv-thumb .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,15,25,.02),rgba(11,15,25,.6))}'
    + '.gmv-play{position:absolute;inset:0;margin:auto;width:46px;height:46px;border-radius:50%;background:rgba(11,15,25,.62);'
    + 'border:1px solid rgba(255,255,255,.32);display:grid;place-items:center;font-size:14px;color:#fff;z-index:2;backdrop-filter:blur(4px)}'
    + '.gmv-dur{position:absolute;right:8px;bottom:8px;z-index:2;font-size:10px;font-weight:800;padding:3px 7px;border-radius:8px;background:rgba(5,8,14,.8)}'
    + '.gmv-body{padding:11px 12px 13px;display:flex;flex-direction:column;gap:8px}'
    + '.gmv-body b{font-size:13px;line-height:1.3}'
    + '.gmv-tags{display:flex;gap:6px;flex-wrap:wrap}'
    + '.gmv-more{margin-top:14px;display:flex;justify-content:center}'
    + '.gmv-modal{position:fixed;inset:0;z-index:300;display:none;align-items:center;justify-content:center;padding:14px;'
    + 'background:rgba(5,8,14,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}'
    + '.gmv-modal.on{display:flex}'
    + '.gmv-box{width:min(920px,100%);max-height:92vh;max-height:92dvh;overflow:auto;border-radius:22px;padding:14px;'
    + 'background:linear-gradient(160deg,#141b2d,#0e1526);border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 80px rgba(0,0,0,.72)}'
    + '.gmv-box .gmv-x{float:right;width:34px;height:34px;border-radius:10px;border:1px solid var(--line);background:var(--tile2);'
    + 'color:var(--text);font-size:16px;cursor:pointer;line-height:1;display:grid;place-items:center;margin-left:8px}'
    + '.gmv-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000;clear:both}'
    + '.gmv-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}'
    + '.gmv-box h3{font-size:16px;margin:14px 0 8px}'
    + '.gmv-box ul{margin:0;padding-left:18px}'
    + '.gmv-box li{font-size:12.5px;line-height:1.65;color:#cdd8ee;margin-bottom:4px}'
    + '.gmv-empty{padding:26px;text-align:center;color:var(--muted);font-size:13px}'
    + '.gmv-hidden-legacy{display:none!important}'
    + '@media(max-width:560px){.gmv-grid{grid-template-columns:1fr 1fr;gap:10px}.gmv-body b{font-size:12px}.gmv-hero{padding:14px}}'
    + '@media(max-width:380px){.gmv-grid{grid-template-columns:1fr}}';

  function injectCSS() {
    if (document.getElementById('gmv-style')) return;
    var s = document.createElement('style');
    s.id = 'gmv-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function toast(msg) {
    if (typeof window.toast === 'function') { window.toast(msg); return; }
    var t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast'; t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* ==================== НАХОДИМ РАЗДЕЛ «ВИДЕО» ==================== */
  function findVideoView() {
    var views = document.querySelectorAll('.view');
    var i, key, tgt, n, oncl, m;

    for (i = 0; i < views.length; i++) {
      key = (views[i].id || '') + ' ' + (views[i].getAttribute('data-view') || '') + ' ' + (views[i].getAttribute('data-name') || '');
      if (/video|урок/i.test(key)) return views[i];
    }
    var tabs = document.querySelectorAll('.tab,[data-tab],[data-view]');
    for (i = 0; i < tabs.length; i++) {
      var txt = (tabs[i].textContent || '').toLowerCase();
      if (txt.indexOf('видео') > -1 || txt.indexOf('урок') > -1) {
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

  /* ==================== РЕНДЕР ==================== */
  function filtered() {
    var q = state.q.trim().toLowerCase();
    return LIB.filter(function (v) {
      var okM = state.muscle === 'Все' || v.m === state.muscle;
      var okQ = !q || v.t.toLowerCase().indexOf(q) > -1 || v.m.toLowerCase().indexOf(q) > -1 || (v.k || []).join(' ').toLowerCase().indexOf(q) > -1;
      return okM && okQ;
    });
  }

  function cardHTML(v, idx) {
    var thumb = 'https://i.ytimg.com/vi/' + esc(v.y) + '/hqdefault.jpg';
    return ''
      + '<button type="button" class="gmv-card" data-idx="' + idx + '">'
      +   '<div class="gmv-thumb">'
      +     '<img loading="lazy" src="' + thumb + '" alt="' + esc(v.t) + '" onerror="this.style.display=\'none\'">'
      +     '<div class="shade"></div>'
      +     '<div class="gmv-play">▶</div>'
      +     '<span class="gmv-dur">' + esc(v.d) + '</span>'
      +   '</div>'
      +   '<div class="gmv-body">'
      +     '<b>' + esc(v.t) + '</b>'
      +     '<div class="gmv-tags">'
      +       '<span class="tag">' + esc(v.m) + '</span>'
      +       '<span class="tag teal">' + esc(v.l) + '</span>'
      +     '</div>'
      +   '</div>'
      + '</button>';
  }

  function renderGrid() {
    var grid = document.getElementById('gmv-grid');
    if (!grid) return;
    var list = filtered();
    if (!list.length) {
      var q = state.q.trim();
      grid.innerHTML = ''
        + '<div class="gmv-empty" style="grid-column:1/-1">'
        +   'В библиотеке пока нет «' + esc(q) + '».'
        +   '<div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">'
        +     '<a class="btn sm primary" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' техника выполнения') + '">▶ Найти на YouTube</a>'
        +     '<a class="btn sm" target="_blank" rel="noopener" href="https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(q + ' упражнение') + '">🖼 Фото техники</a>'
        +   '</div>'
        + '</div>';
      var moreWrap = document.getElementById('gmv-more');
      if (moreWrap) moreWrap.innerHTML = '';
      return;
    }
    var part = list.slice(0, state.shown);
    grid.innerHTML = part.map(function (v) { return cardHTML(v, LIB.indexOf(v)); }).join('');

    var moreWrap2 = document.getElementById('gmv-more');
    if (moreWrap2) {
      if (list.length > state.shown) {
        moreWrap2.innerHTML = '<button type="button" class="btn" id="gmv-more-btn">Показать ещё (' + (list.length - state.shown) + ')</button>';
        var b = document.getElementById('gmv-more-btn');
        if (b) b.addEventListener('click', function () {
          state.shown += PAGE * 2;
          renderGrid();
        });
      } else {
        moreWrap2.innerHTML = list.length > PAGE
          ? '<button type="button" class="btn ghost sm" id="gmv-less-btn">Свернуть</button>' : '';
        var b2 = document.getElementById('gmv-less-btn');
        if (b2) b2.addEventListener('click', function () { state.shown = PAGE; renderGrid(); });
      }
    }
  }

  function renderChips() {
    var box = document.getElementById('gmv-chips');
    if (!box) return;
    box.innerHTML = MUSCLES.map(function (m) {
      return '<button type="button" class="' + (m === state.muscle ? 'on' : '') + '" data-m="' + esc(m) + '">' + esc(m) + '</button>';
    }).join('');
  }

  /* ==================== ПЛЕЕР ==================== */
  function openPlayer(idx) {
    var v = LIB[idx];
    if (!v) return;
    var modal = document.getElementById('gmv-modal');
    if (!modal) return;
    var tips = (v.k || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    modal.innerHTML = ''
      + '<div class="gmv-box" role="dialog" aria-label="' + esc(v.t) + '">'
      +   '<button type="button" class="gmv-x" id="gmv-close" aria-label="Закрыть">✕</button>'
      +   '<div class="gmv-frame">'
      +     '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.y) + '?autoplay=1&rel=0&modestbranding=1&playsinline=1" '
      +       'title="' + esc(v.t) + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" '
      +       'allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>'
      +   '</div>'
      +   '<h3>' + esc(v.t) + '</h3>'
      +   '<div class="gmv-tags" style="margin-bottom:12px">'
      +     '<span class="tag">' + esc(v.m) + '</span>'
      +     '<span class="tag teal">' + esc(v.l) + '</span>'
      +     '<span class="tag amber">' + esc(v.d) + '</span>'
      +   '</div>'
      +   '<div class="advice"><h4>Техника — коротко</h4><ul>' + tips + '</ul></div>'
      +   '<div class="btn-row">'
      +     '<button type="button" class="btn primary" id="gmv-add">＋ Добавить в тренировку</button>'
      +     '<a class="btn teal" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(v.t + ' техника') + '">Ещё варианты</a>'
      +     '<button type="button" class="btn ghost" id="gmv-close2">Закрыть</button>'
      +   '</div>'
      + '</div>';
    modal.classList.add('on');
    document.body.style.overflow = 'hidden';

    function close() {
      modal.classList.remove('on');
      modal.innerHTML = '';
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    document.getElementById('gmv-close').addEventListener('click', close);
    document.getElementById('gmv-close2').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', onKey);
    document.getElementById('gmv-add').addEventListener('click', function () {
      toast('«' + v.t + '» добавлено в тренировку');
      close();
    });
  }

  /* ==================== СБОРКА ПАНЕЛИ ==================== */
  function buildPanel() {
    var panel = document.createElement('section');
    panel.className = 'gmv-panel';
    panel.id = 'gmv-panel';
    panel.innerHTML = ''
      + '<div class="gmv-hero">'
      +   '<div class="ic">🎬</div>'
      +   '<div><b>Видео-уроки уже готовы</b>'
      +   '<span>Выбери упражнение из библиотеки или впиши своё — урок с превью и плеером появится сразу, ничего загружать не нужно.</span></div>'
      + '</div>'
      + '<div class="gmv-top">'
      +   '<div class="gmv-search"><span class="ic">🔍</span>'
      +     '<input type="search" id="gmv-q" placeholder="Например: жим лёжа, приседания, планка…" autocomplete="off" enterkeyhint="search">'
      +   '</div>'
      +   '<button type="button" class="btn sm" id="gmv-yt">▶ Искать на YouTube</button>'
      + '</div>'
      + '<div class="seg" id="gmv-chips"></div>'
      + '<div class="gmv-grid" id="gmv-grid"></div>'
      + '<div class="gmv-more" id="gmv-more"></div>';

    var modal = document.createElement('div');
    modal.className = 'gmv-modal';
    modal.id = 'gmv-modal';
    panel.appendChild(modal);

    panel.addEventListener('click', function (e) {
      var card = e.target.closest ? e.target.closest('.gmv-card') : null;
      if (card) { openPlayer(parseInt(card.getAttribute('data-idx'), 10)); return; }
      var chip = e.target.closest ? e.target.closest('#gmv-chips button') : null;
      if (chip) {
        state.muscle = chip.getAttribute('data-m');
        state.shown = PAGE;
        renderChips();
        renderGrid();
      }
    });

    var input = panel.querySelector('#gmv-q');
    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.q = input.value || '';
        state.shown = PAGE;
        renderGrid();
      }, 140);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        state.q = input.value || '';
        state.shown = PAGE;
        renderGrid();
      }
    });

    panel.querySelector('#gmv-yt').addEventListener('click', function () {
      var q = (state.q || '').trim() || 'техника упражнений';
      window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' техника выполнения'), '_blank', 'noopener');
    });

    return panel;
  }

  function mount() {
    if (document.getElementById('gmv-panel')) return true;
    var view = findVideoView();
    if (!view) return false;
    injectCSS();
    var panel = buildPanel();
    view.insertBefore(panel, view.firstChild);

    // Прячем старый блок «загрузите своё видео» — уроки уже встроены
    var legacy = view.querySelectorAll('.vgrid, .upload');
    for (var i = 0; i < legacy.length; i++) {
      if (!panel.contains(legacy[i])) legacy[i].classList.add('gmv-hidden-legacy');
    }

    renderChips();
    renderGrid();
    return true;
  }

  function boot() {
    if (mount()) return;
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (mount() || tries > 24) clearInterval(iv);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () { mount(); });
})();