import React, { createContext, useState, useContext, ReactNode } from 'react';

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
    en: 'Strike unmanned aerial vehicles. Advanced tactical aircraft-drone systems with multi-purpose capabilities. Designed for defensive operations using the latest technologies to ensure dominance on the battlefield.',
    uk: 'Ударні безпілотні літальні апарати. Передові тактичні системи літаків-дронів з багатоцільовими можливостями. Розроблені для оборонних операцій з використанням новітніх технологій для забезпечення домінування на полі бою.'
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
    en: '"KORTYK" DOCS',
    uk: '"КОРТИК"'
  },
  'sidebar.akinakDocs': {
    en: '"AKINAK" DOCS',
    uk: '"АКІНАК"'
  },
  'sidebar.commandCenter': {
    en: 'COMMAND CENTER:',
    uk: 'КОНТАКТНИЙ ЦЕНТР:'
  },
  'sidebar.location': {
    en: 'LOCATION:',
    uk: 'РОЗТАШУВАННЯ:'
  },
  'sidebar.locationValue': {
    en: 'AirBlock Technical Center, Ukraine',
    uk: 'Технічний центр AirBlock, Україна'
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
    uk: 'ВРАЖАЮЧА ДАЛЬНІСТЬ ПОЛЬОТУ'
  },
  'feature.longRangeDesc': {
    en: 'Maximum flight range - 100 km',
    uk: 'Максимальна дальність польоту - 100 км'
  },
  'feature.optics': {
    en: 'ADVANCED OPTICS',
    uk: 'ПЕРЕДОВА ОПТИКА'
  },
  'feature.opticsDesc': {
    en: 'Multi-spectrum imaging with thermal and night vision',
    uk: 'Мультиспектральне зображення з тепловим та нічним баченням'
  },
  'feature.comms': {
    en: 'SECURE COMMS',
    uk: 'ЗАХИЩЕНИЙ ЗВ\'ЯЗОК'
  },
  'feature.commsDesc': {
    en: 'Encrypted communication with anti-jamming protection',
    uk: 'Шифрований зв\'язок із захистом від перешкод'
  },
  'feature.precision': {
    en: 'PRECISION SYSTEMS',
    uk: 'СИСТЕМИ ТОЧНОГО НАВЕДЕННЯ'
  },
  'feature.precisionDesc': {
    en: 'Sub-meter targeting accuracy with GPS-denied capability',
    uk: 'Субметрова точність наведення з можливістю роботи без GPS'
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
  }
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