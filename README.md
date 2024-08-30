# Расписание МАУ

![Screenshot](https://raw.githubusercontent.com/nikkkkolay/timetable/master/screenshot.png)

-   [x] Выбор группы и сохранение в локальное хранилище
-   [x] Запрос расписания на текущий день
-   [x] Запрос расписания за указанный временной диапазон
-   [x] Доступное расписание в календаре и выходные дни
-   [x] Экспорт расписания в Excel для указанного временного диапазона
-   [x] Возможность поделиться расписанием
-   [ ] Пуш уведомления об обновлении в расписании
-   [ ] Расписание занятий для иностранных студентов

### Сборка

Создать .env файл в корне и добавить API URL

```sh
EXPO_PUBLIC_API_URL="API URL"
PROJECT_OWNER="PROJECT OWNER"
PROJECT_ID="PROJECT ID"

```

Установить зависимости

```sh
npm install
```

Запустить проект

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
