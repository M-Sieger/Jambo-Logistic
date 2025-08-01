// src/components/AboutBox.tsx
import React from 'react';

import styles from '../styles/AboutBox.module.css';

type AboutBoxProps = {
  headline: string;
  paragraphs: string[];
  imageUrl?: string;
};

export default function AboutBox({ headline, paragraphs, imageUrl }: AboutBoxProps) {
  return (
    <section className={styles.about} id="about">
      <div className={styles.content}>
        <h2>{headline}</h2>
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
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
