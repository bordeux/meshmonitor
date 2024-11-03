import { join } from "path";
import { readdirSync } from "fs";

export const getCurrentLanguagesCodes = () => {
  const localeDir = join(import.meta.dir, "../..", "frontend/locales");
  return readdirSync(localeDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};
