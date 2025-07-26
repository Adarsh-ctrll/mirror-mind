import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: "#FBF5E6",
          DEFAULT: "#F5EEDC",
          dark: "#EFE8CC",
        },
        gryffindor: "#740001",
        slytherin: "#1A472A",
        hufflepuff: "#FFD700",
        ravenclaw: "#0E1A40",
      },
      fontFamily: {
        harryp: ["HarryP", "sans-serif"],
        lumos: ["Lumos", "serif"],
      },
      backgroundImage: {
        "marauders-map": "url('/images/marauders-map.jpg')",
        parchment: "url('/images/parchment.png')",
      },
    },
  },
  plugins: [],
};
export default config;