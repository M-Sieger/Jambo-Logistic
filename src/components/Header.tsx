import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import globalStyles from '../styles/components.module.css';

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  id: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Handle scroll to section
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle CTA click
  const handleCTAClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section based on scroll position
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
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest(`.${styles.header}`)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={`${styles.container} container`}>
        {/* Logo */}
        <div className={styles.logo}>
          <button 
            onClick={() => handleNavClick('#hero')}
            className={styles.logoButton}
            aria-label="Go to homepage"
          >
            <span className={styles.logoText}>Jumbo</span>
            <span className={styles.logoAccent}>Logistics</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`${styles.navLink} ${
                    activeSection === item.id ? styles.navLinkActive : ''
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className={styles.ctaContainer}>
          <button
            onClick={handleCTAClick}
            className={`${globalStyles.buttonPrimary} ${styles.ctaButton}`}
          >
            Jetzt anfragen
          </button>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
        aria-label="Mobile navigation"
      >
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
          <li className={styles.mobileNavCta}>
            <button
              onClick={handleCTAClick}
              className={`${globalStyles.buttonPrimary} ${styles.mobileCtaButton}`}
            >
              Jetzt anfragen
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
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

