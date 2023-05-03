#🚀 Проект акселератора «FitFriends»


Из корневой папки установите зависимости - npm install
запустите докер контейнер:

- из папки сервиса users: docker-compose up -d
- из папки сервиса training: docker-compose up -d
- из папки сервиса notify:  docker-compose up -d

В папке environments создайте файлы с переменными окружения:
1) .users.env по примеру файла .users.env-example
2) .training.env по примеру файла .training.env.example
3) .notify.env по примеру файла .notify.env-example

Документация в формате OpenApi:
- для сервиса users : http://localhost:3332/spec
- для сервиса training: http://localhost:3333/spec
- для сервиса notify: http://localhost:3334/spec

Запуск тестов: 
из директории fitfriends
nx run users:test
nx run training:test
nx run notify:test

