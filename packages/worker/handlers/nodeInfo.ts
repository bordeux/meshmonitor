import { safeString } from "../helpers/safeString.js";
import { User } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js";
import { bufferToHexString } from "../helpers/bufferToHexString.js";
import { RecordId } from "surrealdb";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";

export const handler = async ({
  message,
  metadataId,
  topicMetadata,
}: HandlerArguments<User>) => {
  const params = {
    has_info: true,
    hw_model: message.payload.hwModel,
    long_name: safeString(message.payload.longName),
    short_name: safeString(message.payload.shortName) || null,
    role: message.payload.role,
    is_licensed: message.payload.isLicensed,
    public_key: bufferToHexString(message.payload.publicKey),
    last_heard: new Date(message.rxTime * 1000),
  };

  const nodeId = new RecordId("node", message.from.toString(16));
  await merge(nodeId, params);
  await createRelations({
    from: nodeId,
    to: metadataId,
    id: `${topicMetadata.node.id}x${nodeId.id}`,
    type: "node",
  });
};
