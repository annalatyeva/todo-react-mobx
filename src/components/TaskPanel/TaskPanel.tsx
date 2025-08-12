import AddNewTask from '../AddNewTask/AddNewTask';
import TaskList from '../TaskList/TaskList';

const TaskPanel = () => {
  return (
    <div>
      <TaskList />
      <AddNewTask />
    </div>
  );
};

export default TaskPanel;
