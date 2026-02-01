import { OptionV, Some, NONE } from "./defs.js";

export type Option<T> = {
  /**
   * Filters the Option based on a predicate function.
   * If this Option is Some and the predicate returns true, returns this Option.
   * Otherwise, returns None.
   *
   * @param predicate - Function that tests the contained value
   * @returns The same Option if predicate passes, None otherwise
   *
   * @example
   * ```typescript
   * some(5).filter(x => x > 3) // Some(5)
   * some(2).filter(x => x > 3) // None
   * none().filter(x => x > 3)  // None
   * ```
   */
  filter: (predicate: (some: T) => boolean) => Option<T>;

  /**
   * Transforms the value inside the Option using a mapping function.
   * If this Option is None, returns None without calling the mapper.
   *
   * @param mapper - Function to transform the contained value
   * @returns New Option containing the transformed value, or None
   *
   * @example
   * ```typescript
   * some(5).map(x => x * 2)     // Some(10)
   * none<number>().map(x => x * 2) // None
   * ```
   */
  map: <U>(mapper: (some: T) => U) => Option<U>;

  /**
   * Combines this Option with another Option using a mapping function.
   * Only applies the mapper if both Options contain values.
   *
   * @param optA - Second Option to combine with
   * @param mapper - Function that combines both values
   * @returns Option containing the combined result, or None if either Option is None
   *
   * @example
   * ```typescript
   * some(5).map2(some(3), (x, y) => x + y) // Some(8)
   * some(5).map2(none(), (x, y) => x + y)  // None
   * none().map2(some(3), (x, y) => x + y)  // None
   * ```
   */
  map2: <A, U>(optA: Option<A>, mapper: (some: T, a: A) => U) => Option<U>;

  /**
   * Combines this Option with two other Options using a mapping function.
   * Only applies the mapper if all three Options contain values.
   *
   * @param optA - Second Option to combine with
   * @param optB - Third Option to combine with
   * @param mapper - Function that combines all three values
   * @returns Option containing the combined result, or None if any Option is None
   *
   * @example
   * ```typescript
   * some(1).map3(some(2), some(3), (x, y, z) => x + y + z) // Some(6)
   * some(1).map3(some(2), none(), (x, y, z) => x + y + z)  // None
   * ```
   */
  map3: <A, B, U>(
    optA: Option<A>,
    optB: Option<B>,
    mapper: (some: T, a: A, b: B) => U
  ) => Option<U>;

  /**
   * Applies a function wrapped in an Option to a value wrapped in an Option.
   * This is useful for applying functions that are also optional.
   *
   * @param argOption - Option containing the argument to apply the function to
   * @returns Option containing the result, or None if either Option is None
   *
   * @example
   * ```typescript
   * const add = (x: number) => (y: number) => x + y;
   * some(add(5)).ap(some(3)) // Some(8)
   * some(add(5)).ap(none())  // None
   * none().ap(some(3))       // None
   * ```
   */
  ap: <A, U>(this: Option<(arg: A) => U>, argOption: Option<A>) => Option<U>;

  /**
   * Chains Option-returning operations together (monadic bind).
   * If this Option is Some, applies the mapper and returns the result.
   * If this Option is None, returns None without calling the mapper.
   *
   * @param mapper - Function that returns an Option
   * @returns The Option returned by mapper, or None
   *
   * @example
   * ```typescript
   * const safeDivide = (x: number) => x === 0 ? none() : some(10 / x);
   * some(2).flatMap(safeDivide)  // Some(5)
   * some(0).flatMap(safeDivide)  // None
   * none().flatMap(safeDivide)   // None
   * ```
   */
  flatMap: <U>(mapper: (some: T) => Option<U>) => Option<U>;

  /**
   * Performs a side effect if this Option contains a value.
   * Returns the original Option unchanged.
   *
   * @returns The same Option instance
   *
   * @example
   * ```typescript
   * some(5).tap(() => console.log("Has value")) // Some(5), logs message
   * none().tap(() => console.log("Has value"))  // None, no log
   * ```
   */
  tap: () => Option<T>;

  /**
   * Performs a side effect if this Option is None.
   * Returns the original Option unchanged.
   *
   * @returns The same Option instance
   *
   * @example
   * ```typescript
   * some(5).tapNone(() => console.log("No value")) // Some(5), no log
   * none().tapNone(() => console.log("No value"))  // None, logs message
   * ```
   */
  tapNone: () => Option<T>;

  /**
   * Extracts the value from the Option, or returns a fallback value if None.
   * The fallback is lazily evaluated (function) to avoid unnecessary computation.
   *
   * @param fallback - Function that provides the default value
   * @returns The contained value or the fallback value
   *
   * @example
   * ```typescript
   * some(5).getOrElse(() => 0)  // 5
   * none().getOrElse(() => 0)   // 0
   * ```
   */
  getOrElse: (fallback: () => T) => T;

  /**
   * Returns this Option if it contains a value, otherwise returns the fallback Option.
   * The fallback is lazily evaluated to avoid unnecessary computation.
   *
   * @param fallback - Function that provides the alternative Option
   * @returns This Option if Some, otherwise the fallback Option
   *
   * @example
   * ```typescript
   * some(5).orElse(() => some(10))  // Some(5)
   * none().orElse(() => some(10))   // Some(10)
   * ```
   */
  orElse: (fallback: () => Option<T>) => Option<T>;

  /**
   * Pattern matches on the Option, executing different functions based on its state.
   *
   * @param onNone - Function to execute if Option is None
   * @param onSome - Function to execute if Option is Some
   * @returns The result of the executed function
   *
   * @example
   * ```typescript
   * some(5).match(() => "empty", x => `value: ${x}`) // "value: 5"
   * none().match(() => "empty", x => `value: ${x}`)  // "empty"
   * ```
   */
  match: <U>(onNone: () => U, onSome: (some: T) => U) => U;

  /**
   * Converts the Option to a nullable value.
   * Returns the contained value if Some, or null if None.
   *
   * @returns The contained value or null
   *
   * @example
   * ```typescript
   * some(5).toNullable()  // 5
   * none().toNullable()   // null
   * ```
   */
  toNullable: () => T | null;
};

