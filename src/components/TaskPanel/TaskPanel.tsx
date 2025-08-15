import AddNewTask from '../AddNewTask/AddNewTask';
import TaskList from '../TaskList/TaskList';
import styles from './taskPanel.module.scss';

const TaskPanel = () => {
  return (
    <div className={styles.container}>
      <TaskList />
      <AddNewTask mode="addTask" />
    </div>
  );
};

export default TaskPanel;
