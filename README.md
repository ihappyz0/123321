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

**GymMind** — это фитнес-приложение, которое помогает контролировать питание и тренировки. Оно объединяет в себе умный калькулятор калорий, режимы питания (набор массы, похудение, сушка, поддержание) и библиотеку из 38 рецептов с пошаговыми инструкциями. Приложение работает в браузере, а также упаковывается в нативные оболочки для Android и iOS с помощью Capacitor.

## Возможности

- 🍚 **Четыре режима питания** — набор массы, похудение, сушка и поддержание формы с автоматическим расчётом калорий и БЖУ.
- 🥗 **38 рецептов** — блюда для завтрака, обеда, ужина и перекусов, подобранные под выбранный режим.
- 📊 **Учёт калорий** — приложение показывает, сколько ещё нужно добрать после еды.
- 📱 **Кроссплатформенность** — один код для браузера, Android и iOS (Capacitor).
- 🌐 **PWA** — установка на домашний экран и офлайн-режим через Service Worker.
- ⚙️ **CI-сборка APK** — автоматическая сборка debug APK через GitHub Actions.
- 🎨 **Тёмная тема** — современный интерфейс с иконками и сплэш-экранами.

## Как установить и пользоваться

### 1. Установка зависимостей
```bash
npm install
npm run web        # копирует index.html + manifest + sw.js в www/
```

### 2. Запуск в браузере
Откройте файл `index.html` в браузере или запустите локальный сервер:
```bash
npx serve .
```

### 3. Сборка для Android
```bash
npm run add:android     # создаёт папку android/
npm run sync            # копирует www/ в нативную оболочку
npm run android         # открывает проект в Android Studio
```
В Android Studio нажмите **Run ▶** на устройстве или эмуляторе. Для сборки APK без студии:
```bash
npm run android:apk
# → android/app/build/outputs/apk/debug/app-debug.apk
```

### 4. Сборка для iOS (только macOS)
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

### 6. Автоматическая сборка APK
При каждом пуше в `main` GitHub Actions собирает debug APK. Готовый файл лежит в **Actions → артефакт `gymmind-debug-apk`**. Скачайте, перенесите на телефон и установите.

---

📄 Подробная инструкция по сборке — в файле [MOBILE.md](MOBILE.md).

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
