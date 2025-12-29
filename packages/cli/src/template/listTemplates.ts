import { readdirSync } from "fs";
import { normalize } from "path";
import { compact, fromNullable, type Option, some, none } from "okfp/option";
import { type Template } from "./defs.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = __dirname + "/templates";

export const TEMPLATE_WHITELIST = {
  "react-spa": "React Single Page App template",
  cli: "Command-Line tools",
  bare: "Basic and unopinionated template; recommended for advanced users only",
} as const;

/**
 * Lists available project templates by scanning a templates directory and matching
 * discovered template files against a whitelist of supported templates.
 *
 * @param templatesDir - Path to the directory containing template JSON files.
 * @param templateWhitelist - Map of template name to human-readable description used to filter and describe results.
 * @returns An `Option` containing an array of {@link Template} when templates could be read and matched; otherwise `none`.
 */
export default function listTemplates(
  templatesDir: string = TEMPLATES_DIR,
  templateWhitelist: Record<string, string> = TEMPLATE_WHITELIST
): Option<Template[]> {
  const descriptions = Object.entries(templateWhitelist);
  return readTemplatesDir(templatesDir)
    .flatMap((fnames) =>
      compact(
        fnames.map((filename) =>
          parseTemplateFileName(filename).map((d) => ({
            ...d,
            path: normalize(templatesDir + "/" + filename),
          }))
        )
      )
    )
    .flatMap((fdata) =>
      compact(
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
// try(() => readdirSync(dir)).toOption()
function readTemplatesDir(dir: string): Option<string[]> {
  try {
    return some(readdirSync(dir));
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
