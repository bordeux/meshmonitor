import * as React from "react";
import "leaflet/dist/leaflet.css";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { getDisplayNodeName } from "../../helpers/getDisplayNodeName.ts";
import NodePopover from "../NodePopover";

interface NodeLinkProps {
  node: Node;
}

const NodeLink: React.FC<NodeLinkProps> = ({ node }) => {
  if (!node) {
    return getDisplayNodeName(node);
  }

  return (
    <>
      <NodePopover nodeId={node.id}>{getDisplayNodeName(node)}</NodePopover>
    </>
  );
};
export default NodeLink;
