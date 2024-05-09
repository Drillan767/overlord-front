<template>
    <VContainer fluid id="article" class="slide-in my-16 pa-0">
        <VRow>
            <VCol>
                <VCard
                    :image="`${config.public.apiUrl}/assets/${article?.illustration}?width=1200&height=627&fit=cover`"
                    height="630"
                    rounded="0"
                    class="d-flex align-end banner"
                >
                    <VContainer>
                        <VRow justify="center">
                            <VCol cols="12" md="6">
                                <VCardTitle class="text-center c-title">
                                    {{ article?.title }}
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
                                    X minutes read
                                </span>
                            </VCol>
                        </VRow>
                        <VCol class="text-center">
                            <VChip
                                v-for="(tag, i) in article?.tags ?? []"
                                :key="i"
                                :text="tag.Tag_id.title"
                                variant="flat"

                            />
                        </VCol>
                    </VContainer>
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

        <main>
            <header>
                <div class="glitch-thumb">
                    <div class="glitch-img" v-for="i in 5" :key="i"
                        :style="`background-image: url('${getIllustration()}')`" />
                </div>

                <h1>{{ article.title }}</h1>

                <div class="meta">
                    <p class="date">
                        <DateSVG />
                        <span>
                            Last commit — {{ lastCommit }}
                        </span>
                       
                    </p>
                    <p class="read_time">
                        <TimeSVG />
                        <span>
                            {{ minuteRead }}mn read
                        </span>
                    </p>
                    <p class="tags">
                        <TagSVG />
                        <span>{{ tagList }}</span>
                    </p>

                </div>
            </header>
            

            <article class="px-2">
                <div v-html="articleBody" class="prose lg:prose-xl" />
            </article>
        </main>
    </div> -->
</template>

<script setup lang="ts">
import type { Article } from '~/types'

definePageMeta({
    layout: 'blog',
})

const { getItems  } = useDirectusItems()
const config = useRuntimeConfig()
const route = useRoute()
const dayjs = useDayjs()

const loading = ref(false)
const minuteRead = ref(0)
const article = ref<Article>()

