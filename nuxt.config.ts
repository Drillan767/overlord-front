import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { version } from './package.json'

export default defineNuxtConfig({
    devtools: {
        enabled: true,
    },

    modules: [
        'nuxt-directus',
        '@vee-validate/nuxt',
        '@vueuse/nuxt',
        'dayjs-nuxt',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
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
                { rel: 'icon', type: 'image/svg+xml', href: `${process.env.URL}/icons/logo.svg` }
            ],

            script: [{
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

    css: [
        'vuetify/lib/styles/main.sass',
        '@/assets/styles/main.scss'
    ],

    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL || 'localhost:8055',
            url: process.env.URL || 'localhost:3000',
            version,
            hcSitekey: process.env.HCAPTCHA_SITEKEY,
            directus: {
                url: process.env.API_URL || 'localhost:8055',
            }
        }
    },

    build: {
        transpile: ['vuetify'],
    },

    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})