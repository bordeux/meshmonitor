import * as React from "react";
import "leaflet/dist/leaflet.css";
import { Log } from "../../../shared/Schemas/LogSchema";
import { ItemTypes } from "./Items";
import { getNode } from "./helpers/getNode.ts";

interface ItemProps {
  log: Log;
  nodeId: string;
}

export interface SubItemProps {
  log: Log;
  position: "left" | "right";
}

const Item: React.FC<ItemProps> = (props) => {
  const Component =
    ItemTypes[String(props.log.type) as keyof typeof ItemTypes] ?? null;

  if (!Component) {
    return null;
  }

  const isFrom = String(getNode(props.log, "from").id.id) === props.nodeId;

  return <Component {...props} position={isFrom ? "left" : "right"} />;
};
export default Item;
