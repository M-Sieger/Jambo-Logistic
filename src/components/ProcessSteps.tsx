// src/components/ProcessSteps.tsx
import React from 'react';

// Bilder für die Steps
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

const stepImages = [step1Image, step2Image, step3Image, step4Image];

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <section id="steps" className={styles.steps}>
      <h2 className={styles.headline}>So einfach funktioniert's</h2>

      <div className={styles.grid}>
        {steps.map((step, i) => (
          <div
            key={i}
            className={styles.card}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className={styles.imageContainer}>
              <img
                src={stepImages[i]}
                alt={`${step.title} Bild`}
                className={styles.stepImage}
              />
            </div>
            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardText}>{step.description}</p>
            {i < steps.length - 1 && (
              <div className={styles.connectionLine}></div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h3>Bereit für Ihren Transport?</h3>
          <p>Kontaktieren Sie uns für ein unverbindliches Angebot</p>
          <div className={styles.buttonGroup}>
            <a href="#contact" className={styles.buttonPrimary}>
              Angebot anfordern
            </a>
            <a href="https://wa.me/1234567890" className={styles.buttonOutline}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
