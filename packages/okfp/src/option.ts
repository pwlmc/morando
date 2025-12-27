type Some<T> = {
  some: T;
};

type None = Symbol;

type OptionValue<T> = Some<T> | None;

// WIP
export type Option<T> = {
  map: <U>(mapper: (some: T) => U) => Option<U>;
  flatMap: <U>(mapper: (some: T) => Option<U>) => Option<U>;
};
