import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config"; // Adjust path to your config
import tinycolor from "tinycolor2"; // Optional: For dynamic color manipulation
import { ButtonHTMLAttributes } from "react";

const fullConfig = resolveConfig(tailwindConfig);

// Get the primary color from the Tailwind theme
const primaryColor = fullConfig.daisyui.themes[0].rizz.primary;
const primaryLight = tinycolor(primaryColor).lighten(20).toString(); //

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: string; // Optional custom prop for primary color
};

export function ShinyButton(props: Props) {
  return (
    <button
      {...props}
      className={
        (props.className || "") +
        " " +
        `
    rounded-lg px-2 py-2 
    bg-gradient-to-r from-primary to-[var(--primary-light)] shadow
    focus:outline-none focus:ring focus:ring-primary/50
    focus-visible:outline-none focus-visible:ring
    focus-visible:ring-primary/50 relative 
    before:absolute before:inset-0 before:rounded-[inherit] 
    before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)]
    before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0]
    before:bg-no-repeat before:[transition:background-position_0s_ease]
    hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]
  `
      }
      style={
        {
          "--primary-light": primaryLight,
        } as React.CSSProperties
      }
    >
      {props.children}
    </button>
  );
}
