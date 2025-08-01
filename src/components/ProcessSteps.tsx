// src/components/ProcessSteps.tsx
import React from 'react';

import styles from '../styles/ProcessSteps.module.css';

type Step = {
  icon: string;
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: Step[];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <section className="steps-section">
      <div className="container">
        <section className={styles.steps} id="steps">
          <h2 className={styles.headline}>So einfach funktioniert’s</h2>
          <div className={styles.grid}>
            {steps.map((step, i) => (
              <div
                className={styles.card}
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
