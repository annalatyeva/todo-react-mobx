import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = observer(() => {
  return (
    <div>
      <ul>
        {taskStore.tasks.map((task) => (
          <TaskItem key={task.id} taskId={task.id} />
        ))}
      </ul>
    </div>
  );
});

export default TaskList;
