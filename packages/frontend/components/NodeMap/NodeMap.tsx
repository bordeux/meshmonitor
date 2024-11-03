import * as React from "react";
import { useContext, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import type { Node } from "../../../shared/Schemas/NodeSchema";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { PositionData } from "./MapEvents.ts";
import { UserContext } from "../../contexts/UserContext.tsx";
import { Circle } from "react-leaflet/Circle";
import NodesCluster from "./NodesCluster.tsx";

interface MapProps {
  position?: PositionData;
  node?: Node;
  children?: React.ReactNode;
  onSelect?: (node: Node | undefined) => void;
}

const MapContainerStyled = styled(MapContainer)`
  .marker-cluster {
    color: ${(props) => props.theme.palette.grey.A700};
  }

  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background-color: ${(props) => props.theme.palette.background.paper};
  }
`;

const NodeMap: React.FC<MapProps> = (props) => {
  const { location } = useContext(UserContext);
  const [node, setNode] = React.useState<Node | undefined>(props.node);

  useEffect(() => {
    if (props.onSelect) {
      props.onSelect(node);
    }
  }, [node, props.onSelect]);

  let position = props.position;
  if (!position) {
    position = {
      zoom: 9,
      lat: location.lat,
      long: location.long,
    };
  }

  if (node?.position) {
    position = {
      zoom: 16,
      lat: node.position.coordinates[0],
      long: node.position.coordinates[1],
    };
  }

  return (
    <Box width={"100%"} height={"100%"}>
      <MapContainerStyled
        center={new LatLng(position.lat, position.long)}
        zoom={position.zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Circle
          center={new LatLng(location.lat, location.long)}
          pathOptions={{ fillColor: "blue", opacity: 1 }}
          radius={location.accuracy || 10}
          stroke={true}
        />

        <NodesCluster setNode={setNode} />
        {props.children}
      </MapContainerStyled>
    </Box>
  );
};
export default NodeMap;
