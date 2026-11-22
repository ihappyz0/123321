# GymMind — сборка мобильного приложения (iOS + Android)

Веб-приложение `index.html` упаковывается в нативные оболочки через **Capacitor**.
Один и тот же код работает в браузере, на Android и на iOS.

---

## 1. Требования

| Что | Версия |
|---|---|
| Node.js | 18+ (рекомендуется 20) |
| Android Studio | Hedgehog+ (JDK 17) |
| Xcode | 15+ (только macOS) |
| CocoaPods | 1.14+ (`sudo gem install cocoapods`) |

---

## 2. Установка

```bash
npm install
npm run web        # копирует index.html + manifest + sw.js в www/
```

## 3. Android

```bash
npm run add:android     # создаёт папку android/
npm run sync            # копирует www/ в нативную оболочку
npm run android         # открывает проект в Android Studio
```

В Android Studio: **Run ▶** на устройстве или эмуляторе.

Собрать APK без студии:

```bash
npm run android:apk
# → android/app/build/outputs/apk/debug/app-debug.apk
```

Для публикации в Google Play нужен **release**-сборка:

```bash
cd android
./gradlew bundleRelease      # Windows: gradlew.bat bundleRelease
# → android/app/build/outputs/bundle/release/app-release.aab
```
Файл `.aab` загружается в Google Play Console.
Не забудьте создать keystore и прописать его в `android/app/build.gradle`.

## 4. iOS (только macOS)

```bash
npm run add:ios
npm run sync
cd ios/App && pod install && cd ../..
npm run ios              # открывает Xcode
```

В Xcode:
1. Выберите team в **Signing & Capabilities** (нужен Apple ID / платный аккаунт для App Store).
2. Bundle Identifier = `com.gymmind.app` (или ваш).
3. **Run ▶** на симуляторе или подключённом iPhone.

Для App Store: **Product ▶ Archive ▶ Distribute App**.

## 5. Иконки и сплэш

Исходники лежат в `resources/icon.svg` и `resources/splash.svg`.

```bash
npm run assets
```

Команда генерирует все размеры иконок и splash-экранов для обеих платформ.
Если `@capacitor/assets` не принимает SVG — конвертируйте в PNG 1024×1024:

```bash
npx @capacitor/assets generate --iconPath resources/icon.png --splashPath resources/splash.png
```

## 6. Автоматическая сборка APK

Файл `.github/workflows/android.yml` собирает debug APK при каждом пуше в `main`.
Готовый файл лежит в **Actions → артефакт `gymmind-debug-apk`**.
Скачайте, перенесите на телефон, разрешите установку из неизвестных источников — и ставьте.

## 7. Как PWA (без сторов, но как приложение)

Приложение уже готово к установке как PWA:

- **Android / Chrome:** меню ⋮ → «Установить приложение».
- **iOS / Safari:** «Поделиться» → «На экран Домой».

Файлы: `manifest.webmanifest` + `sw.js` (офлайн-режим, кэш оболочки).

## 8. Структура

```
index.html               ← всё приложение (UI + логика)
manifest.webmanifest     ← PWA-манифест
sw.js                    ← офлайн-кэш
capacitor.config.json    ← конфиг нативной оболочки
scripts/build-web.mjs    ← копирование web-файлов в www/
resources/icon.svg       ← исходник иконки
resources/splash.svg     ← исходник splash-экрана
.github/workflows/       ← CI-сборка APK
```