import React from 'react';

import AboutBox from './components/AboutBox';
import Contact from './components/Contact';
import CTABox from './components/CTABox';
import Hero from './components/Hero';
import LocationBox from './components/LocationBox';
import ProcessSteps from './components/ProcessSteps';
import Services from './components/Services';
import TrustBox from './components/TrustBox';
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
        <TrustBox
      headline="Wem du vertrauen kannst"
      items={[
        {
          icon: '⭐️',
          title: '4.9/5 Sterne',
          description: 'Zufriedene Kund:innen in 🇩🇪 und 🇰🇪',
        },
        {
          icon: '🚚',
          title: '200+ Container',
          description: 'Sicher zugestellt, ohne einen Verlust.',
        },
        {
          icon: '🌍',
          title: '2 Kontinente, 1 Team',
          description: 'Verbindet Menschen & Märkte seit Jahren.',
        },
      ]}
    />



<LocationBox
  headline="Unsere Standorte"
  subline="Besuche uns in 🇩🇪 Deutschland & 🇰🇪 Kenia"
  locations={[
    {
      flag: '🇩🇪',
      country: 'Deutschland',
      name: 'Jambo Logistics GmbH',
      address: 'Musterstraße 12, 12345 Köln',
    },
    {
      flag: '🇰🇪',
      country: 'Kenia (Nairobi)',
      name: 'Jambo Nairobi Hub',
      address: 'Industrial Area, Nairobi, Kenya',
    },
  ]}
  mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.23755463985!2d36.8219465!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e7e763e0ff%3A0x49f367e3f751b9b3!2sNairobi!5e0!3m2!1sde!2ske!4v1690200200000!5m2!1sde!2ske"
/>




    </DefaultLayout>
  );
}
