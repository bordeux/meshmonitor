import { camelToSnakeCase } from "../../shared/helpers/camelToSnakeCase";

export const meshtasticObjectToSnakeCase = (obj: any): any => {
  const result: any = {};
  if (null == obj) {
    return null;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === "$typeName") {
      continue;
    }

    let newValue = value;
    if (typeof value === "object") {
      newValue = meshtasticObjectToSnakeCase(value);
    }

    result[camelToSnakeCase(key)] = newValue;
  }

  return result;
};
