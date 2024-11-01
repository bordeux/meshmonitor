import program from "../program";
import { start } from "../services/commands/start";
import { Option } from "commander";

program
  .command("start")
  .description("Start the program")
  .addOption(
    new Option("-ttl, --time-to-live <number>", "Time to life in seconds")
      .env("WORKER_TTL")
      .default(0),
  )
  .action(async (options) => {
    const ttl = Number(options.timeToLive ?? 0);
    await start(ttl);
  });
