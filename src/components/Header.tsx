// src/components/Header.tsx
import React from 'react';

import styles from '../styles/Header.module.css';

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  logoUrl: string;
  navItems: NavItem[];
};

export default function Header({ logoUrl, navItems }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logoUrl} alt="Jambo Logistics Logo" className={styles.logo} />
        <nav className={styles.nav}>
          <ul>
            {navItems.map((item, i) => (
              <li key={i}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
