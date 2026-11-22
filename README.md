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

**GymMind** — это умный фитнес-трекер, который помогает отслеживать тренировки, питание и прогресс. Приложение работает в браузере, на Android и iOS благодаря **Capacitor**, а также может быть установлено как PWA.

Проект включает в себя:
- Единый интерфейс для тренировок, питания и восстановления
- Синхронизацию режимов питания между разделами
- Готовые скрипты для сборки мобильных приложений

## Возможности

- 🏋️ **Тренировки** — отслеживание упражнений, подходов и прогресса
- 🍎 **Питание** — учёт калорий и БЖУ, режимы питания (масса, сушка, поддержание)
- 🔄 **Синхронизация режимов** — выбранный режим питания автоматически применяется во всех разделах
- 📱 **Мобильные приложения** — сборка для Android (APK/AAB) и iOS через Capacitor
- 🌐 **PWA** — установка на домашний экран, офлайн-режим
- 🎨 **Тёмная тема** — комфортный интерфейс в любое время суток
- 📊 **Визуализация прогресса** — графики и карты восстановления

## Как установить и пользоваться

### 1. Установка зависимостей
```bash
npm install
npm run web
```

### 2. Запуск в браузере
Откройте `index.html` в браузере или запустите локальный сервер:
```bash
npx serve www
```

### 3. Сборка для Android
```bash
npm run add:android
npm run sync
npm run android
```
Или соберите APK без Android Studio:
```bash
npm run android:apk
```

### 4. Сборка для iOS (только macOS)
```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios
```

### 5. Установка как PWA
- **Android / Chrome:** меню ⋮ → «Установить приложение»
- **iOS / Safari:** «Поделиться» → «На экран Домой»

### 6. Автоматическая сборка
При каждом пуше в `main` GitHub Actions собирает debug APK. Скачайте артефакт `gymmind-debug-apk` из раздела **Actions**.

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
