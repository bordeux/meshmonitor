import type { MigrationFn } from "umzug";
import { UmzugContext } from "../helpers/umzug";

export const name = "2024.11.01T18.21.14.AddIndexes";

export const up: MigrationFn<UmzugContext> = async (params) => {
  const { dbQuery } = params.context;
  await dbQuery(async (db) => {
    await db.query(`
        LET $base = SELECT id, node_to, node_from FROM log;
        FOR $item IN $base {
           UPDATE $item.id SET _nodes = [$item.node_to, $item.node_from];
        };
    `);
    await db.query(`
        DEFINE INDEX OVERWRITE log_timeline ON log FIELDS _nodes, type, time CONCURRENTLY;
    `);
    await db.query(`
        DEFINE INDEX OVERWRITE node_map ON node FIELDS has_position CONCURRENTLY;
    `);

    await db.query(`
        LET $base = SELECT id, node_to, node_from FROM message;
        FOR $item IN $base {
           UPDATE $item.id SET _nodes = [$item.node_to, $item.node_from];
        };
    `);
    await db.query(`
        DEFINE INDEX OVERWRITE message_nodes ON message FIELDS _nodes CONCURRENTLY;
    `);

    await db.query(`
        DEFINE INDEX OVERWRITE log_node_from ON log FIELDS node_from, type, time CONCURRENTLY;
    `);
  });
};
export const down: MigrationFn<UmzugContext> = async (params) => {
  const { dbQuery } = params.context;
  await dbQuery(async (db) => {
    await db.query("REMOVE INDEX log_timeline ON TABLE log;");
    await db.query("REMOVE INDEX node_map ON TABLE node;");
    await db.query("REMOVE INDEX message_nodes ON TABLE node;");
    await db.query("REMOVE INDEX log_node_from ON TABLE node;");
    await db.query(`UPDATE log SET _nodes = NONE`);
    await db.query(`UPDATE message SET _nodes = NONE`);
  });
};
