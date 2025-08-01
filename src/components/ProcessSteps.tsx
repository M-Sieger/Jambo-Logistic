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
    <section className={`steps-section ${styles.stepsSection}`}>
      <div className="container">
        <h2 className="headline-xl">So einfach funktioniert’s</h2>
        <div className={styles.stepsWrapper}>
          {steps.map((step, i) => (
            <div className={styles.stepCard} key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
