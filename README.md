#🚀 Проект акселератора «FitFriends»

Запуск микросервиса Users

из корневой папки установите зависимости - npm install
запустите докер контейнер:

- из папки сервиса users - docker-compose up -d
- из папки сервиса training - docker-compose up -d
  в папке environments создайте файлы с переменными окружения^
- .users.env по примеру файла .users.env-example
- training.env по примеру файла training.env.example

Документация в формате OpenApi:

- для сервиса users : http://localhost:3332/spec
- для сервиса training: http://localhost:3333/spec
