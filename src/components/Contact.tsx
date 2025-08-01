// src/components/Contact.tsx
import React from 'react';

import styles from '../styles/Contact.module.css';
import global from '../styles/GlobalPolish.module.css';

type ContactProps = {
  headline?: string;
  whatsappUrl: string;
  email: string;
};

export default function Contact({ headline = 'Kontakt', whatsappUrl, email }: ContactProps) {
  return (
    <section className={`${styles.contact} section--dark`} id="contact">
      <h2 className={global.headline}>{headline}</h2>
      <p className={global.subline}>Wir sind für dich da – persönlich & schnell.</p>
      <div className={styles.actions}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={global.button}
        >
          WhatsApp schreiben
        </a>
        <a href={`mailto:${email}`} className={global['button--outline']}>
          E-Mail senden
        </a>
      </div>
    </section>
  );
}
