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
        navy: {
          DEFAULT: "#050912",
          light: "#0a1628",
          medium: "#0d1f3c",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e2c06e",
          dark: "#a0852d",
          glow: "rgba(201, 168, 76, 0.4)",
        },
        cream: {
          DEFAULT: "#f5f0e8",
          muted: "#d4cfc7",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-lato)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(201, 168, 76, 0.6)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
