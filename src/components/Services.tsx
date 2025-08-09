import React from 'react';

import beratungImg from '../assets/beratung.jpeg';
import boxImg from '../assets/boxload.jpg';
import containerImg from '../assets/containerload.jpeg';
import servicesBg from '../assets/services-bg-savanna.jpg';
import householdImg from '../assets/warehouse.jpg';
import clothingImg from '../assets/worker-smiling.jpg';
import globalStyles from '../styles/components.module.css';
import {
  animations,
  createAOSProps,
} from '../utils/animations';
import styles from './Services.module.css';

type ServiceItem = {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
};

const services: ServiceItem[] = [
  {
    title: 'Paketversand',
    description: 'Kleine Sendungen sicher & schnell nach Afrika – ab 30 €.',
    imageUrl: boxImg,
    alt: 'Paketsendung nach Afrika',
  },
  {
    title: 'Containertransport',
    description: 'Großmengen & Paletten direkt im Container – ab 500 €.',
    imageUrl: containerImg,
    alt: 'Containertransport nach Afrika',
  },
  {
    title: 'Haushaltswaren & Elektronik',
    description: 'Waschmaschinen, Kühlschränke & mehr bequem verschicken – ab 150 €.',
    imageUrl: householdImg,
    alt: 'Haushaltsgeräte im Lager',
  },
  {
    title: 'Kleidung & Textilien',
    description: 'Mode & Stoffe in jede Ecke Kenias – ab 50 €.',
    imageUrl: clothingImg,
    alt: 'Kleidungspakete für Afrika',
  },
];

const Services: React.FC = () => {
  const handleServiceClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="section section--alt">
      {/* Full‑bleed Hintergrundbild (dekorativ) */}
      <div className={styles.bgWrap} aria-hidden="true">
        <img
          src={servicesBg}
          alt=""
          className={styles.bgImg}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="container">
        {/* Region statt verschachteltem <section> */}
        <div className={styles.services} role="region" aria-label="Unsere Services">
          <header className={styles.header} {...createAOSProps(animations.fadeUp())}>
            <h2 className={styles.sectionTitle}>Unsere Services</h2>
            <p className={styles.subtitle}>
              Von kleinen Paketen bis zu ganzen Containern – wir bringen alles sicher nach Kenia.
            </p>
          </header>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <button
                key={service.title}
                className={`${styles.serviceCard} ${globalStyles.cardInteractive}`}
                onClick={handleServiceClick}
                type="button"
                aria-label={`Mehr über ${service.title} erfahren`}
                {...createAOSProps(animations.staggered(index, 200, 150))}
              >
                <div
                  className={styles.cardBackground}
                  style={{ backgroundImage: `url(${service.imageUrl})` }}
                  aria-hidden="true"
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>
                  <div className={styles.cardAction}>
                    <span className={styles.actionText}>Mehr erfahren</span>
                    <span className={styles.actionArrow}>→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div
            className={styles.contactPrompt}
            {...createAOSProps(animations.fadeUp(300))}
          >
            <p className={styles.whatsappPrompt}>Nicht sicher, ob dein Paket geht?</p>
            <a
              href="https://wa.me/491234567890"
              target="_blank"
              rel="noopener noreferrer"
              className={`${globalStyles.buttonSecondary} ${styles.whatsappButton}`}
            >
              Jetzt WhatsApp schreiben
            </a>
          </div>

          <div
            className={styles.ctaSection}
            {...createAOSProps(animations.fadeUp(400))}
          >
            <div className={styles.ctaCard}>
              <img
                src={beratungImg}
                alt="Persönliche Beratung für Ihren Versand"
                className={styles.ctaImage}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.ctaTextBlock}>
                <h3 className={styles.ctaTitle}>Individuelle Beratung für Ihren Versand</h3>
                <p className={styles.ctaDescription}>
                  Unser erfahrenes Team hilft Ihnen persönlich – per Telefon, WhatsApp oder E‑Mail.
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className={`${globalStyles.buttonSecondary} ${styles.ctaButtonLarge}`}
                  aria-label="Zur kostenlosen Beratung"
                  type="button"
                >
                  Kostenlose Beratung
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
