import { Outlet } from 'react-router-dom';
import TaskPanel from '../TaskPanel/TaskPanel';
import styles from './mainContent.module.scss';
import { Flex } from '@radix-ui/themes';

const MainContent = () => {
  return (
    <Flex className={styles.container}>
      <TaskPanel />
      <Outlet />
    </Flex>
  );
};

export default MainContent;
