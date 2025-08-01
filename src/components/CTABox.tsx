// src/components/CTABox.tsx
import React from 'react';

import styles from '../styles/CTABox.module.css';
import global from '../styles/GlobalPolish.module.css';

type CTABoxProps = {
  whatsappUrl: string;
  email: string;
  ctaLabel: string;
  onCTAClick?: () => void;
};

export default function CTABox({ whatsappUrl, email, ctaLabel, onCTAClick }: CTABoxProps) {
  return (
    <section className="contact-section section--neutral">
      <div className={`container ${styles.ctaBox}`} id="cta">
        <h2 className={global.headline}>Schnell & persönlich anfragen</h2>
        <p className={global.subline}>
          In unter 1 Minute per WhatsApp oder E‑Mail Kontakt aufnehmen.
        </p>
        <div className={styles.buttons}>
          <a href={whatsappUrl} className={global.button} onClick={onCTAClick}>
            WhatsApp starten
          </a>
          <a href={`mailto:${email}`} className={global['button--outline']}>
            E‑Mail schreiben
          </a>
        </div>
        <p className={styles.link}>
          <a href="#contact">{ctaLabel}</a>
        </p>
      </div>
    </section>
  );
}
