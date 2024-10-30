import { readdir } from "fs/promises";
import { join } from "path";
import { getLanguageDirectory } from "./getLanguageDirectory";

export type Translation = Record<string, Record<string, string>>;

export const loadTranslation = async (
  languageCode: string,
): Promise<Translation> => {
  const directory = getLanguageDirectory(languageCode);
  // Read the contents of the directory
  const files = await readdir(directory, { withFileTypes: true });

  // Filter and return only the .json files
  const jsonFiles = files
    .filter((file) => file.isFile() && file.name.endsWith(".json"))
    .map((file) => ({
      name: file.name,
      path: join(directory, file.name),
    }));

  const translation: Translation = {};
  for (const item of jsonFiles) {
    try {
      const data = await import(item.path);
      translation[item.name] = data.default;
    } catch (error) {
      console.error(
        `Error loading translation file ${item.path}: ` + String(error),
      );
    }
  }

  return translation;
};
