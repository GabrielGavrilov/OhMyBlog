/** @type {import('tailwindcss').Config} */
export default {
  content: {
    enabled: false,
    content: [
      "./src/**/*.html",
      "./src/**/*.scss",
      "./src/**/*.ts",
      "./src/**/*.js",
    ],
  },
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper))",
      },
    },
  },
  plugins: [],
};
