import { GeometryPoint } from "surrealdb";

export const createGeoPointFromMesh = (lat: unknown, long: unknown) => {
  const base = 10000000;
  if (typeof lat !== "number" || typeof long !== "number" || !lat || !long) {
    return null;
  }

  const latFixed = (lat ?? 0) / base;
  const longFixed = (long ?? 0) / base;

  return new GeometryPoint([latFixed, longFixed]);
};
