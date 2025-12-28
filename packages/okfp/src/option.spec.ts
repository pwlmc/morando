import { describe, it, expect } from "vitest";
import { OptionMonad, some, none } from "./option";
import { functorLawsSpec } from "./testUtils/functorLaws";
import { monadLawsSpec } from "./testUtils/monadLaws";

type OptionTestTag<T> = { tag: "SOME"; some: T } | { tag: "NONE" };

const asTag = <T>(value: OptionMonad<T>) =>
  value.match<OptionTestTag<T>>(
    (some) => ({ tag: "SOME" as const, some }),
    () => ({ tag: "NONE" as const })
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

  describe(
    "functor laws",
    functorLawsSpec<OptionMonad<number>>({
      of: (testValue) => some(testValue),
      map: (m, mapper) => m.map(mapper),
      asTag,
    })
  );

  describe(
    "monad laws",
    monadLawsSpec<OptionMonad<number>>({
      of: (testValue) => some(testValue),
      flatMap: (m, mapper) => m.flatMap(mapper),
      asTag,
    })
  );
});
