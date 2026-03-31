/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // you can add custom colors, spacing, etc here
      colors: {
        primary: "#6366f1",
      },
    },
  },
  plugins: [],
};