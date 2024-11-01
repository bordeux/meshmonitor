import { Text } from "../helpers/decodeMQTTMessage";
import { safeString } from "../helpers/safeString.js";
import { RecordId } from "surrealdb";
import { merge } from "../services/db/merge";
import { HandlerArguments } from "./index";
import { createRelations } from "../services/db/createRelations";
import { insert } from "../services/db/insert";
import { MAIN_CHANNEL_ID } from "../../shared/Schemas/Consts.ts";
import { createRxTime } from "../helpers/createRxTime.ts";

const isChannelMessage = (from: RecordId, to: RecordId) => {
  return (
    String(from.id) === MAIN_CHANNEL_ID || String(to.id) === MAIN_CHANNEL_ID
  );
};

export const handler = async ({
  message,
  topicMetadata,
  metadataId,
}: HandlerArguments<Text>) => {
  const messageTime = createRxTime(message.rxTime);
  const from = message.from.toString(16);

  const id = new RecordId("message", "x" + message.id.toString(16));
  const nodeFrom = new RecordId("node", from);
  const nodeTo = new RecordId("node", message.to.toString(16));
  const params = {
    node_from: nodeFrom,
    node_to: nodeTo,
    _nodes: [nodeFrom, nodeTo],
    channel: message.channel,
    channel_name: topicMetadata.channelName,
    time: messageTime,
    content: safeString(message.payload.text),
  };

  const additionalProperty = isChannelMessage(params.node_from, params.node_to)
    ? {
        has_channel_message: true,
      }
    : {
        has_private_message: true,
      };

  await Promise.all([
    insert(id, params),
    merge(params.node_from, {
      has_message: true,
      last_heard: messageTime,
      last_sent_message: id,
      ...additionalProperty,
    }),
    merge(params.node_to, {
      has_message: true,
      last_received_message: id,
      ...additionalProperty,
    }),
    createRelations({
      from: id,
      to: metadataId,
      id: String(metadataId.id),
      type: "message",
    }),
  ]);
};
