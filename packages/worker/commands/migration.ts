import program from "../program";
import { getUmzug } from "../helpers/umzug";

program
  .command("migration")
  .description("Run DB migrations")
  .allowUnknownOption(true)
  .allowExcessArguments(true)
  .action(async (_, context) => {
    const umzug = await getUmzug();
    await umzug.runAsCLI(context.args);
  });
