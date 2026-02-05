import { describe, it, expect, vi } from "vitest";
import { left, right } from "./constructors.js";
import { Either } from "./either.js";
import { monadLawsSpec } from "../testUtils/monadLaws.js";
import { functorLawsSpec } from "../testUtils/functorLaws.js";
import { applicativeLawsSpec } from "../testUtils/applicativeLaws.js";

describe("either", () => {
  describe("filterOrElse", () => {
    it("should return the same either when predicate returns true", () => {
      const either = right<number, Error>(2);
      const error = new Error("Value is negative");
      const newEither = either.filterOrElse(
        (x) => x >= 0,
        () => error
      );

      expect(newEither).toBe(either);
    });

    it("should return left when predicate returns false", () => {
      const either = right<number, Error>(-2);
      const error = new Error("Value is negative");
      const newEither = either.filterOrElse(
        (x) => x >= 0,
        () => error
      );

      expect(newEither.toResult()).toEqual(left(error).toResult());
    });

    it("should not call the predicate when value is left", () => {
      const error = new Error("some error");
      const either = left(error);
      const predicate = vi.fn();
      const newEither = either.filterOrElse(predicate, () => error);

      expect(newEither).toBe(either);
      expect(predicate).not.toBeCalled();
    });
  });

  describe("map", () => {
    const mapper = (n: number) => n + 2;

    it("should map right value", () => {
      const value = right(2);
      const newValue = value.map(mapper);
      expect(newValue.toResult()).toEqual(right(4).toResult());
    });

    it("should not change the left value", () => {
      const value = left(new Error("Test error"));
      const newValue = value.map(mapper);
      expect(newValue).toBe(value);
    });

    it("should not call the mapper when value is left", () => {
      const mapper = vi.fn();
      left(new Error("Test error")).map(mapper);
      expect(mapper).not.toHaveBeenCalled();
    });
  });

  describe("orElse", () => {
    it("should return the same either and not call the fallback when value is right", () => {
      const fallback = vi.fn();
      const either = right(2);
      const newEither = either.orElse(fallback);

      expect(newEither).toBe(either);
      expect(fallback).not.toHaveBeenCalled();
    });

    it("should not call the fallback when value is left", () => {
      const fallback = () => right(2);
      const either = left<Error, number>(new Error("some error")).orElse(
        fallback
      );

      expect(either.toResult()).toEqual(right(2).toResult());
    });
  });

  describe("ap", () => {
    it("should apply the value to the elevated function", () => {
      const either = right((num: number) => num * 2).ap(right(2));
      expect(either.toResult()).toEqual(right(4).toResult());
    });

    it("should not call the function and return none when argument option is none", () => {
      const fn = vi.fn();
      const error = new Error("some error");
      const either = right(fn as (num: number) => number).ap(left(error));
      expect(either.toResult()).toEqual(left(error).toResult());
      expect(fn).not.toHaveBeenCalled();
    });

    it("should return none if the option is none", () => {
      const error = new Error("some error");
      const either = left<Error, (num: number) => number>(error).ap(right(2));
      expect(either.toResult()).toEqual(left(error).toResult());
    });
  });

  describe("swap", () => {
    it("should reverse the order of left and right", () => {
      expect(right(2).swap().toResult()).toEqual(left(2).toResult());
      expect(left(2).swap().toResult()).toEqual(right(2).toResult());
    });
  });

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

  describe("flatMap", () => {
    const mapper = (r: number) => right(r + 2);

    it("should map and flatten the right value", () => {
      const value = right(2);
      const newValue = value.flatMap(mapper);
      expect(newValue.toResult()).toEqual(right(4).toResult());
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
      of: (value) => right(value),
      map: (m, mapper) => m.map(mapper),
      asTag: (m) => m.toResult(),
    })
  );

  describe(
    "applicative laws",
    applicativeLawsSpec<Either<never, unknown>>({
      of: (value) => right(value),
      ap: (opt, arg) =>
        (opt as Either<never, (arg: unknown) => unknown>).ap(arg),
      asTag: (e) => e.toResult(),
    })
  );

  describe(
    "monad laws",
    monadLawsSpec<Either<never, number>>({
      of: (value) => right(value),
      flatMap: (m, mapper) => m.flatMap(mapper),
      asTag: (m) => m.toResult(),
    })
  );
});
