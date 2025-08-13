// src/components/Header.tsx
import React, {
  useEffect,
  useState,
} from 'react';

// ✅ Assets & Styles
import Logo from '../assets/JamboLogisticLogo.png';
// ✅ Hook für zuverlässige Active-Link-Erkennung (Viewport-basiert)
import { useActiveSection } from '../hooks/useActiveSection';
import styles from './Header.module.css';

/**
 * HeaderProps – aktuell minimal; bleibt props-ready (i18n/API).
 * Später können navigationItems, logoSrc, onLinkClick etc. via Props kommen.
 */
interface HeaderProps {
  className?: string;
}

/** Typen für lokale Daten (können später extern geliefert werden) */
interface NavigationItem {
  label: string;
  href: string; // '#services'
  id: string;   // 'services' – muss exakt zur Section-ID im DOM passen
}
interface Language {
  code: string;  // 'DE'
  label: string; // 'Deutsch'
  flag: string;  // Emoji/Icon
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  /** -----------------------------
   * UI-States
   * ------------------------------ */
  const [isMenuOpen, setIsMenuOpen] = useState(false);         // Mobile Drawer
  const [currentLanguage, setCurrentLanguage] = useState('DE'); // Dummy i18n
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);         // 🔥 Scroll-State → .scrolled

  /** -----------------------------
   * Lokale Datenquellen (MVP)
   * → können problemlos via Props ersetzt werden
   * ------------------------------ */
  const navigationItems: NavigationItem[] = [
    { label: 'Home',     href: '#hero',     id: 'hero' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process',  href: '#process',  id: 'process' },
    { label: 'About',    href: '#about',    id: 'about' },
    { label: 'Contact',  href: '#contact',  id: 'contact' },
  ];

  const languages: Language[] = [
    { code: 'DE', label: 'Deutsch',   flag: '🇩🇪' },
    { code: 'EN', label: 'English',   flag: '🇬🇧' },
    { code: 'SW', label: 'Kiswahili', flag: '🇰🇪' },
  ];

  /** -----------------------------
   * Active-Link Detection via Hook
   * - robust gegen kurze/überlappende Sections
   * - berücksichtigt Sticky-Header über headerOffset
   * ------------------------------ */
  const ids = navigationItems.map((i) => i.id);
  const activeSection = useActiveSection(ids, { headerOffset: 96 });

  /** -----------------------------
   * Scroll-State (≥ 50px) → .scrolled
   * - passiver Listener
   * - kein CLS (Logo-Resize via transform in CSS)
   * ------------------------------ */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 50);
    onScroll(); // Initial (bei Reload in der Mitte)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** -----------------------------
   * Smooth-Scroll Helfer
   * ------------------------------ */
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false); // Mobile Drawer schließen
  };

  const handleCTAClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    // MVP: nur Log; später i18n-Mechanik
    console.log(`Language changed to: ${languageCode}`);
  };

  /** -----------------------------
   * Click-Outside zum Schließen von Menüs
   * ------------------------------ */
  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest(`.${styles.header}`)) {
        setIsMenuOpen(false);
      }
      if (isLanguageDropdownOpen && !target.closest(`.${styles.languageSelector}`)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isMenuOpen, isLanguageDropdownOpen]);

  // Aktuelle Sprache (Fallback sicher)
  const currentLang = languages.find((l) => l.code === currentLanguage) || languages[0];

  /** -----------------------------
   * Render
   * - Nur CSS-Modules (kein Inline-Style)
   * - A11y: aria-current, Focus-Ringe in CSS
   * ------------------------------ */
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${className}`}>
      <div className={styles.container}>
        {/* 🔗 Logo → Home */}
        <div className={styles.logo}>
          <button
            onClick={() => handleNavClick('#hero')}
            className={styles.logoButton}
            aria-label="Go to homepage"
          >
            <img src={Logo} alt="Jambo Logistics" className={styles.logoImage} />
          </button>
        </div>

        {/* 🧭 Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 🔤 Right Section: Language + CTA */}
        <div className={styles.rightSection}>
          {/* 🌍 Language */}
          <div className={styles.languageSelector}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={styles.languageButton}
              aria-expanded={isLanguageDropdownOpen}
              aria-haspopup="true"
              aria-label="Select language"
            >
              <span className={styles.languageFlag}>{currentLang.flag}</span>
              <span className={styles.languageCode}>{currentLang.code}</span>
              <span
                className={`${styles.languageArrow} ${
                  isLanguageDropdownOpen ? styles.languageArrowOpen : ''
                }`}
              >
                ▼
              </span>
            </button>

            {isLanguageDropdownOpen && (
              <div className={styles.languageDropdown}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`${styles.languageOption} ${
                      currentLanguage === language.code ? styles.languageOptionActive : ''
                    }`}
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>{language.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🟧 CTA */}
          <button onClick={handleCTAClick} className={styles.ctaButton}>
            Jetzt anfragen
          </button>
        </div>

        {/* ☰ Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.mobileMenuButton}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`} />
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`} />
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`} />
        </button>
      </div>

      {/* 📱 Mobile Navigation */}
      {isMenuOpen && (
        <nav id="mobile-menu" className={styles.mobileNav} aria-label="Mobile navigation">
          <div className={styles.mobileNavContent}>
            <ul className={styles.mobileNavList}>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`${styles.mobileNavLink} ${
                      activeSection === item.id ? styles.mobileNavLinkActive : ''
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* 🌐 Language (Mobile) */}
            <div className={styles.mobileLanguageSection}>
              <h3 className={styles.mobileLanguageTitle}>Language</h3>
              <div className={styles.mobileLanguageGrid}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`${styles.mobileLanguageOption} ${
                      currentLanguage === language.code ? styles.mobileLanguageOptionActive : ''
                    }`}
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>{language.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 🟧 CTA (Mobile) */}
            <div className={styles.mobileNavCta}>
              <button onClick={handleCTAClick} className={styles.mobileCtaButton}>
                Jetzt anfragen
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* 🔲 Overlay zum Schließen */}
      {isMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
