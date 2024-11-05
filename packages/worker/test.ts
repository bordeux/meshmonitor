import { KdTree } from "kdtree-wasm";
import jsonData from "./data/geo.json";

interface Country {
  id: number;
  states: State[];
}

interface State {
  id: number;
  cities: City[];
}

interface City {
  id: number;
  latitude: number;
  longitude: number;
}

interface LookupTableValue {
  country: Country;
  state: State;
  city: City;
}

const data: Country[] = jsonData as any;

const kdtree = new KdTree(2);
const lookUpTable = new Map<number, LookupTableValue>();
// Distance function using haversine for GPS coordinates
for (const country of data) {
  for (const state of country.states) {
    for (const city of state.cities) {
      lookUpTable.set(city.id, {
        country,
        state,
        city,
      });
      kdtree.add(
        new Float64Array([Number(city.latitude), Number(city.longitude)]),
        city.id,
      );
    }
  }
}

function distance(a: [number, number], b: [number, number]): number {
  return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2);
}

const findCity = (latitude: number, longitude: number) => {
  const timeName = `Looking for answer ${latitude} ${longitude}`;
  console.time(timeName);
  const result = kdtree.nearest(
    new Float64Array([latitude, longitude]),
    1,
    distance,
  );
  const cityId = result[0][1];
  const city = lookUpTable.get(cityId);

  console.log(city?.city);

  console.timeEnd(timeName);
};

findCity(37.7749, -122.4194);
findCity(50.3037503, 18.9501447);
findCity(50.3086893, 18.9491239);
findCity(50.2370806, 19.1116248);
