import React from 'react';
import { createRoot } from 'react-dom/client';
import Model from 'react-body-highlighter';

/* ---------- каталог мышц (совпадает с REC_GROUPS в index.html) ---------- */
const GROUPS = [
  { k: 'chest',     n: 'Грудь',           lo: 10, hi: 20, side: 'front' },
  { k: 'frontdelt', n: 'Передние дельты', lo: 4,  hi: 12, side: 'front' },
  { k: 'biceps',    n: 'Бицепс',          lo: 8,  hi: 18, side: 'front' },
  { k: 'abs',       n: 'Пресс',           lo: 6,  hi: 16, side: 'front' },
  { k: 'obliques',  n: 'Косые мышцы',     lo: 0,  hi: 0,  side: 'front' },
  { k: 'quads',     n: 'Квадрицепс',      lo: 8,  hi: 18, side: 'front' },
  { k: 'adductors', n: 'Приводящие',      lo: 0,  hi: 0,  side: 'front' },
  { k: 'calves',    n: 'Икры',            lo: 8,  hi: 16, side: 'front' },
  { k: 'lats',      n: 'Широчайшие',      lo: 10, hi: 20, side: 'back' },
  { k: 'upperback', n: 'Верх спины',      lo: 6,  hi: 16, side: 'back' },
  { k: 'traps',     n: 'Трапеции',        lo: 0,  hi: 0,  side: 'back' },
  { k: 'lowerback', n: 'Поясница',        lo: 0,  hi: 0,  side: 'back' },
  { k: 'reardelt',  n: 'Задние дельты',   lo: 6,  hi: 16, side: 'back' },
  { k: 'triceps',   n: 'Трицепс',         lo: 6,  hi: 16, side: 'back' },
  { k: 'forearms',  n: 'Предплечья',      lo: 0,  hi: 0,  side: 'back' },
  { k: 'hams',      n: 'Бицепс бедра',    lo: 6,  hi: 16, side: 'back' },
  { k: 'glutes',    n: 'Ягодицы',         lo: 4,  hi: 16, side: 'back' },
  { k: 'middelt',   n: 'Средние дельты',  lo: 8,  hi: 20, side: 'back' }
];

/* маппинг ключей приложения → ключи react-body-highlighter */
const RHB_MAP = {
  chest: 'chest', frontdelt: 'front-deltoids', middelt: 'front-deltoids',
  reardelt: 'back-deltoids', biceps: 'biceps', triceps: 'triceps',
  forearms: 'forearm', abs: 'abs', obliques: 'obliques',
  quads: 'quadriceps', adductors: 'adductor', hams: 'hamstring',
  glutes: 'gluteal', calves: 'calves', lats: 'upper-back',
  upperback: 'upper-back', traps: 'trapezius', lowerback: 'lower-back'
};

/* ---------- расчёт подходов за неделю (та же логика, что в index.html) ---------- */
const ALIASES = {
  lats: ['back'], upperback: ['back'], traps: ['back', 'shoulders'], lowerback: ['back'],
  glutes: ['hams', 'quads'], frontdelt: ['shoulders'], middelt: ['shoulders'], reardelt: ['shoulders'],
  adductors: ['quads'], forearms: ['biceps', 'triceps'], obliques: ['abs'], serratus: ['chest', 'abs']
};
const KW = [
  { re: /жим.*(лежа|лёжа)|брусь|отжимани|разведени|кроссовер|пуловер|сведени/i, g: ['chest', 'triceps', 'shoulders'] },
  { re: /тяга|подтягивани|шраг|гиперэкстензи|гуд\s*морнинг|австралийск/i, g: ['back', 'biceps'] },
  { re: /присед|выпад|жим\s*ног|разгибани\s*ног|зашагивани|пистолет|сумо/i, g: ['quads', 'hams', 'glutes'] },
  { re: /румынск|сгибани\s*ног|ягодичн|хип|отведени|мост/i, g: ['hams', 'glutes'] },
  { re: /бицепс|сгибани|молот|скотта|концентрир/i, g: ['biceps'] },
  { re: /трицепс|французск|разгибани.*(блок|голов)|узк/i, g: ['triceps'] },
  { re: /жим\s*(стоя|сидя|арнольда)|махи|подъ[её]м.*(сторон|перед)|дельт|тяга.*подбородк|к\s*лицу/i, g: ['shoulders'] },
  { re: /планк|скручивани|пресс|твист|велосипед|dead\s*bug|ролик|подъ[её]м\s*ног/i, g: ['abs', 'obliques'] },
  { re: /носок|икр|скакалк/i, g: ['calves'] },
  { re: /трапец|шраг/i, g: ['traps', 'upperback'] },
  { re: /предплеч|кист/i, g: ['forearms'] },
  { re: /поясниц|становая|наклон/i, g: ['lowerback', 'hams'] }
];

