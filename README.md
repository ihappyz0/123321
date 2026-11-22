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

**GymMind** — это прогрессивное веб-приложение (PWA) для фитнеса и здорового питания. Оно помогает подобрать режим питания под вашу цель, рассчитать дневную норму калорий и БЖУ, а также предлагает рецепты, соответствующие выбранному режиму. Приложение работает в браузере, на Android и iOS благодаря упаковке через Capacitor.

## Возможности

- 🍚 **Четыре режима питания**: набор массы, похудение, сушка и поддержание формы — с автоматическим расчётом калорий и БЖУ.
- 🥗 **38 рецептов** с указанием ингредиентов, калорийности, времени приготовления и пошаговых инструкций.
- 📱 **Кроссплатформенность**: одно и то же приложение работает в браузере, на Android и iOS.
- 📲 **PWA-режим**: установка на домашний экран, офлайн-доступ благодаря сервис-воркеру.
- 🔄 **Автоматическая сборка APK** через GitHub Actions при каждом пуше в ветку `main`.
- 🎨 **Тёмная тема** и адаптивный интерфейс для комфортного использования на любых устройствах.

## Как установить и пользоваться

### Веб-версия (PWA)
1. Откройте приложение в браузере (Chrome или Safari).
2. В меню браузера выберите «Установить приложение» (Android/Chrome) или «На экран Домой» (iOS/Safari).
3. Пользуйтесь приложением как обычным: оно работает офлайн.

### Сборка для Android
1. Установите Node.js 18+ и Android Studio (JDK 17).
2. Выполните `npm install`, затем `npm run web` для копирования веб-файлов.
3. Создайте нативный проект: `npm run add:android`.
4. Синхронизируйте и откройте в Android Studio: `npm run sync` и `npm run android`.
5. Запустите на устройстве или эмуляторе. Для сборки APK без студии используйте `npm run android:apk`.

### Сборка для iOS (только macOS)
1. Установите Xcode 15+ и CocoaPods.
2. Выполните `npm run add:ios`, затем `npm run sync`.
3. Перейдите в `ios/App`, выполните `pod install`.
4. Откройте проект в Xcode: `npm run ios`, настройте подпись и запустите.

### Автоматическая сборка APK
1. Сделайте пуш в ветку `main`.
2. Перейдите в раздел **Actions** репозитория.
3. Скачайте артефакт `gymmind-debug-apk` и установите APK на телефон.

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
