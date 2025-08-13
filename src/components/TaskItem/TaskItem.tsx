import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import taskStore, { Task } from '../../stores/taskStore';
import EditButton from '../EditButton/EditButton';
import AddNewTask from '../AddNewTask/AddNewTask';

interface TaskItemProps {
  task: Task;
}

const TaskItem = observer(({ task }: TaskItemProps) => {
  const navigate = useNavigate();

  const handleSelect = (e: React.MouseEvent, taskId: number) => {
    e.stopPropagation();
    taskStore.selectTask(taskId);
    navigate(`tasks/${task.id}`);
  };

  const handleChecked = (e: React.ChangeEvent, taskId: number) => {
    taskStore.checkTask(taskId);
  };

  const handleExpand = (e: React.MouseEvent, taskId: number) => {
    e.stopPropagation();
    taskStore.expandTask(taskId);
  };

  return (
    <li onClick={(e) => handleSelect(e, task.id)}>
      <input
        type="checkbox"
        checked={task.isChecked}
        onChange={(e) => handleChecked(e, task.id)}
      />
      {task.subTasks.length > 0 && (
        <button onClick={(e) => handleExpand(e, task.id)}>
          {task.isExpanded ? '▼' : '▶'}
        </button>
      )}
      <span>{task.title}</span>
      <button onClick={() => taskStore.deleteTask(task.id)}>Удалить</button>
      <EditButton task={task} taskId={task.id} />
      <AddNewTask mode="addSubtask" mainTask={task} />

      {task.subTasks.length > 0 && task.isExpanded ? (
        <ul>
          {task.subTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      ) : null}
    </li>
  );
});

export default TaskItem;
