import program from "../program";
import { start } from "../services/commands/start";
import { Option } from "commander";

program
  .command("start")
  .description("Start the program")
  .addOption(
    new Option("-ttl <number>", "Time to life in seconds")
      .env("WORKER_TTL")
      .default(0),
  )
  .action(async (_, options) => {
    const ttl = Number(options.ttl ?? 0);
    await start(ttl);
  });
