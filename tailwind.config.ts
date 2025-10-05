import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const withOpacityValue = (variable: string, fallbackOpacity?: string) => {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`
    }

    if (fallbackOpacity !== undefined) {
      return `rgb(var(${variable}) / ${fallbackOpacity})`
    }

    return `rgb(var(${variable}) / 1)`
  }
}

const color = (variable: string, fallbackOpacity?: string) =>
  withOpacityValue(variable, fallbackOpacity) as unknown as string

const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: color("--border", "0.1"),
        input: color("--input", "0.1"),
        ring: color("--ring", "0.4"),
        background: color("--background"),
        foreground: color("--foreground"),
        card: {
          DEFAULT: color("--card", "0.9"),
          foreground: "rgb(var(--card-foreground) / 1)",
        },
        popover: {
          DEFAULT: color("--popover", "0.95"),
          foreground: "rgb(var(--popover-foreground) / 1)",
        },
        primary: {
          DEFAULT: color("--primary"),
          foreground: "rgb(var(--primary-foreground) / 1)",
        },
        secondary: {
          DEFAULT: color("--secondary"),
          foreground: "rgb(var(--secondary-foreground) / 1)",
        },
        muted: {
          DEFAULT: color("--muted"),
          foreground: "rgb(var(--muted-foreground) / 1)",
        },
        accent: {
          DEFAULT: color("--accent"),
          foreground: "rgb(var(--accent-foreground) / 1)",
        },
        destructive: {
          DEFAULT: color("--destructive"),
          foreground: "rgb(var(--destructive-foreground) / 1)",
        },
        sidebar: {
          DEFAULT: color("--sidebar"),
          foreground: "rgb(var(--sidebar-foreground) / 1)",
          primary: "rgb(var(--sidebar-primary) / 1)",
          "primary-foreground": "rgb(var(--sidebar-primary-foreground) / 1)",
          accent: color("--sidebar-accent"),
          "accent-foreground": "rgb(var(--sidebar-accent-foreground) / 1)",
          border: color("--sidebar-border", "0.12"),
          ring: color("--sidebar-ring", "0.35"),
        },
        chart: {
          1: "rgb(var(--chart-1) / 1)",
          2: "rgb(var(--chart-2) / 1)",
          3: "rgb(var(--chart-3) / 1)",
          4: "rgb(var(--chart-4) / 1)",
          5: "rgb(var(--chart-5) / 1)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.5rem)",
        xl: "calc(var(--radius) + 0.5rem)",
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
