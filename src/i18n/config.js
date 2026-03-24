import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import slTranslations from './locales/sl.json';
import enTranslations from './locales/en.json';

const getInitialLanguage = () => {
  try {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    const fromUrl = path.startsWith('/en') ? 'en' : 'sl';
    if (fromUrl === 'en') return 'en';

    const stored = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    return stored === 'en' ? 'en' : 'sl';
  } catch {
    return 'sl';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      sl: {
        translation: slTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'sl',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;