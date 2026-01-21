import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLang = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const changeLanguage = useCallback((languageCode: string) => {
    i18n.changeLanguage(languageCode);
  }, [i18n]);

  const isRTL = locale === 'ar' || locale === 'he'; // Add more RTL languages as needed
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale).format(num);
  };

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return {
    t,
    locale,
    changeLanguage,
    isRTL,
    formatNumber,
    formatDate,
    isLoading: !i18n.isInitialized,
    supportedLanguages: ['ru', 'uz', 'en'],
  };
};
