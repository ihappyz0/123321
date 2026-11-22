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

**GymMind** — это веб-приложение для фитнеса и здорового питания, которое помогает подобрать рацион под вашу цель. Проект упаковывается в нативные приложения для Android и iOS с помощью Capacitor, а также работает как PWA с офлайн-режимом.

## Возможности

- 🍚 **Четыре режима питания**: набор массы, похудение, сушка и поддержание формы — с автоматическим расчётом калорий и БЖУ.
- 🥗 **38 рецептов** с указанием калорий, белков, жиров, углеводов и времени приготовления. Фильтрация по режиму и приёму пищи.
- 📱 **Нативные приложения** для Android и iOS на базе Capacitor — один код для всех платформ.
- 🌐 **PWA-режим**: установка на домашний экран, офлайн-доступ благодаря service worker.
- ⚙️ **Автоматическая сборка APK** через GitHub Actions при каждом пуше в main.
- 🎨 **Тёмная тема** и адаптивный интерфейс для мобильных устройств.

## Как установить и пользоваться

1. **Клонируйте репозиторий** и установите зависимости:
   ```bash
   git clone <url>
   cd gymmind
   npm install
   ```

2. **Запустите веб-версию** для локальной разработки:
   ```bash
   npm run web
   ```
   Откройте `index.html` в браузере или используйте локальный сервер.

3. **Соберите мобильное приложение** (опционально):
   - Для Android: `npm run add:android && npm run sync && npm run android`
   - Для iOS (только macOS): `npm run add:ios && npm run sync && cd ios/App && pod install && cd ../.. && npm run ios`

4. **Установите как PWA**: откройте приложение в браузере и выберите «Установить приложение» (Android/Chrome) или «На экран Домой» (iOS/Safari).

5. **Пользуйтесь**: выберите режим питания, просматривайте рецепты и следите за дневным балансом калорий.

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
