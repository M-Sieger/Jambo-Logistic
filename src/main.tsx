import './index.css';
import './styles/base.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './App';
import { LanguageProvider } from './contexts/language-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

