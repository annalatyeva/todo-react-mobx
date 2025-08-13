import styles from './app.module.scss';

import MainContent from './components/MainContent/MainContent';

export function App() {
  console.log(styles);
  return (
    <div className={styles.appСontainer}>
      <MainContent />
    </div>
  );
}

export default App;
