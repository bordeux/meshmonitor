// import { writeFile } from "fs/promises";

// const envData: Record<string, string | undefined>;
// for (const [envName, envValue] of Object.entries(import.meta.env)) {
//   if (!envName.startsWith("REACT_")) {
//     continue;
//   }
//
//   envData[envName] = envValue;
// }
//
// await writeFile(path, JSON.stringify(items, null, 2));

import program from "./program";

import "./commands/save";

program.parse();
