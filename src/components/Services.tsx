import React from 'react';

import globalStyles from '../styles/components.module.css';
import {
  animations,
  createAOSProps,
} from '../utils/animations';
import styles from './Services.module.css';

interface Service {
  title: string;
  description: string;
  iconUrl?: string; // ✅ für SVG-Icons
  bgClass?: string;
  imageUrl?: string;
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
  const handleServiceClick = (service: Service) => {
    if (onServiceClick) {
      onServiceClick(service);
    } else {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getGridClass = () => {
    switch (columns) {
      case 1:
        return globalStyles.gridCols1;
      case 2:
        return globalStyles.gridCols2;
      case 3:
        return globalStyles.gridCols3;
      case 4:
        return globalStyles.gridCols4;
      default:
        return globalStyles.gridCols3;
    }
  };

  return (
    <section id="services" className={`${styles.services} ${styles[variant]} ${className} section`}>
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
        <div className={styles.header} {...createAOSProps(animations.fadeUp())}>
          <h2 className={globalStyles.sectionTitle}>Unsere Services</h2>
          <p className={styles.subtitle}>
            Von kleinen Paketen bis zu ganzen Containern – wir bringen alles sicher nach Kenia.
          </p>
        </div>

        <div className={`${styles.servicesGrid} ${getGridClass()}`}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${styles.serviceCard} ${globalStyles.cardInteractive} ${
                service.bgClass ? styles[service.bgClass] : ''
              }`}
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
              {service.imageUrl && (
                <div className={styles.cardImage}>
                  <img src={service.imageUrl} alt={service.title} loading="lazy" />
                </div>
              )}

              <div className={styles.cardContent}>
                {service.iconUrl && (
                  <div className={styles.cardIcon}>
                    <img
                      src={service.iconUrl}
                      alt={`${service.title} Icon`}
                      className={styles.iconImage}
                      loading="lazy"
                    />
                  </div>
                )}

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

        <div className={styles.ctaSection} {...createAOSProps(animations.fadeUp(400))}>
          <p className={styles.ctaText}>Nicht sicher, welcher Service der richtige für Sie ist?</p>
          <button
            onClick={() => {
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`${globalStyles.buttonSecondary} ${styles.ctaButton}`}
          >
            Kostenlose Beratung
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
