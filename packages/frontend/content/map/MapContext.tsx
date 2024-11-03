import { createContext, FC, PropsWithChildren, useState } from "react";
import { Node } from "../../../shared/Schemas/NodeSchema.ts";

// eslint-disable-next-line react-refresh/only-export-components
export enum LayerType {
  POSITION_HISTORY,
}

interface MapBaseContext {
  node?: Node;
  layers: LayerType[];
}

interface MapContext extends MapBaseContext {
  setValue: (value: Partial<MapBaseContext>) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MapContext = createContext<MapContext>({} as MapContext);

const DEFAULT_VALUE: MapBaseContext = {
  layers: [LayerType.POSITION_HISTORY],
};

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<MapBaseContext>(DEFAULT_VALUE);

  return (
    <MapContext.Provider
      value={{
        ...value,
        setValue: (value: Partial<MapBaseContext>) =>
          setValue((current) => ({ ...current, ...value })),
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
