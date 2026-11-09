import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'kn';

export interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation & Header
    brand_name: 'Quick Fix',
    brand_pro: 'Pro',
    brand_subtitle: 'Service Centre',
    tagline: "Bangalore's Multi-Brand Appliance Repair • 8095996638",
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_services: 'Services & Pricing',
    nav_contact: 'Contact Us',
    nav_admin: 'Admin',
    nav_before_after: 'Before & After',
    nav_faq: 'Warranty & FAQ',
    btn_book_service: 'Book a Service',
    btn_track_service: 'Track Service',
    btn_sign_in: 'Sign In',
    btn_my_repairs: 'My Repairs',
    btn_call_now: 'Hotline: +91 80959 96638',
    btn_whatsapp: 'WhatsApp Catalog',
    warranty_badge: '6-Month Written Warranty',
    customers_badge: '5,000+ Happy Customers',
    inspection_waived: 'Proper Rates with ₹199 Inspection Waived',

    // Hero Section
    hero_locality_kicker: 'NAMMA BENGALURU • Central, South, East, North & West Rapid Hubs',
    hero_title_1: 'Expert Appliance Repair at Your',
    hero_title_2: 'Doorstep in Bangalore',
    hero_description: 'Fast, reliable & transparent doorstep repairs for Washing Machines, Refrigerators, Air Conditioners & Microwaves across all Bangalore neighborhoods.',
    hero_stat_engineers: 'Certified Senior Technicians',
    hero_stat_warranty: '6-Month Written Warranty',
    hero_stat_eta: '45-Min Emergency Dispatch',
    hero_cta_book: 'Book Doorstep Visit Now',
    hero_cta_packages: 'Explore Care Packages',

    // Services
    service_wm: 'Washing Machine Repair',
    service_ref: 'Refrigerator Repair',
    service_ac: 'Air Conditioner Service',
    service_mw: 'Microwave Oven Repair',
    service_starting_from: 'Starting from',
    service_covers: 'Covers',
    service_fixes: 'Common Fixes',
    service_book_btn: 'Book Service',

    // Common CTAs
    language_label: 'Language',
    language_english: 'English',
    language_kannada: 'ಕನ್ನಡ (Kannada)',
    theme_appearance: 'Theme Appearance',
    theme_light: 'Light Mode',
    theme_dark: 'Dark Mode',
    admin_portal: 'Admin Portal',
    copyright: '© 2026 Quick Fix Pro Service Centre Bengaluru. All rights reserved.'
  },
  kn: {
    // Navigation & Header
    brand_name: 'ಕ್ವಿಕ್ ಫಿಕ್ಸ್',
    brand_pro: 'ಪ್ರೋ',
    brand_subtitle: 'ಸರ್ವಿಸ್ ಸೆಂಟರ್',
    tagline: 'ಬೆಂಗಳೂರಿನ ಅತ್ಯುತ್ತಮ ಮಲ್ಟಿ-ಬ್ರ್ಯಾಂಡ್ ಉಪಕರಣ ರಿಪೇರಿ • 8095996638',
    nav_home: 'ಮುಖಪುಟ',
    nav_about: 'ನಮ್ಮ ಬಗ್ಗೆ',
    nav_services: 'ಸೇವೆಗಳು ಮತ್ತು ದರಗಳು',
    nav_contact: 'ಸಂಪರ್ಕಿಸಿ',
    nav_admin: 'ಅಡ್ಮಿನ್',
    nav_before_after: 'ಚಿತ್ರಗಳು (ಮುಂಚೆ/ನಂತರ)',
    nav_faq: 'ವಾರಂಟಿ ಮತ್ತು ಪ್ರಶ್ನೋತ್ತರ',
    btn_book_service: 'ಬುಕಿಂಗ್ ಮಾಡಿ',
    btn_track_service: 'ಸ್ಟೇಟಸ್ ಟ್ರ್ಯಾಕ್',
    btn_sign_in: 'ಸೈನ್ ಇನ್',
    btn_my_repairs: 'ನನ್ನ ರಿಪೇರಿಗಳು',
    btn_call_now: 'ಹೋಟ್‌ಲೈನ್: +91 80959 96638',
    btn_whatsapp: 'ವಾಟ್ಸಾಪ್ ಕ್ಯಾಟಲಾಗ್',
    warranty_badge: '೬ ತಿಂಗಳ ಲಿಖಿತ ವಾರಂಟಿ',
    customers_badge: '೫,೦೦೦+ ತೃಪ್ತಿಕರ ಗ್ರಾಹಕರು',
    inspection_waived: 'ನ್ಯಾಯಯುತ ದರ • ₹೧೯೯ ತಪಾಸಣಾ ಶುಲ್ಕ ಉಚಿತ',

    // Hero Section
    hero_locality_kicker: 'ನಮ್ಮ ಬೆಂಗಳೂರು • ಸೆಂಟ್ರಲ್, ಸೌತ್, ಈಸ್ಟ್, ನಾರ್ತ್ ಮತ್ತು ವೆಸ್ಟ್ ರಾಪಿಡ್ ಹಬ್‌ಗಳು',
    hero_title_1: 'ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಲ್ಲೇ ತಜ್ಞ',
    hero_title_2: 'ಉಪಕರಣ ರಿಪೇರಿ ಸೇವೆ',
    hero_description: 'ಬೆಂಗಳೂರಿನ ಎಲ್ಲಾ ಪ್ರದೇಶಗಳಲ್ಲಿ ವಾಷಿಂಗ್ ಮೆಷಿನ್, ಫ್ರಿಡ್ಜ್, ಎಸಿ ಮತ್ತು ಮೈಕ್ರೋವೇವ್‌ಗಳಿಗೆ ವೇಗದ ಮತ್ತು ಪಾರದರ್ಶಕ ಮನೆ ಬಾಗಿಲ ರಿಪೇರಿ.',
    hero_stat_engineers: 'ಪ್ರಮಾಣೀಕೃತ ಹಿರಿಯ ಎಂಜಿನಿಯರ್‌ಗಳು',
    hero_stat_warranty: '೬ ತಿಂಗಳ ಲಿಖಿತ ವಾರಂಟಿ',
    hero_stat_eta: '೪೫ ನಿಮಿಷಗಳ ತುರ್ತು ಭೇಟಿ',
    hero_cta_book: 'ಈಗಲೇ ಮನೆ ಬಾಗಿಲ ಸೇವೆಯನ್ನು ಬುಕ್ ಮಾಡಿ',
    hero_cta_packages: 'ಕೇರ್ ಪ್ಯಾಕೇಜ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ',

    // Services
    service_wm: 'ವಾಷಿಂಗ್ ಮೆಷಿನ್ ರಿಪೇರಿ',
    service_ref: 'ರೆಫ್ರಿಜರೇಟರ್ ರಿಪೇರಿ',
    service_ac: 'ಏರ್ ಕಂಡಿಷನರ್ ಸರ್ವಿಸ್',
    service_mw: 'ಮೈಕ್ರೋವೇವ್ ಓವನ್ ರಿಪೇರಿ',
    service_starting_from: 'ಆರಂಭಿಕ ದರ',
    service_covers: 'ಒಳಗೊಂಡಿದೆ',
    service_fixes: 'ಸಾಮಾನ್ಯ ಪರಿಹಾರಗಳು',
    service_book_btn: 'ಸರ್ವಿಸ್ ಬುಕ್ ಮಾಡಿ',

    // Common CTAs
    language_label: 'ಭಾಷೆ',
    language_english: 'English',
    language_kannada: 'ಕನ್ನಡ (Kannada)',
    theme_appearance: 'ಥೀಮ್',
    theme_light: 'ಲೈಟ್ ಮೋಡ್',
    theme_dark: 'ಡಾರ್ಕ್ ಮೋಡ್',
    admin_portal: 'ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್',
    copyright: '© ೨೦೨೬ ಕ್ವಿಕ್ ಫಿಕ್ಸ್ ಪ್ರೋ ಸರ್ವಿಸ್ ಸೆಂಟರ್ ಬೆಂಗಳೂರು. ಸರ್ವ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('quickfixpro_lang') as Language | null;
      if (savedLang === 'en' || savedLang === 'kn') {
        return savedLang;
      }
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('quickfixpro_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'kn' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
