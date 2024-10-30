import program from "../program";
import { start } from "../services/commands/start";

program
  .command("start")
  .description("Start the program")
  .action(async () => {
    await start();
  });
