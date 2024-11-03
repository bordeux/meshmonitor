import { LayerGroup } from "react-leaflet/LayerGroup";
import { LatLng } from "leaflet";
import { Marker } from "react-leaflet";
import * as React from "react";
import { useContext } from "react";
import { MapContext } from "../MapContext.tsx";

const SelectedNodeLayer: React.FC = () => {
  const { node } = useContext(MapContext);
  if (!node?.position) {
    return null;
  }
  const cords = node.position.coordinates;
  const pin = new LatLng(cords[0], cords[1], node.position_altitude);
  return (
    <LayerGroup>
      <Marker position={pin} />
      );
    </LayerGroup>
  );
};

export default SelectedNodeLayer;
