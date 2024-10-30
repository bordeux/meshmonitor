import { z } from "zod";
import { RecordId } from "surrealdb";
import { NodeSchema } from "./NodeSchema.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MessageSchema = z
  .object({
    id: z.instanceof(RecordId),
    node_from: NodeSchema,
    node_to: NodeSchema,
    time: z.instanceof(Date).optional(),
    content: z.string(),
    channel: z.number(),
    channel_name: z.string(),
  })
  .required();

export type Message = z.infer<typeof MessageSchema>;
