import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog, Form } from 'radix-ui';
import taskStore, { Task } from '../../stores/taskStore';
import { Pencil2Icon } from '@radix-ui/react-icons';
import styles from './editButton.module.scss';

interface EditButtonProps {
  task: Task;
  taskId: number;
}

const EditButton = observer(({ task, taskId }: EditButtonProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTitle(task.title);
      setDescription(task.description);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    taskStore.editTask(taskId, title, description);

    const closeButton = document.querySelector(
      '[data-radix-dialog-close]'
    ) as HTMLElement;
    closeButton?.click();
  };

  const isFormValid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    (title !== task.title || description !== task.description);

  return (
    <Dialog.Root onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button className={styles.button}>
          <Pencil2Icon className={styles.icon} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Dialog.Title className={styles.title}>
            Редактировать задачу
          </Dialog.Title>

          <Form.Root className={styles.root} onSubmit={handleSave}>
            <Form.Field className={styles.field} name="title">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}
              >
                <Form.Label className={styles.label}>Задача</Form.Label>
                <Form.Message className={styles.message} match="valueMissing">
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
                  className={styles.input}
                  required
                  autoComplete="off"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className={styles.field} name="description">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}
              >
                <Form.Label className={styles.label}>
                  Описание задачи
                </Form.Label>
                <Form.Message className={styles.message} match="valueMissing">
                  Введите описание задачи
                </Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Описание задачи"
                  className={styles.textarea}
                  required
                  autoComplete="off"
                />
              </Form.Control>
            </Form.Field>
            <div className={styles.buttonsContainer}>
              <Form.Submit asChild>
                <button
                  disabled={!isFormValid}
                  className={`${styles.button} ${styles.buttonWithWord}`}
                >
                  Сохранить
                </button>
              </Form.Submit>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonWithWord}`}
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

export default EditButton;
