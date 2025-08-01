import React from 'react';

import AboutBox from './components/AboutBox';
import Contact from './components/Contact';
import CTABox from './components/CTABox';
import Hero from './components/Hero';
import ProcessSteps from './components/ProcessSteps';
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

      <ProcessSteps
        steps={[
          {
            icon: '/assets/icons/step1.svg',
            title: 'Anfrage stellen',
            description: 'Schnell & unkompliziert per WhatsApp oder Mail.',
          },
          {
            icon: '/assets/icons/step2.svg',
            title: 'Abholung vereinbaren',
            description: 'Wir holen deine Sendung direkt bei dir ab.',
          },
          {
            icon: '/assets/icons/step3.svg',
            title: 'Transport & Ankunft',
            description: 'Verfolgung & Ankunft sicher in Kenia.',
          },
        ]}
      />

      <CTABox
        whatsappUrl="https://wa.me/491234567890"
        email="kontakt@jambologistics.com"
        ctaLabel="Unverbindlich beraten lassen"
        onCTAClick={() =>
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      <AboutBox
        headline="Wer wir sind"
        paragraphs={[
          'Jambo Logistics verbindet Menschen und Märkte zwischen Deutschland und Ostafrika.',
          'Mit jahrelanger Erfahrung, persönlichem Support und starken Partnern in Nairobi begleiten wir deine Sendung von Tür zu Tür.',
        ]}
        imageUrl="/assets/about-team.jpg"
      />

      <Contact
        whatsappUrl="https://wa.me/491234567890"
        email="kontakt@jambologistics.com"
      />


    </DefaultLayout>
  );
}
