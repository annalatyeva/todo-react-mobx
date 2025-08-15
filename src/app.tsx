import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import DescriptionPanel from './components/DescriptionPanel/DescriptionPanel';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainContent />}>
          <Route path="tasks/:taskId" element={<DescriptionPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
