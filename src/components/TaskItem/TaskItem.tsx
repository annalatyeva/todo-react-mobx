import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';

interface TaskItemProps {
  taskId: number;
}

const TaskItem = observer(({ taskId }: TaskItemProps) => {
  const task = taskStore.tasks.find((t) => t.id === taskId);
  if (!task) return null;

  return (
    <li>
      <span>{task.title}</span>
      <button onClick={() => taskStore.deleteTask(taskId)}>Удалить</button>
    </li>
  );
});

export default TaskItem;
