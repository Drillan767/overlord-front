import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        'nuxt-graphql-client',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
    ],

    colorMode: {
        preference: 'system',
        fallback: 'dark',
        hid: 'color-mode',
        globalName: 'color-mode-script',
        componentName: 'ColorScheme',
        classSuffix: '',
        storageKey: 'ovrld-color-mode',
    },

    tailwindcss: {
        viewer: false,
        cssPath: '~/assets/css/tailwind.css'
    },

    css: ["@/assets/styles/main.scss"],

    publicRuntimeConfig: {
        apiUrl: process.env.API_URL || 'localhost:8055',
        url: process.env.URL || 'localhost:3000',
        version: pkg.version
    }
})