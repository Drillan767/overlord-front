<template>
    <div id="articles" class="slide-in">

        <Head>
            <Title>Articles</Title>
        </Head>

        <div class="content">
            <h1 class="glitch" data-text="ARTICLES">
                ARTICLES
            </h1>

            <div class="tags">
                <div class="list">
                    <div v-for="(tag, i) in uniqueTags" :key="i" class="tag"
                        :class="{ 'current': tag.title === activeTag }">
                        <!-- <span @click="handleFilter(tag.title)" class="cursor-pointer">
                        {{ tag.title }}
                    </span>
                    <span @click="handleFilter('')" class="cursor-pointer" v-if="tag.title === activeTag">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4 ml-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span> -->
                        <span>{{ tag.title }}</span> <span>/</span>
                    </div>
                </div>
            </div>

            <div class="articleList">
                <article v-for="article in filteredArticles" :key="article.id">
                    <ItemThumbnail :item-type="'article'" :item="article" />
                </article>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import type { Article, Tag, TagsReceived, ArticlesReceived } from '~~/components/types';
import articles from '../queries/articles.gql'
import ItemThumbnail from '~~/components/content/ItemThumbnail.vue';

definePageMeta({
    layout: "blog",
});

const articleList = ref([] as Article[])
const activeTag = ref('')

await useAsyncQuery<ArticlesReceived>(articles)
    .then(({ data }) => {
        if (data.value) {
            articleList.value = data.value.Articles
        }
    })

const uniqueTags = computed<Tag[]>(() => {
    const allTags: Tag[] = []
    articleList.value.forEach((article) => {
        article.tags.forEach((tag) => {
            if (!allTags.some((t) => t.title === tag.Tag_id.title)) {
                allTags.push({
                    title: tag.Tag_id.title,
                })
            }
        })
    })
    return allTags
})

const handleFilter = (filter: string) => activeTag.value = filter

const filteredArticles = computed(() => {
    return activeTag.value !== ''
        ? articleList.value.filter((a) => a.tags.some((t) => t.Tag_id.title === activeTag.value))
        : articleList.value
})

</script>

<style scoped lang="scss">
#articles {
    padding: 6rem var(--landing-padding);

    h1 {
        color: var(--title-color)
    }

    .content {
        max-width: 1200px;
        margin: auto;
    }

    .tags {
        @apply w-1/2 mx-auto my-8 flex flex-col justify-between;
        height: 150px;

        .list {
            @apply flex justify-center gap-x-5;

            // .tag {
            //     border: solid 1px #fff;
            //     display: flex;
            //     padding: 4px;
            //     line-height: 1;
            //     align-items: center;

            //     &:not(.current) {
            //         color: #fff;
            //     }

            //     &.current {
            //         background-color: #fff;
            //         color: #000;
            //     }
            // }
        }
    }

    .articleList {
        max-width: 1200px;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 350px));
        gap: 25px;
        justify-content: center;
        align-items: baseline;

    }
}
</style>
