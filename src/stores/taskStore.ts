import { makeAutoObservable } from 'mobx';

export interface Task {
  id: number;
  title: string;
  description: string;
  isChecked: boolean;
  isSelected: boolean;
  isExpanded: boolean;
  subTasks: Task[];
}

class TaskStore {
  tasks: Task[];
  lastId: number;
  selectedTask: Task | null = null;

  constructor() {
    this.tasks = this.getLocalStorage();
    this.lastId = this.calculateLasId();
    makeAutoObservable(this);
  }

  calculateLasId() {
    let lastId = 0;
    const checkIds = (taskArray: Task[]) => {
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id > lastId) {
          lastId = taskArray[i].id;
        }
        if (taskArray[i].subTasks.length > 0) {
          checkIds(taskArray[i].subTasks);
        }
      }
    };
    checkIds(this.tasks);
    return lastId;
  }

  getLocalStorage(): Task[] {
    const storedData = localStorage.getItem('apricodTasks');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  }

  setLocalStorage(taskList: Task[]) {
    localStorage.setItem('apricodTasks', JSON.stringify(taskList));
  }

  addNewTask(title: string, description: string) {
    this.lastId++;
    title = title.trim();
    description = description.trim();

    const newTask: Task = {
      id: this.lastId,
      title,
      description,
      isChecked: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
    };

    this.tasks.push(newTask);
    this.setLocalStorage(this.tasks);
  }

  addNewSubtask(title: string, description: string, mainTask: Task) {
    this.lastId++;
    title = title.trim();
    description = description.trim();

    const newTask: Task = {
      id: this.lastId,
      title,
      description,
      isChecked: false,
      isSelected: false,
      isExpanded: false,
      subTasks: [],
    };

    mainTask.isExpanded = true;
    mainTask.subTasks.push(newTask);
    this.setLocalStorage(this.tasks);
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
    this.setLocalStorage(this.tasks);
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
    this.setLocalStorage(this.tasks);
  }

  selectTask(taskId: number) {
    const innerSelectTask = (taskArray: Task[]) => {
      for (let i = 0; i < taskArray.length; i++) {
        taskArray[i].isSelected = false;
        if (taskArray[i].id === taskId) {
          this.selectedTask = taskArray[i];
          return;
        }
        if (taskArray[i].subTasks.length > 0) {
          innerSelectTask(taskArray[i].subTasks);
        }
      }
    };
    innerSelectTask(this.tasks);
  }

  expandTask(taskId: number) {
    const expandAllInnerTask = (innerArray: Task[]) => {
      for (let k = 0; k < innerArray.length; k++) {
        innerArray[k].isExpanded = false;
        if (innerArray[k].subTasks.length > 0) {
          expandAllInnerTask(innerArray[k].subTasks);
        }
      }
    };
    const innerExpandTask = (taskArray: Task[]) => {
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id === taskId) {
          taskArray[i].isExpanded = !taskArray[i].isExpanded;
          if (!taskArray[i].isExpanded) {
            expandAllInnerTask(taskArray[i].subTasks);
          }
        }
        if (taskArray[i].subTasks.length > 0) {
          innerExpandTask(taskArray[i].subTasks);
        }
      }
    };
    innerExpandTask(this.tasks);
    this.setLocalStorage(this.tasks);
  }

  checkTask(taskId: number) {
    const checkedAllSubtasks = (task: Task, isChecked: boolean) => {
      task.isChecked = isChecked;
      task.subTasks.forEach((subTask) =>
        checkedAllSubtasks(subTask, isChecked)
      );
    };

    const areAllSubtasksChecked = (task: Task): boolean => {
      if (task.subTasks.length === 0) return task.isChecked;
      return task.subTasks.every(areAllSubtasksChecked);
    };

    const updateParentTasks = (task: Task) => {
      if (areAllSubtasksChecked(task)) {
        task.isChecked = true;
      }
    };

    const findAndUpdateTask = (tasks: Task[]): boolean => {
      for (const task of tasks) {
        if (task.id === taskId) {
          const newState = !task.isChecked;
          checkedAllSubtasks(task, newState);
          return true;
        }

        if (findAndUpdateTask(task.subTasks)) {
          updateParentTasks(task);
          return true;
        }
      }
      return false;
    };

    findAndUpdateTask(this.tasks);
    this.setLocalStorage(this.tasks);
  }
}

export default new TaskStore();
