import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        champagne: "#F3E7D3",
        ink: "#171412",
        clay: "#B76E4B",
        sand: "#F8F3EC",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 20, 18, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
