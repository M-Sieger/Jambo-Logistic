// src/components/ProcessSteps.tsx
import React from 'react';

import styles from './ProcessSteps.module.css';

// -----------------------------------------------------------------------------
// ProcessSteps
//
// Dieses Component zeigt eine Reihe von Schritten zur Erklärung des Ablaufs.
// Es übernimmt eine Liste von Schritten via Props und rendert für jeden Schritt
// ein Card‑Element mit Bild, Titel und Beschreibung. Zwischen den Cards wird
// optional ein Pfeil dargestellt (nur Desktop), um den Ablauf zu visualisieren.
//
// Änderungen gegenüber der Vorversion:
// - Die zuvor sichtbaren Dateipfade (z. B. "/src/assets/..."), die über den
//   Bildern lagen, wurden vollständig entfernt. Bilder werden jetzt direkt
//   per <img> eingebunden.
// - Die Bildcontainer nutzen eine feste Aspect-Ratio und object-fit: cover,
//   damit nichts verzerrt oder aus dem Rahmen springt.
// - Alle Styling‑Details sind in der zugehörigen CSS‑Modul-Datei ausgelagert;
//   dort sind runde Ecken, Schatten und Arrow-Styles definiert.
// - Das Component bleibt token-basiert und CLS-frei durch reservierte Höhen.

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
