// src/components/ProcessSteps.tsx
import React from 'react';

import global from '../styles/GlobalPolish.module.css';
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
    <section id="steps" className={`section--neutral ${styles.steps}`}>
      <h2 className={global.headline}>So einfach funktioniert’s</h2>
      <div className={styles.grid}>
        {steps.map((step, i) => (
          <div
            className={`${global.card} ${styles.card}`}
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className={global.iconBox}>{step.icon}</div>
            <h3 className={global.subline}>{step.title}</h3>
            <p className={global.textMuted}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
