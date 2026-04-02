import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slateBlue: "#1F3A5F",
        mint: "#8FD3B6",
        sand: "#F2E8CF",
        ember: "#C85A38",
      },
    },
  },
  plugins: [],
};

export default config;
