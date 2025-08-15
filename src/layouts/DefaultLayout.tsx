import 'aos/dist/aos.css';

import React, { useEffect } from 'react';

// ✅ NEU: AOS importieren (JS + CSS nur EINMAL global laden)
import AOS from 'aos';

import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from './DefaultLayout.module.css';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  // ☑️ Deine bestehende VH-Korrektur bleibt unangetastet
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // ✅ NEU: AOS einmal global initialisieren (sanft, barrierearm)
  useEffect(() => {
    // Respektiere System-Einstellung „Bewegung reduzieren“
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    AOS.init({
      duration: reduce ? 0 : 400, // Animation kurz & unaufdringlich
      once: true,                 // nur beim ersten Scrollen
      offset: 40,                 // Startpunkt vor Sichtbarkeit
      // easing: 'ease-out',      // optional
    });

    // Falls Inhalte nachträglich gemountet werden:
    // setTimeout(() => AOS.refresh(), 0);
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.globalBackground}></div>
      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
