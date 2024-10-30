import type { MigrationFn } from "umzug";
import { UmzugContext } from "../helpers/umzug";

export const name = "2024.10.25T18.21.13.LastSentAndReceivedMessage";
export const up: MigrationFn<UmzugContext> = async (params) => {
  const { dbQuery } = params.context;
  await dbQuery(async (db) => {
    await db.query(`
        LET $base = SELECT node_to as id, time, id as message_id FROM message ORDER BY node_to, time DESC;
        LET $stats = SELECT array::group({time: time, message_id: message_id }) as grp, id FROM $base GROUP BY id;
        FOR $item IN $stats {
           UPDATE $item.id SET last_received_message = $item.grp[0].message_id, has_message = true;
        };
    `);

    await db.query(`
        LET $base = SELECT node_from as id, time, id as message_id FROM message ORDER BY node_from, time DESC;
        LET $stats = SELECT array::group({time: time, message_id: message_id }) as grp, id FROM $base GROUP BY id;
        FOR $item IN $stats {
           UPDATE $item.id SET last_sent_message = $item.grp[0].message_id, has_message = true;
        };
    `);
  });
};
export const down: MigrationFn<UmzugContext> = async (params) => {
  const { dbQuery } = params.context;
  await dbQuery(async (db) => {
    await db.query(`
      UPDATE node
      SET last_received_message = NONE,
          last_sent_message     = NONE
    `);
  });
};
