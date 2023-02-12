import { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

export default <Config>{
    darkMode: 'class',
    content: [
        `components/**/*.vue`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `app.vue`,
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
                'mono': ['"Jetbrains Mono"', ...defaultTheme.fontFamily.mono]
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
