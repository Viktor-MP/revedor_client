import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation files
import enTranslation from "./languages/en.json";
import armTranslation from "./languages/arm.json";
import ruTranslation from "./languages/ru.json";


i18n.use(LanguageDetector) // Use the language detector
    .use(initReactI18next) // Pass i18n instance to react-i18next
    .init({
        resources: {
            en: { translation: enTranslation },
            arm: { translation: armTranslation },
            ru: { translation: ruTranslation },
        },
        debug: false,
        fallbackLng: "en", // Default language if no match is found
        detection: {
            order: [
                "querystring",
                "cookie",
                "localStorage",
                "navigator",
                "htmlTag",
            ],
            caches: ["cookie", "localStorage"], // Cache the detected language
        },
    });


export default i18n;
