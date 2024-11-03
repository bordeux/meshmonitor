import React, { PropsWithChildren, useContext } from "react";
import NodeLayer from "./Layers/NodeLayer.tsx";
import SelectedNodeLayer from "./Layers/SelectedNodeLayer.tsx";
import PositionHistoryLayer from "./Layers/PositionHistoryLayer.tsx";
import { LayerType, MapContext } from "./MapContext.tsx";
import AccuracyLayer from "./Layers/AccuracyLayer.tsx";

const PickableLayer: React.FC<{ id: LayerType } & PropsWithChildren> = ({
  id,
  children,
}) => {
  const { layers } = useContext(MapContext);
  if (!layers || !layers.includes(id)) {
    return null;
  }

  return children;
};
export const Layers: React.FC = () => {
  return (
    <>
      <NodeLayer />
      <SelectedNodeLayer />
      <PickableLayer id={LayerType.POSITION_HISTORY}>
        <PositionHistoryLayer />
      </PickableLayer>
      <PickableLayer id={LayerType.ACCURACY}>
        <AccuracyLayer />
      </PickableLayer>
    </>
  );
};

export default Layers;
