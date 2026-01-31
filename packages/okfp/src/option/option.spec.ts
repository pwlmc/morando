import { describe, it, expect } from "vitest";
import { some, none } from "./constructors.js";
import { Option } from "./option.js";
import { functorLawsSpec } from "../testUtils/functorLaws.js";
import { monadLawsSpec } from "../testUtils/monadLaws.js";

type OptionTag<T> = { tag: "SOME"; some: T } | { tag: "NONE" };

const asTag = <T>(value: Option<T>) =>
  value.match<OptionTag<T>>(
    () => ({ tag: "NONE" as const }),
    (some) => ({ tag: "SOME" as const, some })
  );

describe("option", () => {
  describe("map", () => {
    const mapper = (n: number) => n + 2;

    it("should map some values", () => {
      const value = some(2);
      const newValue = value.map(mapper);
      expect(asTag(newValue)).toEqual(asTag(some(4)));
    });

    it("should not change the value if it is left", () => {
      const value = none<number>();
      const newValue = value.map(mapper);
      expect(newValue).toBe(value);
    });
  });

  describe("flatMap", () => {
    const mapper = (r: number) => some(r + 2);

    it("should map and flatten the right value", () => {
      const value = some(2);
      const newValue = value.flatMap(mapper);
      expect(asTag(newValue)).toEqual(asTag(some(4)));
    });

    it("should not change the left value", () => {
      const value = none<number>();
      const newValue = value.flatMap(mapper);
      expect(newValue).toBe(value);
    });
  });

  describe("getOrElse", () => {
    const fallback = () => 0;

    it("should return the some value", () => {
      const value = some(2);
      expect(value.getOrElse(fallback)).toBe(2);
    });

    it("should map the fallback value", () => {
      const value = none();
      expect(value.getOrElse(fallback)).toBe(0);
    });
  });

  describe("toNullable", () => {
    it("should return the some value", () => {
      const value = some(2);
      expect(value.toNullable()).toBe(2);
    });

    it("should return null for none", () => {
      const value = none();
      expect(value.toNullable()).toBe(null);
    });
  });

  describe(
    "functor laws",
    functorLawsSpec<Option<number>>({
      of: (testValue) => some(testValue),
      map: (m, mapper) => m.map(mapper),
      asTag,
    })
  );

  describe(
    "monad laws",
    monadLawsSpec<Option<number>>({
      of: (testValue) => some(testValue),
      flatMap: (m, mapper) => m.flatMap(mapper),
      asTag,
    })
  );
});
