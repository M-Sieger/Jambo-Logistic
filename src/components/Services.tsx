// src/components/Services.tsx
import React from 'react';

import global from '../styles/GlobalPolish.module.css';
import styles from '../styles/Services.module.css';

type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

type ServicesProps = {
  services: ServiceItem[];
};

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className={`section--light ${styles.services}`}>
      <h2 className={global.headline}>Unsere Versandarten</h2>
      <div className={styles.grid}>
        {services.map((item, i) => (
          <div
            className={`${global.card} ${styles.card}`}
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className={global.iconBox}>{item.icon}</div>
            <h3 className={global.subline}>{item.title}</h3>
            <p className={global.textMuted}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
