import { describe, it, expect, vi, beforeEach } from "vitest";
import listTemplates from "./listTemplates.js";
import { readdirSync } from "fs";

vi.mock("fs");
const readdirSyncMock = vi.mocked<(path: string) => string[]>(readdirSync);

describe("listTemplates", () => {
  const whitelist = {
    foo: "Foo template",
    bar: "Bar template",
    baz: "Baz template",
  };
  const dir = "templates";
  const files = ["bar-v2.json", "baz-v3.json", "foo-v1.json"];

  beforeEach(() => {
    readdirSyncMock.mockReturnValue(files);
  });

  it("should return the list of available templates in the order defined by the descriptions", () => {
    const templates = listTemplates(dir, whitelist);
    const names = templates.map((ts) => ts.map((t) => t.name));
    const expectedNames = Object.keys(whitelist);
    expect(names.toResult()).toEqual({ ok: true, value: expectedNames });
  });

  it("should read the files from the provided dir path", () => {
    listTemplates(dir, whitelist);
    expect(readdirSyncMock).toHaveBeenCalledWith(dir);
  });

  it("should return None when reading the files from the fs fails", () => {
    const error = new Error("Test error");
    readdirSyncMock.mockImplementation(() => {
      throw error;
    });
    const names = listTemplates(dir, whitelist);
    expect(names.toResult()).toEqual({ ok: false, error });
  });

  it("should ignore the fs templates for which there is no description", () => {
    const templates = listTemplates(dir, {
      foo: "Foo template",
    });
    const names = templates.map((ts) => ts.map((t) => t.name));
    expect(names.toResult()).toEqual({ ok: true, value: ["foo"] });
  });

  it("should ignore templates with the malformed filenames", () => {
    readdirSyncMock.mockReturnValue([
      "foo-v1.json",
      "bar-vvv.json",
      "baz.json",
    ]);
    const templates = listTemplates(dir, whitelist);
    const names = templates.map((ts) => ts.map((t) => t.name));
    expect(names.toResult()).toEqual({ ok: true, value: ["foo"] });
  });

  it("should parse the filename data", () => {
    const filename = "foo-v99.json";
    readdirSyncMock.mockReturnValue([filename]);
    const templates = listTemplates(dir, whitelist);
    expect(templates.toResult()).toEqual({
      ok: true,
      value: [
        {
          name: "foo",
          version: 99,
          description: whitelist.foo,
          path: dir + "/" + filename,
        },
      ],
    });
  });
});
