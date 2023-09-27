/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#09497B",

          secondary: "#FDB517",

          accent: "#666666",

          neutral: "#CCCCCC",

          "base-100": "#ffffff",

          info: "#0EA8DC",

          success: "#FFCB18",

          warning: "#FFCB18",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
