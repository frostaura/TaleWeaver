import { createStore } from '@stencil/store';
import { dictionaries, Dictionary } from './config/dictionary';
import { detectLanguage, setLanguage as _setLanguage, t } from './helpers/language';

export interface GlobalState {
  dictionary?: Dictionary;
  lang?: string;
}

const detectedLang = detectLanguage();

const { state } = createStore<GlobalState>({
  dictionary: dictionaries[detectedLang],
  lang: detectedLang,
});

function setLanguage(lang: string) {
  state.lang = lang;
  state.dictionary = dictionaries[lang];
}

// Generic get/set
function set(path: string, value: any) {
  const keys = path.split('.');
  const topKey = keys[0] as keyof GlobalState;
  const target = state[topKey];
  if (!target || typeof target !== 'object') return;

  const clone: any = { ...(target as object) };
  let ref: any = clone;

  for (let i = 1; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in ref)) ref[key] = {};
    ref = ref[key];
  }

  ref[keys[keys.length - 1]] = value;
  (state as any)[topKey] = clone;
}

function get(path: string) {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], state);
}

// Expose globally
(window as any).global = {
  state,
  set,
  get,
  setLanguage,
  t: (path: string) => t(state, path),
};

export default state;
export { setLanguage };
