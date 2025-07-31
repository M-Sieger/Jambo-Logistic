// src/components/Footer.tsx
import React from 'react';

import styles from '../styles/Footer.module.css';

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  logoUrl: string;
  description: string;
  links: FooterLink[];
};

export default function Footer({ logoUrl, description, links }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={logoUrl} alt="Jambo Logistics Logo" className={styles.logo} />
          <p>{description}</p>
        </div>
        <div className={styles.right}>
          <ul>
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
