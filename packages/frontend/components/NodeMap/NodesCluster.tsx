import * as React from "react";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { LatLng } from "leaflet";
import { Marker } from "react-leaflet";
import { useQuery } from "../../services/db/useQuery.ts";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useInterval } from "ahooks";

const REFRESH_INTERVAL = 60 * 1000;

interface NodeMarkerProps {
  node: Node;
  onSelect?: (node: Node) => void;
}
const NodeMarker: React.FC<NodeMarkerProps> = ({ node, onSelect }) => {
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
        click: () => {
          if (onSelect) {
            setTimeout(() => onSelect(node));
          }
        },
      }}
    />
  );
};

interface NodesClusterProps {
  setNode?: (node: Node) => void;
}
const NodesCluster: React.FC<NodesClusterProps> = ({ setNode }) => {
  const { data, reload } = useQuery<Node>(`
      SELECT id,
             long_name,
             short_name,
             position,
             position_altitude
      FROM node
      WHERE has_position = true
    `);

  useInterval(() => {
    reload();
  }, REFRESH_INTERVAL);

  return (
    <MarkerClusterGroup>
      {data.map((node) => {
        return (
          <NodeMarker node={node} key={String(node.id.id)} onSelect={setNode} />
        );
      })}
    </MarkerClusterGroup>
  );
};

export default NodesCluster;
