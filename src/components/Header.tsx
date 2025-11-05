import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

// Assets & Styles
import Logo from '../assets/JamboLogisticLogo.png';
import {
  LANGUAGE_OPTIONS,
  type LanguageCode,
  useLanguage,
} from '../contexts/language-context';
// Viewport-basierte Active-Section-Erkennung (stabil für "Process")
import { useActiveSection } from '../hooks/useActiveSection';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string; // '#services'
  id: string;   // 'services' – exakt wie DOM-Section-ID
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  // ===== State
  const [isMenuOpen, setIsMenuOpen] = useState(false);                 // Mobile: Fullscreen-Overlay
  const {
    language: currentLanguage,
    setLanguage,
    translations: t,
    options: contextLanguages,
  } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // Desktop: Dropdown
  const [isScrolled, setIsScrolled] = useState(false);                 // Header-Zustand (atTop/scrolled)

  const languages = contextLanguages ?? LANGUAGE_OPTIONS;

  // ===== Daten
  const navigationItems: NavigationItem[] = [
    { label: t.nav.home,     href: '#hero',     id: 'hero' },
    { label: t.nav.services, href: '#services', id: 'services' },
    { label: t.nav.process,  href: '#process',  id: 'process' },
    { label: t.nav.about,    href: '#about',    id: 'about' },
    { label: t.nav.contact,  href: '#contact',  id: 'contact' },
  ];

  // ===== Active Link (robust mit Header-Offset)
  const ids = navigationItems.map((i) => i.id);
  const activeSection = useActiveSection(ids, { headerOffset: 96 });

  // ===== Scroll-State (atTop/scrolled)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ===== Smooth scroll zu ID und mobile Menü schließen
  const handleNavClick = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  // ===== CTA → Contact
  const handleCTAClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // ===== Language (Desktop + Mobile im Overlay)
  const handleLanguageChange = (languageCode: LanguageCode) => {
    setLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false); // Mobile Menu auch schließen
  };

  // ===== Outside-Click: Desktop-Dropdown schließen
  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isLanguageDropdownOpen && !target.closest(`.${styles.languageSelector}`)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isLanguageDropdownOpen]);

  // ===== ESC schließt Overlay (Mobile)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // ===== Body-Scroll sperren, wenn Overlay offen (Mobile-A11y)
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? 'hidden' : original || '';
    return () => { document.body.style.overflow = original; };
  }, [isMenuOpen]);

  const currentLang = languages.find((l) => l.code === currentLanguage) || languages[0];

  return (
    <header
      className={[
        styles.header,
        isScrolled ? styles.scrolled : styles.atTop, // Start: hoher Kontrast
        className,
      ].join(' ')}
    >
      <div className={styles.container}>
        {/* ==== Logo → Home */}
        <div className={styles.logo}>
          <button
            onClick={() => handleNavClick('#hero')}
            className={styles.logoButton}
            aria-label="Go to homepage"
          >
            <img src={Logo} alt="Jambo Logistics" className={styles.logoImage} />
          </button>
        </div>

        {/* ==== Desktop-Navigation */}
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

        {/* ==== Rechte Seite (Desktop): Language + CTA */}
        <div className={styles.rightSection}>
          <div className={styles.languageSelector}>
            <button
              onClick={() => setIsLanguageDropdownOpen((v) => !v)}
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
              <div className={styles.languageDropdown} role="menu">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={[
                      styles.languageOption,
                      currentLanguage === language.code ? styles.languageOptionActive : '',
                    ].join(' ')}
                    role="menuitem"
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>{language.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleCTAClick} className={styles.ctaButton}>
            {t.cta.primary}
          </button>
        </div>

        {/* ==== Mobile: Trigger für Fullscreen-Overlay */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className={styles.mobileMenuButton}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-overlay-menu"
          aria-label="Open navigation menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* ==== Fullscreen Overlay Menü (Mobile) */}
      {isMenuOpen && (
        <div
          id="mobile-overlay-menu"
          className={styles.mobileOverlayFull}
          role="dialog"
          aria-modal="true"
          onClick={() => setIsMenuOpen(false)} // Klick auf Hintergrund schließt
        >
          <div
            className={styles.mobileOverlayContent}
            onClick={(e) => e.stopPropagation()} // Inhalt klickbar lassen
          >
            {/* Close (X) */}
            <button
              className={styles.mobileOverlayClose}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              ×
            </button>

            {/* Branding (optional klein) */}
            <div className={styles.mobileBrand}>
              <img src={Logo} alt="Jambo Logistics" className={styles.mobileBrandLogo} />
            </div>

            {/* Links */}
            <ul className={styles.mobileList}>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={[
                      styles.mobileItem,
                      activeSection === item.id ? styles.mobileItemActive : '',
                    ].join(' ')}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Language Auswahl (ohne Dropdown – robust) */}
            <div className={styles.mobileLangBlock}>
              <h3 className={styles.mobileLangTitle}>{t.language.title}</h3>
              <div className={styles.mobileLangGrid}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={[
                      styles.mobileLangPill,
                      currentLanguage === language.code ? styles.mobileLangPillActive : '',
                    ].join(' ')}
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>{language.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button onClick={handleCTAClick} className={styles.mobileCta}>
              {t.cta.primary}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
