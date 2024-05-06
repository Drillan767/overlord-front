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
            <VCol>
                <VChipGroup
                    v-model="activeTags"
                    :filter="true"
                    :multiple="true"
                    class="text-center"
                >
                    <template #default="{ isSelected }">
                        <VChip
                            v-for="(tag, i) in uniqueTags"
                            :key="i"
                            :text="tag.name"
                            :variant="isSelected(i) ? 'outlined': 'plain'"
                            :append-icon="`mdi-numeric-${tag.count > 9 ? '9-plus' : tag.count}-circle`"
                        />
                    </template>
                </VChipGroup>
            </VCol>
        </VRow>
        <VRow
            v-for="(article, i) in filteredArticles"
            :key="i"
        >
            <VCol>
                <VCard>
                    
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

interface TagFilter {
    name: string
    count: number
}

useHead({
    title: 'Articles',
})


definePageMeta({
    layout: 'blog',
})

const { getItems  } = useDirectusItems()

const loading = ref(false)
const activeTags = ref([])
const allArticles = ref<Article[]>([])
const filteredArticles = ref<Article[]>([])

const uniqueTags = computed<TagFilter[]>(() => {
    const allTags = allArticles.value.reduce((acc, article) => {
        article.tags.forEach((tag) => {
            const tagName = tag.Tag_id.title
            const tagIndex = acc.findIndex((a) => a.name === tagName)

            if (tagIndex > -1) {
                acc[tagIndex].count++
            } else {
                acc.push({
                    name: tagName,
                    count: 1,
                })
            }
        })
        return acc
    }, [] as TagFilter[])

    return allTags
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
                fields: ['title, tags, illustration, slug', 'date_updated', 'tags.Tag_id.title']
            }
        })

        // allArticles.value = data
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

const query = {
    featured: false,
    locale: fullLocale.value,
    limit: 3,
    filters: {
        status: {_eq: 'published'},
        featured: {_eq: true}
    }
}

useSeoMeta({
    ogTitle: 'Articles',
    ogType: 'website',
    ogImage: url + '/icons/logo.svg',
    description: baseline.replace(/_/g, ''),
    ogDescription: baseline.replace(/_/g, ''),
    twitterTitle: 'Articles',
    twitterImage: url + '/icons/logo.svg',
    twitterDescription: baseline.replace(/_/g, '')
})

await useAsyncQuery<ArticlesReceived>(articlesQuery, query)
    .then(({ data }) => {
        if (data.value) {
            articleList.value = data.value.Articles_translations.map((article) => {
                const { title, slug, description, body } = article
                const { Articles_id: { date_created, date_updated, illustration, tags } } = article

                return {
                    title,
                    slug,
                    tags,
                    body,
                    description,
                    illustration,
                    date_created,
                    date_updated,
                }
            })
        }
    })

const uniqueTags = computed<TagFilter[]>(() => {
    const allTags: TagFilter[] = []
    articleList.value.forEach((article) => {
        article.tags.forEach((tag) => {
            const { Tag_id: { title } } = tag
            const nbArticles = articleList.value.filter((a) => {
                return a.tags.some((t) => t.Tag_id.title === title)
            }).length

            if (!allTags.some((at) => at.title === title)) {
                allTags.push({ title, nbArticles })
            }
        })
    })

    return allTags
})

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