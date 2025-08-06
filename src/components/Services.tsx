import React from 'react';

import beratungImg from '../assets/beratung.jpeg';
import globalStyles from '../styles/components.module.css';
import {
  animations,
  createAOSProps,
} from '../utils/animations';
import styles from './Services.module.css';

// Definiere hier die vier Versandarten mit aussagekräftigen Texten und Realbildern
const services = [
  {
    title: "Paketversand",
    description: "Kleine Sendungen sicher & schnell nach Afrika – ab 30 €.",
    imageUrl: "/src/assets/boxload.jpg",
    alt: "Paketsendung nach Afrika",
  },
  {
    title: "Containertransport",
    description: "Großmengen & Paletten direkt im Container – ab 500 €.",
    imageUrl: "/src/assets/containerload.jpeg",
    alt: "Containertransport nach Afrika",
  },
  {
    title: "Haushaltswaren & Elektronik",
    description: "Waschmaschinen, Kühlschränke & mehr bequem verschicken – ab 150 €.",
    imageUrl: "/src/assets/warehouse.jpg",
    alt: "Haushaltsgeräte im Lager",
  },
  {
    title: "Kleidung & Textilien",
    description: "Mode & Stoffe in jede Ecke Kenias – ab 50 €.",
    imageUrl: "/src/assets/worker-smiling.jpg",
    alt: "Kleidungspakete für Afrika",
  },
];

const Services: React.FC = () => {
  // Klick-Handler – optionaler Scroll zum Kontaktbereich
  const handleServiceClick = (service: any) => {
    const contactElement = document.getElementById("contact");
    contactElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className={`${styles.services} section`}>
      {/* Hintergrundbild, etwas kräftiger */}
      <div className={styles.backgroundContainer}>
        <img
          src="/src/assets/services-bg-savanna.jpg"
          alt="Hintergrund Savanne"
          className={styles.backgroundImage}
          loading="lazy"
        />
      </div>

      <div className={`${styles.container} container`}>
        {/* Überschrift & Untertitel */}
        <div className={styles.header} {...createAOSProps(animations.fadeUp())}>
          <h2 className={styles.sectionTitle}>Unsere Services</h2>
          <p className={styles.subtitle}>
            Von kleinen Paketen bis zu ganzen Containern – wir bringen alles sicher nach Kenia.
          </p>
        </div>

        {/* Grid der Versandarten */}
        <div className={`${styles.servicesGrid}`}>
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`${styles.serviceCard} ${globalStyles.cardInteractive}`}
              onClick={() => handleServiceClick(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
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

        {/* Zusatz-CTA für unsichere Kunden */}
        <div className={styles.contactPrompt} {...createAOSProps(animations.fadeUp(300))}>
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

        {/* CTA-Karte am Ende */}
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
                Unser erfahrenes Team hilft Ihnen persönlich – per Telefon, WhatsApp oder E‑Mail.
              </p>
              <button
                onClick={() => {
                  const contactElement = document.getElementById("contact");
                  contactElement?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
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
