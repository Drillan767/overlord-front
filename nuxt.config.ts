import process from 'node:process'
import { md3 } from 'vuetify/blueprints'

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
        '@nuxtjs/seo',
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
                // Basic SEO
                { name: 'description', content: 'Joseph Levarato - Full-stack developer specializing in Vue.js, Rust, and modern web technologies. Articles, projects, and insights about software development.' },
                { name: 'author', content: 'Joseph Levarato' },
                { name: 'robots', content: 'index, follow' },
                { name: 'googlebot', content: 'index, follow' },

                // Open Graph (Facebook, LinkedIn)
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Joseph Levarato' },
                { property: 'og:title', content: 'Joseph Levarato - Full-stack Developer' },
                { property: 'og:description', content: 'Full-stack developer specializing in Vue.js, Rust, and modern web technologies. Articles, projects, and insights about software development.' },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:image:alt', content: 'Joseph Levarato - Full-stack Developer' },
                { property: 'og:locale', content: 'en_UK' },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: '@Drillan767' },
                { name: 'twitter:creator', content: '@Drillan767' },
                { name: 'twitter:title', content: 'Joseph Levarato - Full-stack Developer' },
                { name: 'twitter:description', content: 'Full-stack developer specializing in Vue.js, Rust, and modern web technologies. Articles, projects, and insights about software development.' },
                { name: 'twitter:image:alt', content: 'Joseph Levarato - Full-stack Developer' },

                // Theme and App
                { name: 'msapplication-Tilecolor', content: 'rgb(var(--v-theme-primary))' },
                { name: 'theme-color', content: 'rgb(var(--v-theme-primary))' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'apple-mobile-web-app-title', content: 'Joseph Levarato' },

                // Additional SEO
                { name: 'keywords', content: 'Joseph Levarato, Full-stack Developer, Vue.js, Rust, TypeScript, Web Development, Software Engineering' },
            ],

            link: [
                { rel: 'preload', type: 'font/ttf', as: 'font', href: '/fonts/SpaceGrotesk-Light.ttf', crossorigin: '' },
                { rel: 'preload', type: 'font/ttf', as: 'font', href: '/fonts/Emelind.ttf', crossorigin: '' },
                { rel: 'preload', type: 'font/ttf', as: 'font', href: '/fonts/JetBrainsMono-Regular.ttf', crossorigin: '' },
            ],
        },
    },

    content: {
        preview: {
            api: 'https://api.nuxt.studio',
            gitInfo: {
                name: 'overlord-front',
                owner: 'Drillan767',
                url: 'https://github.com/Drillan767/overlord-front',
            },
        },
        build: {
            markdown: {
                remarkPlugins: {
                    'remark-reading-time': {
                        wordPerMinute: 200,
                    },
                },
                toc: {
                    depth: 3,
                },
                highlight: {
                    theme: 'catppuccin-macchiato',
                    preload: [
                        'bash',
                        'css',
                        'scss',
                        'typescript',
                        'vue',
                        'vue-html',
                        'php',
                        'go',
                        'rust',
                    ],
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            url: process.env.NUXT_PUBLIC_URL || 'http://localhost:3000',
        },
    },
})
