const { def } = require('@vue/shared')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [],
  theme: {
    fontFamily: {
      'body': ['Space Grotesk', ... defaultTheme.fontFamily.sans],
      'display': ['Emelind', ...defaultTheme.fontFamily.display]
    },

    extend: {},
  },
  plugins: [],
}
