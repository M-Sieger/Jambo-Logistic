// ---------------------------------------------------------
// Datei: ProcessSteps.tsx
// Zweck: 3-Schritte-Prozess-Visualisierung für Ablauferklärung
// Besonderheiten:
// - Zeigt 3 Steps mit Bild, Nummer-Badge, Titel, Beschreibung
// - Pfeil-Connector zwischen Steps (nur Desktop-Ansicht)
// - Aspect-Ratio für Bilder (object-fit: cover) für CLS-freies Layout
// - Token-basiertes Styling (CSS Custom Properties aus variables.css)
// Stand: 30.10.2025
// ---------------------------------------------------------

import React from 'react';

import styles from './ProcessSteps.module.css';

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <section className={styles.processSection} data-theme="light">
      <h2 className={styles.sectionTitle}>So einfach funktioniert&apos;s</h2>
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => {
          const hasNext = index < steps.length - 1;
          return (
            <div
              key={index}
              className={styles.stepCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={step.icon}
                  alt={step.title}
                  className={styles.stepImage}
                />
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {/* Desktop‑Pfeil zwischen Steps */}
              {hasNext && <div className={styles.arrow} aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcessSteps;
