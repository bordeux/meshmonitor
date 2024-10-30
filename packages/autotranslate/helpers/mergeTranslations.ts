import { Translation } from "./loadTranslation";

export const mergeTranslations = (
  baseTranslation: Translation,
  translationToMerge: Translation,
): Translation => {
  const newTranslation: Translation = structuredClone(baseTranslation);
  for (const [filename, items] of Object.entries(translationToMerge)) {
    for (const [translationKey, translation] of Object.entries(items)) {
      if (newTranslation[filename] === undefined) {
        newTranslation[filename] = {};
      }

      newTranslation[filename][translationKey] = translation;
    }
  }
  return newTranslation;
};
