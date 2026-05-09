import { Command } from "commander";
import { detectRepositoryCycles } from "@repostem/engine";
import { parseOutputFormat, outputCycles } from "../utils/output";

export default new Command()
  .name("cycles")
  .description("List circular dependency groups")
  .option("-r, --repo <path>", "Path to repository")
  .option("-o, --output <format>", "Output format (text, json, table)", "text")
  .action(async (options: { repo?: string; output?: string }) => {
    try {
      const result = await detectRepositoryCycles(options.repo || process.cwd());
      const format = parseOutputFormat(options.output);
      outputCycles(result, format);
    } catch (err) {
      console.error(`Error: ${(err as Error).message}`);
      process.exitCode = 1;
    }
  });