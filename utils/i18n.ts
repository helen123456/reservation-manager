import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Cross-platform storage utility
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      try {
        return typeof window !== "undefined" && window.localStorage
          ? window.localStorage.getItem(key)
          : null;
      } catch (error) {
        console.warn("Storage getItem error:", error);
        return null;
      }
    }
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.warn("AsyncStorage getItem error:", error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
      } catch (error) {
        console.warn("Storage setItem error:", error);
      }
      return;
    }
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.warn("AsyncStorage setItem error:", error);
    }
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch (error) {
        console.warn("Storage removeItem error:", error);
      }
      return;
    }
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn("AsyncStorage removeItem error:", error);
    }
  },
};

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "fr", name: "French", nativeName: "Français" },
];

// Translation interface
interface Translations {
  [key: string]: string;
}

// Dynamic translation loader
const loadTranslations = async (language: string): Promise<Translations> => {
  try {
    // Import translations dynamically based on language
    let translationModule;
    
    switch (language) {
      case 'en':
        translationModule = await import('../i18n/en.json');
        break;
      case 'fr':
        translationModule = await import('../i18n/fr.json');
        break;
      default:
        // Fallback to English if language not supported
        translationModule = await import('../i18n/en.json');
        break;
    }
    
    return translationModule.default;
  } catch (error) {
    console.error(`Failed to load translations for language: ${language}`, error);
    // Fallback to English translations
    try {
      const fallbackModule = await import('../i18n/en.json');
      return fallbackModule.default;
    } catch (fallbackError) {
      console.error('Failed to load fallback translations:', fallbackError);
      return {};
    }
  }
};

// Cache for loaded translations
const translationsCache: { [key: string]: Translations } = {};

export type TranslationKey = string;

export class I18nService {
  private static instance: I18nService;
  private currentLanguage: string = "en";
  private listeners: (() => void)[] = [];
  private initialized: boolean = false;

  private constructor() {
    this.loadLanguage();
  }

  static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  private async loadLanguage(): Promise<void> {
    try {
      const savedLanguage = await storage.getItem("language");
      if (savedLanguage && this.isSupportedLanguage(savedLanguage)) {
        this.currentLanguage = savedLanguage;
      }
      // Preload current language translations
      await this.getTranslations(this.currentLanguage);
      this.initialized = true;
      this.notifyListeners();
    } catch (error) {
      console.error("Error loading language from storage:", error);
      this.initialized = true;
      this.notifyListeners();
    }
  }

  private isSupportedLanguage(language: string): boolean {
    return languages.some(lang => lang.code === language);
  }

  private async getTranslations(language: string): Promise<Translations> {
    if (translationsCache[language]) {
      return translationsCache[language];
    }

    const translations = await loadTranslations(language);
    translationsCache[language] = translations;
    return translations;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  async setLanguage(language: string): Promise<void> {
    if (this.isSupportedLanguage(language)) {
      this.currentLanguage = language;
      try {
        await storage.setItem("language", language);
        // Preload new language translations
        await this.getTranslations(language);
      } catch (error) {
        console.error("Error saving language to storage:", error);
      }
      this.notifyListeners();
    }
  }

  t(key: TranslationKey): string {
    try {
      const translations = translationsCache[this.currentLanguage];
      if (!translations) {
        console.warn(`Translation not found for language: ${this.currentLanguage}`);
        // Try to get fallback translation
        const fallbackTranslations = translationsCache['en'];
        return fallbackTranslations?.[key] || key;
      }
      return translations[key] || translationsCache['en']?.[key] || key;
    } catch (error) {
      console.error("Translation error:", error, "for key:", key);
      return key;
    }
  }

  subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const i18n = I18nService.getInstance();
