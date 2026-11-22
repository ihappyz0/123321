<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — приложение-компаньон для тренировок в зале: ИИ-тренер, дневник подходов, учёт питания, видео-уроки и анализ техники. Всё приложение живёт в одном `index.html` — без сборщиков и фреймворков — и одинаково работает в браузере, на Android и на iOS благодаря оболочке **Capacitor**.

Проект сделан так, чтобы им было удобно пользоваться с телефона: тёмная тема, крупные тач-зоны, офлайн-кэш через Service Worker и установка на домашний экран как PWA.

## Возможности

- 🧠 **ИИ-тренер** — персональные советы по программе, нагрузке и восстановлению.
- 📓 **Дневник тренировок** — подходы, повторения, рабочий вес и история прогресса.
- 🥗 **Питание** — калории и БЖУ, чтобы тренировки работали на результат.
- 🎬 **Видео-уроки** — библиотека техники упражнений (`video-library.js`).
- 📈 **Анализ техники и прогресса** — понятная статистика вместо сухих цифр.
- 📱 **PWA + нативные оболочки** — `manifest.webmanifest` + `sw.js` для установки, Capacitor для сторов.
- 🔌 **Офлайн-режим** — оболочка кэшируется, приложение открывается без сети.
- 🤖 **CI-сборка APK** — GitHub Actions собирает debug APK на каждый пуш в `main`.
- 🎨 **Тёмный интерфейс** — глубокий фон `#0b0f19`, градиентные акценты, аккуратная типографика.

## Как установить и пользоваться

### 1. Установка зависимостей

```bash
npm install
npm run web   # копирует index.html, manifest и sw.js в www/
```

### 2. Запуск в браузере

Откройте `index.html` через локальный сервер — Service Worker требует `https` или `localhost`:

```bash
npx serve .
```

### 3. Установка как PWA

- **Android / Chrome:** меню ⋮ → «Установить приложение».
- **iOS / Safari:** «Поделиться» → «На экран Домой».

### 4. Сборка под Android

```bash
npm run add:android
npm run sync
npm run android:apk
# → android/app/build/outputs/apk/debug/app-debug.apk
```

Готовый APK также можно скачать из **Actions → артефакт `gymmind-debug-apk`**.

### 5. Сборка под iOS (только macOS)

```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios
```

В Xcode выберите team в **Signing & Capabilities** и нажмите **Run ▶**.

### 6. Иконки и сплэш

Исходники — `resources/icon.svg` и `resources/splash.svg`:

```bash
npm run assets
```

Подробности по платформам, keystore и публикации в сторы — в [MOBILE.md](MOBILE.md).

## Лицензия

См. файл [LICENSE](LICENSE).

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
- `video-library.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
