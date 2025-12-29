export type Either<E, T> = {
  map: <U>(mapper: (right: T) => U) => Either<E, U>;
  mapLeft: <EE>(mapper: (left: E) => EE) => Either<EE, T>;
  flatMap: <EE, U>(mapper: (right: T) => Either<EE, U>) => Either<EE | E, U>;
  match: <U>(onLeft: (left: E) => U, onRight: (right: T) => U) => U;
  getOrElse: (onLeft: (left: E) => T) => T;
};

export type Left<E> = {
  readonly left: E;
};

export type Right<T> = {
  readonly right: T;
};

export type EitherV<E, T> = Left<E> | Right<T>;

function isLeft<E, T>(value: EitherV<E, T>): value is Left<E> {
  return typeof value === "object" && "left" in value;
}

function isRight<E, T>(value: EitherV<E, T>): value is Right<T> {
  return typeof value === "object" && "right" in value;
}

function createEither<E, T>(value: EitherV<E, T>): Either<E, T> {
  const either: Either<E, T> = {
    map: <U>(mapper: (right: T) => U): Either<E, U> => {
      return isRight(value)
        ? right(mapper(value.right))
        : (either as unknown as Either<E, U>);
    },

    mapLeft: <EE>(mapper: (left: E) => EE): Either<EE, T> => {
      return isLeft(value)
        ? createEither({ left: mapper(value.left) })
        : (either as unknown as Either<EE, T>);
    },

    getOrElse: (onLeft: (left: E) => T) =>
      isRight(value) ? value.right : onLeft(value.left),

    match: <U>(onLeft: (left: E) => U, onRight: (right: T) => U) => {
      return isLeft(value) ? onLeft(value.left) : onRight(value.right);
    },

    flatMap: <EE, U>(
      mapper: (right: T) => Either<EE, U>
    ): Either<EE | E, U> => {
      return isRight(value)
        ? mapper(value.right)
        : (either as unknown as Either<EE | E, U>);
    },
  };

  return either;
}

export function left<E, T = never>(left: E): Either<E, T> {
  return createEither({ left });
}

export function right<T, E = never>(right: T): Either<E, T> {
  return createEither({ right });
}
