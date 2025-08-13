import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

import globalStyles from '../styles/components.module.css';
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
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % translations.length);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [translations.length]);

  const handleLanguageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const { headline: currentHeadline, subline: currentSubline } = translations[currentIndex];

  // 📩 CTA-Scroll oder benutzerdefinierte Aktion
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className={`${styles.hero} ${styles[variant]} ${className}`}
    >
      {/* 📷 Hero-Bild im Ratio-Wrapper für CLS-Fix */}
      {imageUrl && (
        <div className={styles.mediaWrap} aria-hidden="true">
          <img
            className={styles.media}
            src={imageUrl}
            alt=""
            loading="eager"                // 🟢 wichtig für LCP
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlay-Gradient */}
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

            {/* ✨ Headline + Subline mit Transition */}
            <SwitchTransition>
              <CSSTransition
                key={currentIndex}
                timeout={500}
                classNames="fade"
                nodeRef={nodeRef}
              >
                <div ref={nodeRef}>
                  <h1 className={`${globalStyles.headline} ${variant === 'light' ? globalStyles.headline : globalStyles.headlineLight}`}>
                    {currentHeadline}
                  </h1>
                  <p className={`${globalStyles.subline} ${variant === 'light' ? globalStyles.subline : globalStyles.sublineLight}`}>
                    {currentSubline}
                  </p>
                </div>
              </CSSTransition>
            </SwitchTransition>

            {/* 📌 CTA-Button */}
            <div className={styles.ctaContainer}>
              <button
                onClick={handleCTAClick}
                className={`${globalStyles.buttonPrimary} ${globalStyles.buttonLarge} ${styles.ctaButton}`}
                aria-label={ctaLabel}
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
