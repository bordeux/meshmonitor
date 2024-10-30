import { decodeTopic } from "./decodeTopic";
import { decodeMQTTMessage } from "./decodeMQTTMessage";
import { createMetadata } from "./createMetadata";
import routes from "../handlers";
import { createLog } from "./createLog";
import { ProcessingError } from "../errors/ProcessingError";

export const processMessage = async (topic: string, message: Buffer) => {
  const topicMetadata = decodeTopic(topic);
  // filter topics that are not supported
  if (!topicMetadata) {
    return;
  }

  const data = decodeMQTTMessage(message);

  if (!data) {
    return;
  }

  const metaData = await createMetadata(data, topicMetadata);
  const log = await createLog(data, metaData);

  const payloadType = data.payload.$typeName;
  const handler = routes[payloadType];

  if (!handler) {
    throw new ProcessingError("No handler for payload type", null, {
      data,
      payloadType,
    });
  }

  try {
    await handler({
      message: data,
      metadataId: metaData,
      logId: log,
      topicMetadata,
    });
  } catch (error) {
    throw new ProcessingError(
      "Error during processing message by handler",
      error,
    );
  }
};
