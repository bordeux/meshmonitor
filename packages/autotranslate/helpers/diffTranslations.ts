import { Translation } from "./loadTranslation";

export const diffTranslations = (
  baseTranslation: Translation,
  desiredTranslation: Translation,
): Translation => {
  const diff: Translation = {};
  for (const [filename, items] of Object.entries(baseTranslation)) {
    for (const [translationKey, translation] of Object.entries(items)) {
      const currentTranslation = desiredTranslation[filename]?.[translationKey];
      if (currentTranslation !== undefined) {
        continue;
      }

      if (diff[filename] === undefined) {
        diff[filename] = {};
      }

      diff[filename][translationKey] = translation;
    }
  }

  return diff;
};
