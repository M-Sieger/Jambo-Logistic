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
    <section className={styles.stepsSection}>
      <h2 className={styles.heading}>So einfach funktioniert’s</h2>
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepCard}>
            <img src={step.icon} alt="" className={styles.icon} />
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
