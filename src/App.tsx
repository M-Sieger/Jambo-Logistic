import './styles/variables.css';

import React, { useEffect } from 'react';

import AOS from 'aos';

// 🖼️ Bilder & Assets
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
import WhatsAppButton from './components/WhatsAppButton'; // ✅ Sticky WhatsApp
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

  //  3-Schritte-Prozess
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

  return (
    <DefaultLayout>
      {/* Sticky WhatsApp Button (global, über allen Sections) */}
      <WhatsAppButton phoneNumber="491234567890" />

      {/* SECTION 1: Hero – Einstieg, kein Divider davor */}
      <Hero
        imageUrl={heroBackground}
        variant="dark"
      />

      {/* SECTION 2: Services – liegt auf dunklem Theme */}
      <section id="services" data-theme="dark">
        <Services />
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
      <AboutBox />

      {/* Divider 3: About → Trust
          Zweck: Weicher, emotionaler Übergang in Social Proof */}
      <SectionDivider variant="wave" height="80px" />

      {/* SECTION 5: Trust – alternativer Abschnitt (leicht abgesetzt) */}
      <section id="trust" className="section section--alt">
        <div className="container">
          <TrustSection />
        </div>
      </section>

      {/* Divider 4: Trust → Contact
          Zweck: Ruhig & dezent, damit Formular direkt wirkt */}
      <SectionDivider variant="straight" height="64px" />

      {/* SECTION 6: Contact – Abschluss/Conversion */}
      <section id="contact">
        <Contact
          whatsappNumber="491234567890"
          email="kontakt@jambologistics.com"
          phone="+49 123 456 789"
        />
      </section>
    </DefaultLayout>
  );
};

export default App;
