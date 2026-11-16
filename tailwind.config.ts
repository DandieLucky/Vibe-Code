import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: {
          DEFAULT: "var(--color-paper)",
          2: "var(--color-paper-2)",
          3: "var(--color-paper-3)",
        },
        sheet: "var(--color-sheet)",
        ink: {
          DEFAULT: "var(--color-ink)",
          2: "var(--color-ink-2)",
        },
        muted: "var(--color-muted)",
        rule: "var(--color-rule)",
        accent: {
          DEFAULT: "var(--color-accent)",
          2: "var(--color-accent-2)",
          soft: "var(--color-accent-soft)",
          ink: "var(--color-accent-ink)",
        },
        umber: "var(--color-umber)",
        rubber: {
          DEFAULT: "var(--rubber)",
          hi: "var(--rubber-hi)",
          lo: "var(--rubber-lo)",
        },
        brand: {
          primary: "var(--color-ink)",
          secondary: "var(--color-umber)",
          accent: "var(--color-accent)",
          accentHover: "var(--rubber-lo)",
          teal: "var(--lane-1)",
          light: "var(--color-paper)",
          card: "var(--color-sheet)",
          border: "var(--color-rule)",
          muted: "var(--color-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-code)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
