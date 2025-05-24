import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '../src/locales/ar/translation.json'
import en from '../src/locales/en/translation.json'
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation:en ,
    },
    ar: {
      translation: ar,
    },
  },
  lng: localStorage.getItem('language') || 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
