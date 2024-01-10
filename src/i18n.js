import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_TRANSLATE from "./locales/en/translate";
import VI_TRANSLATE from "./locales/vi/translate";
import LanguageDetector from "i18next-browser-languagedetector";
const resources = {
  en: { translation: EN_TRANSLATE },
  vi: { translation: VI_TRANSLATE },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["querystring", "cookies", "localStorage", "navigate"],
      lookupQuerystring: "lng",
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
      caches: ["localStorage", "cookie"],
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
