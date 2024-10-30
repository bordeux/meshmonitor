import { useTranslation } from "react-i18next";
import Locales, { LocaleType } from "../locales";

export const useCurrentLocale = (): LocaleType => {
  const { i18n } = useTranslation();
  return Locales[i18n.language as keyof typeof Locales] as LocaleType;
};
