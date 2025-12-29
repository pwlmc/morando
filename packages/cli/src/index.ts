#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import initCommand, { ValidationError } from "./initCommand.js";

const y = yargs()
  .command(
    "init [dir]",
    "Initialize a new Morando project",
    (yargs) => {
      return yargs
        .option("force", {
          alias: "f",
          type: "boolean",
          description: "Force overriding the configuration file, if it exists",
        })
        .option("list", {
          alias: "l",
          type: "boolean",
          description: "List all the available project templates",
        })
        .option("template", {
          alias: "t",
          type: "string",
          description: "Selected template",
        })
        .positional("dir", {
          describe: "Project directory",
          default: ".",
        });
    },
    (args) => {
      return initCommand(args.dir, args).match<Promise<never> | void>(
        (left) => {
          if (left instanceof ValidationError) {
            return Promise.reject(left.message);
          }
          if (left instanceof Error) {
            console.error(left);
          }
          return;
        },
        () => {
          console.log("Project initialize correctly");
        }
      );
    }
  )
  .demandCommand(1)
  .parse(hideBin(process.argv));
