import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';
import styles from './descriptionPanel.module.scss';

const DescriptionPanel = observer(() => {
  const task = taskStore.selectedTask;

  if (!task) {
    return (
      <div className={styles.container}>
        <div className={styles.descriptionText}>Выберите задачу</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.descriptionText}>{task.title}</h2>
        <p className={styles.descriptionText}>{task.description}</p>
      </div>
    </div>
  );
});

export default DescriptionPanel;
