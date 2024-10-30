import { z } from "zod";
import { RecordId } from "surrealdb";
import { NodeSchema } from "./NodeSchema.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogSchema = z
  .object({
    id: z.instanceof(RecordId),
    node_from: NodeSchema,
    node_to: NodeSchema,
    time: z.instanceof(Date).optional(),
    type: z.string(),
    data: z.any(),
  })
  .required();

export type Log = z.infer<typeof LogSchema>;
