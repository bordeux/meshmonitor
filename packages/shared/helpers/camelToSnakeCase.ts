export const camelToSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/^_/, ""); // Remove leading underscore if present
};
