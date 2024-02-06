/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  mode: "jit",
  theme: {
    extend: {
      margin: {
        "50px": "50px",
      },
    },
  },
  plugins: [],
};
