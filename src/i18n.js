import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Your translation resources:
const resources = {
  en: { translation: { toolbar: { title: "Study In Germany", home: "Home", howitworks: "How It Works", programs: "Programs", pricing: "Pricing", contact: "Contact Us", lang: "Lang" } } },
  de: { translation: { toolbar: { title: "Studieren in Deutschland", home: "Startseite", howitworks: "So funktioniert es", programs: "Programme", pricing: "Preise", contact: "Kontakt", lang: "Sprache" } } },
  ar: { translation: { toolbar: { title: "الدراسة في ألمانيا", home: "الرئيسية", howitworks: "كيف يعمل", programs: "البرامج", pricing: "الأسعار", contact: "اتصل بنا", lang: "اللغة" } } },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
