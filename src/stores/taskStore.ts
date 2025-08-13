import { makeAutoObservable } from 'mobx';

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isSelected: boolean;
  isExpanded: boolean;
  subTasks: Task[];
}

class TaskStore {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Задача 1',
      description: 'Описание задачи 1',
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [
        {
          id: 11,
          title: 'Подзадача 1.1',
          description: 'Вложенная задача 1 уровня',
          isCompleted: false,
          isSelected: false,
          isExpanded: false,
          subTasks: [
            {
              id: 111,
              title: 'Подзадача 1.1.1',
              description: 'Вложенная задача 2 уровня',
              isCompleted: true,
              isSelected: false,
              isExpanded: false,
              subTasks: [
                {
                  id: 1111,
                  title: 'Подзадача 1.1.1.1',
                  description: 'Вложенная задача 3 уровня',
                  isCompleted: false,
                  isSelected: true,
                  isExpanded: false,
                  subTasks: [], // 4 уровень (пустой)
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Задача 2',
      description: 'Описание задачи 2',
      isCompleted: false,
      isSelected: false,
      isExpanded: true,
      subTasks: [
        {
          id: 21,
          title: 'Подзадача 2.1',
          description: 'Вложенная задача 1 уровня',
          isCompleted: false,
          isSelected: false,
          isExpanded: false,
          subTasks: [], // 2 уровень (пустой)
        },
      ],
    },
    {
      id: 3,
      title: 'Задача 3',
      description: 'Описание задачи 3',
      isCompleted: true,
      isSelected: false,
      isExpanded: false,
      subTasks: [], // 1 уровень (пустой)
    },
    {
      id: 4,
      title: 'Задача 4',
      description: 'Описание задачи 4',
      isCompleted: false,
      isSelected: true,
      isExpanded: false,
      subTasks: [
        {
          id: 41,
          title: 'Подзадача 4.1',
          description: 'Вложенная задача 1 уровня',
          isCompleted: false,
          isSelected: false,
          isExpanded: true,
          subTasks: [
            {
              id: 411,
              title: 'Подзадача 4.1.1',
              description: 'Вложенная задача 2 уровня',
              isCompleted: false,
              isSelected: false,
              isExpanded: false,
              subTasks: [], // 3 уровень (пустой)
            },
            {
              id: 412,
              title: 'Подзадача 4.1.2',
              description: 'Вложенная задача 2 уровня',
              isCompleted: true,
              isSelected: false,
              isExpanded: false,
              subTasks: [
                {
                  id: 4121,
                  title: 'Подзадача 4.1.2.1',
                  description: 'Вложенная задача 3 уровня',
                  isCompleted: false,
                  isSelected: false,
                  isExpanded: false,
                  subTasks: [], // 4 уровень (пустой)
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: 'Задача 5',
      description: 'Описание задачи 5',
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [], // 1 уровень (пустой)
    },
  ];
  lastId = 5;

  constructor() {
    makeAutoObservable(this);
  }

  addNewTask(title: string, description: string) {
    this.lastId++;
    title = title.trim();
    description = description.trim();

    const newTask: Task = {
      id: this.lastId,
      title,
      description,
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
    };

    this.tasks.push(newTask);
  }

  addNewSubtask(title: string, description: string, mainTask: Task) {
    this.lastId++;
    title = title.trim();
    description = description.trim();

    const newTask: Task = {
      id: this.lastId,
      title,
      description,
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
    };

    mainTask.subTasks.push(newTask);
  }

  deleteTask(taskId: number) {
    const innerDeleteTask = (taskArray: Task[]) => {
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id === taskId) {
          taskArray.splice(i, 1);
          return;
        }
        if (taskArray[i].subTasks.length > 0) {
          innerDeleteTask(taskArray[i].subTasks);
        }
      }
    };
    innerDeleteTask(this.tasks);
  }

  editTask(taskId: number, title: string, description: string) {
    const innerEditeTask = (taskArray: Task[]) => {
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id === taskId) {
          taskArray[i].title = title.trim();
          taskArray[i].description = description.trim();
          return;
        }
        if (taskArray[i].subTasks.length > 0) {
          innerEditeTask(taskArray[i].subTasks);
        }
      }
    };
    innerEditeTask(this.tasks);
  }
}

export default new TaskStore();
