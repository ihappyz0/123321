/* GymMind — чистка раздела питания:
   убирает кнопку «+ Что съел» и дублирующие карточки
   («Добавить приём пищи» и «Дневник питания» с кнопкой «Удали»),
   оставляя единственное окно «Съедено за день». */
(function () {
  'use strict';

  var HIDE_FLAG = 'data-gm-hidden';

  function norm(text) {
    return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  /* 1. Кнопка «+ Что съел» */
  function hideEatenButton() {
    var nodes = document.querySelectorAll('button, .btn, a, [role="button"], .chip');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.getAttribute(HIDE_FLAG)) continue;
      var t = norm(el.textContent);
      if (!t) continue;
      if (t.indexOf('что съел') === -1) continue;
      el.setAttribute(HIDE_FLAG, '1');
      el.style.setProperty('display', 'none', 'important');
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('tabindex', '-1');
    }
  }

  /* 2. Карточки с кнопкой «Удали»: «Добавить приём пищи», «Дневник питания» */
  function removeStrayCards() {
    var kill = document.querySelectorAll('button, .btn, a, .del, .delete');
    for (var i = 0; i < kill.length; i++) {
      var btn = kill[i];
      if (btn.getAttribute(HIDE_FLAG)) continue;
      if (norm(btn.textContent) !== 'удали' && norm(btn.textContent) !== 'удалить') continue;

      var card = btn.closest ? btn.closest('.card') : null;
      var host = card || btn.parentElement;
      if (!host) continue;

      var text = norm(host.textContent);
      var isMealCard =
        text.indexOf('добавить приём пищи') !== -1 ||
        text.indexOf('добавить прием пищи') !== -1 ||
        text.indexOf('дневник питания') !== -1 ||
        text.indexOf('сфотографируй блюдо') !== -1 ||
        text.indexOf('отсканируй штрихкод') !== -1;

      if (!isMealCard) {
        /* просто бесхозная кнопка удаления — тоже прячем */
        btn.setAttribute(HIDE_FLAG, '1');
        btn.style.setProperty('display', 'none', 'important');
        continue;
      }

      host.setAttribute(HIDE_FLAG, '1');
      host.style.setProperty('display', 'none', 'important');
      host.setAttribute('aria-hidden', 'true');
    }
  }

  /* 3. Пустые подписи-заглушки, оставшиеся от удалённых блоков */
  function cleanEmptyCards() {
    var cards = document.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      if (c.getAttribute(HIDE_FLAG)) continue;
      if (norm(c.textContent).length > 0) continue;
      c.style.setProperty('display', 'none', 'important');
    }
  }

  function run() {
    try {
      hideEatenButton();
      removeStrayCards();
      cleanEmptyCards();
    } catch (e) { /* тихо игнорируем */ }
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    (window.requestAnimationFrame || window.setTimeout)(function () {
      scheduled = false;
      run();
    }, 16);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule);
  } else {
    schedule();
  }

  window.addEventListener('load', schedule);
  document.addEventListener('click', schedule, true);

  if (window.MutationObserver) {
    var mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }
})();