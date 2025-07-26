import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type Language = 'uk' | 'en';

interface Translations {
  [key: string]: {
    en: string;
    uk: string;
  };
}

// Define all translations here
const translations: Translations = {
  // Header
  'header.title': {
    en: 'UKRAINE AIRBLOCK',
    uk: 'UKRAINE AIRBLOCK'
  },
  'header.description': {
    en: 'Strike and reconnaissance unmanned aerial complexes',
    uk: 'Ударно-розвідувальні безпілотні літальні комплекси'
  },
  
  // Sidebar
  'sidebar.models': {
    en: 'MODELS:',
    uk: 'МОДЕЛІ:'
  },
  'sidebar.militaryGrade': {
    en: 'MILITARY GRADE',
    uk: 'ВІЙСЬКОВОГО ПРИЗНАЧЕННЯ'
  },
  'sidebar.missionStatus': {
    en: 'MISSION STATUS:',
    uk: 'СТАТУС МІСІЇ:'
  },
  'sidebar.operational': {
    en: 'OPERATIONAL',
    uk: 'РОБОЧИЙ'
  },
  'sidebar.documentation': {
    en: 'TECHNICAL DOCUMENTATION:',
    uk: 'ТЕХНІЧНА ДОКУМЕНТАЦІЯ:'
  },
  'sidebar.kortyDocs': {
    en: '"KORTYK"',
    uk: '"КОРТИК"'
  },
  'sidebar.barbosDocs': {
    en: '"BARBOS"',
    uk: '"БАРБОС"'
  },
  'sidebar.krokDocs': {
    en: '"KROK"',
    uk: '"КРОК"'
  },
  'sidebar.kibecDocs': {
    en: '"KIBEC"',
    uk: '"КІБЕЦЬ"'
  },
  'sidebar.commandCenter': {
    en: 'COMMAND CENTER:',
    uk: 'КОНТАКТИ:'
  },
  'sidebar.location': {
    en: 'LOCATION:',
    uk: 'РОЗТАШУВАННЯ:'
  },
  'sidebar.locationValue': {
    en: 'AirBlock Technical Center, Ukraine',
    uk: 'AirBlock Технічний центр, Україна'
  },
  'sidebar.communication': {
    en: 'COMMUNICATION:',
    uk: 'ЗВ\'ЯЗОК:'
  },
  'sidebar.channel': {
    en: 'CHANNEL:',
    uk: 'ПОШТА:'
  },
  
  // Features
  'feature.longRange': {
    en: 'AMAZING LONG RANGE',
    uk: 'ДАЛЬНІСТЬ ПОЛЬОТУ'
  },
  'feature.longRangeDesc': {
    en: 'Maximum flight range - 100 km',
    uk: 'Максимальна дальність польоту - 100 км'
  },
  'feature.optics': {
    en: 'OPTICS',
    uk: 'ОПТИКА'
  },
  'feature.opticsDesc': {
    en: 'High-quality optical sensors',
    uk: 'Високоякісні оптичні сенсори'
  },
  'feature.comms': {
    en: 'SECURE COMMS AND NAVIGATION',
    uk: 'ЗАХИЩЕНИЙ ЗВ\'ЯЗОК ТА НАВІГАЦІЯ'
  },
  'feature.commsDesc': {
    en: 'Encrypted communication with anti-jamming protection',
    uk: 'Шифрований зв\'язок із захистом від перешкод'
  },
  'feature.precision': {
    en: 'MODERN TARGETING SYSTEMS',
    uk: 'СУЧАСНІ ПРИЦІЛЮВАЛЬНІ СИСТЕМИ'
  },
  'feature.precisionDesc': {
    en: 'Automatic target homing',
    uk: 'Автоматичне донаведення на ціль'
  },
  // HUD elements
  'hud.targetAcquisition': {
    en: 'TARGET ACQUISITION SYSTEM',
    uk: 'СИСТЕМА ЗАХОПЛЕННЯ ЦІЛІ'
  },
  'hud.systemReady': {
    en: 'SYSTEM READY',
    uk: 'СИСТЕМА ГОТОВА'
  },
  
  // Language switch
  'lang.switch': {
    en: 'UA',
    uk: 'EN'
  },

  // Menu items
  'menu.techDocs': {
    en: 'Specifications',
    uk: 'Опис'
  },
  'menu.photos': {
    en: 'Photos',
    uk: 'Фото'
  },
  'menu.videos': {
    en: 'Videos',
    uk: 'Відео'
  },
};

interface LangContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uk');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LangContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = (): LangContextType => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}; 