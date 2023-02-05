import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'

export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        '@nuxt/image-edge',
        '@nuxtjs/i18n',
    ],

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
                { rel: 'icon', type: 'image/svg+xml', href:`${process.env.URL}/icons/logo.svg` }
            ],

            script:[{
                children: `
                    var _paq = window._paq = window._paq || [];
                    _paq.push(['trackPageView']);
                    _paq.push(['enableLinkTracking']);
                    (function() {
                        var u="//analytics.josephlevarato.me/";
                        _paq.push(['setTrackerUrl', u+'matomo.php']);
                        _paq.push(['setSiteId', '1']);
                        _paq.push(['HeatmapSessionRecording::disable']);
                        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                    })();
                `
            }]
        }
    },

    nitro: {
        compressPublicAssets: true,
    },

    i18n: {
        locales: ['fr', 'en'],
        strategy: 'prefix',
        defaultLocale: 'en',
        customRoutes: 'config',
        pages: {
            projects: {
                fr: '/projets'
            },
            'project/[slug]': {
                fr: '/projet/[slug]'
            }
        },
        detectBrowserLanguage: {
            useCookie: false,
        }
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