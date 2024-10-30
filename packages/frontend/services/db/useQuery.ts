import { useEffect, useState } from "react";
import { dbQuery } from "./db.ts";
import { RecordId, Uuid } from "surrealdb";

interface QueryResult extends Record<string, unknown> {
  id: RecordId;
}

export const useLiveQuery = <T extends QueryResult>(
  query: string,
  parameters: Record<string, unknown> = {},
): T[] | null => {
  const [result, setResult] = useState<T[] | null>(null);
  const [queryUid, setQueryUid] = useState<Uuid | null>(null);
  useEffect(() => {
    dbQuery(async (db) => {
      const result = await db.query(`${query}; LIVE ${query}`, parameters);

      const queryUuid = result[1] as Uuid;
      setQueryUid(queryUuid);
      setResult(result[0] as T[]);

      await db.subscribeLive(queryUuid, (action, result) => {
        if (action === "CLOSE") {
          return;
        }

        setResult((current) => {
          if (null === current) {
            return current;
          }

          if (action === "DELETE") {
            return current.filter(
              (item) => String(item.id) !== String(result.id),
            );
          }

          if (action === "CREATE") {
            const filtered = current.filter(
              (item) => String(item.id) !== String(result.id),
            );
            return [...filtered, result] as T[];
          }

          if (action === "UPDATE") {
            return current.map((item) => {
              if (String(item.id) === String(result.id)) {
                return result;
              }

              return item;
            }) as T[];
          }

          return current;
        });
      });
    });

    return () => {
      dbQuery(async (db) => {
        if (queryUid) {
          db.kill(queryUid);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(parameters)]);

  return result;
};

export const useLiveRecord = <T>(
  record: RecordId,
  columns: string[] = ["*"],
): T | null => {
  const result = useLiveQuery(
    `SELECT ${columns.join(", ")} FROM ${record.tb} WHERE id = $id`,
    {
      id: record,
    },
  );

  if (result?.length === 1) {
    return result[0] as T;
  }

  return null;
};

export const useQuery = <T extends QueryResult>(
  query: string,
  parameters: Record<string, unknown> = {},
): T[] | null => {
  const [result, setResult] = useState<T[] | null>(null);
  useEffect(() => {
    dbQuery(async (db) => {
      const result = await db.query(query, parameters);
      setResult(result[0] as T[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(parameters)]);

  return result;
};
