import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';
import { Task } from '../../stores/taskStore';

interface TaskItemProps {
  task: Task;
}

const TaskItem = observer(({ task }: TaskItemProps) => {
  return (
    <li>
      <span>{task.title}</span>
      <button onClick={() => taskStore.deleteTask(task.id)}>Удалить</button>
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
