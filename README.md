<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — это приложение для тренировок, которое объединяет ИИ-тренера, дневник зала, учёт питания, видео-уроки и анализ техники в одном интерфейсе.

Проект построен как единое веб-приложение (`index.html`), которое работает сразу в трёх форматах:

- 🌐 **В браузере** — без установки и регистрации;
- 📲 **Как PWA** — устанавливается на экран «Домой», работает офлайн;
- 🤖🍏 **Как нативное приложение** — упаковывается через [Capacitor](https://capacitorjs.com/) в Android и iOS.

Тёмная тема с фиолетово-бирюзовыми акцентами, адаптивная вёрстка, быстрый запуск и zero-backend архитектура — всё хранится локально на устройстве.

## Возможности

- 🧠 **ИИ-тренер** — индивидуальные рекомендации по нагрузке и восстановлению
- 📓 **Дневник тренировок** — подходы, повторения, веса и история прогресса
- 🍎 **Питание** — учёт калорий и БЖУ в одном дневнике
- 🎬 **Видео-уроки** — библиотека упражнений с объяснением техники
- 🎯 **Анализ техники** — разбор выполнения упражнений
- 📶 **Офлайн-режим** — `sw.js` кэширует оболочку приложения, работает без интернета
- 📲 **Установка как PWA** — манифест `manifest.webmanifest`, иконка и сплэш
- 🤖 **Нативные сборки** — Capacitor-конфиг для Android и iOS
- ⚙️ **CI на GitHub Actions** — debug APK собирается автоматически при каждом пуше в `main`
- 🎨 **Современный UI** — адаптивная тёмная тема, sticky-топбар, плавные градиенты

## Как установить и пользоваться

### Вариант 1. Просто открыть в браузере

1. Откройте `index.html` двойным кликом или через локальный сервер.
2. Готово — приложение сразу работает в браузере.

### Вариант 2. Установить как PWA (без сторов)

1. Откройте приложение по **HTTPS** (или `localhost`).
2. **Android / Chrome:** меню ⋮ → «Установить приложение».
3. **iOS / Safari:** «Поделиться» → «На экран Домой».
4. После установки приложение запускается как обычное и работает офлайн.

### Вариант 3. Собрать нативное приложение (Android / iOS)

1. Установите **Node.js 18+** (рекомендуется 20).
2. Подготовьте веб-файлы:

   ```bash
   npm install
   npm run web        # копирует index.html + manifest + sw.js в www/
   ```

3. **Android** — создайте оболочку, синхронизируйте и запустите:

   ```bash
   npm run add:android
   npm run sync
   npm run android     # откроет Android Studio
   ```

   Либо соберите APK сразу из консоли:

   ```bash
   npm run android:apk
   # → android/app/build/outputs/apk/debug/app-debug.apk
   ```

4. **iOS** (только macOS) — то же самое, но через Xcode:

   ```bash
   npm run add:ios
   npm run sync
   cd ios/App && pod install && cd ../..
   npm run ios
   ```

5. **Иконки и сплэш** генерируются одной командой из `resources/icon.svg` и `resources/splash.svg`:

   ```bash
   npm run assets
   ```

### Вариант 4. Скачать готовый APK из CI

1. Сделайте пуш в `main` (или запустите workflow вручную).
2. Откройте вкладку **Actions** в GitHub → артефакт `gymmind-debug-apk`.
3. Скачайте APK, перенесите на телефон, разрешите установку из неизвестных источников — и ставьте.

---

📄 Подробная инструкция по мобильной сборке — в файле [`MOBILE.md`](./MOBILE.md).
Лицензия проекта — в файле [`LICENSE`](./LICENSE).

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
- `index.html`
- `manifest.webmanifest`
- `package.json`
- `sw.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
