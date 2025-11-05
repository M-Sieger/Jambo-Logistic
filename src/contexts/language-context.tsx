// ---------------------------------------------------------
// Datei: language-context.tsx
// Zweck: Globaler Sprach-Context (DE, EN, SW) mit Persistenz
// Besonderheiten:
// - Persistiert Auswahl in localStorage
// - Setzt <html lang="..."> für SEO/A11y
// - Stellt Übersetzungen via React Context bereit
// Stand: 05.11.2025
// ---------------------------------------------------------

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getTranslations,
  type LanguageCode,
  type Translations,
} from '../i18n/translations';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  flag: string;
  locale: string; // ISO-Locale (de, en, sw)
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪', locale: 'de' },
  { code: 'EN', label: 'English', flag: '🇬🇧', locale: 'en' },
  { code: 'SW', label: 'Kiswahili', flag: '🇰🇪', locale: 'sw' },
];

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  translations: Translations;
  options: LanguageOption[];
}

const STORAGE_KEY = 'jambo-language';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getInitialLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') {
    return 'DE';
  }

  const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  if (saved && LANGUAGE_OPTIONS.some((option) => option.code === saved)) {
    return saved;
  }

  const browserLang = window.navigator.language?.toLowerCase() ?? 'de';
  if (browserLang.startsWith('en')) return 'EN';
  if (browserLang.startsWith('sw')) return 'SW';
  return 'DE';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, language);

    const htmlElement = window.document.documentElement;
    const option = LANGUAGE_OPTIONS.find((item) => item.code === language);
    htmlElement.lang = option?.locale ?? 'de';
  }, [language]);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState((prev) => (prev === code ? prev : code));
  };

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    translations: getTranslations(language),
    options: LANGUAGE_OPTIONS,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};

export type { LanguageCode } from '../i18n/translations';
