import React, { useEffect } from 'react';

import AOS from 'aos';

// 🖼️ Bilder & Assets
import teamImage from './assets/about-team.jpg';
import boxImg from './assets/boxload.jpg';
import carImg from './assets/carcontainer.jpg';
import containerImg from './assets/containerload.jpeg'; // ← .jpeg!
import mapImage from './assets/nairobi-map.png';
import step2Img from './assets/receiving-kenya.jpg';
import serviceBackground
  from './assets/services-bg-savanna.jpg'; // Für Services
import heroBackground from './assets/ship-container.jpg'; // Für Hero
import step1Img from './assets/warehouse.jpg';
import step3Img from './assets/worker-smiling.jpg';
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

  const services = [
    {
      title: 'Paketversand',
      description: 'Kleine Sendungen sicher & schnell nach Afrika.',
      iconType: 'box' as const,
      imageUrl: boxImg,
    },
    {
      title: 'Containertransport',
      description: 'Großmengen & Paletten direkt im Container.',
      iconType: 'container' as const,
      imageUrl: containerImg,
    },
    {
      title: 'Fahrzeugversand',
      description: 'Autos & Maschinen zuverlässig nach Kenia.',
      iconType: 'car' as const,
      imageUrl: carImg,
    },
  ];

  const processSteps = [
    {
      icon: step1Img,
      title: 'Abholung',
      description: 'Wir holen Ihr Paket deutschlandweit ab.',
    },
    {
      icon: step2Img,
      title: 'Transport',
      description: 'Sicher per Container Richtung Afrika.',
    },
    {
      icon: step3Img,
      title: 'Zustellung',
      description: 'Persönliche Übergabe in Nairobi.',
    },
  ];

  const aboutParagraphs = [
    'Jumbo Logistics verbindet Menschen und Märkte zwischen Deutschland und Ostafrika.',
    'Unser Team arbeitet eng mit Partnern in Nairobi zusammen, um Ihnen einen nahtlosen Service zu bieten.',
  ];

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

      <ProcessSteps showNumbers={false} steps={processSteps} />

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
