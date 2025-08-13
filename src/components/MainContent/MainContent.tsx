import { Outlet } from 'react-router-dom';
import TaskPanel from '../TaskPanel/TaskPanel';

const MainContent = () => {
  return (
    <div>
      <TaskPanel />
      <Outlet />
    </div>
  );
};

export default MainContent;
