import antfu from '@antfu/eslint-config'

export default antfu(
    {
        formatters: true,
        vue: true,
        stylistic: {
            indent: 4,
            quotes: 'single',
        },
    },
    {
        files: ['**/*.vue'],
        rules: {
            'vue/no-v-text-v-html-on-component': ['off'],
        },
    },
    {
        rules: {
            'yaml/indent': ['off'],
        },
    },
)