import type { MigrationFn } from "umzug";
import { UmzugContext } from "../helpers/umzug";

export const name = "2024.10.25T12.21.13.CreateSchemas";

export const up: MigrationFn<UmzugContext> = async (params) => {
  const { dbQuery } = params.context;
  await dbQuery(async (db) => {
    await db.query(`
        DEFINE USER IF NOT EXISTS public ON NAMESPACE PASSWORD 'public' ROLES VIEWER DURATION FOR SESSION 1d, FOR TOKEN 1d;
    `);
  });
};
