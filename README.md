<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="HTML5" /> <img src="https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="JavaScript" />
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — это приложение для тренировок и питания, которое помогает держать курс на цель без таблиц в блокноте. Вы выбираете режим — набор массы, похудение, сушка или поддержание формы — а приложение считает дневную норму калорий и белка, подбирает подходящие рецепты и показывает, сколько ещё нужно добрать после еды.

Всё приложение живёт в одном `index.html` (UI + логика), а модули питания, рецептов и видеотеки подключаются отдельными скриптами:

| Файл | За что отвечает |
|---|---|
| `diet-modes.js` | Режимы питания, расчёт калорий и БЖУ, советы |
| `nutrition-recipes.js` | База из 38 рецептов с граммовками и шагами |
| `video-library.js` | Библиотека обучающих видео |
| `nutrition-ui-fix.js` | Доработка интерфейса раздела «Питание» |
| `sw.js` + `manifest.webmanifest` | Офлайн-режим и установка как PWA |
| `capacitor.config.json` | Нативная оболочка Android / iOS |

Один и тот же код работает в браузере, на Android и на iOS.

## Возможности

- 🍚 **Четыре режима питания** — набор массы (профицит ~15%), похудение (дефицит 20%), сушка (дефицит 25% при высоком белке) и поддержание формы. Для каждого — своя норма калорий, белка и жиров.
- 🧮 **Автоматический расчёт КБЖУ** — норма на день пересчитывается под выбранный режим, а после приёма пищи видно, сколько калорий и белка осталось добрать.
- 🥗 **38 рецептов с фильтром по цели** — завтраки, обеды, ужины и перекусы: точные граммовки в ложках и стаканах, пошаговые инструкции и время готовки.
- 💡 **Практические советы под каждый режим** — что и когда есть, как часто взвешиваться, что делать, если вес встал.
- 🎬 **Видеотека** — обучающие ролики по технике и питанию прямо в приложении.
- 📱 **Установка как приложение** — PWA ставится на домашний экран Android и iOS и работает офлайн благодаря сервис-воркеру.
- 🤖 **Нативные сборки через Capacitor** — Android и iOS из одного кода, иконки и splash-экраны генерируются одной командой.
- ⚙️ **CI-сборка APK** — GitHub Actions собирает debug APK при каждом пуше в `main`.

## Как установить и пользуемся

### Вариант 1. Просто открыть в браузере

1. Склонируйте репозиторий и откройте `index.html` в браузере — или опубликуйте папку на любом статическом хостинге (GitHub Pages, Netlify, Vercel).
2. Выберите режим питания в разделе «Питание» — норма калорий и БЖУ посчитается автоматически.
3. Открывайте рецепты, готовьте по шагам и отмечайте съеденное: приложение покажет, сколько осталось до нормы.

### Вариант 2. Установить как приложение (PWA, без сторов)

1. **Android / Chrome:** меню ⋮ → «Установить приложение».
2. **iOS / Safari:** «Поделиться» → «На экран Домой».
3. Готово — иконка на домашнем экране, запуск без браузерной строки, офлайн-режим через `sw.js`.

### Вариант 3. Собрать нативное приложение

Требуется Node.js 18+ (рекомендуется 20), для Android — Android Studio с JDK 17, для iOS — Xcode 15+ на macOS.

```bash
npm install
npm run web          # копирует index.html, manifest и sw.js в www/
```

**Android:**

```bash
npm run add:android  # создаёт папку android/
npm run sync         # копирует www/ в нативную оболочку
npm run android      # открывает проект в Android Studio
npm run android:apk  # либо сразу debug APK без студии
# → android/app/build/outputs/apk/debug/app-debug.apk
```

Для Google Play нужна release-сборка: `cd android && ./gradlew bundleRelease` → `.aab` в `build/outputs/bundle/release/`.

**iOS (только macOS):**

```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios          # открывает Xcode
```

В Xcode выберите team в **Signing & Capabilities**, проверьте Bundle Identifier (`com.gymmind.app`) и нажмите **Run ▶**.

### Иконки и splash-экраны

Исходники лежат в `resources/icon.svg` и `resources/splash.svg`:

```bash
npm run assets   # генерирует все размеры иконок и splash для обеих платформ
```

### Автоматическая сборка APK

При пуше в `main` workflow `.github/workflows/android.yml` собирает debug APK. Готовый файл — в **Actions → артефакт `gymmind-debug-apk`**. Скачайте, перенесите на телефон и разрешите установку из неизвестных источников.

---

Если проект оказался полезным — поставьте ⭐ репозиторию.

<p align="center">
  <img src="docs/features.svg" alt="Ключевые возможности" width="100%" />
</p>

## 📦 Быстрое скачивание

- **Прямой архив:** [Скачать последнюю версию (.zip)](https://github.com/ihappyz0/123321/archive/refs/heads/main.zip)
- **Git:** `git clone https://github.com/ihappyz0/123321.git`

## 📁 Структура проекта

- `.gitignore`
- `LICENSE`
- `MOBILE.md`
- `README.md`
- `capacitor.config.json`
- `diet-modes.js`
- `index.html`
- `manifest.webmanifest`
- `nutrition-recipes.js`
- `nutrition-ui-fix.js`
- `package.json`
- `sw.js`
- `tmp_dm_grep.txt`
- `tmp_nr_grep.txt`
- `video-library.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
