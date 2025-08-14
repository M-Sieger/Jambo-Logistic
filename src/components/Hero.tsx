import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

/** 🔧 Globales Button-/Typo-System (Farben, Größen, Headline/Subline) */
import globalStyles from '../styles/GlobalPolish.module.css';
/** 🎨 Lokales Layout (Overlay, Container, Positions-Styles) */
import styles from './Hero.module.css';

interface HeroProps {
  headline: string;
  subline: string;
  ctaLabel: string;
  onCTAClick?: () => void;
  imageUrl?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  headline: _unusedHeadline,
  subline: _unusedSubline,
  ctaLabel,
  onCTAClick,
  imageUrl,
  variant = 'dark',
  className = ''
}) => {
  // 🌍 Rotierende Übersetzungen für Headline + Subline
  const translations = [
    { lang: 'de', flag: '🇩🇪', headline: 'Von deiner Tür bis nach Nairobi.', subline: 'Klar. Schnell. Zuverlässig. Für dich nach Kenia.' },
    { lang: 'en', flag: '🇬🇧', headline: 'From your door to Nairobi.', subline: 'Fast. Reliable. For you to Kenya.' },
    { lang: 'sw', flag: '🇰🇪', headline: 'Kutoka mlangoni kwako hadi Nairobi.', subline: 'Haraka. Inayoweza kuaminiwa. Kwa ajili yako Kenya.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);

  // 🔄 Automatischer Sprachwechsel alle 7 Sekunden
  useEffect(() => {
    const id = setInterval(() => setCurrentIndex((p) => (p + 1) % translations.length), 7000);
    return () => clearInterval(id);
  }, [translations.length]);

  const handleLanguageClick = (index: number) => setCurrentIndex(index);
  const { headline: currentHeadline, subline: currentSubline } = translations[currentIndex];

  // 📩 CTA: custom Callback ODER smooth scroll zu #contact
  const handleCTAClick = () => {
    if (onCTAClick) return onCTAClick();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={`${styles.hero} ${styles[variant]} ${className}`}>
      {/* 📷 Bild mit stabiler Ratio gegen CLS */}
      {imageUrl && (
        <div className={styles.mediaWrap} aria-hidden="true">
          <img
            className={styles.media}
            src={imageUrl}
            alt=""
            loading="eager"          /* 🟢 wichtig für LCP */
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
      )}

      {/* 🌫 Overlay + Content-Container */}
      <div className={styles.overlay}>
        <div className={`${styles.container} container`}>
          <div className={styles.content}>

            {/* 🌐 Sprachumschalter */}
            <div className={styles.languageSwitcher}>
              {translations.map((t, index) => (
                <button
                  key={t.lang}
                  onClick={() => handleLanguageClick(index)}
                  className={styles.flagButton}
                  aria-label={`Sprache ${t.lang}`}
                  type="button"
                >
                  {t.flag}
                </button>
              ))}
            </div>

            {/* ✨ Headline + Subline (fade) */}
            <SwitchTransition>
              <CSSTransition key={currentIndex} timeout={500} classNames="fade" nodeRef={nodeRef}>
                <div ref={nodeRef}>
                  {/* Headline-Farbe je nach Variante aus GlobalPolish */}
                  <h1 className={variant === 'light' ? globalStyles.headlineDark : globalStyles.headlineLight}>
                    {currentHeadline}
                  </h1>

                  {/* Subline: hell auf dunklem Hero, sonst normal */}
                  <p className={variant === 'light' ? globalStyles.subline : globalStyles.sublineLight}>
                    {currentSubline}
                  </p>
                </div>
              </CSSTransition>
            </SwitchTransition>

            {/* 📌 CTA-Button – globales Button-System */}
            <div className={styles.ctaContainer}>
              <button
                onClick={handleCTAClick}
               className={`${globalStyles.button} ${globalStyles["button--primary"]} ${globalStyles["is-lg"]}`}


                aria-label={ctaLabel}
                type="button"
              >
                {ctaLabel}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ⬇ Scroll-Indikator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
