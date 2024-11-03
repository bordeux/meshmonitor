import * as React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { styled } from "@mui/material/styles";
import { Map as LeafletMap } from "leaflet";
import { MapContainerProps } from "react-leaflet/MapContainer";

const MapContainerStyled = styled(MapContainer)`
  width: 100%;
  height: 100%;

  .marker-cluster {
    color: ${(props) => props.theme.palette.grey.A700};
  }

  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background-color: ${(props) => props.theme.palette.background.paper};
  }
`;

const Map: React.FC<MapContainerProps & Partial<LeafletMap>> = (props) => {
  return (
    <MapContainerStyled scrollWheelZoom={true} {...props}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {props.children}
    </MapContainerStyled>
  );
};
export default Map;
