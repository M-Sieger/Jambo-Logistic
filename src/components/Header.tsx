import React, {
  useEffect,
  useState,
} from 'react';

// Assets & Styles
import Logo from '../assets/JamboLogisticLogo.png';
// Hook: liefert die aktuell sichtbare Section-ID (setzt Active-Link)
import { useActiveSection } from '../hooks/useActiveSection';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string; // z. B. '#services'
  id: string;   // z. B. 'services' – muss zur Section-ID im DOM passen
}

interface Language {
  code: string;
  label: string;
  flag: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  // UI-State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('DE');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // steuert .atTop / .scrolled

  // Navigationseinträge (i18n-ready durch Labels)
  const navigationItems: NavigationItem[] = [
    { label: 'Home',     href: '#hero',     id: 'hero' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process',  href: '#process',  id: 'process' },
    { label: 'About',    href: '#about',    id: 'about' },
    { label: 'Contact',  href: '#contact',  id: 'contact' },
  ];

  // Sprachen
  const languages: Language[] = [
    { code: 'DE', label: 'Deutsch',   flag: '🇩🇪' },
    { code: 'EN', label: 'English',   flag: '🇬🇧' },
    { code: 'SW', label: 'Kiswahili', flag: '🇰🇪' },
  ];

  // Active Section bestimmen (berücksichtigt Header-Offset für Sticky-Header)
  const ids = navigationItems.map((i) => i.id);
  const activeSection = useActiveSection(ids, { headerOffset: 96 });

  // Scroll-Listener (setzt Kompaktzustand & bessere Lesbarkeit)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 50);
    onScroll(); // Initialzustand setzen
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth-Scroll zu Ankern
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false); // Mobile-Menü schließen
  };

  // CTA → Kontakt
  const handleCTAClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Sprache wechseln
  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  // Klick außerhalb schließt Mobile-Menü & Sprachdropdown
  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target as Element;
      // Mobile-Menü schließen, wenn außerhalb von Header ODER Mobile-Nav geklickt wird
      if (
        isMenuOpen &&
        !target.closest(`.${styles.header}`) &&
        !target.closest(`.${styles.mobileNav}`)
      ) {
        setIsMenuOpen(false);
      }
      // Sprachdropdown schließen, wenn außerhalb des Selectors geklickt wird
      if (
        isLanguageDropdownOpen &&
        !target.closest(`.${styles.languageSelector}`)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isMenuOpen, isLanguageDropdownOpen]);

  const currentLang =
    languages.find((l) => l.code === currentLanguage) || languages[0];

  return (
    <header
      // ✅ .atTop sichert hohen Kontrast im Startzustand (nicht gescrolled)
      className={[
        styles.header,
        isScrolled ? styles.scrolled : styles.atTop,
        className,
      ].join(' ')}
    >
      <div className={styles.container}>
        {/* Logo → Home */}
        <div className={styles.logo}>
          <button
            onClick={() => handleNavClick('#hero')}
            className={styles.logoButton}
            aria-label="Go to homepage"
          >
            <img
              src={Logo}
              alt="Jambo Logistics"
              className={styles.logoImage}
            />
          </button>
        </div>

        {/* Desktop-Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={[
                    styles.navLink,
                    activeSection === item.id ? styles.navLinkActive : '',
                  ].join(' ')}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rechte Seite: Sprache + CTA */}
        <div className={styles.rightSection}>
          {/* Language Selector */}
          <div className={styles.languageSelector}>
            <button
              onClick={() =>
                setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
              }
              className={styles.languageButton}
              aria-expanded={isLanguageDropdownOpen}
              aria-haspopup="true"
              aria-label="Select language"
            >
              <span className={styles.languageFlag}>{currentLang.flag}</span>
              <span className={styles.languageCode}>{currentLang.code}</span>
              <span
                className={[
                  styles.languageArrow,
                  isLanguageDropdownOpen ? styles.languageArrowOpen : '',
                ].join(' ')}
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
                    className={[
                      styles.languageOption,
                      currentLanguage === language.code
                        ? styles.languageOptionActive
                        : '',
                    ].join(' ')}
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>
                      {language.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button onClick={handleCTAClick} className={styles.ctaButton}>
            Jetzt anfragen
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.mobileMenuButton}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span
            className={[
              styles.hamburgerLine,
              isMenuOpen ? styles.hamburgerLineOpen : '',
            ].join(' ')}
          />
          <span
            className={[
              styles.hamburgerLine,
              isMenuOpen ? styles.hamburgerLineOpen : '',
            ].join(' ')}
          />
          <span
            className={[
              styles.hamburgerLine,
              isMenuOpen ? styles.hamburgerLineOpen : '',
            ].join(' ')}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className={styles.mobileNav}
          aria-label="Mobile navigation"
        >
          <div className={styles.mobileNavContent}>
            <ul className={styles.mobileNavList}>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={[
                      styles.mobileNavLink,
                      activeSection === item.id
                        ? styles.mobileNavLinkActive
                        : '',
                    ].join(' ')}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Language */}
            <div className={styles.mobileLanguageSection}>
              <h3 className={styles.mobileLanguageTitle}>Language</h3>
              <div className={styles.mobileLanguageGrid}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={[
                      styles.mobileLanguageOption,
                      currentLanguage === language.code
                        ? styles.mobileLanguageOptionActive
                        : '',
                    ].join(' ')}
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>
                      {language.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            <div className={styles.mobileNavCta}>
              <button onClick={handleCTAClick} className={styles.mobileCtaButton}>
                Jetzt anfragen
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Overlay zum Schließen */}
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
