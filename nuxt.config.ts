import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import { version } from './package.json'

export default defineNuxtConfig({
    app: {
        head: {
            titleTemplate: '%s | Joseph Levarato',

            viewport: 'width=device-width, initial-scale=1',
            charset: 'utf-8',
            meta: [
                { name: 'msapplication-Tilecolor', content: '#312b5e' },
                { name: 'theme-color', content: '#312b5e' },
                { name: 'twitter:card', content: 'summary_large_image' },
            ],

            link: [
                { rel: 'icon', type: 'image/svg+xml', href: `${process.env.URL}/icons/logo.svg` },
                { rel: 'preload', type: 'font/ttf', as: 'font', href: '/fonts/SpaceGrotesk-Light.ttf', crossorigin: '' },
                { rel: 'preload', type: 'font/ttf', as: 'font', href: '/fonts/Emelind.ttf', crossorigin: '' },
                { rel: 'preload', type: 'font/ttf', as: 'font', href: '/fonts/JetBrainsMono-Regular.ttf', crossorigin: '' },
            ],
        },
    },

    compatibilityDate: '2024-09-22',

    css: [
        '@/assets/styles/main.scss',
    ],

    devtools: {
        enabled: true,
    },

    modules: ['nuxt-directus', '@vee-validate/nuxt', '@vueuse/nuxt', 'dayjs-nuxt', 'vuetify-nuxt-module'],

    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL || 'localhost:8055',
            url: process.env.URL || 'http://localhost:3000',
            version,
            hcSitekey: process.env.HCAPTCHA_SITEKEY,
            directus: {
                url: process.env.API_URL || 'localhost:8055',
            },
        },
    },

    typescript: {
        typeCheck: true,
    },

    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    silenceDeprecations: ['legacy-js-api'],
                    api: 'modern-compiler',
                },
            },
        },
    },

    vuetify: {
        moduleOptions: {
            styles: {
                configFile: 'assets/styles/vuetify.scss',
            },
        },
        vuetifyOptions: {
            theme: {
                defaultTheme: 'dark',
            },
            defaults: {
                VTextField: {
                    variant: 'underlined',
                    color: 'purple-darken-2',
                },
                VTextarea: {
                    variant: 'underlined',
                    color: 'purple-darken-2',
                },
                VCardTitle: {
                    style: 'white-space: initial;',
                },
            },
        },
    },
})
