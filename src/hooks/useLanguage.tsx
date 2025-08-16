import React, { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'es' | 'fr-ca';

const translations: Record<Language, Record<string, string>> = {
  en: {
    settings: 'Settings',
    manageAccount: 'Manage your account and preferences',
    notifications: 'Notifications',
    notificationPrefs: 'Manage your notification preferences',
    language: 'Language',
    languagePrefs: 'Change your language preferences',
    changePassword: 'Change password',
    updatePassword: 'Update your account password',
    about: 'About',
    appInfo: 'App information and version details',
    support: 'Support',
    getHelp: 'Get help and contact support',
    signOut: 'Sign Out',
    changeAppLanguage: 'Change your app language',
    selectLanguage: 'Select your preferred language for the app interface.',
    cancel: 'Cancel',
    goodMorning: 'Good morning, {name}',
    goodAfternoon: 'Good afternoon, {name}',
    goodEvening: 'Good evening, {name}',
    locationTemp: 'Philadelphia, PA · 72°F',
    inspectionReminderTitle: 'Inspection Reminder',
    inspectionReminderBody: 'You have an upcoming inspection scheduled for today.',
    favorites: 'Favorites',
    browseDocuments: 'Browse for Documents',
    viewAll: 'View All',
    safetyDataSheets: 'Safety Data Sheets',
    productDataSheets: 'Product Data Sheets',
    assemblyLetters: 'Assembly Letters',
    warranty: 'Warranty',
    otherDocuments: 'Other Documents',
    inProgress: 'In Progress',
    viewAllJobs: 'View All Jobs',
    recentlyCompleted: 'Recently Completed',
    searchPlaceholder: 'Search jobs, documents, or products...',
    documents: 'Documents',
    project: 'Project',
    safetyData: 'Safety Data',
    productInfo: 'Product Info',
    showMore: 'Show more',
    showLess: 'Show less',
    history: 'History',
    installationInstructions: 'Installation Instructions',
    delivered: 'Delivered',
    placedOn: 'Placed on',
    product: 'product',
    products: 'products',
    typeAMessage: 'Type a message...',
    messagesTitle: 'Messages',
    searchChatsPlaceholder: 'Search conversations...',
    profileTitle: 'Profile',
    jobDetailsTitle: 'Job Details',
    installationDetailsTitle: 'Installation Details',
    scheduleInspectionTitle: 'Schedule Inspection',
    productDetailsTitle: 'Product Details',
    orderDetailsTitle: 'Order Details',
  },
  es: {
    settings: 'Configuración',
    manageAccount: 'Administra tu cuenta y preferencias',
    notifications: 'Notificaciones',
    notificationPrefs: 'Administra tus preferencias de notificación',
    language: 'Idioma',
    languagePrefs: 'Cambia tus preferencias de idioma',
    changePassword: 'Cambiar contraseña',
    updatePassword: 'Actualiza la contraseña de tu cuenta',
    about: 'Acerca de',
    appInfo: 'Información de la aplicación y detalles de la versión',
    support: 'Soporte',
    getHelp: 'Obtén ayuda y contacta soporte',
    signOut: 'Cerrar sesión',
    changeAppLanguage: 'Cambia el idioma de la aplicación',
    selectLanguage: 'Selecciona tu idioma preferido para la interfaz de la aplicación.',
    cancel: 'Cancelar',
    goodMorning: 'Buenos días, {name}',
    goodAfternoon: 'Buenas tardes, {name}',
    goodEvening: 'Buenas noches, {name}',
    locationTemp: 'Filadelfia, PA · 22°C',
    inspectionReminderTitle: 'Recordatorio de inspección',
    inspectionReminderBody: 'Tienes una inspección programada para hoy.',
    favorites: 'Favoritos',
    browseDocuments: 'Buscar documentos',
    viewAll: 'Ver todo',
    safetyDataSheets: 'Hojas de datos de seguridad',
    productDataSheets: 'Hojas de datos de productos',
    assemblyLetters: 'Cartas de ensamblaje',
    warranty: 'Garantía',
    otherDocuments: 'Otros documentos',
    inProgress: 'En progreso',
    viewAllJobs: 'Ver todos los trabajos',
    recentlyCompleted: 'Recientemente completados',
    searchPlaceholder: 'Buscar trabajos, documentos o productos...',
    documents: 'Documentos',
    project: 'Proyecto',
    safetyData: 'Datos de seguridad',
    productInfo: 'Información del producto',
    showMore: 'Mostrar más',
    showLess: 'Mostrar menos',
    history: 'Historial',
    installationInstructions: 'Instrucciones de instalación',
    delivered: 'Entregado',
    placedOn: 'Realizado el',
    product: 'producto',
    products: 'productos',
    typeAMessage: 'Escribe un mensaje...',
    messagesTitle: 'Mensajes',
    searchChatsPlaceholder: 'Buscar conversaciones...',
    profileTitle: 'Perfil',
    jobDetailsTitle: 'Detalles del trabajo',
    installationDetailsTitle: 'Detalles de instalación',
    scheduleInspectionTitle: 'Programar inspección',
    productDetailsTitle: 'Detalles del producto',
    orderDetailsTitle: 'Detalles del pedido',
  },
  'fr-ca': {
    settings: 'Paramètres',
    manageAccount: 'Gérez votre compte et vos préférences',
    notifications: 'Notifications',
    notificationPrefs: 'Gérez vos préférences de notification',
    language: 'Langue',
    languagePrefs: 'Modifiez vos préférences linguistiques',
    changePassword: 'Changer le mot de passe',
    updatePassword: 'Mettez à jour le mot de passe de votre compte',
    about: 'À propos',
    appInfo: 'Informations sur l’application et détails de la version',
    support: 'Soutien',
    getHelp: 'Obtenez de l’aide et contactez le soutien',
    signOut: 'Déconnexion',
    changeAppLanguage: 'Changer la langue de l’application',
    selectLanguage: 'Sélectionnez votre langue préférée pour l’interface de l’application.',
    cancel: 'Annuler',
    goodMorning: 'Bonjour, {name}',
    goodAfternoon: 'Bon après-midi, {name}',
    goodEvening: 'Bonsoir, {name}',
    locationTemp: 'Philadelphie, PA · 22°C',
    inspectionReminderTitle: 'Rappel d’inspection',
    inspectionReminderBody: 'Vous avez une inspection prévue aujourd’hui.',
    favorites: 'Favoris',
    browseDocuments: 'Parcourir les documents',
    viewAll: 'Voir tout',
    safetyDataSheets: 'Fiches de données de sécurité',
    productDataSheets: 'Fiches de données produit',
    assemblyLetters: 'Lettres d’assemblage',
    warranty: 'Garantie',
    otherDocuments: 'Autres documents',
    inProgress: 'En cours',
    viewAllJobs: 'Voir tous les travaux',
    recentlyCompleted: 'Récemment terminés',
    searchPlaceholder: 'Rechercher des travaux, des documents ou des produits...',
    documents: 'Documents',
    project: 'Projet',
    safetyData: 'Données de sécurité',
    productInfo: 'Infos produit',
    showMore: 'Afficher plus',
    showLess: 'Afficher moins',
    history: 'Historique',
    installationInstructions: 'Instructions d’installation',
    delivered: 'Livré',
    placedOn: 'Passé le',
    product: 'produit',
    products: 'produits',
    typeAMessage: 'Tapez un message...',
    messagesTitle: 'Messages',
    searchChatsPlaceholder: 'Rechercher des conversations...',
    profileTitle: 'Profil',
    jobDetailsTitle: 'Détails du travail',
    installationDetailsTitle: 'Détails de l’installation',
    scheduleInspectionTitle: 'Planifier une inspection',
    productDetailsTitle: 'Détails du produit',
    orderDetailsTitle: 'Détails de la commande'
  }
};

const LanguageContext = createContext<{ language: Language; setLanguage: (lang: Language) => void } | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang) setLanguage(storedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  const { language, setLanguage } = context;
  function t(key: string, vars?: Record<string, string>) {
    let text = translations[language][key] || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  }
  return { language, setLanguage, t };
}
