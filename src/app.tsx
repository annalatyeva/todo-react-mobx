import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import DescriptionPanel from './components/DescriptionPanel/DescriptionPanel';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route index element={<DescriptionPanel />} />
        <Route path="tasks/:taskId" element={<DescriptionPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
