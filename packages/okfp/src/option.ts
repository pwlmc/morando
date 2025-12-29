export type Option<T> = {
  map: <U>(mapper: (some: T) => U) => Option<U>;
  flatMap: <U>(mapper: (some: T) => Option<U>) => Option<U>;
  match: <U>(onSome: (some: T) => U, onNone: () => U) => U;
  getOrElse: (fallback: () => T) => T;
  toNullable: () => T | null;
  filter: (predicate: (some: T) => boolean) => Option<T>;
};

export type Some<T> = {
  some: T;
};

export type None = Symbol;

export type OptionV<T> = Some<T> | None;

function isSome<T>(option: OptionV<T>): option is Some<T> {
  return typeof option === "object" && "some" in option;
}

function createOption<T>(value: OptionV<T>): Option<T> {
  const option: Option<T> = {
    map: <U>(mapper: (some: T) => U) => {
      return isSome(value)
        ? some(mapper(value.some))
        : (option as unknown as Option<U>);
    },

    flatMap: <U>(mapper: (some: T) => Option<U>): Option<U> => {
      return isSome(value)
        ? mapper(value.some)
        : (option as unknown as Option<U>);
    },

    // todo: add tests
    match: <U>(onSome: (some: T) => U, onNone: () => U) => {
      return isSome(value) ? onSome(value.some) : onNone();
    },

    getOrElse: (fallback: () => T) => {
      return isSome(value) ? value.some : fallback();
    },

    toNullable: (): T | null => {
      return isSome(value) ? value.some : null;
    },

    // todo: add tests
    filter: (predicate: (some: T) => boolean) => {
      return isSome(value) && predicate(value.some) ? option : none();
    },
  };

  return option;
}

/**
 * Creates an {@link Option} that contains a value.
 *
 * Use this to wrap an existing value into an `Option<T>` representing presence
 * (as opposed to `none`, which represents absence).
 *
 * @typeParam T - Type of the wrapped value.
 * @param some - The value to store in the option.
 * @returns An {@link Option} containing the provided value.
 */
export function some<T>(some: T): Option<T> {
  return createOption({ some });
}

const NONE = Symbol("None");

/**
 * Creates an {@link Option} representing the absence of a value.
 *
 * @typeParam T - The type of the value that would be contained if present.
 * @returns An {@link Option} in the `None` state.
 *
 * @example
 * ```ts
 * const value = none<number>();
 * ```
 */
export function none<T>(): Option<T> {
  return createOption<T>(NONE);
}

/**
 * Returns an array with all Some values from the provided array of Option<T>. Drops all the None values.
 *
 * @example
 * const opts = [some(1), none<number>(), some(3)];
 * const compacted = compact(opts); // [1, 3]
 *
 * @typeParam T - The type wrapped by the input Option instances.
 * @param options - An array of Option<T> to compact.
 * @returns An array of all values from the Some instances in the input. Order is preserved.
 */
// todo: add tests
export function compact<T>(options: Option<T>[]): T[] {
  return options.flatMap((o) =>
    o.match(
      (value) => [value],
      () => []
    )
  );
}

// todo: implement and add tests
// compared to compact it should return None if there are any None in array
export function sequence<T>(options: Option<T>[]): Option<T[]> {
  throw new Error("Not implemented");
}

/**
 * Creates an {@link Option} from a nullable value.
 *
 * If {@link nullable} is `null` or `undefined`, returns {@link none}. Otherwise, wraps the provided value in {@link some}.
 *
 * @example
 * fromNullable(0).getOrElse(() => 123); // 0
 * fromNullable(null).toNullable(); // null
 *
 * @typeParam T - The non-null value type to wrap.
 * @param nullable - A value that may be `null` or `undefined`.
 * @returns An {@link Option} that is `Some` when the value is present, otherwise `None`.
 */
// todo: add tests
export function fromNullable<T>(nullable: null | undefined | T): Option<T> {
  return nullable == null ? none() : some<T>(nullable);
}
