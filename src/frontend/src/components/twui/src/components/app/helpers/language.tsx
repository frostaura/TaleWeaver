import { dictionaries } from '../config/dictionary';
import { GlobalState } from '../globalStore';

// Detect language from localStorage, <html lang>, or browser
export function detectLanguage(): string {
  const saved = localStorage.getItem('lang');
  if (saved && dictionaries[saved]) {
    console.log('[Language] Using saved language:', saved);
    return saved;
  }

  const htmlLang = document.documentElement.lang;
  if (htmlLang && dictionaries[htmlLang]) {
    console.log('[Language] Using <html lang> attribute:', htmlLang);
    return htmlLang;
  }

  const navLang = navigator.language || (navigator as any).userLanguage || 'en';
  const short = navLang.split('-')[0];
  if (dictionaries[short]) {
    console.log('[Language] Using browser language:', short);
    return short;
  }

  console.log('[Language] Falling back to default language: en');
  return 'en';
}

// Switch language dynamically
export function setLanguage(state: GlobalState, lang: string) {
  if (!dictionaries[lang]) {
    console.warn(`[Language] Unsupported language: ${lang}, falling back to 'en'`);
    lang = 'en';
  }
  state.lang = lang;
  state.dictionary = dictionaries[lang];
  localStorage.setItem('lang', lang);
  console.log('[Language] Language switched to:', lang);
}

// Translation helper
export function t(state: GlobalState, path: string): string {
  const keys = path.split('.');

  // Look up in current language
  const current = keys.reduce((obj: any, key: string) => obj?.[key], state.dictionary);

  if (current) return current;

  // Fallback to English
  const fallback = keys.reduce((obj: any, key: string) => obj?.[key], dictionaries['en']);

  if (fallback) {
    console.warn(`[Language] Missing translation for "${path}" in "${state.lang}", falling back to EN`);
    return fallback;
  }

  // Last resort: return the path itself
  return path;
}