useHead({
    title: () => article.value?.title ?? '',
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

onMounted(() => fetchArticle())


/* import { useSeoMeta } from '@unhead/vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'
import { Article, ArticlesReceived } from '~~/types'
import { getReadingTime, scrollSpy } from '~~/utils/blog'
import articleQuery from '../../queries/article.gql'
import TagSVG from '~~/components/svg/Tag.vue'
import TimeSVG from '~~/components/svg/Time.vue'
import DateSVG from '~~/components/svg/Date.vue'

definePageMeta({
    layout: "blog",
})

const route = useRoute()
const config = useRuntimeConfig()
const article = ref({} as Article)
const barWidth = ref(0)
const readPercentage = ref(0)
const lastCommit = ref('')
const minuteRead = ref(0)
const tagList = ref('')
const brEnabled = ref(false)

await useAsyncQuery<ArticlesReceived>(articleQuery, {
        slug: route.params.slug.toString()
    })
    .then(({ data }) => {
        if (!data.value || !data.value.Articles_translations.length) {
            throw createError({
                statusCode: 404,
                fatal: true,
            })
        }

        const rawArticle = data.value.Articles_translations[0]
        const { title, slug, description, body } = rawArticle
        const { Articles_id: { date_created, date_updated, illustration, tags } } = rawArticle

        article.value = {
            title,
            slug,
            description,
            body,
            date_created,
            date_updated,
            illustration,
            tags
        }

        tagList.value = article.value.tags.map((t) => t.Tag_id.title).join(' • ')
        const field = article.value.date_updated ?? article.value.date_created
        lastCommit.value = new Intl.DateTimeFormat('fr-FR').format(new Date(field))
        minuteRead.value = getReadingTime(article.value.body)
    })

const displayPercentage = computed(() => {
    let result = 'Progress: ['

    if (readPercentage.value && readPercentage.value >= 0) {
        const spaces = 3 - readPercentage.value.toString().length
        result += ' '.repeat(spaces)
        result += readPercentage.value
    }
    else {
        result += '  0'
    }

    result += '%]'

    return result
})



const articleBody = computed(() => {
    return brEnabled
        ? article.value.body
        : toBionicReading(article.value.body)
})

const getIllustration = (width = 1200, height = 627) => {
    return `${config.apiUrl}/assets/${article.value.illustration.id}?width=${width}&height=${height}&fit=cover`
}

onMounted(() => {
    setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.prose pre')
            .forEach((block) => hljs.highlightBlock(block))
    }, 1000)

    const bar = document.querySelector<HTMLElement>('.progress .bar')

    if (bar) {
        barWidth.value = bar.clientWidth
    }

    const headers = document.querySelectorAll(bodyHeaders())

    document.addEventListener('scroll', () => {
        readPercentage.value = Math.floor(getScrollPercent())
        scrollSpy(headers)
    })
})

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

.banner :deep(.v-responsive__sizer) {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}

.c-title {
    font-size: clamp(2.5rem,2.1479rem + 1.1268vw,3.5rem);
    line-height: 1 !important;
}
/* main {
    position: relative;

    svg {
        display: inline;
        margin-right: 5px;
    }

    header {
        height: 80vh;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 1;
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
        }

        .glitch-thumb {
            position: absolute;
            inset: 0;
            overflow: hidden;

            .glitch-img {
                height: auto;
                position: absolute;
                inset: 0;
                background-size: cover;
                background-color: transparent;
                background-repeat: no-repeat;
                background-position: 50% 0;
                background-blend-mode: initial;

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

                &:nth-child(n+2) {
                    opacity: 0;
                }
            }
        }

        h1,
        .meta {
            position: absolute;
            width: 50%;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 1;
            color: white;

            @media (max-width: 768px) {
                width: 90%;
            }
        }

        h1 {
            line-height: 1;
            text-align: center;
            bottom: 65px;
            
            @media (max-width: 768px) {
                bottom: 50%;
            }
        }

        .meta {
            bottom: 5px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 0px 0px;
            grid-template-areas:
                "date date"
                "read-time tags";

            @media (max-width: 768px) {
                bottom: 40%;
            }

            .date {
                grid-area: date;
            }

            .tags {
                text-align: right;
                grid-area: tags;
            }

            .read-time {
                grid-area: read-time;
            }
        }

        .toc {
            padding: 1em 1.2em;
            margin: 0 auto;

            &:before {
                content: "Table of Contents";
                color: var(--font-color);
                font-weight: bold;
            }

            a {
                font-size: .85em;
                margin-left: 2px;
            }

            >ul {
                @apply m-0 p-0;

                ul {
                    @apply m-0 p-0;
                    margin-left: 1em;
                }

                li {
                    margin-left: 0.35em;
                    border-left: solid 1px #fff;

                    &:not(.active) {
                        color: var(--font-color);
                    }

                    &.active {
                        color: var(--purple);
                    }

                    &:last-child {
                        border-left: none;

                        &:before {
                            border-left: solid 1px #fff;

                        }
                    }

                    &:before {
                        width: 0.9em;
                        height: 0.85em;
                        margin-right: 0.1em;
                        vertical-align: top;
                        border-bottom: solid 1px #fff;
                        content: "";
                        display: inline-block;
                    }
                }
            }
        }

        .content {
            position: relative;
            z-index: 2;
            height: 100%;
            padding: 30px;

            h1 {
                color: var(--title-color);
                line-height: 1;
            }
        }
    }

    .progress {
        background-color: var(--bg-color);
        position: sticky;
        top: 0;
        padding: 10px 0;
        margin: 0 10px;
        font-family: 'Jetbrains Mono', monospace;
        display: flex;
        gap: 10px;

        .global {
            background-color: green;
            flex: 0 0 auto;
        }

        .bar {
            color: var(--font-color);
            flex: 1;
            display: inline-block;
        }
    }

    article {
        margin-top: 30px;
        overflow-y: hidden;

        .prose {
            @apply prose-a:text-violet-600 prose-img:mx-auto mx-auto dark:prose-invert;
        }
    }
} */
</style>