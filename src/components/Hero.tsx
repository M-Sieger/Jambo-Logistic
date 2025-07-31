// src/components/Hero.tsx
import React from 'react';

import styles from '../styles/Hero.module.css';

type HeroProps = {
  headline: string;
  subline: string;
  ctaText: string;
  imageUrl: string;
  onCTAClick?: () => void;
};

export default function Hero({
  headline,
  subline,
  ctaText,
  imageUrl,
  onCTAClick,
}: HeroProps) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subline}>{subline}</p>
          <button className={styles.cta} onClick={onCTAClick}>
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
