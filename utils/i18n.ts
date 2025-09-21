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
    reservationsText: "reservations",

    // Settings Module
    settingsModule: "Settings",
    help: "Help & Support",
    about: "About",
    historyOrder: "History Order",

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
    businessHours: "Reservation Manage",
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
    saveSuccess:'Save success',
    startTimeAfterEndTime:'Start time must be before end time',
    endTimeBeforeStartTime:'End time must be after start time',

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
    
    // Forgot Password
    forgotPasswordTitle: "Forgot Password",
    forgotPasswordSubtitle: "Enter your email address and we'll send you a verification code to reset your password",
    sendVerificationCode: "Send Verification Code",
    verificationCodeTitle: "Enter Verification Code",
    verificationCodeSubtitle: "We've sent a 6-digit verification code to",
    enterVerificationCode: "Enter verification code",
    resendCode: "Resend Code",
    resendCodeIn: "Resend code in",
    seconds: "seconds",
    verifyCode: "Verify Code",
    resetPasswordTitle: "Reset Password",
    resetPasswordSubtitle: "Create a new password for your account",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    resetPassword: "Reset Password",
    passwordResetSuccess: "Password Reset Successful",
    passwordResetSuccessMessage: "Your password has been successfully reset. You can now sign in with your new password.",
    backToSignIn: "Back to Sign In",
    codeExpired: "Verification code has expired",
    invalidCode: "Invalid verification code",
    emailNotFound: "Email address not found",
    passwordResetFailed: "Password reset failed. Please try again.",

    // Success messages
    settingsSaved: "Settings saved successfully!",
    profileUpdated: "Profile updated successfully!",
    success: "Success",
    error: "Error",
    // Model
    modelCancel: "Cancel",
    modelOk: "OK",
    
    // SearchBar
    searchReservations: "Search reservations...",
    filterByDate: "Filter by date",
    
    // Common UI text
    reservationManagement: "Reservation Management",
    setOpeningClosingTimes: "Set opening and closing times",
    currentlyOpen: "Currently Open",
    manageProfilePreferences: "Manage your profile and preferences",
    manageRestaurantSettings: "Manage your restaurant settings",
    getHelpContactSupport: "Get help and contact support",
    autoConfirm: "Auto Confirm",
    darkMode: "Dark Mode",
    
    // Time and date
    today: "Today",
    tomorrow: "Tomorrow",
    
    // Reservation details
    reservation: "reservation",
    
    // Status and actions
    open: "Open",
    close: "Close",
    
    // Validation messages
    languageRequired: "Language is required",
    emailRequired: "Please enter a valid email",
    passwordMinLength: "Password must be at least 6 characters",
    passwordMaxLength: "Password cannot exceed 20 characters",
    passwordMustContainLetter: "Password must contain letters",
    passwordMustContainNumber: "Password must contain numbers",
    passwordMustContainSpecialChar: "Password must contain special characters",
    codeMinLength: "Verification code must be at least 6 digits",
    codeMaxLength: "Verification code cannot exceed 6 digits",
    passwordMismatch: "Passwords do not match",
    
    // Time Picker
    selectTime: "Select Time",
    selectedTime: "Selected Time",
    
    // Guest Count Validation
    minGuestsCannotExceedMaxGuests: "Minimum guests cannot exceed maximum guests",
    maxGuestsCannotBeLessThanMinGuests: "Maximum guests cannot be less than minimum guests",
    
    // Date formats
    manageRestaurantReservations: "Manage your restaurant reservations",
    
    // Header menu descriptions
    profileDescription: "Manage your profile and preferences",
    settingsDescription: "Manage your restaurant settings",
    helpDescription: "Get help and contact support",
    historyOrderDescription: "View your order history",
    
    // Settings status
    currentStatus: "Currently Open",
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
    reservationsText: "réservation",

    // Settings Module
    settingsModule: "Paramètres",
    help: "Aide et Support",
    about: "À propos",
    historyOrder: "Historique des Commandes",

    // Profile Page
    profile: "Profil",
    profileTitle: "Profil",
    personalInformation: "Informations Personnelles",
    restaurantName: "Nom du Restaurant",
    userName: "Nom d'utilisateur",
    email: "Courriel",
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

    // Reservation Settings
    reservationSettings: "Paramètres de Réservation",
    acceptReservations: "Accepter les Réservations",
    allowCustomersBookOnline:
      "Permettre aux clients de réserver des tables en ligne",
    businessHours: "Gestion des Horaires d'Ouverture",
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
    saveSuccess:'économiser le succès',
    startTimeAfterEndTime:'Heure de début doit être avant l\'heure de fermeture',
    endTimeBeforeStartTime:'Heure de fin doit être après l\'heure d\'ouverture',

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
    acceptTip:"Êtes-vous sûr de vouloir confirmer cette réservation ?",
    rejectTip:"Êtes-vous sûr de vouloir rejeter cette réservation ?",
    tip:"Conseil",

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
    loginEmail: "Courriel",
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
    
    // Forgot Password
    forgotPasswordTitle: "Mot de passe oublié",
    forgotPasswordSubtitle: "Entrez votre adresse email et nous vous enverrons un code de vérification pour réinitialiser votre mot de passe",
    sendVerificationCode: "Envoyer le code de vérification",
    verificationCodeTitle: "Entrer le code de vérification",
    verificationCodeSubtitle: "Nous avons envoyé un code de vérification à 6 chiffres à",
    enterVerificationCode: "Entrer le code de vérification",
    resendCode: "Renvoyer le code",
    resendCodeIn: "Renvoyer le code dans",
    seconds: "secondes",
    verifyCode: "Vérifier le code",
    resetPasswordTitle: "Réinitialiser le mot de passe",
    resetPasswordSubtitle: "Créez un nouveau mot de passe pour votre compte",
    newPassword: "Nouveau mot de passe",
    confirmNewPassword: "Confirmer le nouveau mot de passe",
    resetPassword: "Réinitialiser le mot de passe",
    passwordResetSuccess: "Réinitialisation du mot de passe réussie",
    passwordResetSuccessMessage: "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
    backToSignIn: "Retour à la connexion",
    codeExpired: "Le code de vérification a expiré",
    invalidCode: "Code de vérification invalide",
    emailNotFound: "Adresse email introuvable",
    passwordResetFailed: "Échec de la réinitialisation du mot de passe. Veuillez réessayer.",

    // Success messages
    settingsSaved: "Paramètres sauvegardés avec succès !",
    profileUpdated: "Profil mis à jour avec succès !",
    success: "Succès",
    error: "Erreur",
    // Model
    modelCancel: "Annuler",
    modelOk: "OK",
    
    // SearchBar
    searchReservations: "Rechercher des réservations...",
    filterByDate: "Filtrer par date",
    
    // Common UI text
    reservationManagement: "Gestion des Réservations",
    setOpeningClosingTimes: "Définir les heures d'ouverture et de fermeture",
    currentlyOpen: "Actuellement Ouvert",
    manageProfilePreferences: "Gérer votre profil et préférences",
    manageRestaurantSettings: "Gérer les paramètres de votre restaurant",
    getHelpContactSupport: "Obtenir de l'aide et contacter le support",
    autoConfirm: "Confirmation Automatique",
    darkMode: "Mode Sombre",
    
    // Time and date
    today: "Aujourd'hui",
    tomorrow: "Demain",
    
    // Reservation details
    reservation: "réservation",
    
    // Status and actions
    open: "Ouvert",
    close: "Fermé",
    
    // Validation messages
    languageRequired: "La langue est requise",
    emailRequired: "Veuillez saisir un email valide",
    passwordMinLength: "Le mot de passe doit contenir au moins 6 caractères",
    passwordMaxLength: "Le mot de passe ne peut pas dépasser 20 caractères",
    passwordMustContainLetter: "Le mot de passe doit contenir des lettres",
    passwordMustContainNumber: "Le mot de passe doit contenir des chiffres",
    passwordMustContainSpecialChar: "Le mot de passe doit contenir des caractères spéciaux",
    codeMinLength: "Le code de vérification doit contenir au moins 6 chiffres",
    codeMaxLength: "Le code de vérification ne peut pas dépasser 6 chiffres",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    
    // Time Picker
    selectTime: "Sélectionner l'heure",
    selectedTime: "Heure sélectionnée",
    
    // Guest Count Validation
    minGuestsCannotExceedMaxGuests: "Le nombre minimum d'invités ne peut pas dépasser le maximum",
    maxGuestsCannotBeLessThanMinGuests: "Le nombre maximum d'invités ne peut pas être inférieur au minimum",
    
    // Date formats
    manageRestaurantReservations: "Gérer les réservations de votre restaurant",
    
    // Header menu descriptions
    profileDescription: "Gérer votre profil et préférences",
    settingsDescription: "Gérer les paramètres de votre restaurant",
    helpDescription: "Obtenir de l'aide et contacter le support",
    historyOrderDescription: "Voir l'historique de vos commandes",
    
    // Settings status
    currentStatus: "Actuellement Ouvert",
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
