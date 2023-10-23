/** @type {import('tailwindcss').Config} */
export default {

  //this will check the index.html and all folders with the given extensions
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}