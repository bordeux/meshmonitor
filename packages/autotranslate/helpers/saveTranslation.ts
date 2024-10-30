import { getLanguageDirectory } from "./getLanguageDirectory";
import { Translation } from "./loadTranslation";
import { join } from "path";
import { writeFile } from "fs/promises";

export const saveTranslation = async (
  languageCode: string,
  translation: Translation,
): Promise<Translation> => {
  const directory = getLanguageDirectory(languageCode);

  for (const [filename, items] of Object.entries(translation)) {
    const path = join(directory, filename);
    await writeFile(path, JSON.stringify(items, null, 2));
  }

  return translation;
};
