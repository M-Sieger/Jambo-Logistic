import React, { useEffect } from 'react';
import AOS from 'aos';

// Import all images
import heroImage from './assets/hero.jpg';
import teamImage from './assets/about-team.jpg';
import step1Img from './assets/warehouse.jpg';
import step2Img from './assets/receiving-kenya.jpg';
import step3Img from './assets/worker-smiling.jpg';
import mapImage from './assets/nairobi-map.png';
import containerIcon from './assets/ship-container.jpg';

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
      title: 'Paketversand 📦',
      description: 'Kleine Sendungen sicher & schnell nach Afrika. Perfekt für persönliche Gegenstände und Geschenke.',
      icon: '📦',
      bgClass: 'cardCartons',
    },
    {
      title: 'Containertransport 🚛',
      description: 'Großmengen & Paletten direkt im Container. Ideal für Unternehmen und größere Sendungen.',
      icon: '🚛',
      bgClass: 'cardContainer',
    },
    {
      title: 'Fahrzeugversand 🚙',
      description: 'Autos & Maschinen zuverlässig nach Kenia. Komplette Abwicklung von der Verschiffung bis zur Ankunft.',
      icon: '🚙',
      bgClass: 'cardCar',
    },
  ];

  const processSteps = [
    {
      icon: step1Img,
      title: 'Abholung',
      description: 'Wir holen Ihr Paket deutschlandweit direkt an der Haustür ab.',
    },
    {
      icon: step2Img,
      title: 'Transport',
      description: 'Ihre Sendung reist sicher per Container Richtung Afrika.',
    },
    {
      icon: step3Img,
      title: 'Zustellung',
      description: 'In Nairobi übergeben wir persönlich an den Empfänger.',
    },
  ];

  const aboutParagraphs = [
    'Jumbo Logistics verbindet Menschen und Märkte zwischen Deutschland und Ostafrika. Mit jahrelanger Erfahrung im internationalen Transport verstehen wir die besonderen Herausforderungen und Bedürfnisse unserer Kunden.',
    'Unser Team aus erfahrenen Logistik-Experten arbeitet eng mit vertrauenswürdigen Partnern in Nairobi zusammen, um Ihnen einen nahtlosen Service von Tür zu Tür zu bieten. Dabei steht die Sicherheit Ihrer Sendung und Ihre Zufriedenheit immer an erster Stelle.',
  ];

  return (
    <DefaultLayout>
      <Hero
        headline="Von deiner Tür bis nach Nairobi."
        subline="Klar. Schnell. Zuverlässig. Für dich nach Kenia."
        ctaLabel="Jetzt anfragen"
        imageUrl={heroImage}
        variant="dark"
      />

      <Services
        services={services}
        columns={3}
        containerIcon={containerIcon}
      />

      <ProcessSteps
        showNumbers={false}
        steps={processSteps}
      />

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

