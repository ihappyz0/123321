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

**GymMind** — это веб-приложение для фитнеса и здорового образа жизни, которое упаковывается в нативные оболочки через **Capacitor**. Один и тот же код работает в браузере, на Android и на iOS. Приложение помогает вести дневник тренировок, следить за питанием, получать рекомендации по восстановлению и формировать полезные привычки.

Проект включает готовые подборки карточек (коллекции) для каждого модуля: обзор, питание, тренировки, добавки, восстановление, видео, прогресс и достижения. Каждая подборка содержит практические советы и рекомендации.

## Возможности

- 📚 **Множество подборок** — в каждом модуле не одна, а множество коллекций с карточками, описаниями и тегами.
- 🎨 **Bento Grid дизайн** — современное оформление подборок, встраиваемое в нужные секции.
- 📱 **Кроссплатформенность** — сборка под Android (APK/AAB) и iOS (IPA) через Capacitor.
- 🌐 **PWA-режим** — установка как приложение без сторов, офлайн-доступ благодаря Service Worker.
- ⚙️ **Автоматическая сборка** — GitHub Actions собирает debug APK при каждом пуше в `main`.
- 🖼️ **Генерация иконок и сплэшей** — из SVG-исходников создаются все размеры для обеих платформ.
- 🏋️ **Умные рекомендации** — советы по тренировкам, питанию, восстановлению и привычкам.

## Как установить и пользоваться

### 1. Клонирование и установка зависимостей
```bash
git clone <url-репозитория>
cd gymmind
npm install
```

### 2. Сборка веб-версии
```bash
npm run web   # копирует index.html, manifest и sw.js в www/
```

### 3. Запуск в браузере
Откройте `www/index.html` в браузере или запустите локальный сервер (например, `npx serve www`).

### 4. Сборка для Android
```bash
npm run add:android   # создаёт папку android/
npm run sync          # копирует www/ в нативную оболочку
npm run android       # открывает проект в Android Studio
```
Для сборки APK без студии:
```bash
npm run android:apk
# → android/app/build/outputs/apk/debug/app-debug.apk
```

### 5. Сборка для iOS (только macOS)
```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios           # открывает Xcode
```

### 6. Установка как PWA
- **Android / Chrome:** меню ⋮ → «Установить приложение».
- **iOS / Safari:** «Поделиться» → «На экран Домой».

### 7. Автоматическая сборка APK
При пуше в `main` GitHub Actions собирает debug APK. Готовый файл доступен в **Actions → артефакт `gymmind-debug-apk`**. Скачайте, перенесите на телефон и установите (разрешив установку из неизвестных источников).

### 8. Генерация иконок и сплэшей
```bash
npm run assets
```
Команда создаёт все размеры иконок и splash-экранов для Android и iOS из `resources/icon.svg` и `resources/splash.svg`.

---

Подробная инструкция по сборке мобильных приложений — в файле [MOBILE.md](MOBILE.md).

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
