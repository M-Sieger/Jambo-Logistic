import React from 'react';

import globalStyles from '../styles/components.module.css';
import {
  animations,
  createAOSProps,
} from '../utils/animations';
import styles from './Services.module.css';

// Interface für einzelne Service-Einträge
interface Service {
  title: string;
  description: string;
  iconType: 'box' | 'container' | 'car';
  imageUrl: string; // Required for native photo backgrounds
}

// Props für die komplette Komponente
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
  // Scrollt bei Klick zum Kontaktbereich oder feuert Callback
  const handleServiceClick = (service: Service) => {
    if (onServiceClick) {
      onServiceClick(service);
    } else {
      const contactElement = document.getElementById('contact');
      contactElement?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamische Grid-Klassen (1–4 Spalten)
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

  // Liefert Icon-Pfad basierend auf Typ
  const getIconPath = (iconType: 'box' | 'container' | 'car') => {
    const iconMap = {
      box: '/src/assets/icons/parcel.png',
      container: '/src/assets/icons/container.png',
      car: '/src/assets/icons/vehicle.png',
    };

    return iconMap[iconType] ?? iconMap['box'];
  };

  return (
    <section
      id="services"
      className={`${styles.services} ${styles[variant]} ${className} section`}
    >
      {/* Section-wide background image - now properly visible */}
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
        {/* Section-Header */}
        <div className={styles.header} {...createAOSProps(animations.fadeUp())}>
          <h2 className={globalStyles.sectionTitle}>Unsere Services</h2>
          <p className={styles.subtitle}>
            Von kleinen Paketen bis zu ganzen Containern – wir bringen alles sicher nach Kenia.
          </p>
        </div>

        {/* GRID: Services mit nativen Foto-Hintergründen und sauberen Icon-Overlays */}
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
              {/* Native photo background */}
              <div 
                className={styles.cardBackground}
                style={{ backgroundImage: `url(${service.imageUrl})` }}
              />
              
              {/* Content overlay */}
              <div className={styles.cardContent}>
                {/* Clean icon overlay - no wrapper */}
                <img
                  src={getIconPath(service.iconType)}
                  alt={`${service.iconType} icon`}
                  className={styles.icon}
                  loading="lazy"
                />

                {/* Titel + Beschreibung */}
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>

                {/* Call-to-Action → Text + Pfeil */}
                <div className={styles.cardAction}>
                  <span className={styles.actionText}>Mehr erfahren</span>
                  <span className={styles.actionArrow}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA-Bereich unterhalb der Cards */}
        <div className={styles.ctaSection} {...createAOSProps(animations.fadeUp(400))}>
          <p className={styles.ctaText}>Nicht sicher, welcher Service der richtige für Sie ist?</p>
          <button
            onClick={() => {
              const contactElement = document.getElementById('contact');
              contactElement?.scrollIntoView({ behavior: 'smooth' });
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
