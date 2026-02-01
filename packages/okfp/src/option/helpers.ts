import { Option } from "./option.js";

/**
 * Combines two Options using a mapping function.
 * Only applies the mapper if both Options contain values.
 *
 * @param optA - First Option to combine
 * @param optB - Second Option to combine
 * @param mapper - Function that combines both values
 * @returns Option containing the combined result, or None if either Option is None
 *
 * @example
 * ```typescript
 * const firstName = some("John");
 * const lastName = some("Doe");
 * map2(firstName, lastName, (first, last) => `${first} ${last}`) // Some("John Doe")
 *
 * const missing = none<string>();
 * map2(firstName, missing, (first, last) => `${first} ${last}`) // None
 * ```
 */
export function map2<A, B, C>(
  optA: Option<A>,
  optB: Option<B>,
  mapper: (a: A, b: B) => C
) {
  return optA.map((a) => (b: B) => mapper(a, b)).ap(optB);
}

/**
 * Combines three Options using a mapping function.
 * Only applies the mapper if all three Options contain values.
 *
 * @param optA - First Option to combine
 * @param optB - Second Option to combine
 * @param optC - Third Option to combine
 * @param mapper - Function that combines all three values
 * @returns Option containing the combined result, or None if any Option is None
 *
 * @example
 * ```typescript
 * const day = some(15);
 * const month = some(6);
 * const year = some(2023);
 * map3(day, month, year, (d, m, y) => `${d}/${m}/${y}`) // Some("15/6/2023")
 *
 * const missingYear = none<number>();
 * map3(day, month, missingYear, (d, m, y) => `${d}/${m}/${y}`) // None
 * ```
 */
export function map3<A, B, C, D>(
  optA: Option<A>,
  optB: Option<B>,
  optC: Option<C>,
  mapper: (a: A, b: B, c: C) => D
) {
  return optA
    .map((a) => (b: B) => (c: C) => mapper(a, b, c))
    .ap(optB)
    .ap(optC);
}
