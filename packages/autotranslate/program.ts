import { Command } from "commander";

const program = new Command();
program
  .name("autotranslate")
  .description("CLI tool to auto translate frontend app");

export default program;
