export const safeString = (str: string): string => {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\x00]/g, " ").trim();
};
