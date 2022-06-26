const { def } = require('@vue/shared')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    `components/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `app.vue`,
    // `plugins/**/*.{js,ts}`,
    // `nuxt.config.{js,ts}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        'mono': ['"Jetbrains Mono"', ...defaultTheme.fontFamily.mono]
      },
    },
  },
  plugins: [],
}
