// ---------------------------------------------------------
// Datei: translations.ts
// Zweck: Übersetzungen für DE/EN/SW (Deutsch, Englisch, Kiswahili)
// Stand: 05.11.2025
// ---------------------------------------------------------

export type LanguageCode = 'DE' | 'EN' | 'SW';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    process: string;
    about: string;
    contact: string;
  };
  // Hero
  hero: {
    headline: string;
    subline: string;
    cta: string;
  };
  // CTA Buttons (global)
  cta: {
    primary: string;
    consultation: string;
    getQuote: string;
    learnMore: string;
    viewProcess: string;
    contactNow: string;
  };
  // Services Section
  services: {
    title: string;
    items: {
      package: { title: string; desc: string; priceHint: string };
      container: { title: string; desc: string; priceHint: string };
      household: { title: string; desc: string; priceHint: string };
      textiles: { title: string; desc: string; priceHint: string };
    };
    cta: {
      title: string;
      description: string;
      primaryBtn: string;
      secondaryBtn: string;
    };
  };
  // Process Steps
  process: {
    title: string;
    steps: {
      pickup: { title: string; description: string };
      transport: { title: string; description: string };
      delivery: { title: string; description: string };
    };
  };
  // About Section
  about: {
    headline: string;
    mission: string;
    values: {
      global: { title: string; text: string };
      efficient: { title: string; text: string };
      personal: { title: string; text: string };
    };
    cta: string;
  };
  // Trust Section
  trust: {
    title: string;
    subtitle: string;
    metrics: {
      rating: { label: string; value: string; description: string };
      secure: { label: string; description: string };
      support: { label: string; description: string };
      response: { label: string; value: string; description: string };
    };
    testimonials: {
      customer1: { text: string; author: string; service: string };
      customer2: { text: string; author: string; service: string };
    };
  };
  // Contact Form
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: { label: string; placeholder: string; error: string };
      email: { label: string; placeholder: string; error: string; errorInvalid: string };
      phone: { label: string; placeholder: string };
      service: { label: string; placeholder: string };
      message: { label: string; placeholder: string; error: string };
      submit: string;
      submitting: string;
    };
    success: string;
    error: string;
    cards: {
      whatsapp: { title: string; description: string };
      email: { title: string; description: string };
      phone: { title: string; description: string };
    };
    callback: {
      title: string;
      button: string;
      placeholder: string;
      submit: string;
      success: string;
      error: string;
    };
  };
  // Footer
  footer: {
    company: {
      description: string;
      germany: string;
      kenya: string;
    };
    quickLinks: {
      title: string;
      services: string;
      process: string;
      about: string;
      contact: string;
    };
    legal: {
      title: string;
      privacy: string;
      terms: string;
      imprint: string;
    };
    social: {
      title: string;
      whatsapp: string;
      email: string;
      linkedin: string;
    };
    copyright: string;
  };
  // WhatsApp Button
  whatsapp: {
    label: string;
    ariaLabel: string;
  };
  // Language Switcher
  language: {
    title: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  DE: {
    nav: {
      home: 'Home',
      services: 'Services',
      process: 'Prozess',
      about: 'Über uns',
      contact: 'Kontakt',
    },
    hero: {
      headline: 'Von deiner Tür bis nach Nairobi.',
      subline: 'Klar. Schnell. Zuverlässig. Für dich nach Kenia.',
      cta: 'Jetzt anfragen',
    },
    cta: {
      primary: 'Jetzt anfragen',
      consultation: 'Kostenlose Beratung',
      getQuote: 'Angebot erhalten',
      learnMore: 'Mehr erfahren',
      viewProcess: 'Ablauf ansehen',
      contactNow: 'Jetzt Kontakt aufnehmen',
    },
    services: {
      title: 'Unsere Services',
      items: {
        package: {
          title: 'Paketversand',
          desc: 'Sicher & fair nach Nairobi – privat & geschäftlich.',
          priceHint: 'Preise auf Anfrage',
        },
        container: {
          title: 'Containertransport',
          desc: 'Planbar, dokumentiert, mit persönlichem Update.',
          priceHint: 'Individuelle Lösung',
        },
        household: {
          title: 'Haushalt & Elektronik',
          desc: 'Sorgfältig verpackt, transparent abgewickelt.',
          priceHint: 'Preise auf Anfrage',
        },
        textiles: {
          title: 'Kleidung & Textilien',
          desc: 'Sammelpakete, faire Tarife, klare Prozesse.',
          priceHint: 'Preise auf Anfrage',
        },
      },
      cta: {
        title: 'Fragen zum Versand?',
        description: 'Wir beraten dich persönlich – schnell, klar und ohne Fachjargon.',
        primaryBtn: 'Jetzt Kontakt aufnehmen',
        secondaryBtn: 'Ablauf ansehen',
      },
    },
    process: {
      title: 'So einfach funktioniert\'s',
      steps: {
        pickup: {
          title: 'Annahme',
          description: 'Bring dein Paket persönlich nach Essen (NRW) oder sende es bequem per Post. Abholung in NRW folgt bald.',
        },
        transport: {
          title: 'Transport',
          description: 'Dein Paket reist sicher im Container nach Kenia. Persönliche Updates statt Tracking-App.',
        },
        delivery: {
          title: 'Zustellung',
          description: 'Wir melden uns, sobald dein Paket in Nairobi angekommen ist – Abholung im Lager ganz einfach.',
        },
      },
    },
    about: {
      headline: 'Unsere Mission: Verbindungen schaffen, die Welten bewegen.',
      mission: 'Wir bringen Menschen zusammen – mit smarten, bezahlbaren Versandlösungen zwischen Europa und Afrika. Verlässlich, schnell und mit Herz.',
      values: {
        global: {
          title: 'Global verbunden',
          text: 'Wir verbinden Deutschland und Kenia mit einem starken Netzwerk aus lokalen Partnern und internationaler Expertise.',
        },
        efficient: {
          title: 'Effizient organisiert',
          text: 'Modernste Logistik‑Technologie und optimierte Prozesse sorgen für schnelle und kostengünstige Abwicklung.',
        },
        personal: {
          title: 'Persönlich betreut',
          text: 'Jeder Kunde erhält einen persönlichen Ansprechpartner und individuelle Beratung für seine Versandanforderungen.',
        },
      },
      cta: 'Unsere Leistungen entdecken',
    },
    trust: {
      title: 'Verlässlich von Deutschland nach Nairobi.',
      subtitle: 'Über 200 zufriedene Kunden vertrauen unserem Service.',
      metrics: {
        rating: { label: 'Top‑Bewertungen', value: '4,9/5', description: 'Zufriedenheit' },
        secure: { label: 'Sicher versenden', description: 'Optionale Versicherung' },
        support: { label: 'Direkter Ansprechpartner', description: 'DE & KE, WhatsApp/Telefon' },
        response: { label: 'Schnelle Antwort', value: '≤ 24 h', description: 'Mo–Sa' },
      },
      testimonials: {
        customer1: {
          text: 'Macha hat meinen Container pünktlich nach Nairobi gebracht. Toller Service!',
          author: 'Peter M., Essen',
          service: 'Container-Transport',
        },
        customer2: {
          text: 'Schnell, zuverlässig und persönlich. Genau was ich gesucht habe.',
          author: 'Sarah K., Diaspora',
          service: 'Paketversand',
        },
      },
    },
    contact: {
      title: 'Kontakt aufnehmen',
      subtitle: 'Bereit für Ihren Transport nach Kenia? Kontaktieren Sie uns für ein unverbindliches Angebot.',
      form: {
        name: { label: 'Name', placeholder: 'Ihr vollständiger Name', error: 'Bitte Namen eingeben.' },
        email: { label: 'E-Mail', placeholder: 'ihre.email@beispiel.de', error: 'Bitte E‑Mail eingeben.', errorInvalid: 'Bitte gültige E‑Mail eingeben.' },
        phone: { label: 'Telefon (optional)', placeholder: '+49 123 456 789' },
        service: { label: 'Service', placeholder: 'Wählen Sie einen Service' },
        message: { label: 'Nachricht', placeholder: 'Beschreiben Sie Ihren Versandbedarf...', error: 'Bitte Nachricht eingeben.' },
        submit: 'Nachricht senden',
        submitting: 'Wird gesendet...',
      },
      success: 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden.',
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      cards: {
        whatsapp: { title: 'WhatsApp', description: 'Schnelle Antwort via WhatsApp' },
        email: { title: 'E-Mail', description: 'Schreiben Sie uns eine E-Mail' },
        phone: { title: 'Telefon', description: 'Rufen Sie uns direkt an' },
      },
      callback: {
        title: 'Rückruf anfordern',
        button: 'Rückruf vereinbaren',
        placeholder: 'Ihre Telefonnummer',
        submit: 'Rückruf anfordern',
        success: 'Danke! Wir rufen Sie innerhalb von 24h zurück.',
        error: 'Bitte geben Sie eine gültige Telefonnummer ein.',
      },
    },
    footer: {
      company: {
        description: 'Verbindet Menschen und Märkte zwischen Deutschland und Ostafrika. Zuverlässiger Transport von Tür zu Tür.',
        germany: 'Deutschland',
        kenya: 'Kenia',
      },
      quickLinks: {
        title: 'Quick Links',
        services: 'Services',
        process: 'Prozess',
        about: 'Über uns',
        contact: 'Kontakt',
      },
      legal: {
        title: 'Rechtliches',
        privacy: 'Datenschutz',
        terms: 'AGB',
        imprint: 'Impressum',
      },
      social: {
        title: 'Social Media',
        whatsapp: 'WhatsApp',
        email: 'E-Mail',
        linkedin: 'LinkedIn',
      },
      copyright: '© {year} Jumbo Logistics. Alle Rechte vorbehalten.',
    },
    whatsapp: {
      label: 'WhatsApp',
      ariaLabel: 'Kontaktieren Sie uns via WhatsApp',
    },
    language: {
      title: 'Sprache',
    },
  },
  EN: {
    nav: {
      home: 'Home',
      services: 'Services',
      process: 'Process',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      headline: 'From your door to Nairobi.',
      subline: 'Clear. Fast. Reliable. For you to Kenya.',
      cta: 'Get Quote',
    },
    cta: {
      primary: 'Get Quote',
      consultation: 'Free Consultation',
      getQuote: 'Get Quote',
      learnMore: 'Learn More',
      viewProcess: 'View Process',
      contactNow: 'Contact Now',
    },
    services: {
      title: 'Our Services',
      items: {
        package: {
          title: 'Package Shipping',
          desc: 'Safe & fair to Nairobi – private & business.',
          priceHint: 'Prices on request',
        },
        container: {
          title: 'Container Transport',
          desc: 'Planned, documented, with personal updates.',
          priceHint: 'Individual solution',
        },
        household: {
          title: 'Household & Electronics',
          desc: 'Carefully packed, transparently handled.',
          priceHint: 'Prices on request',
        },
        textiles: {
          title: 'Clothing & Textiles',
          desc: 'Collective packages, fair rates, clear processes.',
          priceHint: 'Prices on request',
        },
      },
      cta: {
        title: 'Questions about shipping?',
        description: 'We advise you personally – fast, clear and without jargon.',
        primaryBtn: 'Contact Now',
        secondaryBtn: 'View Process',
      },
    },
    process: {
      title: 'How it works',
      steps: {
        pickup: {
          title: 'Pickup',
          description: 'Bring your package to Essen (NRW) or send it by mail. Pickup service in NRW coming soon.',
        },
        transport: {
          title: 'Transport',
          description: 'Your package travels safely in a container to Kenya. Personal updates instead of tracking app.',
        },
        delivery: {
          title: 'Delivery',
          description: 'We contact you as soon as your package arrives in Nairobi – pickup at warehouse made easy.',
        },
      },
    },
    about: {
      headline: 'Our Mission: Creating connections that move worlds.',
      mission: 'We bring people together – with smart, affordable shipping solutions between Europe and Africa. Reliable, fast and with heart.',
      values: {
        global: {
          title: 'Globally connected',
          text: 'We connect Germany and Kenya with a strong network of local partners and international expertise.',
        },
        efficient: {
          title: 'Efficiently organized',
          text: 'State-of-the-art logistics technology and optimized processes ensure fast and cost-effective handling.',
        },
        personal: {
          title: 'Personally supported',
          text: 'Every customer receives a personal contact person and individual advice for their shipping requirements.',
        },
      },
      cta: 'Discover Our Services',
    },
    trust: {
      title: 'Reliable from Germany to Nairobi.',
      subtitle: 'Over 200 satisfied customers trust our service.',
      metrics: {
        rating: { label: 'Top Ratings', value: '4.9/5', description: 'Satisfaction' },
        secure: { label: 'Secure Shipping', description: 'Optional Insurance' },
        support: { label: 'Direct Contact', description: 'DE & KE, WhatsApp/Phone' },
        response: { label: 'Fast Response', value: '≤ 24h', description: 'Mon–Sat' },
      },
      testimonials: {
        customer1: {
          text: 'Macha delivered my container to Nairobi on time. Great service!',
          author: 'Peter M., Essen',
          service: 'Container Transport',
        },
        customer2: {
          text: 'Fast, reliable and personal. Exactly what I was looking for.',
          author: 'Sarah K., Diaspora',
          service: 'Package Shipping',
        },
      },
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready for your transport to Kenya? Contact us for a free quote.',
      form: {
        name: { label: 'Name', placeholder: 'Your full name', error: 'Please enter your name.' },
        email: { label: 'Email', placeholder: 'your.email@example.com', error: 'Please enter your email.', errorInvalid: 'Please enter a valid email.' },
        phone: { label: 'Phone (optional)', placeholder: '+49 123 456 789' },
        service: { label: 'Service', placeholder: 'Select a service' },
        message: { label: 'Message', placeholder: 'Describe your shipping needs...', error: 'Please enter a message.' },
        submit: 'Send Message',
        submitting: 'Sending...',
      },
      success: 'Thank you! We will contact you within 24 hours.',
      error: 'An error occurred. Please try again.',
      cards: {
        whatsapp: { title: 'WhatsApp', description: 'Quick response via WhatsApp' },
        email: { title: 'Email', description: 'Send us an email' },
        phone: { title: 'Phone', description: 'Call us directly' },
      },
      callback: {
        title: 'Request Callback',
        button: 'Schedule Callback',
        placeholder: 'Your phone number',
        submit: 'Request Callback',
        success: 'Thanks! We will call you back within 24h.',
        error: 'Please enter a valid phone number.',
      },
    },
    footer: {
      company: {
        description: 'Connecting people and markets between Germany and East Africa. Reliable door-to-door transport.',
        germany: 'Germany',
        kenya: 'Kenya',
      },
      quickLinks: {
        title: 'Quick Links',
        services: 'Services',
        process: 'Process',
        about: 'About',
        contact: 'Contact',
      },
      legal: {
        title: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        imprint: 'Imprint',
      },
      social: {
        title: 'Social Media',
        whatsapp: 'WhatsApp',
        email: 'Email',
        linkedin: 'LinkedIn',
      },
      copyright: '© {year} Jumbo Logistics. All rights reserved.',
    },
    whatsapp: {
      label: 'WhatsApp',
      ariaLabel: 'Contact us via WhatsApp',
    },
    language: {
      title: 'Language',
    },
  },
  SW: {
    nav: {
      home: 'Nyumbani',
      services: 'Huduma',
      process: 'Mchakato',
      about: 'Kuhusu',
      contact: 'Mawasiliano',
    },
    hero: {
      headline: 'Kutoka mlangoni kwako hadi Nairobi.',
      subline: 'Wazi. Haraka. Ya kuaminika. Kwa ajili yako Kenya.',
      cta: 'Omba Bei',
    },
    cta: {
      primary: 'Omba Bei',
      consultation: 'Ushauri wa Bure',
      getQuote: 'Pata Bei',
      learnMore: 'Jifunze Zaidi',
      viewProcess: 'Angalia Mchakato',
      contactNow: 'Wasiliana Sasa',
    },
    services: {
      title: 'Huduma Zetu',
      items: {
        package: {
          title: 'Usafirishaji wa Pakiti',
          desc: 'Salama na bei nzuri hadi Nairobi – binafsi na biashara.',
          priceHint: 'Bei kwa maombi',
        },
        container: {
          title: 'Usafirishaji wa Kontena',
          desc: 'Iliyopangwa, inayoandikishwa, na habari za kibinafsi.',
          priceHint: 'Suluhisho la kibinafsi',
        },
        household: {
          title: 'Vifaa vya Nyumbani na Elektroniki',
          desc: 'Imefungwa kwa uangalifu, imeshughulikiwa kwa uwazi.',
          priceHint: 'Bei kwa maombi',
        },
        textiles: {
          title: 'Nguo na Vitambaa',
          desc: 'Pakiti za pamoja, bei nzuri, michakato wazi.',
          priceHint: 'Bei kwa maombi',
        },
      },
      cta: {
        title: 'Maswali kuhusu usafirishaji?',
        description: 'Tunakushauri kibinafsi – haraka, wazi na bila lugha ngumu.',
        primaryBtn: 'Wasiliana Sasa',
        secondaryBtn: 'Angalia Mchakato',
      },
    },
    process: {
      title: 'Jinsi inavyofanya kazi',
      steps: {
        pickup: {
          title: 'Kukusanya',
          description: 'Leta pakiti yako Essen (NRW) au itume kwa posta. Huduma ya kukusanya NRW inakuja hivi karibuni.',
        },
        transport: {
          title: 'Usafirishaji',
          description: 'Pakiti yako inasafiri kwa usalama katika kontena hadi Kenya. Habari za kibinafsi badala ya programu ya ufuatiliaji.',
        },
        delivery: {
          title: 'Utoaji',
          description: 'Tutawasiliana nawe pakiti yako itakapofika Nairobi – kuchukua kwenye ghala ni rahisi.',
        },
      },
    },
    about: {
      headline: 'Dhamira Yetu: Kuunda uhusiano unaosogeza ulimwengu.',
      mission: 'Tunaunganisha watu – na suluhisho la usafirishaji la busara na bei nafuu kati ya Ulaya na Afrika. Ya kuaminika, haraka na kwa moyo.',
      values: {
        global: {
          title: 'Imeunganishwa kimataifa',
          text: 'Tunaunganisha Ujerumani na Kenya na mtandao imara wa washirika wa ndani na utaalamu wa kimataifa.',
        },
        efficient: {
          title: 'Imepangwa vizuri',
          text: 'Teknolojia ya kisasa ya usafirishaji na michakato iliyoboreshwa inahakikisha ushughulikiaji wa haraka na wa bei nafuu.',
        },
        personal: {
          title: 'Inawasaidia kibinafsi',
          text: 'Kila mteja anapokea mtu wa kuwasiliana naye kibinafsi na ushauri wa kibinafsi kwa mahitaji yake ya usafirishaji.',
        },
      },
      cta: 'Gundua Huduma Zetu',
    },
    trust: {
      title: 'Ya kuaminika kutoka Ujerumani hadi Nairobi.',
      subtitle: 'Zaidi ya wateja 200 walioridhika wanaamini huduma yetu.',
      metrics: {
        rating: { label: 'Ukadiriaji Bora', value: '4.9/5', description: 'Kuridhika' },
        secure: { label: 'Usafirishaji Salama', description: 'Bima ya hiari' },
        support: { label: 'Mawasiliano ya Moja kwa Moja', description: 'DE & KE, WhatsApp/Simu' },
        response: { label: 'Jibu la Haraka', value: '≤ 24h', description: 'Jumatatu–Jumamosi' },
      },
      testimonials: {
        customer1: {
          text: 'Macha aliwasilisha kontena yangu Nairobi kwa wakati. Huduma nzuri!',
          author: 'Peter M., Essen',
          service: 'Usafirishaji wa Kontena',
        },
        customer2: {
          text: 'Haraka, ya kuaminika na kibinafsi. Hasa nilichokuwa nikitafuta.',
          author: 'Sarah K., Diaspora',
          service: 'Usafirishaji wa Pakiti',
        },
      },
    },
    contact: {
      title: 'Wasiliana Nasi',
      subtitle: 'Uko tayari kwa usafirishaji wako hadi Kenya? Wasiliana nasi kwa bei ya bure.',
      form: {
        name: { label: 'Jina', placeholder: 'Jina lako kamili', error: 'Tafadhali weka jina lako.' },
        email: { label: 'Barua pepe', placeholder: 'barua.pepe@mfano.com', error: 'Tafadhali weka barua pepe yako.', errorInvalid: 'Tafadhali weka barua pepe halali.' },
        phone: { label: 'Simu (si lazima)', placeholder: '+254 123 456 789' },
        service: { label: 'Huduma', placeholder: 'Chagua huduma' },
        message: { label: 'Ujumbe', placeholder: 'Eleza mahitaji yako ya usafirishaji...', error: 'Tafadhali weka ujumbe.' },
        submit: 'Tuma Ujumbe',
        submitting: 'Inatuma...',
      },
      success: 'Asante! Tutawasiliana nawe ndani ya masaa 24.',
      error: 'Hitilafu imetokea. Tafadhali jaribu tena.',
      cards: {
        whatsapp: { title: 'WhatsApp', description: 'Jibu la haraka kupitia WhatsApp' },
        email: { title: 'Barua pepe', description: 'Tutumie barua pepe' },
        phone: { title: 'Simu', description: 'Tupigie moja kwa moja' },
      },
      callback: {
        title: 'Omba Kupigwa Simu',
        button: 'Panga Kupigwa Simu',
        placeholder: 'Nambari yako ya simu',
        submit: 'Omba Kupigwa Simu',
        success: 'Asante! Tutakupigia simu ndani ya masaa 24.',
        error: 'Tafadhali weka nambari halali ya simu.',
      },
    },
    footer: {
      company: {
        description: 'Kuunganisha watu na masoko kati ya Ujerumani na Afrika Mashariki. Usafirishaji wa kuaminika kutoka mlangoni hadi mlangoni.',
        germany: 'Ujerumani',
        kenya: 'Kenya',
      },
      quickLinks: {
        title: 'Viungo vya Haraka',
        services: 'Huduma',
        process: 'Mchakato',
        about: 'Kuhusu',
        contact: 'Mawasiliano',
      },
      legal: {
        title: 'Kisheria',
        privacy: 'Sera ya Faragha',
        terms: 'Masharti ya Huduma',
        imprint: 'Chapa',
      },
      social: {
        title: 'Mitandao ya Kijamii',
        whatsapp: 'WhatsApp',
        email: 'Barua pepe',
        linkedin: 'LinkedIn',
      },
      copyright: '© {year} Jumbo Logistics. Haki zote zimehifadhiwa.',
    },
    whatsapp: {
      label: 'WhatsApp',
      ariaLabel: 'Wasiliana nasi kupitia WhatsApp',
    },
    language: {
      title: 'Lugha',
    },
  },
};

export const getTranslations = (lang: LanguageCode): Translations => {
  return translations[lang] || translations.DE;
};
