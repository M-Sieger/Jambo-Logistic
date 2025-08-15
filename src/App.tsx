import React, { useEffect } from 'react';

import AOS from 'aos';

// 🖼️ Bilder & Assets
import teamImage from './assets/about-team.jpg';
import mapImage from './assets/nairobi-map.png';
import serviceBackground from './assets/services-bg-savanna.jpg';
import heroBackground from './assets/ship-container.jpg';
import stepAnnahmeImg from './assets/step1-anfrage.jpg';
import stepTransportImg from './assets/step2-abholung.jpg';
import stepZustellungImg from './assets/step4-nairobi.jpg';
// 🧩 Komponenten
import AboutBox from './components/AboutBox';
import Contact from './components/Contact';
import Hero from './components/Hero';
import ProcessSteps from './components/ProcessSteps';
import SectionDivider from './components/SectionDivider'; // ✅ Divider
import Services from './components/Services';
import TrustSection from './components/TrustSection';
import DefaultLayout from './layouts/DefaultLayout';

const App: React.FC = () => {
  // AOS einmal global initialisieren (Animationen sanft & unaufdringlich)
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 100,
    });
  }, []);

  // 💡 Services (Dummy – bei dir schon definiert)
  const services = [ /* … */ ];

  // 🔧 3-Schritte-Prozess
  const processSteps = [
    {
      icon: stepAnnahmeImg,
      title: 'Annahme',
      description:
        'Bring dein Paket persönlich nach Essen (NRW) oder sende es bequem per Post. Abholung in NRW folgt bald.',
    },
    {
      icon: stepTransportImg,
      title: 'Transport',
      description:
        'Dein Paket reist sicher im Container nach Kenia. Persönliche Updates statt Tracking-App.',
    },
    {
      icon: stepZustellungImg,
      title: 'Zustellung',
      description:
        'Wir melden uns, sobald dein Paket in Nairobi angekommen ist – Abholung im Lager ganz einfach.',
    },
  ];

  const aboutParagraphs = [ /* … */ ];

  return (
    <DefaultLayout>
      {/* SECTION 1: Hero – Einstieg, kein Divider davor */}
      <Hero
        headline="Von deiner Tür bis nach Nairobi."
        subline="Klar. Schnell. Zuverlässig. Für dich nach Kenia."
        ctaLabel="Jetzt anfragen"
        imageUrl={heroBackground}
        variant="dark"
      />

      {/* SECTION 2: Services – liegt auf dunklem Theme */}
      <section id="services" data-theme="dark">
        <Services
          services={services}
          columns={3}
          backgroundImage={serviceBackground}
        />
      </section>

      {/* Divider 1: Services → Process
          Zweck: Dunkel → Hell mit klarer Kante */}
      <SectionDivider variant="diagonal" height="88px" />

      {/* SECTION 3: Process – heller Block */}
      <section id="process">
        <ProcessSteps steps={processSteps} />
      </section>

      {/* Divider 2: Process → About
          Zweck: Ruhige Trennung, keine starke visuelle Unterbrechung */}
      <SectionDivider variant="straight" height="64px" />

      {/* SECTION 4: About – heller Info-Block */}
      <section id="about">
        <AboutBox
          headline="Wer wir sind"
          paragraphs={aboutParagraphs}
          imageUrl={teamImage}
          variant="light"
          imagePosition="right"
        />
      </section>

      {/* Divider 3: About → Trust
          Zweck: Weicher, emotionaler Übergang in Social Proof */}
      <SectionDivider variant="wave" height="80px" />

      {/* SECTION 5: Trust – alternativer Abschnitt (leicht abgesetzt) */}
      <section id="trust" className="section section--alt">
        <div className="container">
          <TrustSection
            showLogos={false}  // später true + partners übergeben
            withQuote={true}
            emphasisIndex={0}
          />
        </div>
      </section>

      {/* Divider 4: Trust → Contact
          Zweck: Ruhig & dezent, damit Formular direkt wirkt */}
      <SectionDivider variant="straight" height="64px" />

      {/* SECTION 6: Contact – Abschluss/Conversion */}
      <section id="contact">
        <Contact
          whatsappUrl="https://wa.me/491234567890"
          email="kontakt@jambologistics.com"
          mapImage={mapImage}
        />
      </section>
    </DefaultLayout>
  );
};

export default App;
