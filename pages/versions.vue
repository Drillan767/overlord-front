<script setup lang="ts">
import type { Version } from '~~/types'

useHead({
    title: 'Versions',
})

const breadcrumb = [
    {
        title: 'Home',
        to: '/',
    },
    {
        title: 'Versions',
    },
]

const { getItems } = useDirectusItems()

const versions = ref<Version[]>([])
const loading = ref(false)

async function fetchReleases() {
    loading.value = true

    try {
        versions.value = await getItems<Version>({
            collection: 'Releases',
            params: {
                fields: ['id', 'version', 'description'],
                sort: '-id',
            },
        })
    }
    catch (e) {
        console.error(e)
    }
    finally {
        loading.value = false
    }
}

onMounted(() => fetchReleases())

/*

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
 */
</script>

<template>
    <VContainer id="versions" class="slide-in my-16">
        <VRow justify="center" class="mt-16">
            <header>
                <h1
                    class="glitch"
                    data-text="Versions"
                >
                    Versions
                </h1>
            </header>
        </VRow>
        <VRow>
            <VBreadcrumbs :items="breadcrumb">
                <template #divider>
                    <VIcon icon="mdi-chevron-right" />
                </template>
            </VBreadcrumbs>
        </VRow>
        <VSkeletonLoader
            v-if="loading"
            type="heading, paragraph, heading, paragraph"
        />

        <VRow
            v-for="(release, i) in versions"
            v-else
            :key="i"
        >
            <VCol>
                <VCard>
                    <template #text>
                        <VContainer>
                            <VRow>
                                <VCol>
                                    <h2 class="text-center">
                                        Version {{ release.version }}
                                    </h2>
                                </VCol>
                            </VRow>
                            <VRow>
                                <VCol v-html="release.description" />
                            </VRow>
                        </VContainer>
                    </template>
                </VCard>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped lang="scss">
#versions {
    h1 {
        font-size: 6rem;
        line-height: 1;
    }

    :deep(.v-col) {
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

        ul {
            margin-bottom: 1.2em;
            margin-top: 1.2em;
            padding-left: 1.6em;
            font-size: 1.25rem;

            li {
                margin-bottom: 0.6em;
                margin-top: 0.6em;
            }
        }
    }
    /*
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
    */
}
</style>
