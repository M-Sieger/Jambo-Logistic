import React from 'react';

import cardBase from '../styles/CardBase.module.css'; // ← WIRD jetzt verwendet
import globalStyles from '../styles/components.module.css';
import styles from './AboutBox.module.css';

interface AboutBoxProps {
  headline: string;
  paragraphs: string[];
  imageUrl?: string;
  variant?: 'light' | 'dark';
  imagePosition?: 'left' | 'right';
  className?: string;
}

const AboutBox: React.FC<AboutBoxProps> = ({
  headline,
  paragraphs,
  imageUrl,
  variant = 'light',
  imagePosition = 'right',
  className = ''
}) => {
  return (
    <section 
      id="about" 
      className={`${styles.aboutBox} ${styles[variant]} ${styles[`image${imagePosition.charAt(0).toUpperCase() + imagePosition.slice(1)}`]} ${className} section`}
      data-aos="fade-up"
    >
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          
          {/* Text Content */}
          <div className={styles.textContent} data-aos="fade-right">
            <h2 className={`${globalStyles.sectionTitle} ${variant === 'dark' ? globalStyles.sectionTitleLight : ''}`}>
              {headline}
            </h2>
            
            <div className={styles.paragraphs}>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights – jetzt mit cardBase */}
            <div className={styles.highlights}>
              <div className={`${styles.highlight} ${cardBase.cardBase}`}>
                <div className={styles.highlightIcon}>
                  <span>🌍</span>
                </div>
                <div className={styles.highlightContent}>
                  <h4 className={styles.highlightTitle}>Internationale Expertise</h4>
                  <p className={styles.highlightDescription}>
                    Jahrelange Erfahrung im Transport zwischen Deutschland und Ostafrika.
                  </p>
                </div>
              </div>

              <div className={`${styles.highlight} ${cardBase.cardBase}`}>
                <div className={styles.highlightIcon}>
                  <span>🤝</span>
                </div>
                <div className={styles.highlightContent}>
                  <h4 className={styles.highlightTitle}>Persönlicher Service</h4>
                  <p className={styles.highlightDescription}>
                    Direkter Kontakt und individuelle Betreuung für jeden Kunden.
                  </p>
                </div>
              </div>

              <div className={`${styles.highlight} ${cardBase.cardBase}`}>
                <div className={styles.highlightIcon}>
                  <span>🔒</span>
                </div>
                <div className={styles.highlightContent}>
                  <h4 className={styles.highlightTitle}>Sicher & Zuverlässig</h4>
                  <p className={styles.highlightDescription}>
                    100% Versicherungsschutz und nachverfolgbare Sendungen.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaContainer}>
              <button
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`${globalStyles.buttonPrimary} ${styles.ctaButton}`}
              >
                Mehr über uns erfahren
              </button>
            </div>
          </div>

          {/* Image Section */}
          {imageUrl && (
            <div className={styles.imageContent} data-aos="fade-left">
              <div className={styles.imageContainer}>
                <img 
                  src={imageUrl} 
                  alt="Jumbo Logistics Team - Professionelle Logistik-Experten"
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayContent}>
                    <h4 className={styles.overlayTitle}>Unser Team</h4>
                    <p className={styles.overlayDescription}>
                      Experten für Logistik zwischen Deutschland und Kenia
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>200+</div>
                  <div className={styles.statLabel}>Container verschifft</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>5+</div>
                  <div className={styles.statLabel}>Jahre Erfahrung</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>100%</div>
                  <div className={styles.statLabel}>Kundenzufriedenheit</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutBox;
