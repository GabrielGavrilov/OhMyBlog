/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper))",
      },
    },
  },
  plugins: [],
};
