// ---------------------------------------------------------
// Datei: AboutBox.tsx
// Zweck: "Über uns" Section mit Company-Story und Features
// Besonderheiten:
// - Hero-Bild mit Fallback bei Ladefehler
// - Feature-Highlights (4 Icons mit Beschreibungen)
// - CTA-Button scrollt zu Services-Section
// - Globales Layout (.section + .container) außerhalb des Moduls
// - Multi-Language Support via useLanguage() Hook
// Stand: 05.11.2025
// ---------------------------------------------------------

import React from 'react';

import aboutImg from '../assets/aboutsection1.jpeg';
import fallbackImg from '../assets/boxload.jpg';
import { useLanguage } from '../contexts/language-context';
import styles from './AboutBox.module.css';

const AboutBox: React.FC = () => {
  const { translations: t } = useLanguage();

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
              {t.about.headline}
            </h2>

            <p
              className={styles.missionText}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t.about.mission}
            </p>

            {/* Werte als semantische Liste */}
            <ul
              className={styles.valuesContainer}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <li className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">🌍</div>
                <h3 className={styles.valueTitle}>{t.about.values.global.title}</h3>
                <p className={styles.valueText}>
                  {t.about.values.global.text}
                </p>
              </li>

              <li className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">⚙️</div>
                <h3 className={styles.valueTitle}>{t.about.values.efficient.title}</h3>
                <p className={styles.valueText}>
                  {t.about.values.efficient.text}
                </p>
              </li>

              <li className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">🤝</div>
                <h3 className={styles.valueTitle}>{t.about.values.personal.title}</h3>
                <p className={styles.valueText}>
                  {t.about.values.personal.text}
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
                aria-label={t.about.cta}
              >
                {t.about.cta}
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
