#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CONFIG_FILE_NAME } from "./config/model";
import { copyFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFile } from "fs/promises";
import buildConfig from "./config/buildConfig";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configFilePath = `${process.cwd()}/${CONFIG_FILE_NAME}`;

yargs(hideBin(process.argv))
  .command("init", "Initialize a new Morando project", async () => {
    await copyFile(
      `${__dirname}/../src/config/.morandorc.template.jsonc`,
      configFilePath
    );
    console.log(
      `Initialized a new Morando project with configuration file: ${configFilePath}`
    );
  })
  .command(
    "print-config",
    "Print the full Morando configuration for this project",
    async () => {
      try {
        const configContent = await readFile(configFilePath, "utf-8");
        console.log(buildConfig(configContent));
      } catch {
        console.error("Error reading configuration file", configFilePath);
        console.log(
          "Please ensure you have initialized the project with 'morando init'."
        );
        process.exit(1);
      }
    }
  )
  .parse();
