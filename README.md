<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="HTML5" /> <img src="https://img.shields.io/badge/CSS3-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="CSS3" /> <img src="https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="JavaScript" /> <img src="https://img.shields.io/badge/React-0f172a?style=for-the-badge&amp;logoColor=38bdf8" alt="React" />
  <a href="https://ihappyz0.github.io/123321/"><img src="https://img.shields.io/badge/Открыть_сайт-10b981?style=for-the-badge" alt="Открыть сайт"/></a>
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — это фитнес-приложение, которое помогает тренироваться осознанно: отслеживать нагрузку, следить за питанием и вовремя восстанавливаться. Один и тот же код работает в браузере, на Android и на iOS благодаря Capacitor.

В основе — карта восстановления тела, режимы питания и подборки полезных материалов, которые превращают разрозненные данные в понятные рекомендации.

## Возможности

- 🗺️ **Карта восстановления** — интерактивная схема тела с зонами усталости и подсказками, что тренировать сегодня
- 🍽️ **Режимы питания** — синхронизация диет-режимов и расчёт калорий под вашу цель
- 📚 **Подборки** — коллекции карточек по тренировкам, питанию, добавкам, восстановлению и прогрессу
- 🎬 **Видеотека** — библиотека упражнений с техникой выполнения
- 📱 **Кроссплатформенность** — веб, Android и iOS из единой кодовой базы
- 📴 **Офлайн-режим** — PWA с кэшем оболочки и установкой на домашний экран
- 🤖 **CI-сборка APK** — автоматическая сборка debug-APK через GitHub Actions

## Как установить и пользоваться

### Веб-версия

1. Склонируйте репозиторий и установите зависимости:
   ```bash
   npm install
   ```
2. Соберите веб-файлы:
   ```bash
   npm run web
   ```
3. Откройте `index.html` в браузере или запустите локальный сервер.

### Установка как PWA

1. **Android / Chrome:** меню ⋮ → «Установить приложение».
2. **iOS / Safari:** «Поделиться» → «На экран Домой».

### Android

1. Добавьте нативную оболочку:
   ```bash
   npm run add:android
   npm run sync
   ```
2. Откройте проект в Android Studio командой `npm run android` и нажмите **Run ▶**.
3. Для сборки APK без студии используйте `npm run android:apk`.

### iOS (только macOS)

1. Выполните `npm run add:ios` и `npm run sync`.
2. Установите поды: `cd ios/App && pod install && cd ../..`.
3. Откройте Xcode командой `npm run ios`, выберите team и нажмите **Run ▶**.

### Первые шаги в приложении

1. Заполните профиль: вес, рост, возраст и цель.
2. Запишите первую тренировку — даже 3 упражнения дадут данные для карты восстановления.
3. Добавьте приём пищи через кнопку «Что ты съел?» в разделе Питание.

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
- `collections.js`
- `diet-mode-sync.js`
- `diet-modes.js`
- `index.html`
- `manifest.webmanifest`
- `package.json`
- `recovery-map.css`
- `sw.js`
- `tmp_dm_grep.txt`
- `tmp_nr_grep.txt`
- `video-library.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`
- `src/recovery-map.jsx`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
