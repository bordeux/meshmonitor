import { createContext, FC, PropsWithChildren, useEffect } from "react";
import useLocalStorageState from "ahooks/es/useLocalStorageState";

type Location = {
  lat: number;
  long: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  source: "geolocation" | "default";
};

type UserContext = {
  location: Location;
  setLocation: (value: Location) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContext>({} as UserContext);

const LOCATION_DEFAULT: Location = {
  lat: 50.2653356,
  long: 18.806,
  accuracy: 0,
  altitude: null,
  altitudeAccuracy: null,
  source: "default",
};
export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useLocalStorageState<Location>(
    "user:location",
    {
      defaultValue: LOCATION_DEFAULT,
    },
  );
  const userLocation = location || LOCATION_DEFAULT;

  useEffect(() => {
    const callback = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        source: "geolocation",
      });
    };
    navigator.geolocation?.getCurrentPosition(callback);
    const watchID = navigator.geolocation?.watchPosition(callback);

    return () => {
      navigator.geolocation?.clearWatch(watchID);
    };
  });

  return (
    <UserContext.Provider value={{ location: userLocation, setLocation }}>
      {children}
    </UserContext.Provider>
  );
};
