export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const url = config.app.baseURL

    // Set dynamic meta tags that depend on the URL
    useHead({
        meta: [
            // Open Graph
            { property: 'og:image', content: `${url}/images/joseph.jpeg` },
            { property: 'og:url', content: url },
            { property: 'og:logo', content: `${url}/icons/logo.svg` },

            // Twitter Card
            { name: 'twitter:image', content: `${url}/images/joseph.jpeg` },

            // Canonical URL
            { name: 'canonical', content: url },
        ],
        link: [
            { rel: 'icon', type: 'image/svg+xml', href: `${url}/icons/logo.svg` },
            { rel: 'apple-touch-icon', href: `${url}/icons/logo.svg` },
            { rel: 'manifest', href: `${url}/manifest.json` },
        ],
    })
})
