import { readFile } from "fs/promises";
import { existsSync } from "fs";
import {
  MissingConfigError,
  MalformedConfigError,
  InvalidConfigError,
} from "./defs.js";
import validateConfig from "./validateConfig.js";

export default async function readConfig(filePath: string) {
  console.log("uuu");
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

  return projectConfig;
}
