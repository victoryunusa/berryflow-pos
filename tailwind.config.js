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
        nelsa_primary: "#02071B",
        nelsa_secondary: "#2E5BFF",
        truetab_highlight: "#A9DDF7",
        nelsa_gray: "#7c878b",
        nelsa_gray_2: "#8f8f8f",
        nelsa_gray_3: "#5d5d5d",
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
