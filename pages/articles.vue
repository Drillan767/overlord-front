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
                <article
                    v-for="(article, index) in filteredArticles"
                    :key="article.id"
                    ref="articleRefs"
                    :ref-key="index"
                    @mouseenter="handleClass(index, 'add')"
                    @mouseleave="handleClass(index, 'remove')"
                    >
                    <a :href="`/article/${article.slug}`" class="w-1/5">
                        <div class="glitch-thumb">
                            <div class="glitch-img" v-for="i in 5" :key="i"
                                :style="`background-image: url('${getThumb(article.illustration)}')`" />
                        </div>
                    </a>

                    <div class="details w-4/5">
                        <h2 :data-text="article.title">
                            <a :href="`/article/${article.slug}`">
                                {{ article.title }}
                            </a>
                        </h2>
                        <p class="mt-4">
                            {{ article.description }}
                        </p>

                        <p class="time mt-4">
                            {{ lastCommit(article.date_created, article.date_updated) }}
                        </p>
                        <p class="tags mt-3">
                            <template v-for="(tag, i) in article.tags" :key="i">
                                <span v-if="i !== 0" class="mx-2 separator">/</span>
                                <span
                                    class="cursor-pointer"
                                    @click="handleFilter(tag.Tag_id.title)"
                                    :class="{ 'current': tag.Tag_id.title === activeTag }" 
                                >
                                    {{ tag.Tag_id.title }}
                                </span>
                            </template>
                        </p>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Article, TagFilter, ArticlesReceived } from '~~/types';
import articlesQuery from '../queries/articles.gql'

definePageMeta({
    layout: "blog",
});

const config = useRuntimeConfig()
const articleRefs = ref<HTMLDivElement[]>([])
const articleList = ref([] as Article[])
const activeTag = ref('')

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

watch(
    filteredArticles.value,
    () => articleRefs.value = []
)

const lastCommit = (created: string, updated: string | null) => {
    const date = updated ?? created
    return new Intl.DateTimeFormat('fr-FR').format(new Date(date))
}

const getThumb = (illustration: Article['illustration']) => {
    return `${config.apiUrl}/assets/${illustration.id}?width=300&height=200&fit=cover`
}

const handleClass = (index: number, action: 'add'|'remove') => {
    const hoveredArticle = articleRefs.value[index]
    hoveredArticle.classList[action]('animate')
    hoveredArticle.querySelector('h2')?.classList[action]('glitch')
}

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

    .tagList {
        @apply w-1/2 mx-auto my-8 flex justify-center;
    }

    .tagList,
    .tags {
        span {
            @apply transition-colors;
            color: var(--font-color);

            &.current,
            &:not(.separator):hover {
                color: var(--purple);
            }
        }
    }

    .articlesList {
        max-width: calc(100% - 40px);
        width: 800px;

        article {
            @apply transition-colors flex gap-x-5 mb-10;
            color: var(--font-color);

            h2 {
                line-height: 1;
                font-size: clamp(1.25rem, 0.6338rem + 1.9718vw, 3rem);
            }

            .glitch-thumb {
                position: relative;
                height: 200px;
                overflow: hidden;
                margin: 0 auto;

                @media (min-width: 768px) {
                    // width: 350px;
                }

                .glitch-img {
                    position: absolute;
                    top: calc(-1 * var(--gap-vertical));
                    left: calc(-1 * var(--gap-horizontal));
                    width: calc(100% + var(--gap-horizontal) * 2);
                    height: calc(100% + var(--gap-vertical) * 2);
                    background-size: cover;
                    background-color: transparent;
                    background-repeat: no-repeat;
                    background-position: 50% 0;
                    background-blend-mode: initial;

                    &:nth-child(5) {
                        background-color: #af4949;
                        background-blend-mode: overlay;
                    }

                    &:nth-child(n+2) {
                        opacity: 0;
                    }
                }
            }

            .details {
                .tags {}
            }

            &.animate {
                .glitch-thumb {
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 200px;
                        z-index: 1;
                        background: repeating-linear-gradient(to bottom, transparent 0%, rgba(0, 147, 255, 0.47) 1.75%, transparent 1%);
                    }

                    .glitch-img {
                        &:nth-child(n+2) {
                            opacity: 1;
                        }

                        &:nth-child(2) {
                            transform: translate3d(10px, 0, 0);
                            animation: glitch-anim-1 4s infinite linear alternate;
                        }

                        &:nth-child(3) {
                            transform: translate3d(calc(-1 * 10px), 0, 0);
                            animation: glitch-anim-2 4s infinite linear alternate;
                        }

                        &:nth-child(4) {
                            transform: translate3d(0, calc(-1 * 5px), 0) scale3d(-1, -1, 1);
                            animation: glitch-anim-3 4s infinite linear alternate;
                        }

                        // Hover flash animation on last image.
                        &:nth-child(5) {
                            animation: glitch-anim-flash 0.5s steps(1, end) infinite;
                        }
                    }
                }

            }
        }
    }

    /*

        .glitch-thumb {
            cursor: pointer;

            .glitch-img {
                height: 200px;
                &:nth-child(n+2) {
                    opacity: 1;
                }                  
    
                &:nth-child(2) {
                    transform: translate3d(10px,0,0);
                    animation: glitch-anim-1 4s infinite linear alternate;
                }
    
                &:nth-child(3) {
                    transform: translate3d(calc(-1 * 10px),0,0);
                    animation: glitch-anim-2 4s infinite linear alternate;
                }
    
                &:nth-child(4) {
                    transform: translate3d(0, calc(-1 * 5px), 0) scale3d(-1,-1,1);
                    animation: glitch-anim-3 4s infinite linear alternate;
                }
    
                // Hover flash animation on last image.
                &:nth-child(5) {
                    animation: glitch-anim-flash 0.5s steps(1, end) infinite;
                }
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
    */
}
</style>
