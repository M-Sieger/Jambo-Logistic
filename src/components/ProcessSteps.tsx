import React from 'react';

// Für den dritten Schritt nutzen wir das Containerbild (step3), da es die
// Verladung & den Versand repräsentiert.
import step1Image from '../assets/step1-anfrage.jpg';
import step2Image from '../assets/step2-abholung.jpg';
import step3Image from '../assets/step3-container.jpg';
// Viertes Bild für die Ankunft & Übergabe in Nairobi
import step4Image from '../assets/step4-nairobi.jpg';
import styles from './ProcessSteps.module.css';

/**
 * Typdefinition für einen einzelnen Prozessschritt, der vom Eltern‑
 * komponenten übergeben wird. Neben Titel und Beschreibung kann
 * optional ein Icon angegeben werden, damit bestehende Datenstrukturen
 * kompatibel bleiben.
 */
type Step = {
  icon: string;
  title: string;
  description: string;
};

/**
 * Props für die ProcessSteps‑Komponente. Erwartet ein Array von
 * Schrittdefinitionen. Die Länge des Arrays sollte der Anzahl der
 * importierten Bilder entsprechen.
 */
type ProcessStepsProps = {
  steps: Step[];
};

// Wir ordnen die importierten Bilder und Emoji‑Icons den einzelnen
// Schritten zu. Die `stepIcons` nutzen gängige Transportsymbole, um
// jede Phase visuell zu unterstützen, ohne externe Assets zu laden.
// Reihenfolge: Anfrage (Briefumschlag), Abholung oder Anlieferung
// (Lieferwagen), Verladung & Versand (Schiff), Ankunft & Übergabe
// (Standort‑Pin).
const stepImages = [step1Image, step2Image, step3Image, step4Image];
const stepIcons = ['📩', '🚚', '🚢', '📍'];

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <section id="steps" className={styles.steps}>
      <h2 className={styles.headline}>So einfach funktioniert's</h2>

      <div className={styles.timeline}>
        {steps.map((step, i) => (
          <div
            key={i}
            className={styles.timelineItem}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            {/* Marker‑Spalte mit Punkt und Verbindungslinie */}
            <div className={styles.marker} aria-hidden="true">
              <span className={styles.dot}></span>
              {i < steps.length - 1 && <span className={styles.line}></span>}
            </div>
            {/* Inhaltsspalte */}
            <div className={styles.cardContent}>
              {/* Optionales Emoji‑Icon für die Phase */}
              <div className={styles.cardIcon} aria-hidden="true">
                {stepIcons[i % stepIcons.length]}
              </div>
              <div className={styles.imageContainer}>
                <img
                  src={stepImages[i]}
                  alt={`${step.title} Bild`}
                  className={styles.stepImage}
                />
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardText}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call‑to‑Action – ermutigt Nutzer:innen zur ersten Lieferung */}
      <div
        className={styles.ctaContainer}
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className={styles.ctaContent}>
          <h3>Bereit für deine erste Lieferung?</h3>
          <p>
            Hol dir noch heute dein unverbindliches Angebot und starte deine
            Reise mit Jambo Logistics.
          </p>
          <div className={styles.buttonGroup}>
            <a href="#contact" className={styles.buttonPrimary}>
              Jetzt anfragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
