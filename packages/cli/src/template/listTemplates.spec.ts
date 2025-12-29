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

    it.todo(
      "should return None when reading the files from the fs fails",
      () => {}
    );

    it.todo("should ignore the fs templates for which there is no description");

    it.todo("should ignore templates with the malformed filenames");
  });
});
