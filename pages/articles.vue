<template>
    <VContainer id="articles" class="slide-in mt-16">
        <VRow class="mt-8">
            <VCol>
                <h1 class="glitch" data-text="ARTICLES">
                    ARTICLES
                </h1>
            </VCol>
        </VRow>
        <VRow>
            <VBreadcrumbs :items="breadcrumb">
                <template #divider>
                    <VIcon icon="mdi-chevron-right" />
                </template>
            </VBreadcrumbs>
        </VRow>
        <VRow>
            <VCol>
                <VCard>
                    <template #text>
                        <VSkeletonLoader
                            :loading="loading"
                            type="chip@3"
                            class="d-flex justify-center"
                        >
                            <VChipGroup
                                v-model="activeTags"
                                :filter="true"
                                :multiple="true"
                                selected-class="bg-purple-darken-2"
                                class="chip-group"
                            >
                                <VChip
                                    v-for="(tag, i) in uniqueTags"
                                    :key="i"
                                    :value="tag.id"
                                    :text="tag.name"
                                    :append-icon="`mdi-numeric-${tag.count > 9 ? '9-plus' : tag.count}-circle`"
                                    variant="flat"
                                />
                            </VChipGroup>
                        </VSkeletonLoader>

                        <VRow
                            v-if="loading"
                            class="mt-8"
                        >
                            <VCol
                                v-for="i in 4"
                                :key="i"
                            >
                                <VSkeletonLoader type="image, text, article" />
                            </VCol>
                        </VRow>

                        <VRow v-else class="mt-8">
                            <VCol
                                v-for="(article, i) in filteredArticles"
                                :key="i"
                                cols="3"
                            >
                                <VCard
                                    :to="`/article/${article.slug}`"
                                    variant="text"
                                >
                                    <VImg
                                        :src="`${config.public.apiUrl}/assets/${article.illustration}?width=300&height=200&fit=cover`"
                                    />
                                    <VCardSubtitle class="mt-4">
                                        {{ date.format(article.date_updated, 'keyboardDateTime24h') }}
                                    </VCardSubtitle>
                                    <VCardTitle>
                                        {{ article.title }}
                                    </VCardTitle>

                                    <VCardActions class="justify-end">
                                        <VChip
                                            v-for="(tag, i) in article.tags"
                                            :key="i"
                                            :text="tag.Tag_id.title"
                                            :color="activeTags.includes(tag.Tag_id.id) ? 'purple-darken-2': undefined"
                                            variant="flat"
                                            density="compact"
                                        />
                                    </VCardActions>
                                </VCard>
                            </VCol>
                        </VRow>
                    </template>
                </VCard>
            </VCol>
        </VRow>
    </VContainer>
    <div >
        
        

        <!-- <Head>
            <Title>Articles</Title>
        </Head>

        <div class="content">
            <h1 class="glitch" data-text="ARTICLES">
                ARTICLES
            </h1>

            <div class="tagList">
                <template v-for="(tag, i) in uniqueTags" :key="i" class="tag">
                    <span v-if="i !== 0" class="mx-2 separator">/</span>
                    <span :class="{ 'current': tag.title === activeTag }" class="cursor-pointer"
                        @click="handleFilter(tag.title)">
                        {{ tag.title }} ({{ tag.nbArticles }})
                    </span>
                </template>
            </div>

            <div class="articlesList mx-auto">
                <SingleArticle v-for="(article, i) in filteredArticles" :key="i" :activeTag="activeTag"
                    :article="article" @change-tag="handleFilter" />
            </div>

            <p v-if="filteredArticles.length === 0" class="text-center text-white text-xl">
                Nothing to see here for now...
            </p>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types'
import { useDate } from 'vuetify'

interface TagFilter {
    id: number
    name: string
    count: number
}

useHead({
    title: 'Articles',
})


definePageMeta({
    layout: 'blog',
})

const breadcrumb = [
    {
        title: 'Home',
        to: '/'
    },
    {
        title: 'Articles',
    }
]

const { getItems  } = useDirectusItems()
const config = useRuntimeConfig()
const date = useDate()

const loading = ref(false)
const activeTags = ref<number[]>([])
const allArticles = ref<Article[]>([])

const uniqueTags = computed<TagFilter[]>(() => allArticles.value.reduce((acc, article) => {
    article.tags.forEach((tag) => {
        const tagName = tag.Tag_id.title
        const tagIndex = acc.findIndex((a) => a.name === tagName)

        if (tagIndex > -1) {
            acc[tagIndex].count++
        } else {
            acc.push({
                name: tagName,
                id: tag.Tag_id.id,
                count: 1,
            })
        }
    })
    return acc
}, [] as TagFilter[]))

const filteredArticles = computed(() => {
    if (activeTags.value.length > 0) {
        return allArticles.value.filter((a) => a.tags.some((t) => activeTags.value.includes(t.Tag_id.id)))
    }

    return allArticles.value
})

const fetchArticles = async () => {
    loading.value = true

    try {
        allArticles.value = await getItems<Article>({
            collection: 'Articles',
            params: {
                filter: {
                    status: 'Published'
                },
                fields: ['title, tags, illustration, slug', 'date_updated', 'tags.Tag_id.*']
            }
        })

    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

onMounted(() => fetchArticles())

/* 
import { useSeoMeta } from '@unhead/vue'
import type { Article, TagFilter, ArticlesReceived } from '~~/types';
import SingleArticle from '~~/components/content/SingleArticle.vue'

definePageMeta({
    layout: "blog",
})

const { t } = useI18n()
const { url } = useRuntimeConfig()
const homepage = useHomepage()
const { baseline } = homepage.value
const fullLocale = useFullLocale()
const articleList = ref([] as Article[])
const activeTag = ref('')

const handleFilter = (filter: string) => {
    if (activeTag.value === '') {
        activeTag.value = filter
    } else if (activeTag.value === filter) {
        activeTag.value = ''
    } else {
        activeTag.value = filter
    }
}

const filteredArticles = computed(() => {
    return activeTag.value !== ''
        ? articleList.value.filter((a) => a.tags.some((t) => t.Tag_id.title === activeTag.value))
        : articleList.value
}) */

</script>

<style scoped lang="scss">
.v-skeleton-loader .chip-group :deep(.v-slide-group__content) {
    justify-content: center;
}

.c-title {
    font-size: clamp(1.5rem,1.3239rem + .5634vw,2rem);
}
</style>