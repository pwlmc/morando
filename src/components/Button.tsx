import { ReactNode, useRef } from "react";
import { useButton } from "react-aria";
import clsx from "clsx";

export type ButtonProps = {
  size?: "small" | "normal" | "large";
  children: ReactNode;
};

export function Button({ size = "normal", children }: ButtonProps) {
  const ref = useRef(null);
  const { buttonProps, isPressed } = useButton({}, ref);
  return (
    <button
      ref={ref}
      className={clsx(
        "rounded-2xl bg-lime-200 font-medium text-stone-900 outline-lime-600 hover:bg-lime-100 active:bg-lime-300",
        size === "small" && "px-4 text-xs leading-7",
        size === "normal" && "px-5 text-sm leading-9",
        size === "large" && "px-6 text-lg leading-10",
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
