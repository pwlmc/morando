#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command("init", "Initialize a new Morando project", () => {
    // todo: implement init
    console.log("init");
  })
  .parse();
