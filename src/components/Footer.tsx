import React from 'react';

import globalStyles from '../styles/GlobalPolish.module.css';
import styles from './Footer.module.css';

interface FooterProps {
  langSwitch?: boolean;
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

const Footer: React.FC<FooterProps> = ({ langSwitch = false, className = "" }) => {
  const currentYear = new Date().getFullYear();

  // ⚠️ "Process" verweist auf die Steps-Section (#steps)
  const quickLinks: FooterLink[] = [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#steps" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Imprint", href: "/imprint" },
  ];

  const socialLinks: SocialLink[] = [
    { label: "WhatsApp", href: "https://wa.me/491234567890", icon: "📱" },
    { label: "Email", href: "mailto:kontakt@jambologistics.com", icon: "✉️" },
    { label: "LinkedIn", href: "#", icon: "💼" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  // WICHTIG: Keine "section--alt" Klasse am Footer, damit kein helles BG den Footer überlagert.
  return (
    <footer className={`${styles.footer} ${className}`} role="contentinfo">
      <div className={styles.container}>
        {/* Hauptbereich des Footers */}
        <div className={styles.footerContent}>
          {/* Company Info */}
          <section className={styles.companySection} aria-label="Unternehmensinformationen">
            <div className={styles.logo} aria-label="Jumbo Logistics">
              <span className={styles.logoText}>Jumbo</span>
              <span className={styles.logoAccent}>Logistics</span>
            </div>
            <p className={styles.companyDescription}>
              Verbindet Menschen und Märkte zwischen Deutschland und Ostafrika.
              Zuverlässiger Transport von Tür zu Tür.
            </p>
            <div className={styles.countryFlags} aria-label="Standorte">
              <div className={styles.countryFlag}>
                <span className={styles.flagEmoji} aria-hidden="true">🇩🇪</span>
                <span className={styles.countryName}>Deutschland</span>
              </div>
              <div className={styles.countryFlag}>
                <span className={styles.flagEmoji} aria-hidden="true">🇰🇪</span>
                <span className={styles.countryName}>Kenia</span>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <nav className={styles.linksSection} aria-label="Schnellzugriff">
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(link.href)}
                    className={styles.footerLink}
                    aria-label={`Gehe zu ${link.label}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <section className={styles.contactSection} aria-label="Kontaktinformationen">
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">📧</span>
                <a href="mailto:kontakt@jambologistics.com" className={styles.contactLink}>
                  kontakt@jambologistics.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">📱</span>
                <a
                  href="https://wa.me/491234567890"
                  className={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Support
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">📍</span>
                <span className={styles.contactText}>Köln, Deutschland &amp; Nairobi, Kenya</span>
              </div>
            </div>
          </section>

          {/* Social Links */}
          <nav className={styles.socialSection} aria-label="Soziale Kanäle">
            <h3 className={styles.sectionTitle}>Connect</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <span className={styles.socialIcon} aria-hidden="true">{social.icon}</span>
                  <span className={styles.socialLabel}>{social.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Language Switch (optional) */}
        {langSwitch && (
          <section className={styles.languageSwitch} aria-label="Sprachauswahl">
            <h4 className={styles.languageSwitchTitle}>Language / Sprache / Lugha</h4>
            <div className={styles.languageOptions}>
              <button type="button" className={`${styles.languageOption} ${styles.languageOptionActive}`}>
                🇩🇪 Deutsch
              </button>
              <button type="button" className={styles.languageOption}>
                🇬🇧 English
              </button>
              <button type="button" className={styles.languageOption}>
                🇰🇪 Kiswahili
              </button>
            </div>
          </section>
        )}

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} Jumbo Logistics. All rights reserved.</p>
          </div>
          <div className={styles.legalLinks}>
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <button
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className={styles.legalLink}
                  aria-label={`Öffne ${link.label}`}
                >
                  {link.label}
                </button>
                {index < legalLinks.length - 1 && <span className={styles.linkSeparator}>•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className={styles.stickyMobileCta}>
        <a
          href="https://wa.me/491234567890"
          className={`${globalStyles.button} ${globalStyles["button--primary"]} ${globalStyles["is-lg"]} ${styles.whatsappButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.whatsappIcon} aria-hidden="true">📱</span>
          WhatsApp
        </a>
      </div>
    </footer>
  );
};

export default Footer;
