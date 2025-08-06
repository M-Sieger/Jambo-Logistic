import React, {
  useEffect,
  useState,
} from 'react';

// ✅ Logo importieren (wird von Vite verarbeitet)
import Logo from '../assets/JamboLogisticLogo.png';
// ✅ CSS Module für Header-Styling
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  id: string;
}

interface Language {
  code: string;
  label: string;
  flag: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('DE');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const languages: Language[] = [
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'SW', label: 'Kiswahili', flag: '🇰🇪' },
  ];

  // 🔁 Scrollverhalten zur Sektion
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // 📞 CTA → scrollt zu "Kontakt"-Sektion
  const handleCTAClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) contactElement.scrollIntoView({ behavior: 'smooth' });
  };

  // 🌍 Sprache ändern
  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    console.log(`Language changed to: ${languageCode}`);
  };

  // 🧠 Aktive Navigation beim Scrollen
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🧱 Schließt Menü bei Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest(`.${styles.header}`)) setIsMenuOpen(false);
      if (isLanguageDropdownOpen && !target.closest(`.${styles.languageSelector}`)) setIsLanguageDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, isLanguageDropdownOpen]);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        
        {/* 🔗 Logo */}
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

        {/* 🧭 Navigation (Desktop) */}
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

        {/* 🔤 Sprache + CTA */}
        <div className={styles.rightSection}>
          
          {/* 🌍 Sprachumschalter */}
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
              <span className={`${styles.languageArrow} ${isLanguageDropdownOpen ? styles.languageArrowOpen : ''}`}>
                ▼
              </span>
            </button>

            {isLanguageDropdownOpen && (
              <div className={styles.languageDropdown}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`${styles.languageOption} ${currentLanguage === language.code ? styles.languageOptionActive : ''}`}
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>{language.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🟧 CTA-Button */}
          <button onClick={handleCTAClick} className={styles.ctaButton}>
            Jetzt anfragen
          </button>
        </div>

        {/* ☰ Mobile-Menü Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.mobileMenuButton}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
        </button>
      </div>

      {/* 📱 Mobile-Menü */}
      {isMenuOpen && (
        <nav id="mobile-menu" className={styles.mobileNav} aria-label="Mobile navigation">
          <div className={styles.mobileNavContent}>
            <ul className={styles.mobileNavList}>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.mobileNavLinkActive : ''}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* 🌐 Mobile Sprache */}
            <div className={styles.mobileLanguageSection}>
              <h3 className={styles.mobileLanguageTitle}>Language</h3>
              <div className={styles.mobileLanguageGrid}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`${styles.mobileLanguageOption} ${currentLanguage === language.code ? styles.mobileLanguageOptionActive : ''}`}
                  >
                    <span className={styles.languageFlag}>{language.flag}</span>
                    <span className={styles.languageLabel}>{language.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 🟧 Mobile CTA */}
            <div className={styles.mobileNavCta}>
              <button onClick={handleCTAClick} className={styles.mobileCtaButton}>
                Jetzt anfragen
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* 🔲 Overlay (wenn Menü offen) */}
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
