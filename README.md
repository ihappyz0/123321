<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — приложение о питании и тренировках, которое помещается в один `index.html`. Оно не требует сервера, бэкенда и регистрации: открыл — и считаешь.

Внутри — четыре режима питания (набор массы, похудение, сушка, поддержание), база из 38 рецептов с КБЖУ и пошаговыми инструкциями, видеотека упражнений и офлайн-режим через Service Worker.

Тот же код работает в браузере как PWA, а через **Capacitor** упаковывается в нативные приложения для Android и iOS.

```
index.html              ← всё приложение (UI + логика)
diet-modes.js           ← режимы питания и расчёт калорий
nutrition-recipes.js    ← база рецептов
video-library.js        ← видеотека упражнений
manifest.webmanifest    ← PWA-манифест
sw.js                   ← офлайн-кэш
capacitor.config.json   ← конфиг нативной оболочки
```

## Возможности

- 🥗 **Режимы питания** — набор массы, похудение, сушка и поддержание формы с готовыми подсказками по белку и углеводам
- 🔥 **Расчёт калорий** — дневная норма подбирается под цель и вес, а после каждого приёма пищи видно, сколько ккал и БЖУ ещё осталось добрать
- 🍳 **38 рецептов** — завтраки, обеды, ужины и перекусы с граммовками, КБЖУ и временем готовки, отфильтрованные под выбранный режим
- 🎬 **Видеотека упражнений** — техника выполнения прямо в приложении, без переходов на сторонние сайты
- 📱 **Работает как приложение** — PWA с офлайн-кэшем: установка на домашний экран Android и iOS в два тапа
- 🤖 **Автосборка APK** — GitHub Actions собирает debug APK при каждом пуше в `main`, артефакт лежит в Actions
- 🎨 **Тёмная тема** — фон `#0b0f19`, иконки и splash-экраны в `resources/`, генерация через `npm run assets`

## Как установить и пользоваться

### Вариант 1: в браузере (самый быстрый)

1. Скачайте репозиторий или клонируйте его:
   ```bash
   git clone <url-репозитория> gymmind
   cd gymmind
   ```
2. Откройте `index.html` в браузере — для работы с рецептами и режимами сервер не нужен.
3. Выберите режим питания в разделе «Питание» и укажите свой вес — норма калорий посчитается автоматически.
4. Добавляйте съеденное из базы рецептов и следите за остатком КБЖУ в течение дня.

### Вариант 2: установить как приложение (PWA)

1. Откройте сайт в браузере: **Chrome на Android** — меню ⋮ → «Установить приложение»; **Safari на iOS** — «Поделиться» → «На экран Домой».
2. Запустите с домашнего экрана: приложение работает офлайн благодаря `sw.js`.
3. Обновления подтягиваются сами — достаточно перезапустить приложение при подключённом интернете.

### Вариант 3: собрать нативное приложение

1. Установите зависимости:
   ```bash
   npm install
   npm run web
   ```
2. **Android:** выполните `npm run add:android`, затем `npm run sync` и `npm run android` — откроется Android Studio, где жмите **Run ▶**. APK без студии: `npm run android:apk`.
3. **iOS (только macOS):** выполните `npm run add:ios`, `npm run sync`, затем `cd ios/App && pod install && cd ../..` и `npm run ios` — откроется Xcode, выберите team в **Signing & Capabilities** и нажмите **Run ▶**.
4. Иконки и splash-экраны перегенерируются командой `npm run assets` из `resources/icon.svg` и `resources/splash.svg`.

> Подробная инструкция по сборке, keystore и публикации в Google Play и App Store — в файле [`MOBILE.md`](MOBILE.md).

### Вариант 4: готовый APK из CI

1. Запушьте изменения в ветку `main`.
2. Откройте вкладку **Actions** в GitHub и дождитесь завершения workflow `android.yml`.
3. Скачайте артефакт `gymmind-debug-apk`, перенесите на телефон и разрешите установку из неизвестных источников.

## Лицензия

Проект распространяется по лицензии из файла [`LICENSE`](LICENSE).

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
- `tmp_dm_grep.txt`
- `tmp_nr_grep.txt`
- `video-library.js`
- `.github/workflows/android.yml`
- `resources/icon.svg`
- `resources/splash.svg`
- `scripts/build-web.mjs`

## 📄 Лицензия

Проект распространяется под лицензией MIT (`LICENSE`).
