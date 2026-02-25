/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0f0f1e",
        "card-dark": "#1a1a2e",
        "pink-hot": "#ff69b4",
        "pink-light": "#ffb7c5",
        "text-light": "#e0e0e0",
        "text-muted": "#999999",
      },
      fontFamily: {
        display: [
          '"Comic Sans MS"',
          '"Chalkboard SE"',
          '"Comic Neue"',
          "cursive",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
