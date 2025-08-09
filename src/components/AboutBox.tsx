import React from 'react';

import aboutImg from '../assets/aboutsection1.jpeg';   // Hero-Bild (About)
import fallbackImg
  from '../assets/boxload.jpg';       // Fallback-Bild bei Ladefehler
import styles from './AboutBox.module.css';

/**
 * AboutBox – "Über uns" / Mission-Block
 * B1-Regel: Der äußere Layout-Rahmen kommt NICHT aus dem Modul,
 * sondern aus den globalen Utilities (.section + .container).
 * Das Modul (styles.*) stylt NUR das Innenleben.
 */
const AboutBox: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // 🌍 Globaler Section-Rahmen (gleichmäßiger vertical rhythm)
    <section id="about" className="section section--alt">
      <div className="container">
        {/* 🎨 Komponenten-Wrapper: nur internes Grid/Spacing, KEIN globales Padding */}
        <section className={styles.aboutBox} aria-label="Über uns – Mission & Werte">
          {/* Textspalte */}
          <header className={styles.content}>
            <h2 className={styles.headline} data-aos="fade-up">
              Unsere Mission: Verbindungen schaffen, die Welten bewegen.
            </h2>

            <p
              className={styles.missionText}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Wir bringen Menschen zusammen – mit smarten, bezahlbaren
              Versandlösungen zwischen Europa und Afrika. Verlässlich, schnell
              und mit Herz.
            </p>

            {/* Werte als semantische Liste */}
            <ul
              className={styles.valuesContainer}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <li className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">🌍</div>
                <h3 className={styles.valueTitle}>Global verbunden</h3>
                <p className={styles.valueText}>
                  Wir verbinden Deutschland und Kenia mit einem starken Netzwerk
                  aus lokalen Partnern und internationaler Expertise.
                </p>
              </li>

              <li className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">⚙️</div>
                <h3 className={styles.valueTitle}>Effizient organisiert</h3>
                <p className={styles.valueText}>
                  Modernste Logistik‑Technologie und optimierte Prozesse sorgen
                  für schnelle und kostengünstige Abwicklung.
                </p>
              </li>

              <li className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">🤝</div>
                <h3 className={styles.valueTitle}>Persönlich betreut</h3>
                <p className={styles.valueText}>
                  Jeder Kunde erhält einen persönlichen Ansprechpartner und
                  individuelle Beratung für seine Versandanforderungen.
                </p>
              </li>
            </ul>

            {/* CTA */}
            <div
              className={styles.ctaContainer}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <button
                type="button"
                className={styles.ctaButton}
                onClick={scrollToServices}
                aria-label="Zu unseren Leistungen scrollen"
              >
                Unsere Leistungen entdecken
              </button>
            </div>
          </header>

          {/* Bildspalte – dekorativ, also leeres alt + aria-hidden */}
          <div
            className={styles.image}
            data-aos="fade-left"
            data-aos-delay="200"
            aria-hidden="true"
          >
            <img
              src={aboutImg}
              alt=""
              className={styles.imageElement}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = fallbackImg;
              }}
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutBox;
