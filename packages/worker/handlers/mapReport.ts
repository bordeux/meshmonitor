import { safeString } from "../helpers/safeString.js";
import { RecordId } from "surrealdb";
import { MapReport } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";
import { createGeoPointFromMesh } from "../../shared/helpers/createGeoPointFromMesh";

export const handler = async ({
  message,
  metadataId,
}: HandlerArguments<MapReport>) => {
  const geoPoint = createGeoPointFromMesh(
    message.payload.latitudeI,
    message.payload.longitudeI,
  );

  let positionData = {};
  if (geoPoint) {
    positionData = {
      position: geoPoint,
      position_precision_bits: message.payload.positionPrecision,
      position_altitude: message.payload.altitude,
      has_position: true,
    };
  }

  const nodeId = new RecordId("node", message.from.toString(16));

  const params = {
    has_map_report: true,
    has_info: true,
    hw_model: message.payload.hwModel,
    long_name: safeString(message.payload.longName),
    short_name: safeString(message.payload.shortName) || null,
    role: message.payload.role,
    modem_preset: message.payload.modemPreset,
    firmware_version: message.payload.firmwareVersion,
    has_default_channel: message.payload.hasDefaultChannel,
    num_online_local_nodes: message.payload.numOnlineLocalNodes,
    region: message.payload.region,
    last_heard: new Date(),
    ...positionData,
  };

  await Promise.all([
    merge(nodeId, params),
    createRelations({
      from: nodeId,
      to: metadataId,
      id: `${nodeId.id}x${nodeId.id}`,
      type: "node",
    }),
  ]);
};
