import { left, right } from "./constructors.js";
import { Either } from "./either.js";

export function map2<EA, A, EB, B, C>(
  eitherA: Either<EA, A>,
  eitherB: Either<EB, B>,
  mapper: (a: A, b: B) => C
) {
  return eitherA.map((a) => (b: B) => mapper(a, b)).ap(eitherB);
}

export function map3<EA, A, EB, B, EC, C, D>(
  eitherA: Either<EA, A>,
  eitherB: Either<EB, B>,
  eitherC: Either<EC, C>,
  mapper: (a: A, b: B, c: C) => D
) {
  return eitherA
    .map((a) => (b: B) => (c: C) => mapper(a, b, c))
    .ap(eitherB)
    .ap(eitherC);
}

export function sequence<E, T>(eithers: Either<E, T>[]): Either<E, T[]> {
  const out: T[] = [];

  for (const either of eithers) {
    const result = either.toResult();
    if (!result.ok) {
      return left(result.error);
    }
    out.push(result.value);
  }

  return right(out);
}
