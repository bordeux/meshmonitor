import { dbQuery } from "../services/db/db";
import { Table } from "surrealdb";
import { ProcessingError } from "../errors/ProcessingError";

const errorToData = (error: unknown): Record<string, any> => {
  if (error instanceof ProcessingError) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      previous: errorToData(error.getPreviousError()),
      data: error.getData(),
    };
  }
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  if (error instanceof String) {
    return {
      message: error,
    };
  }

  if (error?.toString) {
    return {
      message: error.toString(),
    };
  }

  return {};
};
export const createErrorLog = async (
  topic: string,
  message: Buffer,
  error: unknown,
): Promise<void> => {
  await dbQuery(async (db) => {
    return db.insert(new Table("error_log"), {
      topic,
      payload: message.toString("base64"),
      ...errorToData(error),
    });
  });
};
