import { z } from "zod";

const ConfigSchema = z.object({
  mqtt: z.object({
    host: z.string(),
    port: z.number({ coerce: true }).default(1883),
    username: z.string().nullish(),
    password: z.string().nullish(),
  }),
  db: z.object({
    host: z.string(),
    port: z.number({ coerce: true }).default(1883),
    username: z.string(),
    password: z.string(),
    name: z.string({ coerce: true }).default("meshtastic"),
    namespace: z.object({
      public: z.string({ coerce: true }).default("public"),
    }),
  }),
});

export const config = ConfigSchema.parse({
  mqtt: {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    namespace: {
      public: process.env.DB_NAMESPACE_PUBLIC,
    },
  },
});
