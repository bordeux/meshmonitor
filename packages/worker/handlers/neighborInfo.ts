import { RecordId } from "surrealdb";
import { NeighborInfo } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";
import { createRxTime } from "../helpers/createRxTime.ts";

export const handler = async ({
  message,
  metadataId,
  topicMetadata,
}: HandlerArguments<NeighborInfo>) => {
  const params = {
    neighbors_count: message.payload.neighbors.length,
    broadcast_interval_secs: message.payload.nodeBroadcastIntervalSecs,
    last_heard: createRxTime(message.rxTime),
    neighbors: message.payload.neighbors.map(
      (item) => new RecordId("node", item.nodeId.toString(16)),
    ),
    has_neighbor_info: true,
  };

  const nodeId = new RecordId("node", message.from.toString(16));

  await Promise.all([
    merge(nodeId, params),
    createRelations({
      from: nodeId,
      to: metadataId,
      id: `${topicMetadata.node.id}x${nodeId.id}`,
      type: "node",
    }),
  ]);
};
