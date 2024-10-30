import { join } from "path";

export const getLanguageDirectory = (languageCode: string) => {
  return join(import.meta.dir, "../..", "frontend/locales", languageCode);
};
