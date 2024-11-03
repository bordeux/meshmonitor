import React from "react";
import NodeLayer from "./Layers/NodeLayer.tsx";
import SelectedNodeLayer from "./Layers/SelectedNodeLayer.tsx";
import PositionHistory from "./Layers/PositionHistory.tsx";

export const Layers: React.FC = () => {
  return (
    <>
      <NodeLayer />
      <SelectedNodeLayer />
      <PositionHistory />
    </>
  );
};

export default Layers;
