import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        'nuxt-graphql-client',
        '@nuxtjs/tailwindcss',
    ],

    tailwindcss: {
        viewer: false,
        cssPath: '~/assets/css/tailwind.css'
    },

    css: ["@/assets/styles/main.scss"],
    /*
    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@import "@/assets/styles/_variables.sass"',
                },
            },
        },
    },
    */
})
