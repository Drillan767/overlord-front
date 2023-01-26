<template>
    <div id="articles" class="slide-in">
        <Head>
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
                <SingleArticle
                    v-for="(article, i) in filteredArticles"
                    :key="i"
                    :activeTag="activeTag"
                    :article="article"
                    @change-tag="handleFilter"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import type { Article, TagFilter, ArticlesReceived } from '~~/types';
import SingleArticle from '~~/components/content/SingleArticle.vue'
import articlesQuery from '~~/queries/articles.gql'

definePageMeta({
    layout: "blog",
})

const { url } = useRuntimeConfig()
const homepage = useHomepage()
const { baseline } = homepage.value
const articleList = ref([] as Article[])
const activeTag = ref('')

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

await useAsyncQuery<ArticlesReceived>(articlesQuery)
    .then(({ data }) => {
        if (data.value) {
            articleList.value = data.value.Articles
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
})

</script>