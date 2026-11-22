<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="HTML5" /> <img src="https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="JavaScript" />
  <a href="https://ihappyz0.github.io/123321/"><img src="https://img.shields.io/badge/Открыть_сайт-10b981?style=for-the-badge" alt="Открыть сайт"/></a>
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — это веб-приложение для фитнеса и питания, которое работает в браузере, на Android и на iOS. Один и тот же код (`index.html`) упаковывается в нативные оболочки через **Capacitor**, а также устанавливается как **PWA** без сторов.

Приложение помогает выбрать режим питания, рассчитать дневную норму калорий и БЖУ, подобрать рецепты и следить за тем, сколько ещё нужно добрать после еды.

## Возможности

- 🍚 **Четыре режима питания** — набор массы, похудение, сушка и поддержание формы
- 🔥 **Расчёт калорий и БЖУ** — индивидуальная норма на день под выбранный режим
- 🥣 **38 рецептов** — завтраки, обеды, ужины и перекусы с ингредиентами и пошаговыми инструкциями
- 📊 **Учёт добра** — показывает, сколько калорий осталось добрать после еды
- 📱 **Кроссплатформенность** — браузер, Android, iOS через Capacitor
- 📲 **PWA** — установка на домашний экран и офлайн-режим через Service Worker
- 🤖 **Автосборка APK** — GitHub Actions собирает debug APK при каждом пуше в `main`
- 🎨 **Иконки и сплэш** — генерация всех размеров для обеих платформ

## Как установить и пользоваться

### 1. Установка зависимостей

```bash
npm install
npm run web        # копирует index.html + manifest + sw.js в www/
```

### 2. Запуск в браузере

Откройте `index.html` в браузере или запустите локальный сервер:

```bash
npx serve www
```

### 3. Сборка под Android

```bash
npm run add:android     # создаёт папку android/
npm run sync            # копирует www/ в нативную оболочку
npm run android         # открывает проект в Android Studio
```

Собрать APK без студии:

```bash
npm run android:apk
# → android/app/build/outputs/apk/debug/app-debug.apk
```

### 4. Сборка под iOS (только macOS)

```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios              # открывает Xcode
```

В Xcode выберите team в **Signing & Capabilities** и нажмите **Run ▶**.

### 5. Установка как PWA

- **Android / Chrome:** меню ⋮ → «Установить приложение».
- **iOS / Safari:** «Поделиться» → «На экран Домой».

### 6. Иконки и сплэш

```bash
npm run assets
```

Команда генерирует все размеры иконок и splash-экранов для обеих платформ из `resources/icon.svg` и `resources/splash.svg`.

### 7. Автоматическая сборка APK

Файл `.github/workflows/android.yml` собирает debug APK при каждом пуше в `main`. Готовый файл лежит в **Actions → артефакт `gymmind-debug-apk`**.

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
