import type { MigrationFn } from "umzug";
import { UmzugContext } from "../helpers/umzug.ts";

type Migration = {
  name: string;
  up: MigrationFn<UmzugContext>;
  down?: MigrationFn<UmzugContext>;
};

export const migrations: Migration[] = [
  await import("./2024.10.25T12.21.13.CreateSchemas"),
  await import("./2024.10.25T18.21.13.LastSentAndReceivedMessage"),
  await import("./2024.10.25T18.21.14.HasChannelAndPrivateMessage"),
  await import("./2024.11.01T18.21.14.AddIndexes"),
];
