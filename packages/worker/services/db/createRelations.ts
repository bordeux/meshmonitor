import { RecordId } from "surrealdb";
import { dbQuery } from "./db";

const TABLE_NAME = "metadata_relations";
interface Props {
  from: RecordId;
  to: RecordId;
  id: string;
  type: string;
  data?: Record<string, any>;
}

export const createRelations = async ({ from, to, data, id, type }: Props) => {
  const relationId = new RecordId(TABLE_NAME, id);
  return dbQuery(async (db) => {
    await db.upsert(relationId, {
      ...data,
      in: from,
      out: to,
      type,
      time: new Date(),
    });
  });
};