function isSome<T>(option: OptionV<T>): option is Some<T> {
  return typeof option === "object" && "some" in option;
}

export function createOption<T>(optionValue: OptionV<T>): Option<T> {
  const option: Option<T> = {
    filter: (predicate: (some: T) => boolean) =>
      option.flatMap((value) =>
        predicate(value) ? option : createOption(NONE)
      ),

    map: <U>(mapper: (some: T) => U) => {
      return isSome(optionValue)
        ? createOption({ some: mapper(optionValue.some) })
        : (option as unknown as Option<U>);
    },

    ap: function <A, U>(
      this: Option<(arg: A) => U>,
      argOption: Option<A>
    ): Option<U> {
      return this.flatMap((fn) =>
        argOption.match(
          () => createOption(NONE),
          (arg) => createOption({ some: fn(arg) })
        )
      );
    },

    flatMap: <U>(mapper: (some: T) => Option<U>): Option<U> => {
      return isSome(optionValue)
        ? mapper(optionValue.some)
        : forceCast<T, U>(option);
    },

    match: <U>(onNone: () => U, onSome: (some: T) => U) => {
      return isSome(optionValue) ? onSome(optionValue.some) : onNone();
    },

    getOrElse: (fallback: () => T) => {
      return isSome(optionValue) ? optionValue.some : fallback();
    },

    toNullable: (): T | null => {
      return isSome(optionValue) ? optionValue.some : null;
    },
  };

  return option;
}

function forceCast<T, U>(option: Option<T>): Option<U> {
  return option as unknown as Option<U>;
}
