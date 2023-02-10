<template>
    <div id="page">
        <Navbar />
        <Head>
            <Title>{{ page.title }}</Title>
        </Head>

        <header>
            <h1>{{ page.title }}</h1>
        </header>

        <div v-html="page.body" class="prose"></div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import type { Page, PagesReceived } from '~~/types'
import Navbar from '~~/components/layout/Navbar.vue';
import Footer from '~~/components/layout/Footer.vue';
import pageQuery from '~~/queries/page.gql'

const route = useRoute()
const { url } = useRuntimeConfig()
const fullLocale = useFullLocale()
const homepage = useHomepage()
const { baseline } = homepage.value

const page = ref({} as Page)

await useAsyncQuery<PagesReceived>(pageQuery, {
    slug: route.params.slug.toString(),
    locale: fullLocale.value,
})
    .then(({ data }) => {
        if (!data.value || !data.value.Pages_translations.length) {
            throw createError({
                statusCode: 404,
                fatal: true,
            })
        }

        page.value = data.value.Pages_translations[0]
    })

useSeoMeta({
    ogTitle: page.value.title,
    ogType: 'website',
    ogImage: url + '/icons/logo.svg',
    description: baseline.replace(/_/g, ''),
    ogDescription: baseline.replace(/_/g, ''),
    twitterTitle: page.value.title,
    twitterImage: url + '/icons/logo.svg',
    twitterDescription: baseline.replace(/_/g, '')
})

</script>

<style scoped lang="scss">
#page {
    header {
        height: 33vh;
        @apply flex justify-center items-center;

        h1 {
            color: var(--title-color);
        }
    }

    .prose {
        @apply lg:prose-xl mx-auto mt-4 prose-img:mx-auto dark:prose-invert prose-a:text-violet-600 px-2;
    }
}
</style>