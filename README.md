# Расписание МАУ

![Screenshot](https://raw.githubusercontent.com/nikkkkolay/timetable/master/screenshot.png)

### План работы

-   [x] Выбор группы и запись в локальное хранилище
-   [x] Получение расписания на сегодня
-   [x] Доступное расписание в календаре и выходные дни
-   [x] Получение расписания за выбранный период
-   [x] Формирование excel таблицы расписания за выбранный период
-   [x] Возможность поделиться расписанием
-   [ ] Пуш уведомления об обновлении в расписании
-   [ ] Расписание занятий для иностранных студентов

## Сборка

Создать .env файл в корне и добавить API URL

```sh
EXPO_PUBLIC_API_URL="API URL"
```

Создать eas.json файл в корне

```sh
{
    "build": {
        "preview": {
            "android": {
                "buildType": "apk"
            },
            "env": {
                "EXPO_PUBLIC_API_URL": "API URL"
            }
        },
        "preview2": {
            "android": {
                "gradleCommand": ":app:assembleRelease"
            }
        },
        "preview3": {
            "developmentClient": true
        },
        "preview4": {
            "distribution": "internal"
        },
        "production": {}
    }
}
```

Установить зависимости

```sh
npm install
```

Запуск проекта

```sh
npm run start # запуск проекта
npm run android # запуск проекта android
npm run ios # запуск проекта ios
npm run web # запуск проекта web
npm run apk # сборка apk файла
```

## Используемые технологии и библиотеки

-   [expo](https://github.com/expo/expo)
-   [react-native](https://github.com/facebook/react-native)
-   [ui-kitten](https://github.com/akveo/react-native-ui-kitten)
-   [axios](https://github.com/axios/axios)
-   [zustand](https://github.com/pmndrs/zustand)
-   [xlsx](https://www.npmjs.com/package/xlsx)
-   [REST API](https://github.com/nikkkkolay/timetable_server)
