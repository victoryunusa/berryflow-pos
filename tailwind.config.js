/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        //cabin: ["Cabin", "sans-serif"],
        br: ["Quicksand", "sans-serif"],
      },
      fontSize: {
        small: "0.78rem",
      },
      colors: {
        nelsa_primary: "#242424",
        h28_light_green: "#EBF5FF",
        h28_light_green_2: "#44C3D2",
        h28_light_green_3: "#EBF5FF",
        nelsa_dark_blue: "#1B1D44",
        h28_white: "#ffffff",
        nelsa_gray: "#7c878b",
        nelsa_gray_2: "#8f8f8f",
        nelsa_gray_3: "#5d5d5d",
        h28_light_grey: "#f7f7f7",
        h28_light_grey_2: "#f9f9f9",
        h28_red: "#dc3545",
        h28_yellow: "#f5bd3e",
        h28_gold: "#eca400",
        h28_orange: "#cd4a38",
      },
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
