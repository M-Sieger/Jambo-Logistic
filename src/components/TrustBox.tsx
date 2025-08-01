// src/components/TrustBox.tsx
import React from 'react';

import styles from '../styles/TrustBox.module.css';

type TrustItem = {
  icon?: string;
  title: string;
  description: string;
};

type TrustBoxProps = {
  headline: string;
  items: TrustItem[];
};

export default function TrustBox({ headline, items }: TrustBoxProps) {
  return (
    <section className={styles.trust} data-aos="fade-up">
      <h2>{headline}</h2>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.card}>
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
