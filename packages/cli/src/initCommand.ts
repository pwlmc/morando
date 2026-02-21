import type { Template } from "./template/defs.js";
import listTemplates from "./template/listTemplates.js";
import chalk from "chalk";
import { type Either, fromNullable } from "ok-fp/either";
import { CONFIG_FILE_NAME } from "./config/defs.js";
import { copyFileSync, existsSync } from "fs";
import { resolveUserPath } from "./utils/fs.js";
import type { Argv } from "yargs";

export const ABORT_SIGNAL = Symbol("abort signal");
export class ValidationError extends Error {}

type InitLeft = Error | ValidationError | typeof ABORT_SIGNAL;

export default function attachInitCommand(yargs: Argv) {
  yargs.command(
    "init [dir]",
    "Initialize a new Morando project",
    (yargs) => {
      return yargs
        .option("force", {
          alias: "f",
          default: false,
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
    ({ dir, list, force, template }) => {
      const destPath = resolveUserPath(dir + "/" + CONFIG_FILE_NAME);
      return (listTemplates() as Either<InitLeft, Template[]>)
        .filterOrElse(
          (templates) =>
            list ? Boolean(templates.forEach(printTemplate)) : true,
          () => ABORT_SIGNAL,
        )
        .flatMap((templates) =>
          fromNullable(
            templates.find((t) => t.name === template),
            () =>
              new ValidationError(
                [
                  template && `Invalid template: "${template}".`,
                  "Please provide a valid template name to the -t / --template option.",
                  "You can check the available list of templates with -l option.",
                ]
                  .filter(Boolean)
                  .join("\n"),
              ) as InitLeft,
          ),
        )
        .filterOrElse(
          () => !existsSync(destPath) || force,
          () =>
            new ValidationError(
              [
                `Configuration file exists.`,
                "Please specify -f / --force option to override.",
              ].join("\n"),
            ),
        )
        .tap((template) => copyFileSync(template.path, destPath))
        .match<Promise<never> | void>(
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
            console.info(`Project initialized successfully at ${destPath}`);
          },
        );
    },
  );
}

function printTemplate({ name, description }: Template) {
  const message = [
    chalk.dim("•"),
    chalk.underline(name) + ":",
    description,
  ].join(" ");
  console.log(message);
}
