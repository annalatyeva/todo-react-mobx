import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import App from './app';
import '@radix-ui/themes/styles.css';
import './styles.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Theme>
      <BrowserRouter basename="/todo-react-mobx/">
        <App />
      </BrowserRouter>
    </Theme>
  </StrictMode>
);
