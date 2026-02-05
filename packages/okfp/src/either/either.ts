import { EitherV, Left, Right } from "./defs.js";

function isLeft<E, T>(value: EitherV<E, T>): value is Left<E> {
  return typeof value === "object" && "left" in value;
}

function isRight<E, T>(value: EitherV<E, T>): value is Right<T> {
  return typeof value === "object" && "right" in value;
}

export type Result<E, T> = { ok: true; value: T } | { ok: false; error: E };

export type Either<E, T> = {
  /**
   * Filters the Either based on a predicate function applied to the Right value.
   *
   * @param predicate - Function that tests the Right value
   * @param onLeft - Function that provides the error value when predicate fails
   * @returns The same Either if Left or predicate passes, otherwise Left with the provided error
   *
   * @example
   * ```typescript
   * const isPositive = (n: number) => n > 0;
   * right(5).filterOrElse(isPositive, () => "Must be positive")  // Right(5)
   * right(-3).filterOrElse(isPositive, () => "Must be positive") // Left("Must be positive")
   * left("error").filterOrElse(isPositive, () => "Must be positive") // Left("error")
   * ```
   */
  filterOrElse: (
    predicate: (right: T) => boolean,
    onLeft: () => E
  ) => Either<E, T>;

  /**
   * Transforms the Right value using a mapping function.
   *
   * @typeParam U - The type of the transformed value
   * @param mapper - Function to transform the Right value
   * @returns New Either with the transformed Right value, or the same Left if error
   *
   * @example
   * ```typescript
   * right(5).map(x => x * 2)        // Right(10)
   * left("error").map(x => x * 2)   // Left("error")
   * ```
   */
  map: <U>(mapper: (right: T) => U) => Either<E, U>;

  /**
   * Applies a function wrapped in an Either to a value wrapped in an Either.
   *
   * @typeParam A - The type of the argument value
   * @typeParam U - The type of the function's return value
   * @param arg - Either containing the argument to apply the function to
   * @returns Either containing the function result, or the first Left if any Either is Left
   *
   * @example
   * ```typescript
   * const add = (x: number) => (y: number) => x + y;
   * right(add(5)).ap(right(3))     // Right(8)
   * right(add(5)).ap(left("err"))  // Left("err")
   * left("err").ap(right(3))       // Left("err")
   * ```
   */
  ap: <A, U>(this: Either<E, (a: A) => U>, arg: Either<E, A>) => Either<E, U>;
  zip: <A>(eitherA: Either<E, A>) => Either<E, readonly [T, A]>;
  flatten: <U>(this: Either<E, Either<E, U>>) => Either<E, U>;
  flatMap: <U>(mapper: (right: T) => Either<E, U>) => Either<E, U>;
  swap: () => Either<T, E>;
  tap: (sideEffect: (right: T) => void) => Either<E, T>;
  match: <U>(onLeft: (left: E) => U, onRight: (right: T) => U) => U;
  getOrElse: (onLeft: (left: E) => T) => T;
  toResult: () => Result<E, T>;
};

export function createEither<E, T>(value: EitherV<E, T>): Either<E, T> {
  const either: Either<E, T> = {
    filterOrElse: (
      predicate: (right: T) => boolean,
      onLeft: () => E
    ): Either<E, T> =>
      either.flatMap((right) =>
        predicate(right) ? either : createEither({ left: onLeft() })
      ),

    map: <U>(mapper: (right: T) => U): Either<E, U> =>
      either.flatMap((right) => createEither({ right: mapper(right) })),

    ap: function <A, U>(this: Either<E, (a: A) => U>, arg: Either<E, A>) {
      return this.flatMap((fn) => arg.map((right) => fn(right)));
    },

    getOrElse: (onLeft: (left: E) => T) =>
      isRight(value) ? value.right : onLeft(value.left),

    match: <U>(onLeft: (left: E) => U, onRight: (right: T) => U) => {
      return isLeft(value) ? onLeft(value.left) : onRight(value.right);
    },

    flatMap: <U>(mapper: (right: T) => Either<E, U>): Either<E, U> => {
      return isRight(value)
        ? mapper(value.right)
        : (either as unknown as Either<E | E, U>);
    },

    // todo: add tests
    toResult: (): Result<E, T> => {
      return isRight(value)
        ? {
            ok: true,
            value: value.right,
          }
        : {
            ok: false,
            error: value.left,
          };
    },

    // todo: add tests
    tap: (effect: (right: T) => void) => {
      if (isRight(value)) {
        effect(value.right);
      }
      return either;
    },
  };

  return either;
}
