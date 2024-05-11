<template>
    <VContainer fluid id="article" class="slide-in article">
        <VRow>
            <VCol>
                <VCard
                    :image="illustration"
                    height="630"
                    rounded="0"
                    class="d-flex align-end banner"
                >
                    <VContainer>
                        <VRow justify="center">
                            <VCol cols="12" md="6">
                                <VCardTitle
                                    v-if="article"
                                    class="text-center c-title"
                                >
                                    {{ article.title }}
                                </VCardTitle>
                            </VCol>
                        </VRow>
                        <VRow justify="center">
                            <VCol cols="3">
                                <VIcon
                                    icon="mdi-calendar-blank"
                                    class="mr-2"
                                />
                                <span v-if="article">
                                    Last commit — {{ dayjs(article.date_updated).format('DD/MM/YYYY HH:mm') }}
                                </span>
                            </VCol>
                            <VCol
                                cols="3"
                                class="text-right"
                            >
                                <VIcon
                                    class="mr-2"
                                    icon="mdi-clock-time-eight-outline"
                                />
                                <span>
                                    {{ minuteRead }} minutes read
                                </span>
                            </VCol>
                        </VRow>
                        <VCol class="text-center">
                            <VChip
                                v-for="(tag, i) in article?.tags ?? []"
                                :key="i"
                                :text="tag.Tag_id.title"
                                class="mx-1"
                                variant="flat"
                            />
                        </VCol>
                    </VContainer>
                </VCard>
            </VCol>
        </VRow>

        <ProgressBar />

        <VRow no-gutters>
            <VCol>
                <VCard>
                    <VCol
                        cols="12"
                        md="10"
                        class="mx-md-auto"
                    >
                        <VBreadcrumbs class="mb-4" :items="breadcrumb">
                            <template #divider>
                                <VIcon icon="mdi-chevron-right" />
                            </template>
                        </VBreadcrumbs>
                        <VCardText v-if="article" v-html="article.body" />
                    </VCol>
                </VCard>
            </VCol>
        </VRow>
    </VContainer>
    <!-- <div class="article">
        <Head>
            <Title>{{ article.title }}</Title>
            <Meta property="article:author" content="Joseph Levarato" />
            <Meta property="article:published_time" :content="article.date_created" />
            <Meta property="article:modified_time" v-if="article.date_updated" :content="article.date_updated" />
            <Link rel="canonical" :href="`${config.url}/article/${article.slug}`" />
        </Head>
    </div> -->
</template>

<script setup lang="ts">
import type { Article } from '~/types'
import hljs from 'highlight.js'
import ProgressBar from '~/components/content/ProgressBar.vue'
import 'highlight.js/styles/tokyo-night-dark.css'

definePageMeta({
    layout: 'blog',
})

const { getItems  } = useDirectusItems()
const config = useRuntimeConfig()
const route = useRoute()
const dayjs = useDayjs()

const loading = ref(false)
const article = ref<Article>()

useHead({
    title: () => article.value?.title ?? '',
})

const breadcrumb = computed(() => ([
    {
        title: 'Home',
        to: '/'
    },
    {
        title: 'Articles',
        to: '/articles',
    },
    {
        title: article.value?.title ?? ''
    }
]))

const minuteRead = computed(() => {
    if (!article.value) return 0
    const wpm = 200
    const stripped = article.value.body.replace(/(<([^>]+)>)/ig, '')
    const nbWords = stripped.trim().split(/\s+/).length
    return Math.ceil(nbWords / wpm)
})

const illustration = computed(() => {
    if (!article.value) return undefined
    return `${config.public.apiUrl}/assets/${article.value.illustration}?width=1200&height=627&fit=cover`
})

const fetchArticle = async() => {
    loading.value = true

    try {
        const data = await getItems<Article>({
            collection: 'Articles',
            params: {
                limit: 1,
                filter: {
                    slug: route.params.slug,
                },
                fields: ['*', 'tags.Tag_id.*']
            }
        })
        article.value = data[0]
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

onMounted(async() => {
    await fetchArticle()

    document.querySelectorAll<HTMLElement>('pre').forEach((block) => hljs.highlightBlock(block))
})


/* import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
    ogTitle: article.value.title,
    ogType: 'article',
    ogImage: getIllustration(),
    description: article.value.description,
    ogDescription: article.value.description,
    twitterTitle: article.value.title,
    twitterImage: getIllustration(),
    twitterDescription: article.value.description,
}) */

</script>

<style scoped lang="scss">
@import '~~/assets/styles/_variables';

.article {
    position: relative;
    margin-top: 108px;
    padding: 0;
}

.banner :deep(.v-responsive__sizer) {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}

.c-title {
    font-size: clamp(2.5rem,2.1479rem + 1.1268vw,3.5rem);
    line-height: 1 !important;
}

:deep(.v-card-text) {
    p {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.03125em;
        font-family: "Space Grotesk", sans-serif;
        margin-bottom: 1.25em;

        &::last-child {
            @include cursor;
        }

        /* &:last-of-type::after {
            @include cursor;
        } */

        &:has(img) {
            text-align: center;
        }

        img {
            max-width: 100%;
        }
    }
    
    pre {
        overflow: scroll;
    }
}
</style>
