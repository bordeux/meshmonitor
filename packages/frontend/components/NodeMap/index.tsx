import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import { useLiveQuery } from "../../services/db/useQuery.ts";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { PositionData } from "./MapEvents.ts";
import NodeInfo from "../NodeInfo";
import NodePositionHistory from "./NodePositionHistory";
import { RecordId } from "surrealdb";

interface MapProps {
  position?: PositionData;
  node?: Node;
  children?: React.ReactNode;
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

const NodeMap: React.FC<MapProps> = ({ position, node, children }) => {
  const [nodeId, setNodeId] = React.useState<RecordId | null>(node?.id || null);

  if (!position) {
    position = {
      zoom: 9,
      lat: 50.2653356,
      long: 18.806,
    };
  }

  const nodes =
    useLiveQuery<Node>(`
      SELECT id,
             long_name,
             short_name,
             position,
             position_altitude
      FROM node
      WHERE has_position = true
    `) ?? (node ? [node] : []);

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
        <MarkerClusterGroup>
          {nodes?.map((node) => {
            if (!node.position) {
              return;
            }
            const cords = node.position.coordinates;
            const id = String(node.id.id);
            const pin = new LatLng(cords[0], cords[1], node.position_altitude);
            return (
              <Marker
                position={pin}
                key={id}
                eventHandlers={{
                  popupopen: () => {
                    setNodeId(node.id);
                  },
                  popupclose: () => {
                    setNodeId(null);
                  },
                }}
              >
                <Popup>
                  <Box>
                    <NodeInfo nodeId={String(id)} />
                  </Box>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
        {nodeId && <NodePositionHistory nodeId={nodeId} />}
        {children}
      </MapContainerStyled>
    </Box>
  );
};
export default NodeMap;
