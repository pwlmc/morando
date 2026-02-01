import { describe, it, expect, vi } from "vitest";
import { some, none } from "./constructors.js";
import { Option } from "./option.js";
import { functorLawsSpec } from "../testUtils/functorLaws.js";
import { monadLawsSpec } from "../testUtils/monadLaws.js";
import { applicativeLawsSpec } from "../testUtils/applicativeLaws.js";

type OptionTag<T> = { tag: "SOME"; some: T } | { tag: "NONE" };

const asTag = <T>(value: Option<T>) =>
  value.match<OptionTag<T>>(
    () => ({ tag: "NONE" as const }),
    (some) => ({ tag: "SOME" as const, some })
  );

describe("option", () => {
  describe("filter", () => {
    const predicate = vi.fn().mockReturnValue(true);

    it("should keep some value if the predicate returns true", () => {
      const opt = some(1).filter(predicate);
      expect(opt.toNullable()).toBe(1);
    });

    it("should return none if the predicate returns false", () => {
      predicate.mockReturnValue(false);
      const opt = some(-1).filter(predicate);
      expect(opt.toNullable()).toBe(null);
    });

    it("should not call the predicate and return none if the value is none", () => {
      const opt = none().filter(predicate);
      expect(asTag(opt)).toEqual(asTag(none()));
      expect(predicate).not.toHaveBeenCalled();
    });
  });

  describe("ap", () => {
    it("should apply the value to the elevated function", () => {
      const opt = some((num: number) => num * 2).ap(some(2));
      expect(opt.toNullable()).toBe(4);
    });

    it("should not call the function and return none when argument option is none", () => {
      const fn = vi.fn();
      const opt = some(fn as (num: number) => number).ap(none());
      expect(opt.toNullable()).toBe(null);
      expect(fn).not.toHaveBeenCalled();
    });

    it("should return none if the option is none", () => {
      const opt = none<(num: number) => number>().ap(some(2));
      expect(opt.toNullable()).toBe(null);
    });
  });

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
    "applicative laws",
    applicativeLawsSpec<Option<unknown>>({
      of: (value) => some(value),
      ap: (opt, arg) => (opt as Option<(arg: unknown) => unknown>).ap(arg),
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
