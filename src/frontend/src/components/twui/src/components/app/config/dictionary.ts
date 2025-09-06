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
};
