// src/components/ProcessSteps.tsx
import React from 'react';

// 🖼 Schrittbilder (lokal aus /assets)
import step1Image from '../assets/step1-anfrage.jpg';
import step2Image from '../assets/step2-abholung.jpg';
import step3Image from '../assets/step3-container.jpg';
import step4Image from '../assets/step4-nairobi.jpg';
// 🎨 CSS-Modul für komponentenspezifisches Styling
import styles from './ProcessSteps.module.css';

// 🔹 Typen für Props
type Step = {
  icon: string;       // z. B. "📩" (optional, falls du eigene Icons nutzt)
  title: string;      // z. B. "Anfrage senden"
  description: string;// z. B. "Du stellst eine Anfrage ... "
};

type ProcessStepsProps = {
  steps: Step[];      // Erwartet 3–4 Steps (mehr möglich – Bilder rotieren)
};

// 🖼 Bild- & Icon-Arrays (werden zyklisch verwendet, falls steps > 4)
const stepImages = [step1Image, step2Image, step3Image, step4Image];
const stepIcons   = ['📩', '🚚', '🚢', '📍'];

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  // Guard: wenn keine Steps übergeben wurden, Komponente nicht rendern
  if (!steps || steps.length === 0) return null;

  // A11y: Überschrift-ID, damit Section via aria-labelledby referenziert
  const headingId = 'process-heading';

  return (
    /**
     * 🌍 EINZIGE Section mit id="process"
     * -> WICHTIG: Diese ID muss 1:1 zum Header-Navi-Eintrag passen,
     *    damit Active-Link-Detection sauber funktioniert.
     *
     * A11y:
     * - role="region" + aria-labelledby → Screenreader bekommen eine benannte Region.
     *
     * UX:
     * - Für Smooth-Scroll & Sticky-Header:
     *   Gib dieser Section (oder global per ID) in CSS:
     *   #process { scroll-margin-top: 96px; }  // Headerhöhe bei euch
     */
    <section
      id="process"
      role="region"
      aria-labelledby={headingId}
      className="section" // behält dein globales Layout-Spacing/Wrapper
      data-section="process"
    >
      <div className="container">
        {/* Komponentenspezifischer Wrapper (kein weiteres <section>, um Semantik flach zu halten) */}
        <div className={styles.steps} aria-label="So einfach funktioniert's">
          {/* Überschrift */}
          <h2 id={headingId} className={styles.headline}>
            So einfach funktioniert&apos;s
          </h2>

          {/* Timeline mit allen Steps */}
          <div className={styles.timeline}>
            {steps.map((step, i) => {
              // Robuste Auswahl von Icon/Bild (zyklisch, falls mehr als 4 Steps)
              const icon   = step.icon ?? stepIcons[i % stepIcons.length];
              const imgSrc = stepImages[i % stepImages.length];

              return (
                <div
                  key={`${step.title}-${i}`} // stabilere Key als nur i
                  className={styles.timelineItem}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  {/* Marker-Spalte links (rein dekorativ) */}
                  <div className={styles.marker} aria-hidden="true">
                    <span className={styles.dot} />
                    {i < steps.length - 1 && <span className={styles.line} />}
                  </div>

                  {/* Step-Inhalt */}
                  <div className={styles.cardContent}>
                    {/* Emoji/Icon (dekorativ) */}
                    <div className={styles.cardIcon} aria-hidden="true">
                      {icon}
                    </div>

                    {/* Step-Bild */}
                    <div className={styles.imageContainer}>
                      <img
                        src={imgSrc}
                        alt={step.title ? `${step.title} – Illustration` : 'Process Illustration'}
                        className={styles.stepImage}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Titel + Beschreibung */}
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardText}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA-Bereich */}
          <div className={styles.ctaContainer} data-aos="zoom-in" data-aos-delay="200">
            <div className={styles.ctaContent}>
              <h3>Bereit für deine erste Lieferung?</h3>
              <p>
                Hol dir noch heute dein unverbindliches Angebot und starte deine
                Reise mit Jambo Logistics.
              </p>
              <div className={styles.buttonGroup}>
                {/* Interne Anker-Navigation bleibt, Header berücksichtigt scroll-margin-top */}
                <a href="#contact" className={styles.buttonPrimary}>
                  Jetzt anfragen
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* /steps wrapper */}
      </div>
      {/* /container */}
    </section>
  );
};

export default ProcessSteps;
