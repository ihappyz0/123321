<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — это приложение для тех, кто тренируется и хочет нормально питаться без сложных таблиц и калькуляторов.

Вы выбираете цель — набрать массу, похудеть, просушиться или удержать форму — а приложение само считает норму калорий и раскладывает её на белки, жиры и углеводы. Дальше оно подбирает рецепты под ваш режим, показывает, сколько вы уже съели и сколько ещё осталось добрать.

Весь интерфейс и логика живут в одном `index.html`, поэтому проект одинаково работает в браузере, на Android и на iOS: PWA ставится на домашний экран, а нативные сборки собираются через **Capacitor**.

## Возможности

- 🍚 **Четыре режима питания** — набор массы (+15% калорий), похудение (−20%), сушка (−25%) и поддержание формы. Для каждого режима своя норма белка и жира и свои советы.
- 🔥 **Автоматический расчёт калорий и БЖУ** — норма подстраивается под вес, режим и активность, а счётчик показывает, сколько калорий осталось на день.
- 🥗 **38 рецептов с фильтром по режиму** — завтраки, обеды, ужины и перекусы с граммовками, калорийностью, БЖУ и пошаговым приготовлением.
- ⏱ **Понятные инструкции** — у каждого блюда указано время готовки и список ингредиентов в бытовых мерах (стакан, ст. л., штука).
- 🎬 **Видеотека упражнений** — техника выполнения тренировок прямо в приложении.
- 📶 **Офлайн-режим (PWA)** — `manifest.webmanifest` и `sw.js` кэшируют оболочку, приложение открывается без интернета и ставится на главный экран.
- 📱 **Нативные сборки iOS и Android** — Capacitor-конфиг, генерация иконок и сплэшей из `resources/`, CI-сборка debug-APK в GitHub Actions.

## Как установить и пользоваться

### Вариант 1. Как PWA — самый быстрый способ

1. Откройте приложение в браузере.
2. **Android / Chrome:** меню ⋮ → «Установить приложение».
3. **iOS / Safari:** кнопка «Поделиться» → «На экран Домой».
4. Запускайте с домашнего экрана — интерфейс откроется на весь экран, как обычное приложение.

### Вариант 2. Собрать APK для Android

1. Установите **Node.js 18+** (рекомендуется 20).
2. Выполните в папке проекта:

```bash
npm install
npm run web        # копирует index.html + manifest + sw.js в www/
npm run add:android
npm run sync
npm run android:apk
```

3. Готовый файл появится в `android/app/build/outputs/apk/debug/app-debug.apk`.
4. Перенесите APK на телефон и разрешите установку из неизвестных источников.

> Проще всего: запушьте изменения в `main` — workflow `.github/workflows/android.yml` сам соберёт APK, а файл будет лежать в **Actions → артефакт `gymmind-debug-apk`**.

### Вариант 3. Сборка под iOS (только macOS)

1. Установите Xcode 15+ и CocoaPods: `sudo gem install cocoapods`.
2. Выполните:

```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios
```

3. В Xcode выберите team в **Signing & Capabilities**, проверьте Bundle Identifier (`com.gymmind.app`) и нажмите **Run ▶**.
4. Для App Store: **Product ▶ Archive ▶ Distribute App**.

### Первые шаги в приложении

1. Откройте раздел **«Питание»** и выберите режим: набор массы, похудение, сушка или поддержание.
2. Проверьте рассчитанную норму калорий и БЖУ — при необходимости скорректируйте вес и активность.
3. Загляните в рецепты: они уже отфильтрованы под ваш режим, с граммовками и временем готовки.
4. Отмечайте съеденное — счётчик покажет, сколько калорий осталось до нормы.
5. Загляните в видеотеку, чтобы свериться с техникой упражнений.

### Полезные команды

| Команда | Что делает |
|---|---|
| `npm run web` | Копирует web-файлы в `www/` |
| `npm run sync` | Синхронизирует `www/` с нативными оболочками |
| `npm run assets` | Генерирует иконки и сплэши всех размеров |
| `npm run android:apk` | Собирает debug APK |
| `npm run ios` | Открывает проект в Xcode |

Подробная инструкция по мобильной сборке лежит в [MOBILE.md](MOBILE.md).

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
- `nutrition-recipes.js`
- `nutrition-ui-fix.js`
- `package.json`
- `sw.js`
- `video-library.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
