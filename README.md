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

**GymMind** — это прогрессивное веб-приложение (PWA) для тренировок и питания, которое упаковывается в нативные оболочки для Android и iOS с помощью Capacitor. Один и тот же код работает в браузере, на телефоне и в сторах.

## Возможности

- 🥗 **Режимы питания** — масса, сушка, похудение и поддержание с единым источником истины в `localStorage`
- 🔄 **Синхронизация** — смена режима мгновенно пересчитывает нормы во всех разделах через событие `gm:mode`
- 📱 **Нативные приложения** — сборка APK и iOS-приложения из одного `index.html`
- 🌐 **PWA** — установка на экран «Домой» и офлайн-режим через `sw.js`
- 🤖 **CI-сборка** — GitHub Actions автоматически собирает debug APK при пуше в `main`
- 🎨 **Иконки и сплэш** — генерация всех размеров из SVG-исходников

## Как установить и пользоваться

1. **Клонируйте репозиторий и установите зависимости:**
   ```bash
   npm install
   npm run web
   ```
2. **Запустите в браузере** — откройте `index.html` или раздайте папку `www/` любым статическим сервером.
3. **Установите как PWA:**
   - Android/Chrome: меню ⋮ → «Установить приложение»
   - iOS/Safari: «Поделиться» → «На экран Домой»
4. **Соберите Android-приложение:**
   ```bash
   npm run add:android
   npm run sync
   npm run android:apk
   ```
   Готовый APK появится в `android/app/build/outputs/apk/debug/`.
5. **Соберите iOS-приложение** (только macOS):
   ```bash
   npm run add:ios
   npm run sync
   cd ios/App && pod install && cd ../..
   npm run ios
   ```
6. **Настройте режим питания** в разделе «Питание» — выбор автоматически синхронизируется с «Обзором» и профилем.

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
- `diet-mode-sync.js`
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
