/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF4F1',
          100: '#FFE3DB',
          200: '#FFC2B0',
          300: '#FF9B7D',
          400: '#FF6F49',
          500: '#F0431E',
          600: '#D4340F',
          700: '#AC290C',
          800: '#84200A',
          900: '#5F1707',
          950: '#3A0E04',
        },
        ink: {
          900: '#14171F',
          800: '#1E2230',
          700: '#2A2F3F',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: theme => ({
        'hero': "url('/src/app/assets/hero.png')",
        'action': "url('/src/app/assets/action.jpg')",
      }),
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [require('@tailwindcss/aspect-ratio'), addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}