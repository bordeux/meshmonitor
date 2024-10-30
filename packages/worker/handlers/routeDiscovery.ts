import { RecordId } from "surrealdb";
import { RouteDiscovery } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";

export const handler = async ({
  message,
  metadataId,
  topicMetadata,
}: HandlerArguments<RouteDiscovery>) => {
  const messageTime = new Date(message.rxTime * 1000);
  const from = message.from.toString(16);
  const to = message.to.toString(16);

  const nodeId = new RecordId("node", from);
  const params = {
    node_from: nodeId,
    node_to: new RecordId("node", to),
    time: messageTime,
    route: message.payload.route.map(
      (item) => new RecordId("node", item.toString(16)),
    ),
    route_back: message.payload.routeBack.map(
      (item) => new RecordId("node", item.toString(16)),
    ),
    snr_towards: message.payload.snrTowards,
    snr_back: message.payload.snrBack,
  };

  const routeRecordId = new RecordId("route", `${from}x${to}`);

  await Promise.all([
    merge(routeRecordId, params),
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
      from: routeRecordId,
      to: metadataId,
      id: `rd-${topicMetadata.node.id}x${routeRecordId.id}`,
      type: "route",
    }),
  ]);
};
