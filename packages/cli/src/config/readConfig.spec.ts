import { describe, it, expect, vi } from "vitest";
import readConfig, {
  InvalidConfigError,
  MissingConfigError,
} from "./readConfig";
import defaultConfig from "./default-config.json";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

vi.mock("fs");
const existsSyncMock = vi.mocked(existsSync).mockReturnValue(true);

vi.mock("fs/promises");
const readFileMock = vi.mocked(readFile).mockResolvedValue("");

describe("readConfig", () => {
  const configFilePath = "path/to/config.json";

  it("should throw a MissingConfigError for missing config", async () => {
    existsSyncMock.mockReturnValue(false);
    await expect(readConfig(configFilePath)).rejects.toThrowError(
      new MissingConfigError(`Configuration file not found: ${configFilePath}`)
    );
  });

  it("should throw an InvalidConfigError for empty string input", async () => {
    readFileMock.mockResolvedValue(" ");
    await expect(readConfig(configFilePath)).rejects.toThrowError(
      new InvalidConfigError("Invalid configuration: config cannot be an empty")
    );
  });

  it("should throw an InvalidConfigError for malformed json object", async () => {
    readFileMock.mockResolvedValue("{ invalidJson: }");
    await expect(readConfig(configFilePath)).rejects.toThrowError(
      new InvalidConfigError(
        "Invalid configuration: config must be a valid JSON"
      )
    );
  });

  it("should return a default configuration for an empty JSON object", async () => {
    readFileMock.mockResolvedValue("{}");
    const config = await readConfig(configFilePath);
    expect(config).toEqual(defaultConfig);
  });
});
