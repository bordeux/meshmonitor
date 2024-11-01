import type { MigrationFn } from "umzug";
import { UmzugContext } from "../helpers/umzug";

export const name = "2024.10.25T18.21.14.HasChannelAndPrivateMessage";

export const up: MigrationFn<UmzugContext> = async (params) => {
  const { dbQuery } = params.context;
  await dbQuery(async (db) => {
    await db.query(`
        LET $base = SELECT node_to FROM message WHERE node_to != node:ffffffff AND node_from != node:ffffffff GROUP BY node_to;
        FOR $item IN $base {
           UPDATE $item.node_to SET has_private_message = true;
        };
    `);

    await db.query(`
        LET $base = SELECT node_from FROM message WHERE node_to != node:ffffffff AND node_from != node:ffffffff GROUP BY node_from;
        FOR $item IN $base {
           UPDATE $item.node_from SET has_private_message = true;
        };
    `);

    await db.query(`
        LET $base = SELECT node_from FROM message WHERE node_to = node:ffffffff GROUP BY node_from;
        FOR $item IN $base {
           UPDATE $item.node_from SET has_channel_message = true;
        };
    `);

    await db.query(`
        DEFINE OVERWRITE INDEX log_timeline ON log FIELDS node_from, node_to, time, type;
    `);
  });
};
export const down: MigrationFn<UmzugContext> = async (params) => {
  const { dbQuery } = params.context;
  await dbQuery(async (db) => {
    await db.query(`
      UPDATE node
      SET has_channel_message = NONE,
          has_private_message     = NONE
    `);
  });
};
