import React from 'react';

// Schrittbilder
import step1Image from '../assets/step1-anfrage.jpg';
import step2Image from '../assets/step2-abholung.jpg';
import step3Image from '../assets/step3-container.jpg';
import step4Image from '../assets/step4-nairobi.jpg';
import styles from './ProcessSteps.module.css';

type Step = {
  icon: string;
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: Step[];
};

// Bild- & Emoji-Arrays für die Steps
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
            {/* Marker-Spalte (ohne Flaggenhintergrund) */}
            <div className={styles.marker} aria-hidden="true">
              <span className={styles.dot}></span>
              {i < steps.length - 1 && <span className={styles.line}></span>}
            </div>

            {/* Inhalt */}
            <div className={styles.cardContent}>
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

      {/* CTA */}
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
