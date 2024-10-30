/// <reference types="vite/client" />

import type { defaultLanguage, defaultNS } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    namespaces: keyof typeof defaultLanguage;
    resources: typeof defaultLanguage.namespaces;
  }
}
