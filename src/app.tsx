import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import DescriptionPanel from './components/DescriptionPanel/DescriptionPanel';

import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.appСontainer}>
      <Routes>
        <Route path="/" element={<MainContent />}>
          <Route path="tasks/:taskId" element={<DescriptionPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
