import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { dbQuery } from "../../services/db/db.ts";
import { RecordId } from "surrealdb";
import { MapContext } from "./MapContext.tsx";

export const NodePick: React.FC = () => {
  const { setValue } = useContext(MapContext);
  const [searchParams] = useSearchParams();
  const node = searchParams.get("node");

  useEffect(() => {
    if (!node) {
      return;
    }
    dbQuery((db) => {
      return db.select(new RecordId("node", node));
    }).then((nodeRecord: any) => {
      setValue({ node: nodeRecord });
    });
  }, [node, setValue]);

  return null;
};

export default NodePick;
