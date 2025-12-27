export type EitherMonad<E, T> = {
  map: <U>(mapper: (right: T) => U) => EitherMonad<E, U>;
  mapLeft: <EE>(mapper: (left: E) => EE) => EitherMonad<EE, T>;
  flatMap: <EE, U>(
    mapper: (right: T) => EitherMonad<EE, U>
  ) => EitherMonad<EE | E, U>;
  match: <U>(onLeft: (left: E) => U, onRight: (right: T) => U) => U;
  getOrElse: (onLeft: (left: E) => T) => T;
};

export type Left<E> = {
  readonly left: E;
};

export type Right<T> = {
  readonly right: T;
};

export type Either<E, T> = Left<E> | Right<T>;

function isLeft<E, T>(value: Either<E, T>): value is Left<E> {
  return typeof value === "object" && "left" in value;
}

function isRight<E, T>(value: Either<E, T>): value is Right<T> {
  return typeof value === "object" && "right" in value;
}

function either<E, T>(value: Either<E, T>): EitherMonad<E, T> {
  const eitherMondad: EitherMonad<E, T> = {
    map: <U>(mapper: (right: T) => U): EitherMonad<E, U> => {
      return isRight(value)
        ? either({ right: mapper(value.right) })
        : (eitherMondad as unknown as EitherMonad<E, U>);
    },

    mapLeft: <EE>(mapper: (left: E) => EE): EitherMonad<EE, T> => {
      return isLeft(value)
        ? either({ left: mapper(value.left) })
        : (eitherMondad as unknown as EitherMonad<EE, T>);
    },

    getOrElse: (onLeft: (left: E) => T) =>
      isRight(value) ? value.right : onLeft(value.left),

    match: <U>(onLeft: (left: E) => U, onRight: (right: T) => U) => {
      return isLeft(value) ? onLeft(value.left) : onRight(value.right);
    },

    flatMap: <EE, U>(
      mapper: (right: T) => EitherMonad<EE, U>
    ): EitherMonad<EE | E, U> => {
      return isRight(value)
        ? mapper(value.right)
        : (eitherMondad as unknown as EitherMonad<EE | E, U>);
    },
  };

  return eitherMondad;
}

export function left<E, T = never>(left: E): EitherMonad<E, T> {
  return either({ left });
}

export function right<T, E = never>(right: T): EitherMonad<E, T> {
  return either({ right });
}
