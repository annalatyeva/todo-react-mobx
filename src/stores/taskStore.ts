import { makeAutoObservable } from 'mobx';

interface Task {
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
      subTasks: [],
    },
    {
      id: 2,
      title: 'Задача 2',
      description: 'Описание задачи 2',
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
    },
    {
      id: 3,
      title: 'Задача 3',
      description: 'Описание задачи 3',
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
    },
    {
      id: 4,
      title: 'Задача 4',
      description: 'Описание задачи 4',
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
    },
    {
      id: 5,
      title: 'Задача 5',
      description: 'Описание задачи 5',
      isCompleted: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
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
}

export default new TaskStore();
