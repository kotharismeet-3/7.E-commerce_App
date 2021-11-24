const { colors } = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito']
      },
      colors: {
        teal: colors.teal
      }      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