function iso(d) {
  const x = d ? new Date(d) : new Date();
  return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function weekRange(offset) {
  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const mon = new Date(now); mon.setDate(now.getDate() - day + (offset || 0) * 7);
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
  return { from: iso(mon), to: iso(sun), mon };
}

function exMuscles(e) {
  const out = {};
  const name = String(e.name || '');
  (e.groups || []).forEach(g => { out[g] = 1; });
  KW.forEach(k => { if (k.re.test(name)) k.g.forEach(g => { out[g] = 1; }); });
  return Object.keys(out);
}

function setsFor(key, workouts, offset) {
  const r = weekRange(offset);
  const keys = [key].concat(ALIASES[key] || []);
  let total = 0;
  workouts.forEach(w => {
    if (w.date < r.from || w.date > r.to) return;
    (w.exercises || []).forEach(e => {
      const mg = exMuscles({ name: e.name, groups: w.groups || [] });
      if (mg.some(m => keys.indexOf(m) >= 0)) total += +e.sets || 0;
    });
  });
  return total;
}

function daysAgo(key, workouts) {
  const keys = [key].concat(ALIASES[key] || []);
  let best = null;
  workouts.forEach(w => {
    (w.exercises || []).forEach(e => {
      const mg = exMuscles({ name: e.name, groups: w.groups || [] });
      if (mg.some(m => keys.indexOf(m) >= 0) && (!best || w.date > best)) best = w.date;
    });
  });
  if (!best) return null;
  return Math.floor((new Date(iso()).getTime() - new Date(best).getTime()) / 86400000);
}

function statusOf(key, workouts) {
  const ago = daysAgo(key, workouts);
  if (ago === null) return { cls: 'st-new', txt: 'не тренировалась', pct: 0 };
  if (ago <= 1) return { cls: 'st-trained', txt: 'утомлена', pct: 100 };
  if (ago <= 3) return { cls: 'st-recovering', txt: 'восстанавливается', pct: 55 };
  return { cls: 'st-ready', txt: 'готова', pct: 20 };
}

/* ---------- цвета для react-body-highlighter ---------- */
const RHB_COLORS = ['#1e293b', '#f59e0b', '#ef4444'];

/* ---------- компонент ---------- */
function RecoveryMap() {
  const [tab, setTab] = React.useState('sets');
  const [weekOffset, setWeekOffset] = React.useState(0);
  const [side, setSide] = React.useState('front');
  const [hover, setHover] = React.useState(null);
  const [more, setMore] = React.useState(false);
  const [workouts, setWorkouts] = React.useState([]);

  /* читаем тренировки из localStorage приложения */
  React.useEffect(() => {
    function read() {
      try {
        const raw = localStorage.getItem('gymmind_v3');
        if (!raw) return [];
        const s = JSON.parse(raw);
        return Array.isArray(s.workouts) ? s.workouts : [];
      } catch (e) { return []; }
    }
    setWorkouts(read());
    const id = setInterval(() => setWorkouts(read()), 2000);
    return () => clearInterval(id);
  }, []);

  /* данные для карты: массив { name, muscles, frequency } */
  const mapData = React.useMemo(() => {
    return GROUPS.map(g => {
      const v = setsFor(g.k, workouts, weekOffset);
      const st = statusOf(g.k, workouts);
      const freq = st.cls === 'st-trained' ? 3 : st.cls === 'st-recovering' ? 2 : 1;
      return { name: g.n, muscles: [RHB_MAP[g.k]], frequency: freq, sets: v, st, key: g.k };
    });
  }, [workouts, weekOffset]);

  const rows = more ? GROUPS : GROUPS.slice(0, 13);
  const r = weekRange(weekOffset);
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

  const hoverGroup = hover ? GROUPS.find(g => g.k === hover) : null;
  const hoverSets = hoverGroup ? setsFor(hoverGroup.k, workouts, weekOffset) : 0;
  const hoverSt = hoverGroup ? statusOf(hoverGroup.k, workouts) : null;

  return (
    <div className="rec-card">
      <div className="rec-head-row">
        <div className="rec-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Карта восстановления
        </div>
        <div className="rec-weeknav">
          <button className="rec-arrow" onClick={() => setWeekOffset(w => w - 1)} aria-label="Предыдущая неделя">‹</button>
          <b>{r.mon.getDate()} {months[r.mon.getMonth()]}.</b>
          <button className="rec-arrow" onClick={() => setWeekOffset(w => w + 1)} aria-label="Следующая неделя">›</button>
        </div>
      </div>

      <div className="rec-tabs" role="tablist">
        {[['sets', 'Подходы'], ['fatigue', 'Усталость'], ['strength', 'Сила']].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      <div className="rec-body">
        <div className="rec-figure">
          <div className="rec-figure-label">Спереди</div>
          <Model
            data={mapData}
            type="anterior"
            highlightedColors={RHB_COLORS}
            onClick={({ muscle }) => {
              const g = GROUPS.find(x => RHB_MAP[x.k] === muscle);
              if (g) setHover(g.k);
            }}
            style={{ width: '100%', maxHeight: 340 }}
          />
        </div>
        <div className="rec-figure">
          <div className="rec-figure-label">Сзади</div>
          <Model
            data={mapData}
            type="posterior"
            highlightedColors={RHB_COLORS}
            onClick={({ muscle }) => {
              const g = GROUPS.find(x => RHB_MAP[x.k] === muscle);
              if (g) setHover(g.k);
            }}
            style={{ width: '100%', maxHeight: 340 }}
          />
        </div>
        {hoverGroup && (
          <div className="rec-tooltip show" style={{ left: '50%', top: 8, transform: 'translateX(-50%)' }}>
            <b>{hoverGroup.n}</b>
            <span className="tt-num">{hoverSets}{hoverGroup.hi > 0 ? ` / ${hoverGroup.lo}–${hoverGroup.hi}` : ''} · {hoverSt.txt}</span>
          </div>
        )}
      </div>

      <div className="rec-legend">
        <span><i className="rec-dot" style={{ background: '#ef4444' }}></i> Утомлена</span>
        <span><i className="rec-dot" style={{ background: '#f59e0b' }}></i> Восстанавливается</span>
        <span><i className="rec-dot" style={{ background: '#10b981' }}></i> Готова</span>
        <span><i className="rec-dot" style={{ background: '#1e293b' }}></i> Нет данных</span>
      </div>

      <div className="rec-list-head">
        <b>Мышца</b>
        <span>Подходы за неделю</span>
      </div>
      <div className="rec-list">
        {rows.map(g => {
          const v = setsFor(g.k, workouts, weekOffset);
          const st = statusOf(g.k, workouts);
          const pct = g.hi > 0 ? Math.min(100, Math.round(v / g.hi * 100)) : (v > 0 ? 100 : 0);
          return (
            <div key={g.k} className={`rec-item ${st.cls}`} onClick={() => setHover(g.k)}>
              <div className="rec-item-top">
                <span className="rn">{g.n}</span>
                <span className="rv"><b>{v}</b>{g.hi > 0 ? ` / ${g.lo}–${g.hi}` : ''}</span>
              </div>
              <div className="rec-track"><span className="fill" style={{ width: pct + '%' }}></span></div>
            </div>
          );
        })}
      </div>
      <button className="rec-more" onClick={() => setMore(m => !m)}>
        {more ? 'Показать меньше ⌃' : 'Показать ещё ⌄'}
      </button>
    </div>
  );
}

/* ---------- монтирование в контейнер #recRoot ---------- */
function mount() {
  const host = document.getElementById('recRoot');
  if (!host) return;
  createRoot(host).render(<RecoveryMap />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}

export { RecoveryMap };