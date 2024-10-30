import { GeometryPoint } from "surrealdb";

const convertToDMS = (coordinate: number, isLatitude: boolean): string => {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutes = Math.floor((absolute - degrees) * 60);
  const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(1);

  const direction = isLatitude
    ? coordinate >= 0
      ? "N"
      : "S"
    : coordinate >= 0
      ? "E"
      : "W";

  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
};

export const geometryPointToDMS = (point: GeometryPoint): string => {
  return [
    convertToDMS(point.coordinates[0], true),
    convertToDMS(point.coordinates[1], false),
  ].join(", ");
};
