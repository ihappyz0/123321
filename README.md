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

**GymMind** — это умное фитнес-приложение, которое помогает тренироваться осознанно и восстанавливаться правильно. Один и тот же код работает в браузере, на Android и на iOS благодаря Capacitor и PWA.

В основе приложения — карта восстановления мышц, режимы питания, библиотека видео и множество тематических подборок, которые делают процесс тренировок понятным и удобным.

## Возможности

- 🗺️ **Карта восстановления** — визуализация состояния мышц после нагрузок
- 🥗 **Режимы питания** — гибкая настройка диеты и синхронизация целей
- 📚 **Подборки и коллекции** — готовые карточки по питанию, тренировкам, добавкам и привычкам
- 🎬 **Видеотека** — упражнения с демонстрацией техники
- 📱 **Мобильные приложения** — сборка под Android и iOS через Capacitor
- 🌐 **PWA-режим** — установка на устройство и офлайн-работа
- 🤖 **CI-сборка APK** — автоматическая сборка через GitHub Actions

## Как установить и пользоваться

1. **Клонируйте репозиторий и установите зависимости:**
   ```bash
   git clone <repo-url>
   cd gymmind
   npm install
   ```

2. **Запустите веб-версию:**
   ```bash
   npm run web
   ```
   Откройте `index.html` в браузере или запустите локальный сервер.

3. **Установите как PWA:**
   - Android/Chrome: меню ⋮ → «Установить приложение»
   - iOS/Safari: «Поделиться» → «На экран Домой»

4. **Соберите мобильное приложение (опционально):**
   ```bash
   npm run add:android
   npm run sync
   npm run android
   ```
   Подробности для iOS и публикации в сторах — в файле `MOBILE.md`.

5. **Пользуйтесь:** заполните профиль, запишите первую тренировку и добавьте приём пищи — приложение начнёт считать калории, воду и восстановление.

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
