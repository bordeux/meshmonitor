import { RecordId } from "surrealdb";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";
import { StoreAndForward } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/storeforward_pb.js";
import { createRxTime } from "../helpers/createRxTime.ts";

export const handler = async ({
  message,
  metadataId,
  topicMetadata,
}: HandlerArguments<StoreAndForward>) => {
  const messageTime = createRxTime(message.rxTime);
  const id = message.id.toString(16);
  const from = message.from.toString(16);
  const to = message.to.toString(16);

  const nodeId = new RecordId("node", from);
  const params = {
    node_from: nodeId,
    node_to: new RecordId("node", to),
    time: messageTime,
    rr: message.payload.rr,
    variant: message.payload.variant.case,
    value: message.payload.variant.value,
  };

  const storeRecordId = new RecordId("store_and_forward", id);

  await Promise.all([
    merge(storeRecordId, params),
    merge(nodeId, {
      has_route: true,
      last_heard: messageTime,
    }),
    createRelations({
      from: nodeId,
      to: metadataId,
      id: `${topicMetadata.node.id}x${nodeId.id}`,
      type: "node",
    }),
    createRelations({
      from: storeRecordId,
      to: metadataId,
      id: `saf-${topicMetadata.node.id}x${storeRecordId.id}`,
      type: "route",
    }),
  ]);
};
