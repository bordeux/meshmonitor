import { Telemetry } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js";
import { meshtasticObjectToSnakeCase } from "../helpers/meshtasticObjectToSnakeCase.js";
import { RecordId } from "surrealdb";

import { camelToSnakeCase } from "../../shared/helpers/camelToSnakeCase";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";
import { ProcessingError } from "../errors/ProcessingError";
import { createRxTime } from "../helpers/createRxTime.ts";

export const handler = async ({
  message,
  metadataId,
  topicMetadata,
}: HandlerArguments<Telemetry>) => {
  const type = camelToSnakeCase(String(message.payload.variant.case));
  if (!type) {
    throw new ProcessingError(`Unknown telemetry type`, null, {
      payload: message.payload,
    });
  }

  const params = {
    [type]: meshtasticObjectToSnakeCase(message.payload.variant.value),
    [`has_${type}`]: true,
    last_heard: createRxTime(message.rxTime),
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
