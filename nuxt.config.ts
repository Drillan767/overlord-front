import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'

export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        '@nuxt/image-edge',
    ],

    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            titleTemplate: '%s | Joseph Levarato',

            viewport: 'width=device-width, initial-scale=1',
            charset: 'utf-8',
            meta: [
                { name: 'msapplication-Tilecolor', content: '#312b5e' },
                { name: 'theme-color', content: '#312b5e' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'og:title', content: 'Joseph Levarato' },
                { name: 'twitter:title', content: 'Joseph Levarato' },
                { property: 'og:type', content: 'website' },
                { property: 'og:image', content: `${process.env.API_URL}/icons/logo.svg` }
            ],

            link: [
                { rel: 'icon', type: 'image/svg+xml', href: 'icons/logo.svg' }
            ],
        }
    },

    nitro: {
        compressPublicAssets: true,
    },

    apollo: {
        clients: {
            default: {
                httpEndpoint: process.env.GQL_HOST || 'localhost:8055'
            }
        }
    },

    tailwindcss: {
        viewer: false,
        cssPath: '~/assets/css/tailwind.css'
    },

    css: ["@/assets/styles/main.scss"],

    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL || 'localhost:8055',
            url: process.env.URL || 'localhost:3000',
            version: pkg.version
        }
    }
})