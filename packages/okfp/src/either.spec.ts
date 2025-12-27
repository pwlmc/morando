import { describe, it, expect } from "vitest";
import { EitherMonad, Either, left, right } from "./either";

type EitherTestTag<E, T> =
  | { tag: "RIGHT"; right: T }
  | { tag: "LEFT"; left: E };

const asTag = <E, T>(value: EitherMonad<E, T>) =>
  value.match<EitherTestTag<E, T>>(
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

  describe("functor laws", () => {
    it("should obey the identity law: m.map(id) == m", () => {
      const id = <T>(x: T) => x;

      expect(asTag(right(123).map(id))).toEqual(asTag(right(123)));
      expect(asTag(left(123).map(id))).toEqual(asTag(left(123)));
    });

    it("should obey the composition law: m.map(f).map(g) == m.map(x => g(f(x)))", () => {
      const f = (x: number) => x + 1;
      const g = (x: number) => x * 2;

      const right1 = right(10).map(f).map(g);
      const right2 = right(10).map((r) => g(f(r)));
      expect(asTag(right1)).toEqual(asTag(right2));

      const left1 = right(10).map(f).map(g);
      const left2 = right(10).map((r) => g(f(r)));
      expect(asTag(left1)).toEqual(asTag(left2));
    });
  });

  describe("monad laws", () => {
    it("should obey the left identity law: right(a).flatMap(f) == f(a)", () => {
      const f = (x: number): EitherMonad<string, string> =>
        x % 2 === 0 ? right(`even:${x}`) : left("odd");

      const a = 42;
      expect(asTag(right<number, number>(a).flatMap(f))).toEqual(asTag(f(a)));
    });

    it("should obey the right identity law: m.flatMap(right) == m", () => {
      const rightValue = right(7);
      expect(asTag(rightValue.flatMap(right))).toEqual(asTag(rightValue));

      const leftValue = left("err");
      expect(asTag(leftValue.flatMap(right))).toEqual(asTag(leftValue));
    });

    it("should obey the associativity law: (m.flatMap(f)).flatMap(g) == m.flatMap(x => f(x).flatMap(g))", () => {
      const f = (x: number): EitherMonad<string, number> =>
        x > 0 ? right(x + 1) : left("non-positive");

      const g = (x: number): EitherMonad<string, string> =>
        x < 10 ? right(`ok:${x}`) : left("too-big");

      const rightValue = right(5);
      expect(asTag(rightValue.flatMap(f).flatMap(g))).toEqual(
        asTag(rightValue.flatMap((x) => f(x).flatMap(g)))
      );

      const leftValue = left<string, number>("err");
      expect(asTag(leftValue.flatMap(f).flatMap(g))).toEqual(
        asTag(leftValue.flatMap((x) => f(x).flatMap(g)))
      );
    });
  });
});
