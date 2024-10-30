import { RecordId } from "surrealdb";
import { dbQuery } from "./db";

export const insert = async (
  recordId: RecordId,
  params: Record<string, unknown>,
) => {
  await dbQuery(async (db) => {
    if (await db.select(recordId)) {
      return;
    }
    await db.upsert(recordId, params);
  });

  return recordId;
};
