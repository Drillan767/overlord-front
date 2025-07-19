import process from 'node:process'
import { md3 } from 'vuetify/blueprints'
import { version } from './package.json'

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    css: [
        '@/assets/styles/main.css',
    ],
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/image',
        '@vueuse/nuxt',
        'dayjs-nuxt',
        'vuetify-nuxt-module',
    ],
    vuetify: {
        vuetifyOptions: {
            blueprint: md3,
            theme: {
                defaultTheme: 'dark',
                themes: {
                    dark: {
                        colors: {
                            'primary': 'hsl(274,93%,63%)',
                            'background': '#000000',
                            'surface': '#000000',
                            'surface-variant': '#000000',
                            'on-surface': '#FFFFFF',
                            'on-surface-variant': '#FFFFFF',
                        },
                    },
                },
            },
            defaults: {
                VBtn: {
                    color: 'primary',
                },
            },
        },
    },

    app: {
        head: {
            titleTemplate: '%s | Joseph Levarato',
            htmlAttrs: {
                lang: 'en',
                class: 'bg-black',
            },

            viewport: 'width=device-width, initial-scale=1',
            charset: 'utf-8',
            meta: [
                { name: 'msapplication-Tilecolor', content: 'rgb(var(--v-theme-primary))' },
                { name: 'theme-color', content: 'rgb(var(--v-theme-primary))' },
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

    content: {
        build: {
            markdown: {
                toc: {
                    depth: 3,
                },
            },
        },
    },

    runtimeConfig: {
        public: {
            url: process.env.URL || 'http://localhost:3000',
            version,
        },
    },
})
