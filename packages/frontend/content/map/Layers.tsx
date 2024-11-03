import React from "react";
import NodeLayer from "./Layers/NodeLayer.tsx";
import SelectedNodeLayer from "./Layers/SelectedNodeLayer.tsx";

export const Layers: React.FC = () => {
  return (
    <>
      <NodeLayer />
      <SelectedNodeLayer />
    </>
  );
};

export default Layers;
