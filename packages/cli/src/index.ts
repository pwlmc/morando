#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CONFIG_FILE_NAME } from "./config/model";
import { copyFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import readConfig, {
  MissingConfigError,
  MalformedConfigError,
} from "./config/readConfig";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configFilePath = `${process.cwd()}/${CONFIG_FILE_NAME}`;

yargs(hideBin(process.argv))
  .command("init", "Initialize a new Morando project", async () => {
    await copyFile(
      `${__dirname}/../src/config/.morandorc.template.json`,
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
        const config = await readConfig(configFilePath);
        console.log(config);
      } catch (error) {
        if (error instanceof MissingConfigError) {
          console.error("Configuration file not found:", configFilePath);
          console.log(
            "Please ensure you have initialized the project with 'morando init'."
          );
          process.exit(1);
        } else if (error instanceof MalformedConfigError) {
          console.error("Invalid configuration file:", configFilePath);
          console.log(error.message);
          process.exit(1);
        }
        throw error;
      }
    }
  )
  .parse();
