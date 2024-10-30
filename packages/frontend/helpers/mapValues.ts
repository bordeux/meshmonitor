export function mapValues<T extends object, U>(
  obj: T,
  callback: (value: T[keyof T], key: keyof T) => U,
): { [K in keyof T]: U } {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = callback(obj[key], key);
    }
  }

  return result;
}
