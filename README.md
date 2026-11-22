<p align="center">
  <img src="docs/banner.svg" alt="123321" width="100%" />
</p>

<p align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-0f172a?style=for-the-badge&logoColor=38bdf8) ![JavaScript](https://img.shields.io/badge/JavaScript-0f172a?style=for-the-badge&logoColor=38bdf8)
  <a href="https://github.com/ihappyz0/123321/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Скачать_ZIP-38bdf8?style=for-the-badge" alt="Скачать ZIP"/></a>
</p>

# 123321

## О проекте

**GymMind** — приложение для тренировок и питания, которое работает в браузере, на Android и на iOS из одного и того же кода. Весь интерфейс и логика собраны в `index.html`, а нативные оболочки собираются через **Capacitor**. Приложение устанавливается как PWA и полностью работает офлайн благодаря сервис-воркеру.

Никаких серверов и регистраций: открыли — и занимаетесь.

![Возможности](docs/features.svg)

## Возможности

- 🍚 **Четыре режима питания** — набор массы, похудение, сушка и поддержание формы: приложение считает норму калорий и БЖУ под вашу цель.
- 🥗 **38 рецептов** — с калорийностью, белками, жирами и углеводами, ингредиентами и пошаговыми инструкциями.
- 🎯 **Умный подбор** — рецепты фильтруются по выбранному режиму и времени приёма пищи (завтрак, обед, ужин, перекус).
- 📉 **Остаток калорий** — после каждого приёма пищи видно, сколько ещё нужно добрать до нормы.
- 💡 **Практические советы** — для каждого режима есть свои рекомендации по белку, углеводам и режиму дня.
- 🎬 **Видеотека упражнений** — техника выполнения тренировок прямо в приложении.
- 📡 **Офлайн-режим (PWA)** — `manifest.webmanifest` и `sw.js` кэшируют оболочку, приложение ставится на домашний экран.
- 📱 **Нативные сборки** — Android (APK / AAB) и iOS через Capacitor.
- 🤖 **CI-сборка APK** — GitHub Actions собирает debug APK при каждом пуше в `main`.
- 🌙 **Тёмная тема** — фон `#0b0f19` одинаково выглядит в вебе и в нативных оболочках.

## Как установить и пользоваться

### Вариант 1. Открыть в браузере

1. Склонируйте репозиторий:
   ```bash
   git clone <адрес-репозитория>
   ```
2. Откройте `index.html` — приложение сразу готово к работе.

### Вариант 2. Установить как PWA (без сторов)

1. **Android / Chrome:** меню ⋮ → «Установить приложение».
2. **iOS / Safari:** «Поделиться» → «На экран Домой».

### Вариант 3. Собрать нативное приложение

1. Установите зависимости (нужен Node.js 18+):
   ```bash
   npm install
   npm run web
   ```
2. Добавьте платформу:
   ```bash
   npm run add:android   # или npm run add:ios (только macOS)
   npm run sync
   ```
3. Откройте проект в студии:
   ```bash
   npm run android       # или npm run ios
   ```
4. Соберите APK без Android Studio:
   ```bash
   npm run android:apk
   # → android/app/build/outputs/apk/debug/app-debug.apk
   ```

**Готовый APK из CI:** вкладка **Actions** → артефакт `gymmind-debug-apk`. Скачайте, перенесите на телефон и разрешите установку из неизвестных источников.

### Первые шаги в приложении

1. Выберите режим питания: 🍚 набор массы, 📉 похудение, 🔥 сушка или ⚖️ поддержание формы.
2. Укажите свой вес — приложение посчитает дневную норму калорий и БЖУ.
3. Откройте рецепты и добавьте съеденное — остаток калорий пересчитается автоматически.
4. Следуйте подсказкам по режиму и следите за динамикой веса.

Подробная инструкция по iOS, Android и иконкам — в [MOBILE.md](MOBILE.md).

## Структура

```
index.html               ← всё приложение (UI + логика)
diet-modes.js            ← режимы питания, калории, рецепты
nutrition-recipes.js     ← база рецептов
video-library.js         ← видеотека упражнений
manifest.webmanifest     ← PWA-манифест
sw.js                    ← офлайн-кэш
capacitor.config.json    ← конфиг нативной оболочки
scripts/build-web.mjs    ← копирование web-файлов в www/
resources/               ← исходники иконки и splash-экрана
.github/workflows/       ← CI-сборка APK
```

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
- `diet-modes.js`
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
