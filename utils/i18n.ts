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

export const translations = {
  en: {
    // Header
    notifications: "Notifications",
    settings: "Settings",

    // Notifications Page
    notificationsTitle: "Notifications",
    noNotifications: "No notifications",
    noNotificationsDescription: "You have no new notifications at this time.",
    markAllAsRead: "Mark all as read",
    clearAll: "Clear all",
    newReservation: "New Reservation",
    reservationCancelled: "Reservation Cancelled",
    reservationConfirmed: "Reservation Confirmed",
    systemUpdate: "System Update",
    timeAgo: "ago",
    justNow: "Just now",
    minutesAgo: "minutes ago",
    hoursAgo: "hours ago",
    daysAgo: "days ago",

    // Navigation
    reservations: "Reservations",

    // Settings Module
    settingsModule: "Settings",
    help: "Help & Support",
    about: "About",

    // Profile Page
    profile: "Profile",
    profileTitle: "Profile",
    personalInformation: "Personal Information",
    restaurantName: "Restaurant Name",
    userName: "userName",
    email: "Email",
    phone: "Phone",
    address: "Address",
    language: "Language",
    preferences: "Preferences",
    save: "Save",
    restaurantNameRequired:"Restaurant name is required",
    userNameRequired:"user name is required",
    emailInvalid:"Email is invalid",
    phoneRequired:"Phone is required",
    addressRequired:"Address is required",
    phoneInvalid:"Phone is invalid",

    // Reservation Settings
    reservationSettings: "Reservation Settings",
    acceptReservations: "Accept Reservations",
    allowCustomersBookOnline: "Allow customers to book tables online",
    businessHours: "Business Hours",
    openingTime: "Opening Time",
    closingTime: "Closing Time",
    timeInterval: "Time Interval",
    maxReservationsPerSlot: "Max Reservations per Slot",
    maxReservationsDescription:
      "Maximum number of reservations allowed for each time slot",
    reservationsUnit: "reservations",
    availableTimeSlots: "Available Time Slots",
    active: "active",
    partySizeLimits: "Party Size Limits",
    minimumGuests: "Minimum Guests",
    maximumGuests: "Maximum Guests",
    bookingRules: "Booking Rules",
    maxAdvanceBookingDays: "Max advance booking (days)",
    minAdvanceNoticeHours: "Min advance notice (hours)",

    // Reservation Module
    todaysReservations: "Today's Reservations",
    allReservations: "All Reservations",
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
    accept: "Accept",
    decline: "Reject",
    guests: "guests",
    acceptTip:"Are you sure you want to confirm this reservation?",
    rejectTip:"Are you sure you want to reject this reservation?",
    tip:"Tip",

    // Help & Support
    helpSupport: "Help & Support",
    helpSupportDescription:
      "Get help and support for your restaurant management",
    quickHelp: "Quick Help",
    liveChat: "Live Chat",
    liveChatDescription: "Chat with our support team",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    howToAcceptReservation: "How do I accept or decline a reservation?",
    howToAcceptReservationAnswer:
      "Tap on any reservation from the list to view details, then use the Accept or Decline buttons at the bottom.",
    howToManageTables: "How do I manage my table settings?",
    howToManageTablesAnswer:
      "Go to Settings > Table Settings to configure your reservation preferences, business hours, and table capacity.",
    howToChangeLanguage: "How do I change the app language?",
    howToChangeLanguageAnswer:
      "Go to Profile settings and select your preferred language from the Language dropdown menu.",
    howToSetBusinessHours: "How do I set my business hours?",
    howToSetBusinessHoursAnswer:
      "In Table Settings, you can set your opening and closing times, and configure available time slots for reservations.",
    contactSupport: "Contact Support",
    emailSupport: "Email Support",
    phoneSupport: "Phone Support",
    sendEmail: "Send Email",
    callNow: "Call Now",
    supportHours: "Support Hours:",
    supportHoursDetails:
      "Monday - Friday: 9:00 AM - 6:00 PM (EST)\nWeekend: 10:00 AM - 4:00 PM (EST)",
    appInformation: "App Information",
    version: "Version",
    lastUpdated: "Last Updated",
    buildNumber: "Build Number",

    // Common
    back: "Back",
    cancel: "Cancel",
    submit: "Submit",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",

    // Login & Authentication
    signIn: "Sign In",
    signInDescription: "Welcome back to NEO",
    loginEmail: "Email",
    emailPlaceholder: "Enter your email address",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot password?",
    signingIn: "Signing in...",
    orContinueWith: "or continue with",
    continueWithGoogle: "Continue with Google",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign up",
    demoCredentials: "Demo Credentials:",
    signOut: "Sign Out",
    signOutDescription: "Sign out of your account",

    // Success messages
    settingsSaved: "Settings saved successfully!",
    profileUpdated: "Profile updated successfully!",
    success: "",
    // Model
    modelCancel: "Cancel",
    modelOk: "OK",
  },
  fr: {
    // Header
    notifications: "Notifications",
    settings: "Paramètres",

    // Notifications Page
    notificationsTitle: "Notifications",
    noNotifications: "Aucune notification",
    noNotificationsDescription:
      "Vous n'avez aucune nouvelle notification pour le moment.",
    markAllAsRead: "Tout marquer comme lu",
    clearAll: "Tout effacer",
    newReservation: "Nouvelle Réservation",
    reservationCancelled: "Réservation Annulée",
    reservationConfirmed: "Réservation Confirmée",
    systemUpdate: "Mise à Jour Système",
    timeAgo: "il y a",
    justNow: "À l'instant",
    minutesAgo: "minutes",
    hoursAgo: "heures",
    daysAgo: "jours",

    // Navigation
    reservations: "Réservations",

    // Settings Module
    settingsModule: "Paramètres",
    help: "Aide et Support",
    about: "À propos",

    // Profile Page
    profile: "Profil",
    profileTitle: "Profil",
    personalInformation: "Informations Personnelles",
    restaurantName: "Nom du Restaurant",
    userName: "Nom d'utilisateur",
    email: "Email",
    phone: "Téléphone",
    address: "Adresse",
    language: "Langue",
    preferences: "Préférences",
    save: "Enregistrer",
    restaurantNameRequired:"Le nom du restaurant est requis",
    userNameRequired:"Le nom d'utilisateur est requis",
    emailInvalid:"L'email est invalide",
    phoneRequired:"Le téléphone est requis",
    phoneInvalid:"Le téléphone est invalide",
    addressRequired:"L'adresse est requise",
    languageRequired:"La langue est requise",

    // Reservation Settings
    reservationSettings: "Paramètres de Réservation",
    acceptReservations: "Accepter les Réservations",
    allowCustomersBookOnline:
      "Permettre aux clients de réserver des tables en ligne",
    businessHours: "Heures d'Ouverture",
    openingTime: "Heure d'Ouverture",
    closingTime: "Heure de Fermeture",
    timeInterval: "Intervalle de Temps",
    maxReservationsPerSlot: "Max Réservations par Créneau",
    maxReservationsDescription:
      "Nombre maximum de réservations autorisées pour chaque créneau horaire",
    reservationsUnit: "réservations",
    availableTimeSlots: "Créneaux Horaires Disponibles",
    active: "actif",
    partySizeLimits: "Limites de Taille de Groupe",
    minimumGuests: "Invités Minimum",
    maximumGuests: "Invités Maximum",
    bookingRules: "Règles de Réservation",
    maxAdvanceBookingDays: "Réservation à l'avance max (jours)",
    minAdvanceNoticeHours: "Préavis minimum (heures)",

    // Reservation Module
    todaysReservations: "Réservations d'Aujourd'hui",
    allReservations: "Toutes les Réservations",
    pending: "En attente",
    confirmed: "Confirmé",
    completed: "Terminé",
    cancelled: "Annulé",
    accept: "Accepter",
    decline: "Refuser",
    guests: "invités",
    acceptTip:"Are you sure you want to confirm this reservation?",
    rejectTip:"Are you sure you want to reject this reservation?",
    tip:"Tip",

    // Help & Support
    helpSupport: "Aide et Support",
    helpSupportDescription:
      "Obtenez de l'aide et du support pour la gestion de votre restaurant",
    quickHelp: "Aide Rapide",
    liveChat: "Chat en Direct",
    liveChatDescription: "Chattez avec notre équipe de support",
    frequentlyAskedQuestions: "Questions Fréquemment Posées",
    howToAcceptReservation: "Comment accepter ou refuser une réservation ?",
    howToAcceptReservationAnswer:
      "Appuyez sur n'importe quelle réservation de la liste pour voir les détails, puis utilisez les boutons Accepter ou Refuser en bas.",
    howToManageTables: "Comment gérer les paramètres de mes tables ?",
    howToManageTablesAnswer:
      "Allez dans Paramètres > Paramètres des Tables pour configurer vos préférences de réservation, heures d'ouverture et capacité des tables.",
    howToChangeLanguage: "Comment changer la langue de l'application ?",
    howToChangeLanguageAnswer:
      "Allez dans les paramètres de Profil et sélectionnez votre langue préférée dans le menu déroulant Langue.",
    howToSetBusinessHours: "Comment définir mes heures d'ouverture ?",
    howToSetBusinessHoursAnswer:
      "Dans les Paramètres des Tables, vous pouvez définir vos heures d'ouverture et de fermeture, et configurer les créneaux horaires disponibles pour les réservations.",
    contactSupport: "Contacter le Support",
    emailSupport: "Support par Email",
    phoneSupport: "Support Téléphonique",
    sendEmail: "Envoyer un Email",
    callNow: "Appeler Maintenant",
    supportHours: "Heures de Support :",
    supportHoursDetails:
      "Lundi - Vendredi : 9h00 - 18h00 (EST)\nWeek-end : 10h00 - 16h00 (EST)",
    appInformation: "Informations de l'Application",
    version: "Version",
    lastUpdated: "Dernière Mise à Jour",
    buildNumber: "Numéro de Build",

    // Common
    back: "Retour",
    cancel: "Annuler",
    submit: "Soumettre",
    edit: "Modifier",
    delete: "Supprimer",
    confirm: "Confirmer",

    // Login & Authentication
    signIn: "Connexion",
    signInDescription: "Bienvenue sur NEO",
    loginEmail: "Email",
    emailPlaceholder: "Entrez votre adresse email",
    password: "Mot de passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    signingIn: "Connexion en cours...",
    orContinueWith: "ou continuer avec",
    continueWithGoogle: "Continuer avec Google",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    signUp: "S'inscrire",
    demoCredentials: "Identifiants de démonstration :",
    signOut: "Déconnexion",
    signOutDescription: "Se déconnecter de votre compte",

    // Success messages
    settingsSaved: "Paramètres sauvegardés avec succès !",
    profileUpdated: "Profil mis à jour avec succès !",
    success: "",
    // Model
    modelCancel: "Annuler",
    modelOk: "OK",
  },
};

export type TranslationKey = keyof typeof translations.en;

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
      if (savedLanguage && savedLanguage in translations) {
        this.currentLanguage = savedLanguage;
      }
      this.initialized = true;
      this.notifyListeners();
    } catch (error) {
      console.error("Error loading language from storage:", error);
      this.initialized = true;
      this.notifyListeners();
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  async setLanguage(language: string): Promise<void> {
    if (language in translations) {
      this.currentLanguage = language;
      try {
        await storage.setItem("language", language);
      } catch (error) {
        console.error("Error saving language to storage:", error);
      }
      this.notifyListeners();
    }
  }

  t(key: TranslationKey): string {
    try {
      const translation =
        translations[this.currentLanguage as keyof typeof translations];
      if (!translation) {
        console.warn(
          `Translation not found for language: ${this.currentLanguage}`
        );
        return translations.en[key] || key;
      }
      return translation[key] || translations.en[key] || key;
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
