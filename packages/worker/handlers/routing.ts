import { RecordId } from "surrealdb";
import {
  Routing,
  Routing_Error,
} from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";
import { ProcessingError } from "../errors/ProcessingError";
import { createRxTime } from "../helpers/createRxTime.ts";

export const handler = async ({
  message,
  topicMetadata,
  metadataId,
}: HandlerArguments<Routing>) => {
  const messageTime = createRxTime(message.rxTime);
  const from = message.from.toString(16);
  const to = message.to.toString(16);
  const caseName = message.payload.variant.case;
  if (caseName !== "errorReason") {
    throw new ProcessingError(`Unknown routing case`, null, {
      caseName,
    });
  }
  const caseValue = message.payload.variant.value as Routing_Error;
  const nodeId = new RecordId("node", from);
  const nodeTo = new RecordId("node", to);
  const params = {
    node_from: nodeId,
    node_to: nodeTo,
    _nodes: [nodeId, nodeTo],
    time: messageTime,
    case_name: caseName,
    value: caseValue,
  };
  const id = new RecordId("routing", message.id.toString(16));

  await Promise.all([
    merge(id, params),
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
  ]);
};
