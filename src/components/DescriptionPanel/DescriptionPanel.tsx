import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';

const DescriptionPanel = observer(() => {
  const task = taskStore.selectedTask;

  if (!task) {
    return <div>Выберите задачу</div>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
});

export default DescriptionPanel;
