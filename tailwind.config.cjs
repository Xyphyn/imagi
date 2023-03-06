/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{html,js,svelte,ts}"],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        "primary": "#72efdd",
        "secondary": "#51dbf0"
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
      }
    },
  },
  plugins: [],
}
