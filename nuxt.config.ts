// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/image',
        '@vueuse/nuxt',
        'dayjs-nuxt',
        'vuetify-nuxt-module'
    ],
    vuetify: {
        vuetifyOptions: {
            theme: {
                defaultTheme: 'dark'
            }
        }
    },
})