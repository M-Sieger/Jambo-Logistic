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
  // CTA
  cta: {
    primary: string;
    consultation: string;
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
    },
    language: {
      title: 'Lugha',
    },
  },
};

export const getTranslations = (lang: LanguageCode): Translations => {
  return translations[lang] || translations.DE;
};
