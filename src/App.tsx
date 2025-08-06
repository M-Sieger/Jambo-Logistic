import React, { useEffect } from 'react';

import AOS from 'aos';

// 🖼️ Bilder & Assets
import teamImage from './assets/about-team.jpg';
import mapImage from './assets/nairobi-map.png';
import serviceBackground from './assets/services-bg-savanna.jpg';
import heroBackground from './assets/ship-container.jpg';
// 👉 NEUE Schritt-Bilder im src/assets/ Verzeichnis (bitte dort speichern)
import stepAnnahmeImg from './assets/step1-anfrage.jpg';
import stepTransportImg from './assets/step2-abholung.jpg';
import stepZustellungImg from './assets/step4-nairobi.jpg';
// 🧩 Komponenten
import AboutBox from './components/AboutBox';
import Contact from './components/Contact';
import Hero from './components/Hero';
import ProcessSteps from './components/ProcessSteps';
import Services from './components/Services';
import DefaultLayout from './layouts/DefaultLayout';

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 100,
    });
  }, []);

  // Service-Definition bleibt unverändert
  const services = [ /* … */ ];

  // ⚙️ Neuer 3-Schritte-Prozess mit passenden Texten und Bildern
  const processSteps = [
    {
      icon: stepAnnahmeImg, // Annahme: Paket selbst abgeben oder per Post
      title: 'Annahme',
      description:
        'Bring dein Paket persönlich nach Essen (NRW) oder sende es bequem per Post. Abholung in NRW folgt bald.',
    },
    {
      icon: stepTransportImg, // Transport: Container/Reise nach Kenia
      title: 'Transport',
      description:
        'Dein Paket reist sicher im Container nach Kenia. Persönliche Updates statt Tracking-App.',
    },
    {
      icon: stepZustellungImg, // Zustellung: Ankunft in Nairobi
      title: 'Zustellung',
      description:
        'Wir melden uns, sobald dein Paket in Nairobi angekommen ist – Abholung im Lager ganz einfach.',
    },
  ];

  const aboutParagraphs = [ /* … */ ];

  return (
    <DefaultLayout>
      <Hero
        headline="Von deiner Tür bis nach Nairobi."
        subline="Klar. Schnell. Zuverlässig. Für dich nach Kenia."
        ctaLabel="Jetzt anfragen"
        imageUrl={heroBackground}
        variant="dark"
      />

      <Services
        services={services}
        columns={3}
        backgroundImage={serviceBackground}
      />

      {/* Hinweis: showNumbers ist nicht mehr nötig */}
      <ProcessSteps steps={processSteps} />

      <AboutBox
        headline="Wer wir sind"
        paragraphs={aboutParagraphs}
        imageUrl={teamImage}
        variant="light"
        imagePosition="right"
      />

      <Contact
        whatsappUrl="https://wa.me/491234567890"
        email="kontakt@jambologistics.com"
        mapImage={mapImage}
      />
    </DefaultLayout>
  );
};

export default App;
