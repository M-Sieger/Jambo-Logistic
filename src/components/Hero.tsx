import React from 'react';

// Globale Stile für Buttons, Headlines etc.
import globalStyles from '../styles/components.module.css';
// Lokale Stile für diese Hero-Komponente
import styles from './Hero.module.css';

// Props-Schnittstelle für maximale Wiederverwendbarkeit
interface HeroProps {
  headline: string;                  // Hauptüberschrift (z. B. "Von deiner Tür nach Nairobi")
  subline: string;                   // Unterzeile / Beschreibung
  ctaLabel: string;                  // Text des Call-to-Action Buttons
  onCTAClick?: () => void;          // Optional: eigener Click-Handler
  imageUrl?: string;                // Optional: Hero-Hintergrundbild (als URL-String)
  variant?: 'light' | 'dark';       // Farbschema (z. B. helle oder dunkle Schrift)
  className?: string;               // Optionale zusätzliche CSS-Klassen
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
  // Wenn kein eigener CTA-Handler definiert ist → smooth scroll zu #contact
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
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
        // Bild als CSS-Hintergrundbild (wenn imageUrl gesetzt wurde)
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Halbtransparente Overlay-Schicht */}
      <div className={styles.overlay}>
        <div className={`${styles.container} container`}>
          <div className={styles.content}>
            {/* Headline (dynamisch) */}
            <h1 className={`${globalStyles.headline} ${variant === 'light' ? globalStyles.headline : globalStyles.headlineLight}`}>
              {headline}
            </h1>

            {/* Subline (dynamisch) */}
            <p className={`${globalStyles.subline} ${variant === 'light' ? globalStyles.subline : globalStyles.sublineLight}`}>
              {subline}
            </p>

            {/* Call-to-Action Button */}
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
      
      {/* Scroll Indicator (kleiner Pfeil ↓) */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
