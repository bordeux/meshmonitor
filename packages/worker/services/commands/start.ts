import { config } from "../../config";
import mqtt from "mqtt";
import { processMessage } from "../../helpers/processMessage";
import { createErrorLog } from "../../helpers/createErrorLog";
import { getUmzug } from "../../helpers/umzug";

const migrateIfNecessary = async () => {
  const umzug = await getUmzug();
  umzug.on("migrating", (ev) => {
    console.log(`Start migrating ${ev.name}`);
  });

  umzug.on("migrated", (ev) => {
    console.log(`Finished migrating ${ev.name}`);
  });

  const pending = await umzug.pending();
  if (pending.length) {
    console.log("Running pending migrations");
    await umzug.up();
  } else {
    console.log("No pending migrations");
  }
};

const onMessage = async (topic: string, message: Buffer) => {
  try {
    await processMessage(topic, message);
  } catch (error) {
    await createErrorLog(topic, message, error);
  }
};
export const start = async () => {
  await migrateIfNecessary();

  const connectionData = {
    username: config.mqtt.username || undefined,
    password: config.mqtt.password || undefined,
    host: config.mqtt.host,
    port: config.mqtt.port,
  };

  const client = await mqtt.connectAsync("", connectionData);
  console.log("Creating subscriptions!");
  client.subscribeAsync("+/2/e/#");
  client.subscribeAsync("+/+/2/e/#");
  client.subscribeAsync("+/+/+/2/e/#");
  client.subscribeAsync("+/+/+/+/2/e/#");
  client.subscribeAsync("+/2/map/#");
  client.subscribeAsync("+/+/2/map/#");
  client.subscribeAsync("+/+/+/2/map/#");
  client.subscribeAsync("+/+/+/+/2/map/#");
  client.on("message", onMessage);
};
