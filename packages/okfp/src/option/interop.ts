import { Option } from "./option.js";

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

export function filterMap() {
  throw new Error("Not implemented");
}

// todo: add tests
export function compact<T>(options: Option<T>[]): T[] {
  return options.flatMap((o) =>
    o.match(
      () => [],
      (value) => [value]
    )
  );
}

export function traverse() {
  throw new Error("Not implemented");
}

// todo: implement and add tests
// compared to compact it should return None if there are any None in array
export function sequence<T>(options: Option<T>[]): Option<T[]> {
  throw new Error("Not implemented");
}
