export interface Strings {
  pages: {
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
    createstory?: {
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
        onboarding: {
          title: 'Welcome to TaleWeaver',
          subtitle: 'Your magical bedtime story maker.',
        },
        parentallock: {
          title: 'Parental Lock',
          subtitle: 'Secure your app with parental controls',
        },
        privacy: {
          title: 'Privacy',
          subtitle: 'Your childs privacy and safety are our top priority',
        },
        profile: {
          title: 'Profile',
          subtitle: 'Update your personal details',
        },
        createstory: {
          title: 'Create a Story',
          subtitle: 'Instantly generate a magical story',
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
};
