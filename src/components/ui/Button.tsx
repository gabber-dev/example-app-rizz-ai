import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const baseClasses = "font-medium transition-colors duration-200";
  const variantClasses = {
    primary: "bg-primary text-primary-content hover:bg-primary-focus",
    secondary: "bg-secondary text-secondary-content hover:bg-secondary-focus",
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {props.children}
    </button>
  );
} 