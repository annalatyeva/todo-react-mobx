import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';

interface TaskItemProps {
  taskId: number;
}

const TaskItem = observer(({ taskId }: TaskItemProps) => {
  const task = taskStore.tasks.find((t) => t.id === taskId);
  if (!task) return null;

  return <li>{task.title}</li>;
});

export default TaskItem;
