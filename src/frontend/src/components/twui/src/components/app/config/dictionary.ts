export interface Strings {
  pages: {
    customstory?: {
      title?: string;
      subtitle?: string;
    };
    onboarding?: {
      title?: string;
      subtitle?: string;
    };
    parentallock?: {
      title?: string;
      subtitle?: string;
    };
    privacy?: {
      title?: string;
      subtitle?: string;
    };
    profile?: {
      title?: string;
      subtitle?: string;
    };
    quickstory?: {
      title?: string;
      subtitle?: string;
    };
    settings?: {
      title?: string;
      subtitle?: string;
    };
    upgrade?: {
      title?: string;
      subtitle?: string;
    };
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
      pages: {
        customstory: {
          title: 'Custom Story',
          subtitle: 'Create your own adventure',
        },
        onboarding: {
          title: 'Onboarding',
          subtitle: 'Get started quickly',
        },
        parentallock: {
          title: 'Parental Lock',
          subtitle: 'Keep your kids safe',
        },
        privacy: {
          title: 'Privacy',
          subtitle: 'Manage your data and security',
        },
        profile: {
          title: 'Profile',
          subtitle: 'Update your personal details',
        },
        quickstory: {
          title: 'Quick Story',
          subtitle: 'Jump into a fast experience',
        },
        settings: {
          title: 'Settings',
          subtitle: 'Customise your experience',
        },
        upgrade: {
          title: 'Upgrade',
          subtitle: 'Unlock premium features',
        },
      },
    },
  },
  es: {
    strings: {
      pages: {
        customstory: {
          title: 'Historia personalizada',
          subtitle: 'Crea tu propia aventura',
        },
        onboarding: {
          title: 'Introducción',
          subtitle: 'Comienza rápidamente',
        },
        parentallock: {
          title: 'Control parental',
          subtitle: 'Mantén seguros a tus hijos',
        },
        privacy: {
          title: 'Privacidad',
          subtitle: 'Gestiona tus datos y seguridad',
        },
        profile: {
          title: 'Perfil',
          subtitle: 'Actualiza tus datos personales',
        },
        quickstory: {
          title: 'Historia rápida',
          subtitle: 'Disfruta de una experiencia breve',
        },
        settings: {
          title: 'Configuración',
          subtitle: 'Personaliza tu experiencia',
        },
        upgrade: {
          title: 'Mejorar',
          subtitle: 'Desbloquea funciones premium',
        },
      },
    },
  },
  de: {
    strings: {
      pages: {
        customstory: {
          title: 'Eigene Geschichte',
          subtitle: 'Erstelle dein eigenes Abenteuer',
        },
        onboarding: {
          title: 'Einführung',
          subtitle: 'Starte schnell durch',
        },
        parentallock: {
          title: 'Kindersicherung',
          subtitle: 'Schütze deine Kinder',
        },
        privacy: {
          title: 'Datenschutz',
          subtitle: 'Verwalte deine Daten und Sicherheit',
        },
        profile: {
          title: 'Profil',
          subtitle: 'Aktualisiere deine persönlichen Daten',
        },
        quickstory: {
          title: 'Schnellgeschichte',
          subtitle: 'Genieße ein kurzes Erlebnis',
        },
        settings: {
          title: 'Einstellungen',
          subtitle: 'Passe dein Erlebnis an',
        },
        upgrade: {
          title: 'Upgrade',
          subtitle: 'Schalte Premium-Funktionen frei',
        },
      },
    },
  },
};
