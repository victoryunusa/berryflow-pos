import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./locales/en.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: localStorage.getItem("language") || "en", // Default language
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
