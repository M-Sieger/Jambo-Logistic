import React from 'react';

// 📷 Asset für CTA-Bereich
import beratungImg from '../assets/beratung.jpeg';
// 🧩 Globale & lokale Styles
import globalStyles from '../styles/components.module.css';
// 🎞️ Animation Utils
import {
  animations,
  createAOSProps,
} from '../utils/animations';
import styles from './Services.module.css';

// 📦 Typdefinitionen
interface Service {
  title: string;
  description: string;
  imageUrl: string;
}

interface ServicesProps {
  services: Service[];
  variant?: 'default' | 'compact';
  columns?: 1 | 2 | 3 | 4;
  onServiceClick?: (service: Service) => void;
  className?: string;
  backgroundImage?: string;
}

const Services: React.FC<ServicesProps> = ({
  services,
  variant = 'default',
  columns = 3,
  onServiceClick,
  className = '',
  backgroundImage,
}) => {
  // 🔁 Klick auf Servicekarte → entweder Callback oder Scroll zu #contact
  const handleServiceClick = (service: Service) => {
    if (onServiceClick) {
      onServiceClick(service);
    } else {
      const contactElement = document.getElementById('contact');
      contactElement?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 🧱 Dynamisches Grid je nach columns
  const getGridClass = () => {
    switch (columns) {
      case 1: return globalStyles.gridCols1;
      case 2: return globalStyles.gridCols2;
      case 3: return globalStyles.gridCols3;
      case 4: return globalStyles.gridCols4;
      default: return globalStyles.gridCols3;
    }
  };

  return (
    <section
      id="services"
      className={`${styles.services} ${styles[variant]} ${className} section`}
    >
      {/* 🌄 Optionaler Hintergrund */}
      {backgroundImage && (
        <div className={styles.backgroundContainer}>
          <img
            src={backgroundImage}
            alt="Service Hintergrund"
            className={styles.backgroundImage}
            loading="lazy"
          />
        </div>
      )}

      <div className={`${styles.container} container`}>
        {/* 🔠 Titel & Untertitel (mit localStyles gesteuert) */}
        <div className={styles.header} {...createAOSProps(animations.fadeUp())}>
          <h2 className={styles.sectionTitle}>Unsere Services</h2>
          <p className={styles.subtitle}>
            Von kleinen Paketen bis zu ganzen Containern – wir bringen alles sicher nach Kenia.
          </p>
        </div>

        {/* 📦 Grid mit Services */}
        <div className={`${styles.servicesGrid} ${getGridClass()}`}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${styles.serviceCard} ${globalStyles.cardInteractive}`}
              onClick={() => handleServiceClick(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleServiceClick(service);
                }
              }}
              aria-label={`Mehr über ${service.title} erfahren`}
              {...createAOSProps(animations.staggered(index, 200, 150))}
            >
              <div
                className={styles.cardBackground}
                style={{ backgroundImage: `url(${service.imageUrl})` }}
              />

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <div className={styles.cardAction}>
                  <span className={styles.actionText}>Mehr erfahren</span>
                  <span className={styles.actionArrow}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🎯 CTA-Bereich mit Bild */}
        <section
          className={styles.ctaSection}
          {...createAOSProps(animations.fadeUp(400))}
        >
          <div className={styles.ctaCard}>
            <img
              src={beratungImg}
              alt="Persönliche Beratung für Ihren Versand"
              className={styles.ctaImage}
              loading="lazy"
            />
            <div className={styles.ctaTextBlock}>
              <h3 className={styles.ctaTitle}>
                Individuelle Beratung für Ihren Versand
              </h3>
              <p className={styles.ctaDescription}>
                Unser erfahrenes Team hilft Ihnen persönlich – per Telefon, WhatsApp oder E-Mail.
              </p>
              <button
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  contactElement?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className={`${globalStyles.buttonSecondary} ${styles.ctaButtonLarge}`}
                aria-label="Zur kostenlosen Beratung"
              >
                Kostenlose Beratung
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Services;
