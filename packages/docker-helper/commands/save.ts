import program from "../program";
import { writeFile } from "fs/promises";

program
  .command("save")
  .description("Generates config.json file")
  .argument("<string>", "Output filename")
  .option("-p, --prefix <type>", "Prefix for environment variable", "REACT_")
  .option("-n, --name <type>", "Variable name", "APP_ENV")
  .action(async (filename, options) => {
    const envData: Record<string, string | undefined> = {};
    for (const [envName, envValue] of Object.entries(import.meta.env)) {
      if (!envName.startsWith(options.prefix)) {
        continue;
      }

      envData[envName] = envValue;
    }
    const jsonEncoded = JSON.stringify(envData, null, 2);
    await writeFile(filename, `const ${options.name} = ${jsonEncoded};`);
  });
