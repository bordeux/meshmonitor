import { DataFrame } from "./decodeMQTTMessage";
import { RecordId } from "surrealdb";
import { insert } from "../services/db/insert";
import { camelToSnakeCase } from "../../shared/helpers/camelToSnakeCase";
import { createRelations } from "../services/db/createRelations";
import { bufferToHexString } from "./bufferToHexString";
import { nanoid } from "nanoid";
import { createRxTime } from "./createRxTime.ts";

const normalizeValue = (value: unknown) => {
  if (Buffer.isBuffer(value)) {
    return bufferToHexString(value);
  }
  if (value instanceof Uint8Array) {
    return bufferToHexString(value);
  }

  return value;
};

export const createLog = async (
  message: DataFrame<any>,
  metaDataId: RecordId<string>,
): Promise<RecordId> => {
  let idString = message.id.toString(16);
  if (!message.id) {
    idString = nanoid().toString();
  }

  const id = new RecordId("log", idString);

  const data: Record<string, any> = {};
  for (const key of Object.keys(message.payload)) {
    data[camelToSnakeCase(key).replaceAll("$", "")] = normalizeValue(
      message.payload[key],
    );
  }

  await Promise.all([
    insert(id, {
      data,
      type: data.type_name,
      node_from: new RecordId("node", message.from.toString(16)),
      node_to: new RecordId("node", message.to.toString(16)),
      time: createRxTime(message.rxTime),
    }),
    createRelations({
      from: id,
      to: metaDataId,
      id: `log${metaDataId.id}`,
      type: "log",
    }),
  ]);

  return id;
};
