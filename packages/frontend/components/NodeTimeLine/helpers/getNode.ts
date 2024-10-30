import { Log } from "../../../../shared/Schemas/LogSchema.ts";
import { Node } from "../../../../shared/Schemas/NodeSchema.ts";

export const getNode = (log: Log, type: "from" | "to"): Node => {
  if (type === "from") {
    return (
      log.node_from || {
        id: log.node_from_id,
      }
    );
  }
  return log.node_to || { id: log.node_to_id };
};
