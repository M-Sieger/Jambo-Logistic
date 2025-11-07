// ---------------------------------------------------------
// Datei: Hero.tsx
// Zweck: Hero-Section mit globalem Sprach-Support und CTA
// Besonderheiten:
// - Integriert in LanguageContext (DE/EN/SW)
// - Headline & Copy animieren bei Sprachwechsel (Fade)
// - CTA-Buttons verwenden Design-System Buttons
// - Optionales Override via Props möglich
// Stand: 05.11.2025
// ---------------------------------------------------------

import React, { useRef } from 'react';

import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

import { useLanguage } from '../contexts/language-context';
import globalStyles from '../styles/GlobalPolish.module.css';
import styles from './Hero.module.css';

interface HeroProps {
  headline?: string;
  subline?: string;
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  onCTAClick?: () => void;
  imageUrl?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subline,
  ctaLabel,
  secondaryCtaLabel,
  onCTAClick,
  imageUrl,
  variant = 'dark',
  className = '',
}) => {
  const {
    language,
    translations: t,
  } = useLanguage();
  const nodeRef = useRef<HTMLDivElement>(null);
  const resolvedHeadline = headline ?? t.hero.headline;
  const resolvedSubline = subline ?? t.hero.subline;
  const primaryCta = ctaLabel ?? t.hero.cta;
  const secondaryCta = secondaryCtaLabel ?? t.cta.consultation;

  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
      return;
    }

    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={`${styles.hero} ${styles[variant]} ${className}`}>
      {imageUrl && (
        <div className={styles.mediaWrap} aria-hidden="true">
          <img
            className={styles.media}
            src={imageUrl}
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
      )}

      <div className={styles.overlay}>
        <div className={`${styles.container} container`}>
          <div className={styles.content}>
            {/* Language Switcher REMOVED - only in Header now */}

            <SwitchTransition mode="out-in">
              <CSSTransition key={language} timeout={500} classNames="fade" nodeRef={nodeRef}>
                <div ref={nodeRef}>
                  <h1 className={variant === 'light' ? globalStyles.headlineDark : globalStyles.headlineLight}>
                    {resolvedHeadline}
                  </h1>
                  <p className={variant === 'light' ? globalStyles.subline : globalStyles.sublineLight}>
                    {resolvedSubline}
                  </p>
                </div>
              </CSSTransition>
            </SwitchTransition>

            <div className={styles.ctaContainer}>
              <button
                type="button"
                onClick={handleCTAClick}
                className={`${globalStyles.button} ${globalStyles['button--primary']} ${globalStyles['is-lg']} ${globalStyles['button--on-hero']}`}
                data-test="cta-hero"
              >
                {primaryCta}
              </button>
              <button
                type="button"
                onClick={handleCTAClick}
                className={`${globalStyles.button} ${globalStyles['button--secondary']} ${globalStyles['is-lg']} ${globalStyles['button--on-hero']}`}
                data-test="cta-hero-secondary"
              >
                {secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
