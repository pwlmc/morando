import { describe, it, expect } from "vitest";
import { left, right } from "./constructors.js";
import { Either } from "./either.js";
import { monadLawsSpec } from "../testUtils/monadLaws.js";
import { functorLawsSpec } from "../testUtils/functorLaws.js";

type EitherTag<E, T> = { tag: "RIGHT"; right: T } | { tag: "LEFT"; left: E };

const asTag = <E, T>(value: Either<E, T>) =>
  value.match<EitherTag<E, T>>(
    (left) => ({ tag: "LEFT" as const, left }),
    (right) => ({ tag: "RIGHT" as const, right })
  );

describe("either", () => {
  describe("getOrElse", () => {
    const onLeft = (_: Error) => 0;

    it("should return the right value", () => {
      const value = right(2);
      expect(value.getOrElse(onLeft)).toBe(2);
    });

    it("should map the left value", () => {
      const value = left<Error, number>(new Error("test error"));
      expect(value.getOrElse(onLeft)).toBe(0);
    });
  });

  describe("map", () => {
    const mapper = (n: number) => n + 2;

    it("should map right values", () => {
      const value = right(2);
      const newValue = value.map(mapper);
      expect(asTag(newValue)).toEqual(asTag(right(4)));
    });

    it("should not change the value if it is left", () => {
      const value = left(new Error("Test error"));
      const newValue = value.map(mapper);
      expect(newValue).toBe(value);
    });
  });

  describe("mapLeft", () => {
    const mapper = (n: number) => n + 2;

    it("should map left values", () => {
      const value = left(2);
      const newValue = value.mapLeft(mapper);
      expect(asTag(newValue)).toEqual(asTag(left(4)));
    });

    it("should not change the value if it is right", () => {
      const value = right(2);
      const newValue = value.mapLeft(mapper);
      expect(newValue).toBe(value);
    });
  });

  describe("flatMap", () => {
    const mapper = (r: number) => right(r + 2);

    it("should map and flatten the right value", () => {
      const value = right(2);
      const newValue = value.flatMap(mapper);
      expect(asTag(newValue)).toEqual(asTag(right(4)));
    });

    it("should not change the left value", () => {
      const value = left(new Error("test error"));
      const newValue = value.flatMap(mapper);
      expect(newValue).toBe(value);
    });
  });

  describe(
    "functor laws",
    functorLawsSpec<Either<never, number>>({
      of: (testValue) => right(testValue),
      map: (m, mapper) => m.map(mapper),
      asTag,
    })
  );

  describe(
    "monad laws",
    monadLawsSpec<Either<never, number>>({
      of: (testValue) => right(testValue),
      flatMap: (m, mapper) => m.flatMap(mapper),
      asTag,
    })
  );
});
