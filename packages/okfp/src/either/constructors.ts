import { createEither, Either } from "./either.js";

export function left<E, T = never>(left: E): Either<E, T> {
  return createEither({ left });
}

export function right<T, E = never>(right: T): Either<E, T> {
  return createEither({ right });
}

// todo: add tests
export function fromNullable<E, T>(
  nullable: T | null | undefined,
  onNullish: () => E
): Either<E, T> {
  return nullable != null ? right<T, E>(nullable) : left<E, T>(onNullish());
}
