import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        'nuxt-graphql-client',
        '@nuxtjs/tailwindcss',
    ],

    app: {
        head: {
            titleTemplate: '%s | Joseph Levarato',

            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            charset: 'utf-8',
            meta: [
                { name: 'msapplication-Tilecolor', content: '#312b5e' },
                { name: 'theme-color', content: '#312b5e' },
            ],

            link: [
                { rel: 'icon', type: 'image/svg+xml', href: 'icons/logo.svg' }
            ],
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