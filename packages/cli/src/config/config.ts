import { readFile } from "fs/promises";
import { existsSync } from "fs";

export async function readConfig(filePath: string) {
  if (!existsSync(filePath)) {
    throw new MissingConfigError(`Configuration file not found: ${filePath}`);
  }
  const configContents = await readFile(filePath, "utf-8");

  if (configContents.trim() === "") {
    throw new MalformedConfigError("Config cannot be empty");
  }

  let projectConfig: Record<string, unknown>;
  try {
    projectConfig = JSON.parse(configContents);
  } catch {
    throw new MalformedConfigError("Config must be a valid JSON");
  }

  const errors = validateConfig(projectConfig);
  if (errors.length) {
    throw new InvalidConfigError(errors);
  }

  return { ...defaultConfig, ...projectConfig };
}

export function validateConfig(config: Record<string, unknown>): string[] {
  const errors = validate(configSchema, config);

  // todo: impement human-readable error communicates
  // The current implementation is a stub for the future improvement.
  // Context: JTD returns an array of error objects that might be hard
  // to read for the end-users. We should aim to provide
  // more informative errors when the config is not valid.
  const formattedErrors = errors.map((error) => JSON.stringify(error));

  return formattedErrors;
}
