import { describe, expect, it } from "vitest";
import validateConfig from "./validateConfig";
import { MorandoConfig } from "./model.js";

describe("validateConfig", () => {
  const validConfig: MorandoConfig = {
    // Add valid config properties here
  };

  it("should return true for a valid config", () => {
    expect(validateConfig(validConfig)).toBe(true);
  });

  it("should return false for an invalid config", () => {
    const config = validConfig; // todo: break the config
    expect(validateConfig(config)).toBe(false);
  });

  it("should narrow the type to MorandoConfig", () => {
    const config = validConfig as Record<string, unknown>;
    expect(config).toBeTypeOf<MorandoConfig>();
  });
});
