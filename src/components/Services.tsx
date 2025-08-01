import React from 'react';

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
    <section className="services-section">
      <div className="container">
        <section className={styles.services} id="services">
          <h2 className="headline-xl">Unsere Versandarten</h2>
          <div className={styles.grid}>
            {services.map((item, i) => (
              <div
                className={styles.card}
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className={styles.icon}>{item.icon}</div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
