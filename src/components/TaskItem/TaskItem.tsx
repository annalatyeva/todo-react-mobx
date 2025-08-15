import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import taskStore, { Task } from '../../stores/taskStore';
import EditButton from '../EditButton/EditButton';
import AddNewTask from '../AddNewTask/AddNewTask';
import { Checkbox } from 'radix-ui';
import { CheckIcon, TrashIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import styles from './taskItem.module.scss';

interface TaskItemProps {
  task: Task;
  isChild?: boolean;
  nestingLevel?: number;
}

const TaskItem = observer(
  ({ task, isChild = false, nestingLevel = 0 }: TaskItemProps) => {
    const navigate = useNavigate();
    const isHighlighted = taskStore.highlightedRootId === task.id;

    const handleSelect = (e: React.MouseEvent, taskId: number) => {
      e.stopPropagation();
      taskStore.selectTask(taskId);
      navigate(`tasks/${task.id}`);
    };

    const handleChecked = (taskId: number) => {
      taskStore.checkTask(taskId);
      taskStore.selectTask(taskId);
      navigate(`tasks/${task.id}`);
    };

    const handleExpand = (e: React.MouseEvent, taskId: number) => {
      e.stopPropagation();
      taskStore.expandTask(taskId);
    };

    return (
      <li
        className={`${styles.taskItem} ${isChild ? styles.isChild : ''} ${
          isHighlighted ? styles.highlighted : ''
        }`}
        style={{ '--nesting-level': nestingLevel } as React.CSSProperties}
      >
        <div className={styles.taskRow}>
          <Checkbox.Root
            className={styles.checkbox}
            checked={task.isChecked}
            onCheckedChange={() => handleChecked(task.id)}
          >
            <Checkbox.Indicator>
              <CheckIcon className={styles.indicator} />
            </Checkbox.Indicator>
          </Checkbox.Root>

          <button
            className={`${styles.button} ${styles.taskToggle} ${
              task.subTasks.length === 0 ? styles.hiddenToggle : ''
            }`}
            onClick={(e) =>
              task.subTasks.length > 0 && handleExpand(e, task.id)
            }
          >
            <ChevronRightIcon
              className={`${styles.toggleIcon} ${
                task.isExpanded ? styles.expanded : ''
              }`}
            />
          </button>

          <span
            className={styles.taskTitle}
            onClick={(e) => handleSelect(e, task.id)}
          >
            {task.title}
          </span>

          <button
            onClick={(e) => e.stopPropagation()}
            className={styles.button}
          >
            <EditButton task={task} taskId={task.id} />
          </button>

          <button
            onClick={() => taskStore.deleteTask(task.id)}
            className={styles.button}
          >
            <TrashIcon className={styles.icon} />
          </button>

          <AddNewTask mode="addSubtask" mainTask={task} />
        </div>

        {task.subTasks.length > 0 && task.isExpanded && (
          <ul>
            {task.subTasks.map((subTask) => (
              <TaskItem
                key={subTask.id}
                task={subTask}
                isChild={true}
                nestingLevel={nestingLevel + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
);

export default TaskItem;
