import { Command } from "commander";

const program = new Command();
program
  .name("meshmonitor")
  .description("CLI tool to pull data from MQTT to SurrealDB");

export default program;
