import { Surreal } from "surrealdb";
import { config } from "../../config.ts";

const db = new Surreal();

const isHttps = window.location.protocol === "https:";

export const dbQuery = async <T>(callback: (db: Surreal) => T): Promise<T> => {
  if (db.status !== "connected") {
    const url = [
      (isHttps ? "wss" : "ws") + "://",
      config.db.host,
      ":",
      config.db.port,
      config.db.path,
    ].join("");
    await db.connect(url, {
      database: config.db.name,
      namespace: config.db.namespace.public,
    });

    const token = await db.signin({
      namespace: config.db.namespace.public,
      username: config.db.username,
      password: config.db.password,
    });
    await db.authenticate(token);
  }

  return callback(db);
};
