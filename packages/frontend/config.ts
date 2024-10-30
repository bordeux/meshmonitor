import { z } from "zod";

const hostname = window.location.hostname;
const port =
  window.location.port || (window.location.protocol === "https:" ? 443 : 80);

const ConfigSchema = z.object({
  db: z.object({
    host: z.string({ coerce: true }).default(hostname),
    port: z.number({ coerce: true }).default(Number(port)),
    name: z.string({ coerce: true }).default("meshtastic"),
    path: z.string({ coerce: true }).default("/db/rpc"),
    username: z.string().default("public"),
    password: z.string().default("public"),
    namespace: z.object({
      public: z.string({ coerce: true }).default("public"),
    }),
  }),
});

declare let APP_ENV: Record<string, string | number>;

export const config = ConfigSchema.parse({
  db: {
    host: APP_ENV.REACT_DB_HOST,
    port: APP_ENV.REACT_DB_PORT,
    path: APP_ENV.REACT_DB_PATH,
    name: APP_ENV.REACT_DB_NAME,
    username: APP_ENV.REACT_DB_USERNAME,
    password: APP_ENV.REACT_DB_PASSWORD,
    namespace: {
      public: APP_ENV.REACT_DB_NAMESPACE,
    },
  },
});
