import type { Template } from "./template/defs.js";
import listTemplates from "./template/listTemplates.js";
import chalk from "chalk";
import { type Either, fromNullable, left, right } from "okfp/either";

export const ABORT_SIGNAL = Symbol("abort signal");
export class ValidationError extends Error {}

type LeftType = Error | ValidationError | typeof ABORT_SIGNAL;

type InitOptions = {
  list: boolean | undefined;
  force: boolean | undefined;
  template: string | undefined;
};

export default function initCommand(
  dir: string,
  { list = false, force = false, template }: InitOptions
) {
  return (listTemplates() as Either<LeftType, Template[]>)
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
          ) as LeftType
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
