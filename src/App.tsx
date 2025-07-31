// src/App.tsx
import React from 'react';

import CTABox from './components/CTABox';
import Hero from './components/Hero';
import Services from './components/Services';
import DefaultLayout from './layouts/DefaultLayout';

export default function App() {
  return (
    <DefaultLayout>
      <Hero
        headline="Von deiner Tür bis nach Nairobi."
        subline="Klar. Schnell. Für dich nach Kenia."
        ctaLabel="Jetzt anfragen"
        backgroundUrl="/assets/container-ship.jpg"
        onCTAClick={() =>
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      <CTABox
        whatsappUrl="https://wa.me/491234567890"
        email="kontakt@jambologistics.com"
        ctaLabel="Unverbindlich beraten lassen"
        onCTAClick={() =>
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      <Services
        services={[
          {
            title: 'Paketversand 📦',
            description: 'Kleine Sendungen sicher & schnell nach Afrika.',
            icon: '📦',
          },
          {
            title: 'Containertransport 🚛',
            description: 'Großmengen & Paletten direkt im Container.',
            icon: '🚛',
          },
          {
            title: 'Fahrzeugversand 🚙',
            description: 'Autos & Maschinen zuverlässig nach Kenia.',
            icon: '🚙',
          },
        ]}
      />
    </DefaultLayout>
  );
}
