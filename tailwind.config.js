/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        //cabin: ["Cabin", "sans-serif"],
        br: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        small: "0.78rem",
      },
      colors: {
        tt_light_green: {
          DEFAULT: "#99f7b1",
          100: "#064a17",
          200: "#0c932e",
          300: "#12dd45",
          400: "#4ef176",
          500: "#99f7b1",
          600: "#acf8bf",
          700: "#c1facf",
          800: "#d5fcdf",
          900: "#eafdef",
        },
        tt_rich_black: {
          DEFAULT: "#02071b",
          100: "#000106",
          200: "#01030b",
          300: "#010411",
          400: "#020617",
          500: "#02071b",
          600: "#091f76",
          700: "#1036cf",
          800: "#4d6ef2",
          900: "#a6b6f8",
        },
        tt_celestial_blue: {
          DEFAULT: "#009df1",
          100: "#001f30",
          200: "#003e60",
          300: "#005d90",
          400: "#007dc0",
          500: "#009df1",
          600: "#27b3ff",
          700: "#5dc6ff",
          800: "#93d9ff",
          900: "#c9ecff",
        },
        tt_uranian_blue: {
          DEFAULT: "#a9ddf7",
          100: "#07354d",
          200: "#0e6b99",
          300: "#15a0e6",
          400: "#5ec0f0",
          500: "#a9ddf7",
          600: "#bce4f9",
          700: "#cdebfa",
          800: "#ddf2fc",
          900: "#eef8fd",
        },
        tt_mustard: {
          DEFAULT: "#f5d63e",
          100: "#3a3103",
          200: "#746206",
          300: "#ae9309",
          400: "#e9c40c",
          500: "#f5d63e",
          600: "#f7de64",
          700: "#f9e78b",
          800: "#fbefb1",
          900: "#fdf7d8",
        },
      },
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      backgroundImage: {
        "bg-pattern": "url('/src/assets/images/2028.png')",
      },
    },
  },
  plugins: [],
};
