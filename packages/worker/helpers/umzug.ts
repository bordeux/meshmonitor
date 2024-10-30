import { Umzug } from "umzug";
import { UmzugSurrealStorage } from "./UmzugSurrealStorage";
import { dbQuery } from "../services/db/db";

const folder = import.meta.dir + "/../migrations";

export interface UmzugContext {
  dbQuery: typeof dbQuery;
}

type UmzugType = Umzug<UmzugContext>;

let umzug: UmzugType;

export const getUmzug = async (): Promise<UmzugType> => {
  if (umzug) {
    return umzug;
  }

  const { migrations } = await import("../migrations");

  console.log("migrations are", migrations);
  umzug = new Umzug({
    migrations: migrations as any,
    context: { dbQuery },
    storage: new UmzugSurrealStorage(),
    logger: console,
    create: {
      folder: folder,
    },
  });
  return umzug;
};
