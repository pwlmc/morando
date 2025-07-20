import defaultConfig from "./default-config.json";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import {
  MissingConfigError,
  MalformedConfigError,
  InvalidConfigError,
} from "./errors";
import validateConfig from "./validateConfig";

export default async function readConfig(filePath: string) {
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
