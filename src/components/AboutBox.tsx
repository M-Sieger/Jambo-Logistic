import React from 'react';

import styles from './AboutBox.module.css';

const AboutBox: React.FC = () => {
  // Scroll-Funktion für CTA-Button
  const scrollToServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.aboutBox}>
      <div className={styles.content}>
        {/* Headline */}
        <h2 className={styles.headline} data-aos="fade-up">
          Unsere Mission: Verbindungen schaffen, die Welten bewegen.
        </h2>

        {/* Mission-Text */}
        <p className={styles.missionText} data-aos="fade-up" data-aos-delay="100">
          Wir bringen Menschen zusammen – mit smarten, bezahlbaren Versandlösungen zwischen Europa und Afrika. 
          Verlässlich, schnell und mit Herz.
        </p>

        {/* 3 Werte-Boxen */}
        <div className={styles.valuesContainer} data-aos="fade-up" data-aos-delay="200">
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🌍</div>
            <h3 className={styles.valueTitle}>Global verbunden</h3>
            <p className={styles.valueText}>
              Wir verbinden Deutschland und Kenia mit einem starken Netzwerk aus lokalen Partnern und internationaler Expertise.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>⚙️</div>
            <h3 className={styles.valueTitle}>Effizient organisiert</h3>
            <p className={styles.valueText}>
              Modernste Logistik-Technologie und optimierte Prozesse sorgen für schnelle und kostengünstige Abwicklung.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🤝</div>
            <h3 className={styles.valueTitle}>Persönlich betreut</h3>
            <p className={styles.valueText}>
              Jeder Kunde erhält einen persönlichen Ansprechpartner und individuelle Beratung für seine Versandanforderungen.
            </p>
          </div>
        </div>

        {/* CTA-Button */}
        <div className={styles.ctaContainer} data-aos="fade-up" data-aos-delay="300">
          <button 
            className={styles.ctaButton}
            onClick={scrollToServices}
          >
            Unsere Leistungen entdecken
          </button>
        </div>
      </div>

      {/* Bild */}
      <div className={styles.image} data-aos="fade-left" data-aos-delay="200">
        <img 
          src="/assets/aboutsection1.jpeg" 
          alt="Warehouse in Nairobi - Jumbo Logistics Standort"
          className={styles.imageElement}
          onError={(e) => {
            // Fallback auf boxload.jpg falls warehouse-nairobi.jpg nicht existiert
            const target = e.target as HTMLImageElement;
            target.src = "/assets/boxload.jpg";
          }}
        />
      </div>
    </div>
  );
};

export default AboutBox;
