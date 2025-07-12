import { describe, expect, it } from "vitest";
import validateConfig from "./validateConfig";
import { MorandoConfig } from "./model";

describe("validateConfig", () => {
  const validConfig: MorandoConfig = {
    // Add valid config properties here
  };

  it("should return true for a valid config", () => {
    expect(validateConfig(validConfig)).toBe(true);
  });

  it.todo("should return false for an invalid config", () => {
    const config = validConfig; // todo: break the config
    expect(validateConfig(config)).toBe(false);
  });

  it.todo("should narrow the type to MorandoConfig", () => {});
});
