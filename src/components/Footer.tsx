import React from 'react';
import styles from './Footer.module.css';
import globalStyles from '../styles/components.module.css';

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

const Footer: React.FC<FooterProps> = ({ langSwitch = false, className = '' }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks: FooterLink[] = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Imprint', href: '/imprint' },
  ];

  const socialLinks: SocialLink[] = [
    { label: 'WhatsApp', href: 'https://wa.me/491234567890', icon: '📱' },
    { label: 'Email', href: 'mailto:kontakt@jambologistics.com', icon: '✉️' },
    { label: 'LinkedIn', href: '#', icon: '💼' },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={`${styles.container} container`}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Jumbo</span>
              <span className={styles.logoAccent}>Logistics</span>
            </div>
            <p className={styles.companyDescription}>
              Verbindet Menschen und Märkte zwischen Deutschland und Ostafrika. 
              Zuverlässiger Transport von Tür zu Tür.
            </p>
            <div className={styles.countryFlags}>
              <div className={styles.countryFlag}>
                <span className={styles.flagEmoji}>🇩🇪</span>
                <span className={styles.countryName}>Deutschland</span>
              </div>
              <div className={styles.countryFlag}>
                <span className={styles.flagEmoji}>🇰🇪</span>
                <span className={styles.countryName}>Kenia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={styles.footerLink}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <a 
                  href="mailto:kontakt@jambologistics.com"
                  className={styles.contactLink}
                >
                  kontakt@jambologistics.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
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
                <span className={styles.contactIcon}>📍</span>
                <span className={styles.contactText}>
                  Köln, Deutschland & Nairobi, Kenya
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.socialSection}>
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
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <span className={styles.socialLabel}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Language Switch (Future Feature) */}
        {langSwitch && (
          <div className={styles.languageSwitch}>
            <h4 className={styles.languageSwitchTitle}>Language / Sprache / Lugha</h4>
            <div className={styles.languageOptions}>
              <button className={`${styles.languageOption} ${styles.languageOptionActive}`}>
                🇩🇪 Deutsch
              </button>
              <button className={styles.languageOption}>
                🇬🇧 English
              </button>
              <button className={styles.languageOption}>
                🇰🇪 Kiswahili
              </button>
            </div>
          </div>
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
                  onClick={() => handleLinkClick(link.href)}
                  className={styles.legalLink}
                >
                  {link.label}
                </button>
                {index < legalLinks.length - 1 && (
                  <span className={styles.linkSeparator}>•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className={styles.stickyMobileCta}>
        <a
          href="https://wa.me/491234567890"
          className={`${globalStyles.buttonPrimary} ${styles.whatsappButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.whatsappIcon}>📱</span>
          WhatsApp
        </a>
      </div>
    </footer>
  );
};

export default Footer;

