import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "760px",
      lg: "1152px",
      xl: "1440px",
      "2xl": "1920px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        s1: "0px 4px 50px -5px rgb(0 0 0 / 0.25)",
        s2: "0px 4px 50px -11px rgb(0 0 0 /0.25)",
        s3: "0px 3.62px 45.28px -9.96px rgb(0 0 0 / 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "#FFE492",
        input: "#212529",
        ring: "#212529",
        background: "#FFFFFF",
        foreground: "#212529",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#F8FAFC",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#C4DEFD",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529",
        },
        borderRadius: {
          lg: "8px",
          md: "6px",
          sm: "4px",
        },
        secondary: {
          DEFAULT: "#043873",
          50: "#CDD7E3",
          100: "#ABBDD0",
          200: "#819BB9",
          300: "#587AA2",
          400: "#2E598A",
          500: "#043873",
          600: "#032F60",
          700: "#03254D",
          800: "#021C3A",
          900: "#011326",
          1000: "#010B17",
        },
        primary: {
          DEFAULT: "#4F9CF9",
          50: "#DCEBFE",
          100: "#C4DEFD",
          200: "#A7CDFC",
          300: "#8ABDFB",
          400: "#6CACFA",
          500: "#4F9CF9",
          600: "#4282CF",
          700: "#3568A6",
          800: "#284E7D",
          900: "#1A3453",
          1000: "#101F32",
        },
        accent: {
          yellow: "#FFE492",
          blue: "#A7CEFC",
          white: "#FFFFFF",
          black: "#212529",
        },
      },
      fontSize: {
        h1: ["4.5rem", { lineHeight: "5.444rem", letterSpacing: "-0.09em" }],
        h2: ["4rem", { lineHeight: "4.844rem", letterSpacing: "-0.08em" }],
        h3: ["3.4rem", { lineHeight: "4.088rem", letterSpacing: "-0.068em" }],
        h4: ["2.25rem", { lineHeight: "2.725rem", letterSpacing: "-0.045em" }],
        h5: ["1.75rem", { lineHeight: "2.25rem", letterSpacing: "-0.035em" }],
        p1: ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.03em" }],
        p1SemiBold: ["1.5rem", { lineHeight: "2.25rem" }],
        p2: ["1.125rem", { lineHeight: "1.875rem", letterSpacing: "-0.023em" }],
        p2Medium: [
          "1.125rem",
          { lineHeight: "1.438rem", letterSpacing: "-0.023em" },
        ],
        p2Bold: [
          "1.125rem",
          { lineHeight: "1.363rem", letterSpacing: "-0.023em" },
        ],
        p3: ["1rem", { lineHeight: "1.25rem", letterSpacing: "-0.02em" }],
        p3Medium: [
          "1rem",
          { lineHeight: "1.213rem", letterSpacing: "-0.02em" },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
