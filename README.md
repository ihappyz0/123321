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

**GymMind** — это веб-приложение для тренировок, питания и восстановления, которое работает в браузере, на Android и на iOS. Один и тот же код (`index.html`) упаковывается в нативные оболочки через **Capacitor**, а также устанавливается как **PWA** без сторов.

Внутри — модули тренировок, питания, добавок, восстановления, видео и прогресса. Для каждого модуля собраны тематические **подборки** карточек: быстрый старт, полезные привычки, источники белка, топ ошибок новичка и другие.

## Возможности

- 🏋️ Модули тренировок, питания, добавок и восстановления в одном интерфейсе
- 🗂️ Тематические подборки карточек для каждого модуля (Bento Grid)
- 💧 Учёт воды, калорий и прогресса по цели
- 🧠 Карта восстановления мышц (`src/recovery-map.jsx`)
- 🎬 Видеотека упражнений (`video-library.js`)
- 🥗 Режимы питания с синхронизацией (`diet-modes.js`, `diet-mode-sync.js`)
- 📱 Нативные сборки Android и iOS через Capacitor
- 🌐 PWA: установка на домашний экран и офлайн-режим
- 🤖 CI-сборка debug APK через GitHub Actions

## Как установить и пользоваться

1. **Клонируйте репозиторий и установите зависимости:**
   ```bash
   npm install
   ```
2. **Соберите веб-версию** (копирует `index.html`, манифест и `sw.js` в `www/`):
   ```bash
   npm run web
   ```
3. **Запустите в браузере** — откройте `index.html` или поднимите локальный сервер, например `npx serve www`.
4. **Установите как PWA:**
   - Android / Chrome: меню ⋮ → «Установить приложение».
   - iOS / Safari: «Поделиться» → «На экран Домой».
5. **Соберите Android-приложение:**
   ```bash
   npm run add:android
   npm run sync
   npm run android        # открыть в Android Studio
   npm run android:apk    # или сразу собрать debug APK
   ```
6. **Соберите iOS-приложение** (только macOS):
   ```bash
   npm run add:ios
   npm run sync
   cd ios/App && pod install && cd ../..
   npm run ios
   ```
7. **Сгенерируйте иконки и сплэш** из `resources/icon.svg` и `resources/splash.svg`:
   ```bash
   npm run assets
   ```
8. **Готовый APK из CI:** пуш в `main` → вкладка **Actions** → артефакт `gymmind-debug-apk`.

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
