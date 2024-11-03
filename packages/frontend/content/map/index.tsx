import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapProvider } from "./MapContext.tsx";
import View from "./View.tsx";

const Index: React.FC = () => {
  return (
    <MapProvider>
      <View />
    </MapProvider>
  );
};
export default Index;
