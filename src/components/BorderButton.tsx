import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: string; // Optional custom prop for primary color
};

export function BorderButton(props: Props) {
  return (
    <button
      {...props}
      className={
        (props.className || "") +
        " " +
        "rounded-lg border border-2 border-primary bg-primary bg-opacity-40 hover:bg-opacity-50 hover:bg-primary-light"
      }
    >
      {props.children}
    </button>
  );
}
