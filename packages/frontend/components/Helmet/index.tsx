import { Helmet as HelmetBase, HelmetProps } from "react-helmet-async";
import React, { type PropsWithChildren } from "react";

export const Helmet: React.FC<PropsWithChildren<HelmetProps>> = (props) => {
  return <HelmetBase {...props} titleTemplate={"%s | MeshMonitor"} />;
};
