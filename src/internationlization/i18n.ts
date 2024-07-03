import i18next from "i18next";
import en from '../../assets/en.json';
import ar from '../../assets/ar.json';
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";


const resources = {
    en: {
        translation: en
    },
    ar: {
        translation: ar
    }
};

i18next.use(initReactI18next).init({
    resources,
    lng:I18nManager.isRTL?'ar':'en',
    compatibilityJSON:'v3',
    fallbackLng:'en',
});

export default i18next;