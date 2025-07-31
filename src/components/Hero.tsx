// src/components/Hero.tsx
import React from 'react';

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
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      data-aos="fade-in"
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>{headline}</h1>
          <p>{subline}</p>
          <button className={styles.cta} onClick={onCTAClick}>
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
