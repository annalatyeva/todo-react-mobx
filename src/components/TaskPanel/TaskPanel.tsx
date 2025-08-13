import AddNewTask from '../AddNewTask/AddNewTask';
import TaskList from '../TaskList/TaskList';

const TaskPanel = () => {
  return (
    <div>
      <TaskList />
      <AddNewTask mode="addTask" />
    </div>
  );
};

export default TaskPanel;
