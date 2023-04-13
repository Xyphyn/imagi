/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "src/**/*.{ts,js,svelte,html}",
    "static/**/*.svg"
  ],
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: {
        popIn: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 }
        }
      },
      animation: {
        'popIn': 'popIn 350ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards'
      }
    },
  },
  plugins: [],
}

