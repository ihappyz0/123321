<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — компактное приложение для тренировок и питания, где весь интерфейс и логика собраны в одном файле `index.html`. Никаких сборщиков и фреймворков: открыл в браузере — и пользуешься.

Проект одинаково работает в трёх форматах:

- **PWA** — устанавливается на домашний экран и работает офлайн через `sw.js`;
- **Android** — нативная оболочка на Capacitor, debug APK собирается в GitHub Actions;
- **iOS** — тот же код упаковывается в Xcode-проект через Capacitor.

Код разделён на модули: `diet-modes.js` отвечает за режимы питания и расчёт калорий, `nutrition-recipes.js` — за базу рецептов, `video-library.js` — за библиотеку упражнений с видео.

## Возможности

- 🍚 **Четыре режима питания** — набор массы, похудение, сушка и поддержание формы: приложение само считает норму калорий и БЖУ.
- 🥗 **38 рецептов** — завтраки, обеды, ужины и перекусы, отфильтрованные под выбранный режим.
- 📊 **Остаток КБЖУ** — после каждого приёма пищи видно, сколько ещё нужно добрать до нормы.
- 🎬 **Библиотека видео** — техника выполнения упражнений прямо в приложении.
- 📱 **Кроссплатформенность** — один код для веба, Android и iOS через Capacitor.
- 📴 **Офлайн-режим** — service worker кэширует оболочку, приложение работает без сети.
- 🤖 **CI-сборка APK** — GitHub Actions собирает debug APK на каждый пуш в `main`.
- 🎨 **Готовые иконки и сплэш** — генерируются из SVG-исходников одной командой.

## Как установить и пользоваться

### Вариант 1. Просто открыть в браузере

1. Склонируйте репозиторий:
   ```bash
   git clone <repo-url>
   ```
2. Откройте `index.html` — приложение готово. Для корректной работы service worker лучше поднять локальный сервер:
   ```bash
   npx serve .
   ```

### Вариант 2. Установить как PWA

1. Откройте приложение в браузере.
2. **Android / Chrome:** меню ⋮ → «Установить приложение».
3. **iOS / Safari:** «Поделиться» → «На экран Домой».

### Вариант 3. Собрать APK для Android

1. Установите Node.js 18+ и Android Studio с JDK 17.
2. Выполните по шагам:
   ```bash
   npm install
   npm run web
   npm run add:android
   npm run sync
   npm run android:apk
   ```
3. Готовый файл лежит в `android/app/build/outputs/apk/debug/app-debug.apk`.
4. Либо скачайте артефакт `gymmind-debug-apk` из раздела **Actions** на GitHub.

### Вариант 4. Собрать под iOS (только macOS)

1. Поставьте Xcode 15+ и CocoaPods.
2. Выполните по шагам:
   ```bash
   npm install
   npm run web
   npm run add:ios
   npm run sync
   cd ios/App && pod install && cd ../..
   npm run ios
   ```
3. В Xcode выберите team в **Signing & Capabilities** и нажмите **Run ▶**.

### Первые шаги в приложении

1. Выберите режим питания: набор массы, похудение, сушка или поддержание.
2. Укажите текущий вес — норма калорий и БЖУ пересчитается автоматически.
3. Откройте раздел «Питание» и добавляйте съеденное — счётчик покажет остаток на день.
4. Загляните в библиотеку видео, чтобы свериться с техникой упражнений.

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
- `package.json`
- `sw.js`
- `video-library.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
