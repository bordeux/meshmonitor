import { config } from "../../config";
import mqtt from "mqtt";
import { processMessage } from "../../helpers/processMessage";
import { createErrorLog } from "../../helpers/createErrorLog";
import { getUmzug } from "../../helpers/umzug";
import PQueue from "p-queue";

const queue = new PQueue();

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
    console.log("Migration finished. Restarting");
    process.exit();
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

const MEMORY_CHECK_INTERVAL = 10 * 1000;

export const start = async (ttl: number = 0, maxMemory: number = 0) => {
  await migrateIfNecessary();

  const connectionData = {
    username: config.mqtt.username || undefined,
    password: config.mqtt.password || undefined,
    host: config.mqtt.host,
    port: config.mqtt.port,
  };

  const client = await mqtt.connectAsync("", connectionData);
  client.on("message", (topic: string, message: Buffer) => {
    queue.add(() => onMessage(topic, message));
  });

  console.log("Creating subscriptions!");
  await client.subscribeAsync(config.mqtt.subscriptions);

  if (ttl) {
    console.log("Registering TTL timer to ", ttl);
    setTimeout(async () => {
      console.log("TTL reached. Exiting");
      await Promise.all([client.endAsync(), queue.onIdle()]);
      process.exit();
    }, ttl * 1000);
  }

  if (maxMemory) {
    console.log(`Setting max memory limit to ${maxMemory}MB`);
    setInterval(async () => {
      const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
      if (memoryUsage < maxMemory) {
        return;
      }

      console.log(
        `Max memory reached. Current usage: ${memoryUsage}MB. Exiting`,
      );
      await Promise.all([client.endAsync(), queue.onIdle()]);
      process.exit();
    }, MEMORY_CHECK_INTERVAL);
  }
};
