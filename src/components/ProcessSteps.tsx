import React from 'react';
import globalStyles from '../styles/components.module.css';
import styles from './ProcessSteps.module.css';

interface ProcessStep {
  icon?: string;
  title: string;
  description: string;
  number?: number;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  variant?: 'default' | 'compact';
  showNumbers?: boolean;
  className?: string;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  steps,
  variant = 'default',
  showNumbers = true,
  className = ''
}) => {
  return (
    <section
      id="process"
      className={`${styles.processSteps} ${styles[variant]} ${className} section`}
    >
      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header} data-aos="fade-up">
          <h2 className={globalStyles.sectionTitle}>So einfach geht's</h2>
          <p className={styles.subtitle}>
            In nur drei Schritten bringen wir Ihre Sendung sicher nach Kenia.
          </p>
        </div>

        {/* Steps Grid */}
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={styles.stepCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Step Icon or Number */}
              <div className={styles.stepIcon}>
                {!showNumbers && step.icon ? (
                  <div className={styles.stepIconImage}>
                    <img
                      src={step.icon}
                      alt={`${step.title} - Schritt ${index + 1}`}
                      className={styles.stepImage}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className={styles.stepNumber}>
                    <span>{step.number || index + 1}</span>
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className={styles.connectionLine}>
                  <div className={styles.line}></div>
                  <div className={styles.arrow}>→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call-To-Action Section */}
        <div className={styles.ctaSection} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Bereit für den ersten Schritt?</h3>
            <p className={styles.ctaDescription}>
              Kontaktieren Sie uns noch heute für ein unverbindliches Angebot.
            </p>
            <div className={styles.ctaButtons}>
              <button
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`${globalStyles.buttonPrimary} ${styles.primaryCta}`}
              >
                Jetzt anfragen
              </button>
              <a
                href="https://wa.me/491234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={`${globalStyles.buttonSecondary} ${styles.secondaryCta}`}
              >
                <span className={styles.whatsappIcon}>📱</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;

