import React from 'react';

import styles from '../styles/CTABox.module.css';

type CTABoxProps = {
  whatsappUrl: string;
  email: string;
  ctaLabel: string;
  onCTAClick?: () => void;
};

export default function CTABox({ whatsappUrl, email, ctaLabel, onCTAClick }: CTABoxProps) {
  return (
    <section className={`contact-section`}>
      <div className={`container ${styles.ctaBox}`} id="cta">
        <h2 className={styles.headline}>Schnell & persönlich anfragen</h2>
        <p className={styles.subline}>
          In unter 1 Minute per WhatsApp oder E‑Mail Kontakt aufnehmen.
        </p>
        <div className={styles.buttons}>
          <a href={whatsappUrl} className={styles.primaryButton} onClick={onCTAClick}>
            WhatsApp starten
          </a>
          <a href={`mailto:${email}`} className={styles.secondaryButton}>
            E‑Mail schreiben
          </a>
        </div>
        <p className={styles.link}>
          <a href="#contact">Unverbindlich beraten lassen</a>
        </p>
      </div>
    </section>
  );
}
