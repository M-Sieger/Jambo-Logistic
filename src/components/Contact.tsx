// src/components/Contact.tsx
import React from 'react';

import styles from '../styles/Contact.module.css';

type ContactProps = {
  headline?: string;
  whatsappUrl: string;
  email: string;
};

export default function Contact({ headline = 'Kontakt', whatsappUrl, email }: ContactProps) {
  return (
    <section className={styles.contact} id="contact">
      <h2>{headline}</h2>
      <p>Wir sind für dich da – persönlich & schnell.</p>
      <div className={styles.actions}>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.button}>
          WhatsApp schreiben
        </a>
        <a href={`mailto:${email}`} className={styles.buttonOutline}>
          E-Mail senden
        </a>
      </div>
    </section>
  );
}
