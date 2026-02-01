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

export type Result<E, T> = { ok: true; value: T } | { ok: false; error: E };

export type Either<E, T> = {
  map: <U>(mapper: (right: T) => U) => Either<E, U>;
  mapLeft: <EE>(mapper: (left: E) => EE) => Either<EE, T>;
  flatMap: <U>(mapper: (right: T) => Either<E, U>) => Either<E, U>;
  match: <U>(onLeft: (left: E) => U, onRight: (right: T) => U) => U;
  getOrElse: (onLeft: (left: E) => T) => T;
  filterOrElse: (
    predicate: (right: T) => boolean,
    onLeft: () => E
  ) => Either<E, T>;
  toResult: () => Result<E, T>;
  tap: (effect: (right: T) => void) => Either<E, T>;
  // todo: implement. Check if the typing works, we should be able to call .ap only when value is a function
  ap: <A, U>(this: Either<E, (a: A) => U>, arg: Either<E, A>) => Either<E, U>;
};

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

    // todo: add tests
    filterOrElse: <EE = E>(
      predicate: (right: T) => boolean,
      onLeft: () => EE | E
    ): Either<E | EE, T> => {
      return isRight(value)
        ? predicate(value.right)
          ? (either as Either<EE | E, T>)
          : left(onLeft())
        : (either as Either<EE | E, T>);
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

export function traverse() {
  throw new Error("Not implemented");
}

export function sequence() {
  throw new Error("Not implemented");
}
