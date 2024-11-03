import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapProvider } from "./MapContext.tsx";
import View from "./View.tsx";
import NodePick from "./NodePick.tsx";

const Index: React.FC = () => {
  return (
    <MapProvider>
      <View />
      <NodePick />
    </MapProvider>
  );
};
export default Index;
