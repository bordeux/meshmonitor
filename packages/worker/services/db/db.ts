import { Surreal } from "surrealdb";
import { config } from "../../config";

const db = new Surreal();

export const dbQuery = async <T>(callback: (db: Surreal) => T): Promise<T> => {
  if (db.status !== "connected") {
    const url = ["ws://", config.db.host, ":", config.db.port, "/rpc"].join("");
    await db.connect(url, {
      database: config.db.name,
      namespace: config.db.namespace.public,
      auth: {
        username: config.db.username,
        password: config.db.password,
      },
    });
  }

  return callback(db);
};
