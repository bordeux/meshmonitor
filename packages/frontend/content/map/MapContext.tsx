import { createContext, FC, PropsWithChildren, useState } from "react";
import { Node } from "../../../shared/Schemas/NodeSchema.ts";

interface MapBaseContext {
  node?: Node;
}

interface MapContext extends MapBaseContext {
  setValue: (value: MapBaseContext) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MapContext = createContext<MapContext>({} as MapContext);

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<MapBaseContext>({} as MapBaseContext);

  return (
    <MapContext.Provider
      value={{
        ...value,
        setValue: (value: MapBaseContext) =>
          setValue((current) => ({ ...current, ...value })),
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
