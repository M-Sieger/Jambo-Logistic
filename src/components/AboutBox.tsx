// src/components/AboutBox.tsx
import React from 'react';

import styles from '../styles/AboutBox.module.css';
import global from '../styles/GlobalPolish.module.css';

type AboutBoxProps = {
  headline: string;
  paragraphs: string[];
  imageUrl?: string;
};

export default function AboutBox({ headline, paragraphs, imageUrl }: AboutBoxProps) {
  return (
    <section id="about" className={`about-section section--dark ${styles.about}`}>
      <h2 className={global.headline}>{headline}</h2>
      <div className={styles.content}>
        {paragraphs.map((text, i) => (
          <p key={i} className={global.subline}>
            {text}
          </p>
        ))}
      </div>
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt="Über uns" />
        </div>
      )}
    </section>
  );
}
