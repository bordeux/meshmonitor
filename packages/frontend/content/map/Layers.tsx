import React, { PropsWithChildren, useContext } from "react";
import NodeLayer from "./Layers/NodeLayer.tsx";
import SelectedNodeLayer from "./Layers/SelectedNodeLayer.tsx";
import PositionHistory from "./Layers/PositionHistory.tsx";
import { LayerType, MapContext } from "./MapContext.tsx";

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
        <PositionHistory />
      </PickableLayer>
    </>
  );
};

export default Layers;
