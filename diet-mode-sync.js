/* GymMind — синхронизация выбранного режима питания между «Обзором» и «Питанием».
   Единый источник истины: localStorage['gm_diet_mode'].
   Любое изменение режима (в diet-modes.js или в Обзоре) рассылается событием
   'gm:mode' — все блоки пересчитывают нормы под выбранный путь. */
(function () {
  'use strict';
  if (window.__gmModeSync) return;
  window.__gmModeSync = true;

  var KEY = 'gm_diet_mode';

  /* соответствие режима питания цели профиля (для чипа «Масса/Сушка») */
  var MODE_TO_GOAL = { bulk: 'Масса', cut: 'Похудение', shred: 'Сушка', maintain: 'Поддержание' };
  var GOAL_TO_MODE = { 'Масса': 'bulk', 'Похудение': 'cut', 'Сушка': 'shred', 'Поддержание': 'maintain' };

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      if (v && MODE_TO_GOAL[v]) return v;
    } catch (e) {}
    /* если ключа ещё нет — берём режим из цели профиля */
    try {
      var raw = localStorage.getItem('gymmind_v3');
      if (raw) {
        var s = JSON.parse(raw);
        var g = s && s.profile && s.profile.goal;
        if (g && GOAL_TO_MODE[g]) return GOAL_TO_MODE[g];
      }
    } catch (e) {}
    return 'maintain';
  }

  function write(mode) {
    if (!MODE_TO_GOAL[mode]) return;
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    try {
      var raw = localStorage.getItem('gymmind_v3');
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.profile) {
          s.profile.goal = MODE_TO_GOAL[mode];
          localStorage.setItem('gymmind_v3', JSON.stringify(s));
        }
      }
    } catch (e) {}
    document.dispatchEvent(new CustomEvent('gm:mode', { detail: { mode: mode } }));
  }

  window.GymMindMode = {
    get: read,
    set: write,
    goalOf: function (m) { return MODE_TO_GOAL[m] || 'Поддержание'; },
    modeOf: function (g) { return GOAL_TO_MODE[g] || 'maintain'; }
  };

  /* ловим клики по кнопкам режима в любом месте приложения */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-gmd="mode"]') : null;
    if (!btn) return;
    var m = btn.getAttribute('data-mode');
    if (m) setTimeout(function () { write(m); }, 0);
  }, true);

  /* ловим смену цели в профиле (селект «Цель») */
  document.addEventListener('change', function (e) {
    if (!e.target || e.target.id !== 'pGoal') return;
    var m = GOAL_TO_MODE[e.target.value];
    if (m) write(m);
  }, true);
})();