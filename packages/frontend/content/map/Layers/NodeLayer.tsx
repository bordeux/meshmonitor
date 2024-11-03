import { LayerGroup } from "react-leaflet/LayerGroup";
import { useQuery } from "../../../services/db/useQuery.ts";
import type { Node } from "../../../../shared/Schemas/NodeSchema.ts";
import { useInterval } from "ahooks";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LatLng } from "leaflet";
import { Marker } from "react-leaflet";
import * as React from "react";
import { useContext, useMemo } from "react";
import { MapContext } from "../MapContext.tsx";
const REFRESH_INTERVAL = 60 * 1000;

const MarkersGroup: React.FC = () => {
  const { setValue } = useContext(MapContext);
  const { data, reload, version, loaded } = useQuery<Node>(`
      SELECT id,
             long_name,
             short_name,
             position,
             position_altitude,
             position_precision_bits
      FROM node
      WHERE has_position = true
    `);

  useInterval(() => {
    reload();
  }, REFRESH_INTERVAL);

  return useMemo(() => {
    return (
      <MarkerClusterGroup>
        {data.map((node) => {
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
                  setValue({ node });
                },
              }}
            />
          );
        })}
      </MarkerClusterGroup>
    );
  }, [version, loaded]);
};
const NodeLayer: React.FC = () => {
  return (
    <LayerGroup>
      <MarkersGroup />
    </LayerGroup>
  );
};

export default NodeLayer;
