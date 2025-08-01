// src/components/TrustBox.tsx
import React from 'react';

import global from '../styles/GlobalPolish.module.css';
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
    <section className={`${styles.trust} section--light`} data-aos="fade-up">
      <div className="container">
        <h2 className={global.headline}>{headline}</h2>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={i} className={`${global.card} ${styles.card}`}>
              {item.icon && <span className={global.iconBox}>{item.icon}</span>}
              <h3 className={global.subline}>{item.title}</h3>
              <p className={global.textMuted}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
