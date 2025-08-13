import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore, { Task } from '../../stores/taskStore';

interface EditButtonProps {
  task: Task;
  taskId: number;
}

const EditButton = observer(({ task, taskId }: EditButtonProps) => {
  const [isEdit, setisEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    taskStore.editTask(taskId, title, description);
    setisEdit(false);
  };

  const handleEditClick = () => {
    setisEdit(true);
  };

  const handleCancel = () => {
    setisEdit(false);
  };

  const isFormValid =
    title.trim() &&
    description.trim() &&
    (title !== task.title || description !== task.description);

  return isEdit ? (
    <form onSubmit={handleSave}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание задачи"
      />
      <button type="submit" disabled={!isFormValid}>
        Сохранить
      </button>
      <button type="button" onClick={handleCancel}>
        Отмена
      </button>
    </form>
  ) : (
    <button onClick={handleEditClick}>Редактировать</button>
  );
});

export default EditButton;
