export interface Strings {
  titles: {
    customstory?: string;
    onboarding?: string;
    parentallock?: string;
    privacy?: string;
    profile?: string;
    quickstory?: string;
    settings?: string;
    upgrade?: string;
  };
}

export interface Dictionary {
  strings?: Strings;
}

export interface Dictionaries {
  [lang: string]: Dictionary;
}

// Multi-language dictionaries
export const dictionaries: Dictionaries = {
  en: {
    strings: {
      titles: {
        customstory: 'Custom Story',
        onboarding: 'Onboarding',
        parentallock: 'Parental Lock',
        privacy: 'Privacy',
        profile: 'Profile',
        quickstory: 'Quick Story',
        settings: 'Settings',
        upgrade: 'Upgrade',
      },
    },
  },

  es: {
    strings: {
      titles: {
        customstory: 'Historia personalizada',
        onboarding: 'Introducción',
        parentallock: 'Control parental',
        privacy: 'Privacidad',
        profile: 'Perfil',
        quickstory: 'Historia rápida',
        settings: 'Configuración',
        upgrade: 'Mejorar',
      },
    },
  },

  de: {
    strings: {
      titles: {
        customstory: 'Eigene Geschichte',
        onboarding: 'Einführung',
        parentallock: 'Kindersicherung',
        privacy: 'Datenschutz',
        profile: 'Profil',
        quickstory: 'Schnellgeschichte',
        settings: 'Einstellungen',
        upgrade: 'Upgrade',
      },
    },
  },
};
