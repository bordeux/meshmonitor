export function omitBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!predicate(value, key)) {
        result[key] = value;
      }
    }
  }

  return result;
}
