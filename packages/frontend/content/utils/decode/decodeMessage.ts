import isBase64 from "is-base64";
import { Buffer } from "buffer";
import { fromBinary } from "@bufbuild/protobuf";
import { ServiceEnvelopeSchema } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb";

const decodeBuffer = (buffer: Buffer): any => {
  try {
    return fromBinary(ServiceEnvelopeSchema, buffer);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }

    return {
      error: "Error decoding buffer",
      message,
      buffer,
    };
  }
};
export const decodeMessage = (message: string): any => {
  let buffer: Buffer;
  if (isBase64(message)) {
    buffer = Buffer.from(message, "base64");
  } else {
    const d = message.split("").map((char) => char.charCodeAt(0));
    buffer = Buffer.from(d);
  }

  return decodeBuffer(buffer);
};
