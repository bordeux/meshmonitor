import { DataFrame } from "./decodeMQTTMessage";
import { TopicMetadata } from "./decodeTopic";
import { RecordId } from "surrealdb";
import { insert } from "../services/db/insert";
import { createRxTime } from "./createRxTime.ts";

export const createMetadata = async (
  message: DataFrame<any>,
  topicMetadata: TopicMetadata,
): Promise<RecordId> => {
  const payloadType = message.payload.$typeName;
  const messageId = message.id.toString(16);

  const idString = `${topicMetadata.node.id}x${messageId}`;
  const id = new RecordId("metadata", idString);

  const values = {
    topic_from_node: topicMetadata.node,
    topic_channel_name: topicMetadata.channelName,
    topic_type: topicMetadata.type,
    mesh_id: messageId,
    rx_rssi: message.rxRssi,
    rx_snr: message.rxSnr,
    time: createRxTime(message.rxTime),
    via_mqtt: message.viaMqtt,
    hop_limit: message.hopLimit,
    hop_start: message.hopStart,
    pki_encrypted: message.pkiEncrypted,
    channel: message.channel,
    priority: message.priority,
    delayed: message.delayed,
    want_ack: message.wantAck,
    node_from: new RecordId("node", message.from.toString(16)),
    node_to: new RecordId("node", message.to.toString(16)),
    payload_type: payloadType,
    topic: topicMetadata.topic,
  };

  await insert(id, values);
  return id;
};
