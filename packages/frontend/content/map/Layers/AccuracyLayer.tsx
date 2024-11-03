import { LayerGroup } from "react-leaflet/LayerGroup";
import * as React from "react";
import { useContext, useMemo } from "react";
import { MapContext } from "../MapContext.tsx";
import { Circle } from "react-leaflet/Circle";
import { LatLng } from "leaflet";
import { calculatePrecision } from "../../../../shared/helpers/calculatePrecision.ts";

const AccuracyLayer: React.FC = () => {
  const { node } = useContext(MapContext);

  return useMemo(() => {
    const cords = node?.position?.point;

    if (!node || !cords) {
      return null;
    }

    const radius = calculatePrecision(node.position_precision_bits || 0);
    if (!radius) {
      return null;
    }

    return (
      <LayerGroup>
        <Circle
          center={new LatLng(cords[0], cords[1])}
          radius={radius}
          pathOptions={{ color: "yellow" }}
        />
      </LayerGroup>
    );
  }, [node?.id?.id]);
};

export default AccuracyLayer;
