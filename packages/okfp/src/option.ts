export type OptionMonad<T> = {
  map: <U>(mapper: (some: T) => U) => OptionMonad<U>;
  flatMap: <U>(mapper: (some: T) => OptionMonad<U>) => OptionMonad<U>;
  match: <U>(onSome: (some: T) => U, onNone: () => U) => U;
};

export type Some<T> = {
  some: T;
};

export type None = Symbol;

export type Option<T> = Some<T> | None;

function isSome<T>(option: Option<T>): option is Some<T> {
  return typeof option === "object" && "some" in option;
}

function isNone(option: Option<unknown>): option is None {
  return option === NONE;
}

function option<T>(option: Option<T>): OptionMonad<T> {
  const optionMonad: OptionMonad<T> = {
    map: <U>(mapper: (some: T) => U) => {
      return isSome(option)
        ? some(mapper(option.some))
        : (optionMonad as unknown as OptionMonad<U>);
    },

    flatMap: <U>(mapper: (some: T) => OptionMonad<U>): OptionMonad<U> => {
      return isSome(option)
        ? mapper(option.some)
        : (optionMonad as unknown as OptionMonad<U>);
    },

    match: <U>(onSome: (some: T) => U, onNone: () => U) => {
      return isSome(option) ? onSome(option.some) : onNone();
    },
  };

  return optionMonad;
}

export function some<T>(some: T): OptionMonad<T> {
  return option({ some });
}

const NONE = Symbol("None");

export function none<T>(): OptionMonad<T> {
  return option<T>(NONE);
}
