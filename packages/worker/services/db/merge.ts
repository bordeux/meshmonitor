import { RecordId } from "surrealdb";
import { dbQuery } from "./db";

export const merge = async (
  recordId: RecordId,
  params: Record<string, unknown>,
) => {
  return dbQuery(async (db) => {
    const result = await db.merge(recordId, params);
    if (result) {
      return result;
    }

    return db.upsert(recordId, params);
  });
};
