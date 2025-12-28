import { describe, it, expect } from "vitest";
import listTemplates, { TEMPLATE_DESCRIPTIONS } from "./listTemplates.js";

describe("template", () => {
  describe("listTemplates", () => {
    it("should return the list of available templates in the order defined by the descriptions", () => {
      const templates = listTemplates();
      const names = templates.map((ts) => ts.map((t) => t.name));
      const expectedNames = Object.keys(TEMPLATE_DESCRIPTIONS);
      expect(names.toNullable()).toEqual(expectedNames);
    });
  });
});
