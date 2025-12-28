import { readdirSync } from "fs";
import { normalize } from "path";
import {
  some,
  none,
  type Option,
  compactOptions,
  fromNullable,
} from "okfp/option";
import { type Template } from "./defs.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = __dirname + "/templates";

export const TEMPLATE_DESCRIPTIONS = {
  "react-spa": "React Single Page App template",
  cli: "Command-Line tools",
  bare: "Basic and unopinionated template; recommended for advanced users only",
} as const;

export default function listTemplates(): Option<Template[]> {
  const descriptions = Object.entries(TEMPLATE_DESCRIPTIONS);
  return readTemplatesDir()
    .flatMap((fnames) =>
      compactOptions(
        fnames.map((filename) =>
          parseTemplateFileName(filename).map((d) => ({
            ...d,
            path: normalize(TEMPLATES_DIR + "/" + filename),
          }))
        )
      )
    )
    .flatMap((fdata) =>
      compactOptions(
        descriptions.reduce(
          (acc, [name, description]) =>
            acc.concat([
              fromNullable(fdata.find((f) => f.name === name)).map(
                ({ version, path }) => ({
                  name,
                  description,
                  version,
                  path,
                })
              ) as Option<Template>,
            ]),
          [] as Option<Template>[]
        )
      )
    );
}

// Eventually replace with:
// try(() => readdirSync(TEMPLATES_DIR)).toOption()
function readTemplatesDir(): Option<string[]> {
  try {
    return some(readdirSync(TEMPLATES_DIR));
  } catch (e) {
    return none();
  }
}

const FILENAME_REGEXP = new RegExp(/^(.+?)-v(\d+)\.json$/);
function parseTemplateFileName(filename: string): Option<{
  name: string;
  version: number;
}> {
  return fromNullable(FILENAME_REGEXP.exec(filename))
    .filter((matches) => matches.length >= 3)
    .map((matches) => ({
      name: matches[1]!,
      version: parseInt(matches[2]!),
    }))
    .filter(({ version }) => !isNaN(version));
}
