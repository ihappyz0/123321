<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — лёгкое приложение для тренировок и питания, которое живёт в одном файле `index.html`. Никакого бэкенда и регистрации: открыл — и пользуешься. Внутри уже собраны расчёт калорий и БЖУ, четыре режима питания с готовыми подсказками, библиотека рецептов и видеотека упражнений.

Приложение работает офлайн (PWA), устанавливается на домашний экран телефона и при желании упаковывается в нативные оболочки для Android и iOS через **Capacitor**.

## Возможности

- 🍚 **Четыре режима питания** — набор массы, похудение, сушка и поддержание формы. Для каждого режима считается дневная норма калорий, белка и жиров, а также даются практические советы.
- 🥣 **38 рецептов** — завтраки, обеды, ужины и перекусы с указанием калорий, БЖУ и времени готовки. Рецепты фильтруются под выбранный режим.
- 📊 **Живой подсчёт** — после каждого приёма пищи видно, сколько калорий и нутриентов ещё осталось добрать до нормы.
- 🎬 **Видеотека упражнений** — техника выполнения прямо в приложении, без переходов на сторонние сайты.
- 📱 **PWA и офлайн-режим** — манифест и service worker кэшируют оболочку, приложение ставится на экран Домой и работает без интернета.
- 🌙 **Тёмный интерфейс** — спокойная тёмно-синяя палитра (`#0b0f19`), не слепит в зале и вечером.
- 🤖 **Автосборка APK** — GitHub Actions собирает debug-APK при каждом пуше в `main`, готовый файл лежит в артефактах.
- ⚡ **Ноль зависимостей в рантайме** — весь UI и логика в одном файле, ставится на любой статический хостинг.

## Как установить и пользоваться

### 1. Просто открыть в браузере

Скачайте репозиторий и откройте `index.html` — приложение сразу готово к работе. Для локального сервера (нужен для корректной работы service worker):

```bash
npx serve .
```

### 2. Установить как приложение (PWA)

- **Android / Chrome:** меню ⋮ → «Установить приложение».
- **iOS / Safari:** «Поделиться» → «На экран Домой».

После установки приложение запускается с иконки и работает офлайн.

### 3. Выбрать режим питания

Откройте раздел **Питание**, укажите свой вес и цель. Приложение рассчитает норму калорий и БЖУ, покажет подходящие рецепты и подскажет, сколько ещё осталось добрать за день.

### 4. Собрать APK для Android

```bash
npm install
npm run web          # копирует index.html, manifest и sw.js в www/
npm run add:android  # создаёт нативную папку android/
npm run sync
npm run android:apk  # → android/app/build/outputs/apk/debug/app-debug.apk
```

Либо скачайте готовый APK из **Actions → артефакт `gymmind-debug-apk`** — workflow `.github/workflows/android.yml` собирает его автоматически.

### 5. Собрать приложение для iOS (только macOS)

```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios
```

В Xcode выберите team в **Signing & Capabilities** и нажмите **Run ▶**. Подробности — в [MOBILE.md](MOBILE.md).

### 6. Иконки и сплэш

Исходники лежат в `resources/icon.svg` и `resources/splash.svg`, все размеры генерируются командой:

```bash
npm run assets
```

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
