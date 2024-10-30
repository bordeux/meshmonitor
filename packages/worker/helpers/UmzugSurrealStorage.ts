import type { UmzugStorage } from "umzug/lib/storage/contract";
import { MigrationParams } from "umzug";
import { dbQuery } from "../services/db/db";
import { RecordId, Table } from "surrealdb";

type Migration = {
  id: RecordId;
  name: string;
  executed_at: Date;
};

export class UmzugSurrealStorage<Ctx = unknown> implements UmzugStorage<Ctx> {
  async executed(_: Pick<MigrationParams<Ctx>, "context">): Promise<string[]> {
    return await dbQuery(async (db) => {
      const result = await db.query<[Migration[]]>("SELECT * FROM migration");
      return result[0].map((migration) => migration.name);
    });
  }

  async logMigration(params: MigrationParams<Ctx>): Promise<void> {
    await dbQuery(async (db) => {
      return db.insert(new Table("migration"), {
        name: params.name,
        executed_at: new Date(),
      });
    });
  }

  async unlogMigration(params: MigrationParams<Ctx>): Promise<void> {
    await dbQuery(async (db) => {
      return db.query("DELETE FROM migration WHERE name = $name", {
        name: params.name,
      });
    });
  }
}
