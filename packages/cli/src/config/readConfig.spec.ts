import { describe, it, expect, vi, beforeEach } from "vitest";
import readConfig from "./readConfig";
import {
  InvalidConfigError,
  MalformedConfigError,
  MissingConfigError,
} from "./errors";
import defaultConfig from "./default-config.json";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import validateConfig from "./validateConfig";

vi.mock("fs");
const existsSyncMock = vi.mocked(existsSync);

vi.mock("fs/promises");
const readFileMock = vi.mocked(readFile);

vi.mock("./validateConfig");
const validateConfigMock = vi.mocked(validateConfig);

describe("readConfig", () => {
  const configFilePath = "path/to/config.json";

  beforeEach(() => {
    existsSyncMock.mockReturnValue(true);
    readFileMock.mockResolvedValue("{}");
    validateConfigMock.mockReturnValue([]);
  });

  it("should throw a MissingConfigError for missing config", async () => {
    existsSyncMock.mockReturnValue(false);
    await expect(readConfig(configFilePath)).rejects.toThrowError(
      new MissingConfigError(`Configuration file not found: ${configFilePath}`)
    );
  });

  it("should throw an InvalidConfigError for empty string input", async () => {
    readFileMock.mockResolvedValue(" ");
    await expect(readConfig(configFilePath)).rejects.toThrowError(
      new MalformedConfigError("Config cannot be empty")
    );
  });

  it("should throw an InvalidConfigError for malformed json object", async () => {
    readFileMock.mockResolvedValue("{ invalidJson: }");
    await expect(readConfig(configFilePath)).rejects.toThrowError(
      new MalformedConfigError("Config must be a valid JSON")
    );
  });

  it("should return a default configuration for an empty JSON object", async () => {
    const config = await readConfig(configFilePath);
    expect(config).toEqual(defaultConfig);
  });

  it("should return error when the config is not valid", async () => {
    const errors = ["Some error"];
    validateConfigMock.mockReturnValue(errors);

    await expect(readConfig(configFilePath)).rejects.toThrowError(
      new InvalidConfigError(errors)
    );
  });
});
