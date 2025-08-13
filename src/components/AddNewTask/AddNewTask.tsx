import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore, { Task } from '../../stores/taskStore';

type AddNewTaskProps =
  | { mode: 'addTask' }
  | { mode: 'addSubtask'; mainTask: Task };

const AddNewTask = observer((props: AddNewTaskProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    props.mode === 'addTask'
      ? taskStore.addNewTask(title, description)
      : taskStore.addNewSubtask(title, description, props.mainTask);
    resetForm();
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    resetForm();
    setIsAdding(false);
  };

  const isFormValid = title.trim() && description.trim();

  return isAdding ? (
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
    <button onClick={handleAddClick}>
      Добавить {props.mode === 'addTask' ? 'задачу' : 'подзадачу'}
    </button>
  );
});

export default AddNewTask;
