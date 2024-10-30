import { Command } from "commander";

const program = new Command();
program
  .name("env-to-js")
  .description("CLI tool to convert environment variables to a JS file");

export default program;
