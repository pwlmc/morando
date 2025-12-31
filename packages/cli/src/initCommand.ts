import type { Template } from "./template/defs.js";
import listTemplates from "./template/listTemplates.js";
import chalk from "chalk";
import { type Either, fromNullable } from "okfp/either";
import { CONFIG_FILE_NAME } from "./config/defs.js";
import { existsSync } from "fs";
import { resolveUserPath } from "./utils/fs.js";

export const ABORT_SIGNAL = Symbol("abort signal");
export class ValidationError extends Error {}

type InitLeft = Error | ValidationError | typeof ABORT_SIGNAL;

type InitOptions = {
  list: boolean | undefined;
  force: boolean | undefined;
  template: string | undefined;
};

export default function initCommand(
  dir: string,
  { list = false, force = false, template }: InitOptions
) {
  const destPath = resolveUserPath(dir + "/" + CONFIG_FILE_NAME);
  return (listTemplates() as Either<InitLeft, Template[]>)
    .filterOrElse(
      (templates) => (list ? Boolean(templates.forEach(printTemplate)) : true),
      () => ABORT_SIGNAL
    )
    .flatMap<Template>((templates) =>
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
              .join("\n")
          ) as InitLeft
      )
    )
    .filterOrElse(
      () => !existsSync(destPath) || force,
      () =>
        new ValidationError(
          [
            `Configuration file exists.`,
            "Please specify -f / --force option to override.",
          ].join("\n")
        )
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
