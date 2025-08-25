import { useState, useEffect } from 'react';
import { i18n, TranslationKey } from '../utils/i18n';

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    try {
      const lang = i18n.getCurrentLanguage();
      setCurrentLanguage(lang);
      
      const unsubscribe = i18n.subscribe(() => {
        setCurrentLanguage(i18n.getCurrentLanguage());
      });

      return unsubscribe;
    } catch (error) {
      console.error('useTranslation initialization error:', error);
      return () => {};
    }
  }, []);

  const t = (key: TranslationKey): string => {
    try {
      return i18n.t(key);
    } catch (error) {
      console.error('Translation error in useTranslation:', error, 'for key:', key);
      return key;
    }
  };

  const changeLanguage = (language: string): void => {
    try {
      i18n.setLanguage(language);
    } catch (error) {
      console.error('Change language error:', error);
    }
  };

  return {
    t,
    currentLanguage,
    changeLanguage
  };
}