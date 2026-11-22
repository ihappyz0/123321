<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — это приложение-компаньон для тренировок в зале: ИИ-тренер, дневник подходов, учёт питания и видео-уроки по технике в едином интерфейсе.

Проект написан как одно прогрессивное веб-приложение (`index.html` + PWA-манифест + сервис-воркер) и с помощью **Capacitor** упаковывается в нативные оболочки для **Android** и **iOS**. Один и тот же код работает в браузере, на телефоне и в сторах — без дублирования логики.

Тёмная тема, аккуратные градиенты и полноценный офлайн-режим делают GymMind удобным прямо в спортзале, где интернет не всегда ловит.

---

## Возможности

- 🧠 **ИИ-тренер** — подсказки по программе, нагрузке и восстановлению
- 📓 **Дневник тренировок** — подходы, повторения, рабочий вес и история прогресса
- 🥗 **Питание и рецепты** — библиотека блюд (`nutrition-recipes.js`) и учёт калорий/БЖУ
- 🎬 **Видео-уроки** — техника упражнений из встроенной библиотеки (`video-library.js`)
- 📶 **Офлайн-режим** — сервис-воркер (`sw.js`) кэширует оболочку приложения
- 📱 **Установка как приложение** — PWA-манифест и иконки для Android и iOS
- 🤖 **Нативные сборки** — Capacitor-конфиг для Android и iOS с единой кодовой базой
- ⚙️ **CI-сборка APK** — GitHub Actions собирает debug APK при каждом пуше в `main`
- 🎨 **Иконки и сплэши** — исходники в `resources/icon.svg` и `resources/splash.svg`

---

## Как установить и пользоваться

### 1. Клонирование и установка зависимостей

```bash
npm install
```

### 2. Запуск в браузере

Просто откройте `index.html` в браузере — этого достаточно для работы как PWA.
Или подготовьте web-файлы для нативной оболочки:

```bash
npm run web        # копирует index.html + manifest + sw.js в www/
```

### 3. Установка как PWA (без сторов)

- **Android / Chrome:** меню ⋮ → «Установить приложение»
- **iOS / Safari:** «Поделиться» → «На экран Домой»

### 4. Сборка под Android

```bash
npm run add:android     # создаёт папку android/
npm run sync            # копирует www/ в нативную оболочку
npm run android         # открывает проект в Android Studio
```

Быстрая debug-сборка APK без студии:

```bash
npm run android:apk
# → android/app/build/outputs/apk/debug/app-debug.apk
```

### 5. Сборка под iOS (только macOS)

```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios             # открывает Xcode
```

В Xcode выберите команду разработчика в **Signing & Capabilities** и нажмите **Run ▶**.

### 6. Иконки и сплэш-экраны

```bash
npm run assets
```

Команда генерирует все размеры иконок и splash-экранов для обеих платформ из `resources/`.

### 7. Автоматическая сборка APK

Workflow `.github/workflows/android.yml` собирает debug APK при каждом пуше в `main`.
Готовый файл лежит в **Actions → артефакт `gymmind-debug-apk`**: скачайте, перенесите на телефон и установите.

> Полные инструкции по мобильной сборке — в файле [`MOBILE.md`](MOBILE.md).

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
- `nutrition-recipes.js`
- `package.json`
- `sw.js`
- `video-library.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
