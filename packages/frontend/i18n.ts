import { initReactI18next } from "react-i18next";
import Locales from "./locales";

import { format as formatDate, isDate } from "date-fns";
import i18n, { FormatFunction } from "i18next"; // import all locales we need
import mapValues from "lodash/mapValues";

const STORE_KEY = "app_lang";

export const defaultLanguage = Locales.en;

type NamespaceType = keyof typeof Locales.en.namespaces;
const defaultNS: NamespaceType = <const>"common";

type languagesCodesType = Array<keyof typeof Locales>;

type LanguageType = languagesCodesType[number];

const defaultLanguageCode: LanguageType = <const>"en";

const appLanguage = localStorage.getItem(STORE_KEY) || defaultLanguageCode;

const resources = mapValues(Locales, (locale) => locale.namespaces);

const formatter: FormatFunction = (value, format, lng) => {
  if (isDate(value) && lng && format) {
    const locale = Locales[lng as LanguageType].dateLocale;
    return formatDate(value, format, { locale });
  }

  return value;
};

i18n.use(initReactI18next).init({
  resources,
  lng: appLanguage,
  fallbackLng: defaultLanguageCode,
  ns: [defaultNS],
  interpolation: {
    escapeValue: false,
    format: formatter,
  },
  defaultNS,
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem(STORE_KEY, lng);
});

/**
 * @public
 */
export default i18n;
