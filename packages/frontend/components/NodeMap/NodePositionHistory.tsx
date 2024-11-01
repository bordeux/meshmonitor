import * as React from "react";
import { useQuery } from "../../services/db/useQuery.ts";
import { GeometryPoint, RecordId } from "surrealdb";
import { createGeoPointFromMesh } from "../../../shared/helpers/createGeoPointFromMesh.ts";
import { Polyline } from "react-leaflet/Polyline";
import { LatLng } from "leaflet";
import { LayerGroup } from "react-leaflet/LayerGroup";
import { Circle } from "react-leaflet/Circle";

interface NodePositionHistoryProps {
  nodeId: RecordId;
}

interface PositionData {
  id: RecordId;
  time: Date;
  longitude: number;
  latitude: number;
}

const filterPositionData = (data: PositionData[]) => {
  return data
    .map((item) => {
      return {
        point: createGeoPointFromMesh(item.latitude, item.longitude),
        id: `${item.latitude}x${item.longitude}`,
        time: item.time,
      };
    })
    .filter((item) => item.point !== null)
    .filter((item, index, arr) => {
      return index === 0 || item.id !== arr[index - 1].id;
    })
    .map((item) => {
      const currentPoint = item.point as GeometryPoint;
      return {
        ...item,
        latLng: new LatLng(currentPoint.point[0], currentPoint.point[1]),
      };
    });
};

const NodePositionHistory: React.FC<NodePositionHistoryProps> = ({
  nodeId,
}) => {
  const { data } = useQuery(
    `
        SELECT
          id,
          time,
          data.longitude_i as longitude,
          data.latitude_i as latitude
        FROM
          log
        WHERE
            type IN ($types)
        AND node_from = $nodeId
        ORDER BY time DESC
        LIMIT $limit`,
    {
      types: ["meshtastic.Position", "meshtastic.MapReport"],
      nodeId: nodeId,
      limit: 5000,
    },
  );

  const positions = data ? filterPositionData(data as any) : [];
  if (positions.length < 2) {
    return null;
  }

  return (
    <LayerGroup>
      <Polyline positions={positions.map((item) => item.latLng)} />
      {positions.map((item, index) => {
        return (
          <Circle
            center={item.latLng}
            radius={5}
            pathOptions={{ color: "red" }}
            key={index}
          />
        );
      })}
    </LayerGroup>
  );
};

export default NodePositionHistory;
