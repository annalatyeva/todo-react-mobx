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
  const handleClick = (e: React.MouseEvent, taskId: number) => {
    e.stopPropagation();
    taskStore.selectTask(taskId);
    navigate(`tasks/${task.id}`);
  };

  return (
    <li onClick={(e) => handleClick(e, task.id)}>
      <span>{task.title}</span>
      <button onClick={() => taskStore.deleteTask(task.id)}>Удалить</button>
      <EditButton task={task} taskId={task.id} />
      <AddNewTask mode="addSubtask" mainTask={task} />

      {task.subTasks.length > 0 ? (
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
