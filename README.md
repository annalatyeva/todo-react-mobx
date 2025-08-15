<h1 align='center'>Приложение для ведения списка задач</h1>
<p align='center'><img width="96" height="96" alt="task_list_business_checklist_feedback_survey_icon_251480" src="https://github.com/user-attachments/assets/e1523dc1-e2ce-458f-8339-d6e9ce74ec59" /></p>
<h3 align="center"><a href="https://annalatyeva.github.io/word-learning-app/">View site</a></h3>

## Начало работы

### Установка
1. Клонируйте репозиторий:
```bash
git clone https://github.com/annalatyeva/todo-react-mobx
```

2. Перейдите в директорию проекта:
```bash
cd your-project
```

3. Установите зависимости:
```bash
npm install
```

### Разработка

- Запуск development-сервера:
```bash
npx nx serve todo-react-mobx
```
или
```bash
npm run start
```

Откройте http://localhost:4200 в браузере.

- Сборка для production:
```bash
npx nx build todo-react-mobx
```
или
```bash
npm run build
```
**Важно**
Для корректной работы роутинга нужно перед тем, как запустить сборку, добавить аттрибут `basename="/todo-react-mobx/"` к тегу `BrowserRouter`, а также добавить `base: '/todo-react-mobx',` к `vite.config.ts`. 

## Стек
* React
* TypeScript
* Mobx (`makeAutoObservable`, основная логика в стор)
* SCSS модули
* Radix UI (часть компонентов и иконки)
* Vite
* проект создан через nx standalone

## Реализованный функционал
* Отображение списка задач в виде дерева. Если у задачи есть подзадачи, они находятся под родительской задачей с небольшим сдвигом вправо.
* При клике на задачу справа отображается ее полный текст.
* Для любой задачи можно создавать подзадачи (бесконечная вложенность).
* Список подзадач можно сворачивать.
* Слева от каждой задачи есть чекбокс. При его нажатии выделяется задача и все ее подзадачи.
* При выделении всех подзадач также выделяется родительская задача.
* Задачи можно удалять.
* Можно редактировать заголовок/ текст задачи.
* Хранение данных в localStorage.
* Правый блок реализован через «вложенный» роутинг.
* Для модальных окон создания/ редактирования задачи используются порталы.






