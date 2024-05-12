<script setup lang="ts">
import type { Page } from '~/types'

const route = useRoute()
const { getItems } = useDirectusItems()

const page = ref<Page>()

async function loadPage() {
    const data = await getItems<Page>({
        collection: 'Pages',
        params: {
            filter: {
                slug: route.params.slug,
            },
            limit: 1,
        },
    })

    if (!data.length) {
        throw createError({
            statusCode: 404,
            fatal: true,
        })
    }

    page.value = data[0]
}

useHead({
    title: () => page.value?.title ?? '',
})

onMounted(() => loadPage())

watch(() => route.params.slug, () => loadPage())

const breadcrumb = computed(() => ([
    {
        title: 'Home',
        to: '/',
    },
    {
        title: page.value?.title ?? '',
    },
]))

/*
useSeoMeta({
    ogTitle: page.value.title,
    ogType: 'website',
    ogImage: url + '/icons/logo.svg',
    description: baseline.replace(/_/g, ''),
    ogDescription: baseline.replace(/_/g, ''),
    twitterTitle: page.value.title,
    twitterImage: url + '/icons/logo.svg',
    twitterDescription: baseline.replace(/_/g, '')
}) */
</script>

<template>
    <VContainer class="slide-in mt-16">
        <VRow>
            <VCol class="text-center mt-8">
                <h1>{{ page?.title }}</h1>
            </VCol>
        </VRow>
        <VRow>
            <VCol
                cols="12"
                md="8"
                class="mx-md-auto"
            >
                <VBreadcrumbs
                    v-if="page"
                    class="mb-4"
                    :items="breadcrumb"
                >
                    <template #divider>
                        <VIcon icon="mdi-chevron-right" />
                    </template>
                </VBreadcrumbs>
            </VCol>
        </VRow>
        <VRow>
            <VCol
                v-if="page"
                cols="12"
                md="8"
                class="mx-md-auto"
                v-html="page.body"
            />
        </VRow>
    </VContainer>
</template>

<style scoped lang="scss">
@import '~~/assets/styles/_variables';

:deep(.v-row) {
    p,
    li {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.03125em;
        font-family: 'Space Grotesk', sans-serif;
        margin-bottom: 1.25em;

        &::last-child {
            @include cursor;
        }
    }

    ul {
        padding-left: 24px;
    }

    h2 {
        font-size: 1.8em;
        line-height: 1.1111111;
        margin-bottom: 0.8888889em;
        margin-top: 1.5555556em;
    }

    h3 {
        font-size: 1.5em;
        line-height: 1.3333333;
        margin-bottom: 0.6666667em;
    }
}
</style>
