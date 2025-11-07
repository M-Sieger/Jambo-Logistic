import './index.css';
import './styles/base.css';
import 'aos/dist/aos.css';

import {
  StrictMode,
  useEffect,
} from 'react';

import AOS from 'aos';
import { createRoot } from 'react-dom/client';

import App from './App';
import { LanguageProvider } from './contexts/language-context';

// AOS Wrapper Component
function AppWithAOS() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
      disable: false, // Auf Mobile aktiv
    });
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AppWithAOS />
    </LanguageProvider>
  </StrictMode>,
);

