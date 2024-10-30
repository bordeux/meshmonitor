import { MAIN_CHANNEL_ID, Node } from "../../shared/Schemas/NodeSchema.ts";

export const getDisplayNodeName = (node: Node | undefined): string => {
  if (!node) {
    return "Unknown";
  }

  if (node.id.id == MAIN_CHANNEL_ID) {
    return "Main Channel";
  }

  return node.long_name ?? node.short_name ?? String(node.id.id);
};
