import React from 'react';
import styles from './Hero.module.css';
import globalStyles from '../styles/components.module.css';

interface HeroProps {
  headline: string;
  subline: string;
  ctaLabel: string;
  onCTAClick?: () => void;
  imageUrl?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subline,
  ctaLabel,
  onCTAClick,
  imageUrl,
  variant = 'dark',
  className = ''
}) => {
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      // Default behavior: scroll to contact section
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="hero"
      className={`${styles.hero} ${styles[variant]} ${className}`}
      style={{ 
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={styles.overlay}>
        <div className={`${styles.container} container`}>
          <div className={styles.content}>
            <h1 className={`${globalStyles.headline} ${variant === 'light' ? globalStyles.headline : globalStyles.headlineLight}`}>
              {headline}
            </h1>
            <p className={`${globalStyles.subline} ${variant === 'light' ? globalStyles.subline : globalStyles.sublineLight}`}>
              {subline}
            </p>
            <div className={styles.ctaContainer}>
              <button
                onClick={handleCTAClick}
                className={`${globalStyles.buttonPrimary} ${globalStyles.buttonLarge} ${styles.ctaButton}`}
                aria-label={ctaLabel}
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

