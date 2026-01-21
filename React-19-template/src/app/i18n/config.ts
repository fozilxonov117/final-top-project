import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './ru/translation.json';
import uz from './uz/translation.json';
import en from './en/translation.json';

// Get saved language from localStorage or detect browser language
const savedLanguage = localStorage.getItem('language');
const supportedLanguages = ['ru', 'uz', 'en'];
const detectedLanguage = navigator.language.split('-')[0];
const defaultLanguage = savedLanguage || 
  (supportedLanguages.includes(detectedLanguage) ? detectedLanguage : 'ru');

i18next
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    
    resources: {
      ru: {
        translation: ru,
      },
      uz: {
        translation: uz,
      },
      en: {
        translation: en,
      },
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

// Save language preference whenever it changes
i18next.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  // Update document language attribute for accessibility
  document.documentElement.lang = lng;
});

export default i18next;
