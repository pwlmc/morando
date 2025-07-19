import { readFile } from "fs/promises";
import { existsSync } from "fs";

export const CONFIG_FILE_NAME = ".morandorc.json";

export class MissingConfigError extends Error {
  public filePath: string;

  constructor(filePath: string) {
    super("Configuration file not found: " + filePath);
    this.filePath = filePath;
  }
}

export class MalformedConfigError extends Error {}

export class InvalidConfigError extends Error {
  public errors: string[];

  constructor(errors: string[]) {
    super(`Invalid configuration: ${errors.join(", ")}`);
    this.errors = errors;
  }
}

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
