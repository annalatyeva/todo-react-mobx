import { makeAutoObservable } from 'mobx';

export interface Task {
  id: number;
  title: string;
  description: string;
  isChecked: boolean;
  isSelected: boolean;
  isExpanded: boolean;
  parentId: number | null;
  subTasks: Task[];
}

class TaskStore {
  tasks: Task[];
  lastId: number;
  selectedTask: Task | null = null;
  highlightedRootId: number | null = null;

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

  highlightRootTask(taskId: number) {
    const task = this.findTaskById(taskId);
    if (!task) return false;

    let rootTask = task;
    while (rootTask.parentId !== null) {
      const parent = this.findTaskById(rootTask.parentId);
      if (!parent) break;
      rootTask = parent;
    }

    this.highlightedRootId = rootTask.id;
    return true;
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
      isSelected: true,
      isExpanded: false,
      parentId: null,
      subTasks: [],
    };

    this.tasks.push(newTask);
    this.selectTask(newTask.id);
    this.highlightRootTask(newTask.id);
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
      isSelected: true,
      isExpanded: false,
      parentId: mainTask.id,
      subTasks: [],
    };

    mainTask.isExpanded = true;
    mainTask.subTasks.push(newTask);
    this.selectedTask = newTask;
    this.highlightRootTask(newTask.id);
    this.setLocalStorage(this.tasks);
  }

  findTaskById(taskId: number): Task | undefined {
    const innerFindTask = (taskArray: Task[]): Task | undefined => {
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id === taskId) {
          return taskArray[i];
        }

        if (taskArray[i].subTasks.length > 0) {
          const foundTask = innerFindTask(taskArray[i].subTasks);
          if (foundTask) {
            return foundTask;
          }
        }
      }
      return undefined;
    };

    return innerFindTask(this.tasks);
  }

  deleteTask(taskId: number) {
    const task = this.findTaskById(taskId);
    if (!task) return;
    this.highlightRootTask(task.id);

    if (task.parentId === null) {
      const index = this.tasks.findIndex((t) => t.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    } else {
      const parent = this.findTaskById(task.parentId);
      if (parent) {
        const index = parent.subTasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          parent.subTasks.splice(index, 1);
        }
      }
    }

    this.setLocalStorage(this.tasks);
  }

  editTask(taskId: number, title: string, description: string) {
    const task = this.findTaskById(taskId);
    if (task) {
      task.title = title.trim();
      task.description = description.trim();
      task.isSelected = true;
      this.selectedTask = task;
      this.highlightRootTask(taskId);
      this.setLocalStorage(this.tasks);
    }
  }

  selectTask(taskId: number) {
    const resetSelection = (tasks: Task[]) => {
      tasks.forEach((task) => {
        task.isSelected = false;
        if (task.subTasks.length > 0) {
          resetSelection(task.subTasks);
        }
      });
    };
    resetSelection(this.tasks);

    const task = this.findTaskById(taskId);
    if (task) {
      task.isSelected = true;
      this.selectedTask = task;
      this.highlightRootTask(taskId);
    }
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
    this.highlightRootTask(taskId);
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
      const allChecked = areAllSubtasksChecked(task);
      task.isChecked = allChecked;
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
    this.highlightRootTask(taskId);
    this.setLocalStorage(this.tasks);
  }
}

export default new TaskStore();
