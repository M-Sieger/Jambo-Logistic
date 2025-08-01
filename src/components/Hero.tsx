// src/components/Hero.tsx
import React from 'react';

import global from '../styles/GlobalPolish.module.css';
import styles from '../styles/Hero.module.css';

type HeroProps = {
  headline: string;
  subline: string;
  ctaLabel: string;
  onCTAClick?: () => void;
  backgroundUrl?: string;
};

export default function Hero({
  headline,
  subline,
  ctaLabel,
  onCTAClick,
  backgroundUrl = '/assets/container-ship.jpg',
}: HeroProps) {
  return (
    <section
      className={`${styles.hero} hero-section`}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      data-aos="fade-in"
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={global.headline}>{headline}</h1>
          <p className={global.subline}>{subline}</p>
          <button className={global.button} onClick={onCTAClick}>
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
