// ---------------------------------------------------------
// Datei: Header.tsx
// Zweck: Fixierte Navigation mit Slide-In-Mobile-Menü und Sprachumschalter
// Änderungen (06.11.2025):
// - Fix: Mobile-Menü schließt per X, Backdrop und Escape zuverlässig
// - Fix: Body-Scroll wird beim offenen Menü gesperrt
// - Neu: Kompakter Sprachwahlschalter im Mobile-Menü
// Stand: 06.11.2025
// ---------------------------------------------------------

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import Logo from '../assets/JamboLogisticLogo.png';
import {
  LANGUAGE_OPTIONS,
  type LanguageCode,
  useLanguage,
} from '../contexts/language-context';
import { useActiveSection } from '../hooks/useActiveSection';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  id: string;
}

const MOBILE_BREAKPOINT = 768;

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  ));

  const {
    language: currentLanguage,
    setLanguage,
    translations: t,
    options: contextLanguages,
  } = useLanguage();

  const languages = contextLanguages ?? LANGUAGE_OPTIONS;

  const navigationItems: NavigationItem[] = [
    { label: t.nav.home, href: '#hero', id: 'hero' },
    { label: t.nav.services, href: '#services', id: 'services' },
    { label: t.nav.process, href: '#process', id: 'process' },
    { label: t.nav.about, href: '#about', id: 'about' },
    { label: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  const ids = navigationItems.map((item) => item.id);
  const activeSection = useActiveSection(ids, { headerOffset: 96 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
    setIsLanguageDropdownOpen(false);
  }, [isMenuOpen]);

  const handleMenuOpen = useCallback(() => {
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(true);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    handleMenuClose();
  }, [handleMenuClose]);

  const handleCTAClick = useCallback(() => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    handleMenuClose();
  }, [handleMenuClose]);

  const handleLanguageChange = (languageCode: LanguageCode) => {
    setLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    handleMenuClose();
  };

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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLanguageDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header
      className={[
        styles.header,
        isScrolled ? styles.scrolled : styles.atTop,
        className,
      ].join(' ')}
    >
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <button
              onClick={() => handleNavClick('#hero')}
              className={styles.logoButton}
              aria-label="Go to homepage"
            >
              <img src={Logo} alt="Jambo Logistics" className={styles.logoImage} />
            </button>
          </div>

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
        </div>

        <div className={styles.rightSection}>
          {/* Language Pills (Desktop) - TEXT LABELS INSTEAD OF EMOJIS */}
          <div className={styles.languagePills}>
            <span className={styles.pillsLabel}>Sprache:</span>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={[
                  styles.langPill,
                  currentLanguage === lang.code ? styles.langPillActive : '',
                ].join(' ')}
                aria-label={lang.label}
                aria-current={currentLanguage === lang.code ? 'true' : undefined}
                type="button"
              >
                <span className={styles.pillCode}>{lang.code}</span>
              </button>
            ))}
          </div>

          <button onClick={handleCTAClick} className={styles.ctaButton} type="button">
            {t.cta.primary}
          </button>
        </div>

        {isMobile && !isMenuOpen && (
          <button
            onClick={handleMenuOpen}
            className={styles.mobileMenuButton}
            aria-expanded={false}
            aria-controls="mobile-navigation"
            aria-label="Navigation öffnen"
            type="button"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        )}
      </div>

      {isMenuOpen && (
        <>
          <div
            className={styles.backdrop}
            aria-hidden="true"
            onClick={handleMenuClose}
            role="presentation"
          />
          <button
            onClick={handleMenuClose}
            className={styles.mobileCloseButton}
            aria-label="Navigation schließen"
            type="button"
          >
            ×
          </button>
        </>
      )}

      <aside
        id="mobile-navigation"
        className={[styles.mobileMenu, isMenuOpen ? styles.mobileMenuOpen : ''].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileMenuHeader}>
            <img src={Logo} alt="Jambo Logistics" className={styles.mobileMenuLogo} />
          </div>

          <nav className={styles.mobileNav} aria-label="Mobile navigation links">
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
                    type="button"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.mobileLangBlock}>
            <h3 className={styles.mobileLangTitle}>{t.language.title}</h3>
            <div className={styles.mobileLangGrid}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={[
                    styles.mobileLangButton,
                    currentLanguage === language.code ? styles.mobileLangButtonActive : '',
                  ].join(' ')}
                  type="button"
                  aria-label={language.label}
                  aria-current={currentLanguage === language.code ? 'true' : undefined}
                >
                  <span className={styles.mobileLangCode}>{language.code}</span>
                  <span className={styles.mobileLangLabel}>{language.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleCTAClick} className={styles.mobileCta} type="button">
            {t.cta.primary}
          </button>
        </div>
      </aside>
    </header>
  );
};

export default Header;
