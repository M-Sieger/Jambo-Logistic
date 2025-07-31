// src/components/Services.tsx
import React from 'react';

import styles from '../styles/Services.module.css';

type ServiceItem = {
  title: string;
  description: string;
  icon: string; // emoji oder Pfad zu Icon
};

type ServicesProps = {
  services: ServiceItem[];
};

export default function Services({ services }: ServicesProps) {
  return (
    <section className={styles.services} id="services">
      <h2 className="headline-xl">Unsere Versandarten</h2>
      <div className={styles.grid}>
        {services.map((item, i) => (
          <div className={styles.card} key={i} data-aos="fade-up" data-aos-delay={i * 100}>
            <div className={styles.icon}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
