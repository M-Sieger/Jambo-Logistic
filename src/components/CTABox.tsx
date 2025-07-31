// src/components/CTABox.tsx
import React from 'react';

import styles from '../styles/CTABox.module.css';

type CTABoxProps = {
  whatsappUrl: string;
  email: string;
  ctaLabel?: string;
  onCTAClick?: () => void;
};

export default function CTABox({
  whatsappUrl,
  email,
  ctaLabel = 'Jetzt Anfrage starten',
  onCTAClick,
}: CTABoxProps) {
  return (
    <section className={styles.ctaBox} data-aos="fade-up">
      <h2 className={styles.headline}>Schnell & persönlich anfragen</h2>
      <p className={styles.subline}>In unter 1 Minute per WhatsApp oder E-Mail Kontakt aufnehmen.</p>
      <div className={styles.buttons}>
        <a href={whatsappUrl} className={styles.btn} target="_blank" rel="noopener noreferrer">
          WhatsApp starten
        </a>
        <a href={`mailto:${email}`} className={styles.btnAlt}>
          E-Mail schreiben
        </a>
        {onCTAClick && (
          <button onClick={onCTAClick} className={styles.btnScroll}>
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  );
}
