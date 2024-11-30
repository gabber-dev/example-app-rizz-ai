import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "base-content-bold": "#c1c1c1",
      "accent-hover": "#00B4FF",
      "primary-light": "#FF7347",
      "error-base": "#820303",
      "error-base-content": "#fc4747",
      white: "#efefef",
      "base-hover": "#303030",
    },
    fontFamily: {
      primary: ["var(--sf-pro-rounded)"],
      secondary: ["sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        rizz: {
          primary: "#FF5925",
          "base-100": "rgb(22, 22, 21)",
          "base-200": "#1b1b1b",
          "base-300": "#212121",
          "base-content": "#6f6e6a",
          accent: "#00A4FF",
          "accent-content": "#FFFFFF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
