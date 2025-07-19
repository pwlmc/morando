import Ajv from "ajv/dist/jtd.js";
import configSchema from "./config.jtd.json";
import defaultConfig from "./default-config.json";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export class MissingConfigError extends Error {}

export class InvalidConfigError extends Error {}

const ajv = new Ajv();
const parseConfig = ajv.compileParser(configSchema);

export default async function readConfig(filePath: string) {
  if (!existsSync(filePath)) {
    throw new MissingConfigError(`Configuration file not found: ${filePath}`);
  }

  const projectConfig = await readFile(filePath, "utf-8");

  if (projectConfig.trim() === "") {
    throw new InvalidConfigError(
      "Invalid configuration: config cannot be an empty"
    );
  }

  const config = parseConfig(projectConfig);
  if (config === undefined) {
    throw new InvalidConfigError(
      "Invalid configuration: config must be a valid JSON"
    );
  }
  return { ...defaultConfig, ...config };
}
