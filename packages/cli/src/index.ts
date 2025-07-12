#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CONFIG_FILE_NAME } from "./config/model";
import { copyFile } from "fs/promises";

yargs(hideBin(process.argv))
  .command("init", "Initialize a new Morando project", async () => {
    const dest = `${process.cwd()}/${CONFIG_FILE_NAME}`;
    await copyFile(`${__dirname}/../src/config/initConfig.jsonc`, dest);
    console.log(
      `Initialized a new Morando project with configuration file: ${dest}`
    );
  })
  .parse();
