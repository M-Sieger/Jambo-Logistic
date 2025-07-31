// src/layouts/DefaultLayout.tsx
import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
     <Header
  logoUrl="/assets/logo.svg"
  navItems={[
    { label: 'Leistungen', href: '#services' },
    { label: 'Ablauf', href: '#process' },
    { label: 'Kontakt', href: '#contact' },
    { label: 'Anfrage starten', href: '#cta' },
  ]}
/>

      <main className="main">
        {children}
      </main>
      <Footer
  logoUrl="/assets/logo.svg"
  description="© 2025 Jambo Logistics – Alle Rechte vorbehalten."
  links={[
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ]}
/>

    </div>
  );
}
