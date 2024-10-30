import { Position } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js";
import { RecordId } from "surrealdb";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";
import { createGeoPointFromMesh } from "../../shared/helpers/createGeoPointFromMesh";

export const handler = async ({
  message,
  metadataId,
  topicMetadata,
}: HandlerArguments<Position>) => {
  const point = createGeoPointFromMesh(
    message.payload.latitudeI,
    message.payload.longitudeI,
  );

  if (!point) {
    return;
  }

  const params = {
    has_position: true,
    position: point,
    position_precision_bits: message.payload.precisionBits,
    position_altitude: message.payload.altitude,
    last_heard: new Date(message.rxTime * 1000),
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
