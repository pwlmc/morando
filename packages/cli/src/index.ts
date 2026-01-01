#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import attachInitCommand from "./initCommand.js";

const y = yargs().demandCommand(1);

attachInitCommand(y);

y.parse(hideBin(process.argv));
