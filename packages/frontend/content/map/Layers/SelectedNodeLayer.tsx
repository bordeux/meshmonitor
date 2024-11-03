import { LayerGroup } from "react-leaflet/LayerGroup";
import { Icon, LatLng } from "leaflet";
import { Marker } from "react-leaflet";
import MarkerIconShadow from "react-leaflet-cluster/lib/assets/marker-shadow.png";
import MarkerIcon from "react-leaflet-cluster/lib/assets/marker-icon.png";
import * as React from "react";
import { useContext } from "react";
import { MapContext } from "../MapContext.tsx";

const markerIcon = new Icon({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerIconShadow,
  iconSize: [25, 41],
  shadowSize: [25, 41],
  iconAnchor: [12, 41],
  className: "marker-selected-icon",
});

const SelectedNodeLayer: React.FC = () => {
  const { node } = useContext(MapContext);
  if (!node?.position) {
    return null;
  }
  const cords = node.position.coordinates;
  const pin = new LatLng(cords[0], cords[1], node.position_altitude);
  return (
    <LayerGroup>
      <Marker position={pin} icon={markerIcon} />
      );
    </LayerGroup>
  );
};

export default SelectedNodeLayer;
