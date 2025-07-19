#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CONFIG_FILE_NAME } from "./config/model";
import { copyFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

yargs(hideBin(process.argv))
  .command("init", "Initialize a new Morando project", async () => {
    const dest = `${process.cwd()}/${CONFIG_FILE_NAME}`;
    const dir = dirname(fileURLToPath(import.meta.url));

    await copyFile(`${dir}/../src/config/.morandorc.template.jsonc`, dest);
    console.log(
      `Initialized a new Morando project with configuration file: ${dest}`
    );
  })
  .parse();
