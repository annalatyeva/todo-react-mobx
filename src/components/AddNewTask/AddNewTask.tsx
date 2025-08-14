import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog, Form } from 'radix-ui';
import taskStore, { Task } from '../../stores/taskStore';
import styles from './addNewTask.module.scss';

type AddNewTaskProps =
  | { mode: 'addTask' }
  | { mode: 'addSubtask'; mainTask: Task };

const AddNewTask = observer((props: AddNewTaskProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      resetForm();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    props.mode === 'addTask'
      ? taskStore.addNewTask(title, description)
      : taskStore.addNewSubtask(title, description, props.mainTask);
    const closeButton = document.querySelector(
      '[data-radix-dialog-close]'
    ) as HTMLElement;
    closeButton?.click();
    resetForm();
  };

  const isFormValid = title.trim().length > 0 && description.trim().length > 0;

  return (
    <Dialog.Root onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button className={styles.Button}>
          Добавить {props.mode === 'addTask' ? 'задачу' : 'подзадачу'}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>
            Добавить {props.mode === 'addTask' ? 'задачу' : 'подзадачу'}
          </Dialog.Title>

          <Form.Root className={styles.Root} onSubmit={handleSave}>
            <Form.Field className={styles.Field} name="title">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}
              >
                <Form.Label className={styles.Label}>Задача</Form.Label>
                <Form.Message className={styles.Message} match="valueMissing">
                  Введите задачу
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Название задачи"
                  className={styles.Input}
                  required
                  autoComplete="off"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className={styles.Field} name="description">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}
              >
                <Form.Label className={styles.Label}>
                  Описание задачи
                </Form.Label>
                <Form.Message className={styles.Message} match="valueMissing">
                  Введите описание задачи
                </Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Описание задачи"
                  className={styles.Input}
                  required
                  autoComplete="off"
                />
              </Form.Control>
            </Form.Field>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <Form.Submit asChild>
                <button disabled={!isFormValid}>Сохранить</button>
              </Form.Submit>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className={styles.Button}
                  data-radix-dialog-close
                >
                  Отмена
                </button>
              </Dialog.Close>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default AddNewTask;
