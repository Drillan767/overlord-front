<template>
    <div id="versions">
        <Navbar />
        <Head>
            <Title>Versions</Title>
        </Head>

        <header>
            <h1 class="glitch" data-text="Versions">Versions</h1>
        </header>

        <section v-for="(version, i) in versions">
            <h1>Version {{ version.version }}</h1>

            <div v-html="version.description" class="prose"></div>
        </section>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Navbar from '~~/components/layout/Navbar.vue';
import Footer from '~~/components/layout/Footer.vue';
import type { Version, ReceivedVersion } from '~~/types'
import versionQuery from '~~/queries/versions.gql'

const { url } = useRuntimeConfig()
const fullLocale = useFullLocale()
const homepage = useHomepage()
const { baseline } = homepage.value
const versions = ref<Version[]>([])

useSeoMeta({
    ogTitle: 'Versions',
    ogType: 'website',
    ogImage: url + '/icons/logo.svg',
    description: baseline.replace(/_/g, ''),
    ogDescription: baseline.replace(/_/g, ''),
    twitterTitle: 'Versions',
    twitterImage: url + '/icons/logo.svg',
    twitterDescription: baseline.replace(/_/g, '')
})

await useAsyncQuery<ReceivedVersion>(versionQuery, {locale: fullLocale.value})
    .then(({ data }) => {
        if (!data.value) {
            throw createError({
                statusCode: 500,
                fatal: true
            })
        }

        versions.value = data.value.Releases_translations.map((release) => {
            const { description, Releases_id: { version } } = release
            return { description, version }
        })
    })

</script>

<style scoped lang="scss">
#versions {
    header {
        height: 33vh;
        @apply flex justify-center items-center;

        h1 {
            color: var(--title-color);
            @apply text-8xl;
        }
    }

    section {
        h1 {
            color: var(--purple);
            @apply text-center;
        }
        .prose {
            @apply lg:prose-xl mx-auto mt-4 prose-img:mx-auto dark:prose-invert prose-a:text-violet-600 px-2;
        }
    }

    
}
</style>