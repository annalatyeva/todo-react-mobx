import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';

const AddNewTask = observer(() => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    taskStore.addNewTask(title, description);
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
    <button onClick={handleAddClick}>Добавить задачу</button>
  );
});

export default AddNewTask;
