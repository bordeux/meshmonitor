import { RecordId } from "surrealdb";
import { MAIN_CHANNEL_ID } from "../../shared/Schemas/NodeSchema";

export interface TopicMetadata {
  channelName: string;
  node: RecordId;
  type: "mapReport" | "channel";
  topic: string;
}

export const decodeTopic = (topic: string): TopicMetadata | null => {
  const channelMatch = topic.match(/.*\/2\/e\/([^/]*)\/!([A-Za-z0-9]*)$/);
  if (channelMatch) {
    return {
      channelName: String(channelMatch[1]),
      node: new RecordId("node", String(channelMatch[2])),
      type: "channel",
      topic,
    };
  }

  const mapMatch = topic.match(/.*\/2\/map\/$/);
  if (mapMatch) {
    return {
      type: "mapReport",
      topic,
      channelName: "",
      node: new RecordId("node", MAIN_CHANNEL_ID),
    };
  }

  return null;
};
