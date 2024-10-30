import type { Node } from "../../shared/Schemas/NodeSchema.ts";

export const isNodeMatchString = (node: Node, search: string) => {
  if (!search) {
    return true;
  }
  const params = [node.id.id, node.short_name, node.long_name]
    .filter(Boolean)
    .map(String);

  return params.join(" ").toLowerCase().includes(search.toLowerCase());
};
