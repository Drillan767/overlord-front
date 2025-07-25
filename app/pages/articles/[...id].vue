<script setup lang="ts">
import { useGoTo } from 'vuetify'
import easyReading from '@/utils/easyReading'

const goTo = useGoTo()
const route = useRoute()
const dayjs = useDayjs()
const config = useRuntimeConfig()

const { data: article } = await useAsyncData(route.path, () => queryCollection('articles')
    .where('path', '=', route.path)
    .first())

if (!article.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Article not found',
    })
}

const readingTime = computed(() => {
    if (!article.value?.meta.readingTime) {
        return '0 min read'
    }

    // @ts-expect-error text is not typed
    return article.value?.meta.readingTime.text
})

const toc = computed(() => {
    return article.value?.body.toc?.links.map((link) => {
        return {
            title: link.text,
            href: `#${link.id}`,
        }
    })
})

const originalContent = ref<string>('')
const isEasyReading = ref(false)

function toggleEasyReading() {
    const articleElement = document.querySelector('.article-content')
    if (!articleElement)
        return

    if (!isEasyReading.value) {
        // Store original content and switch to easy reading
        originalContent.value = articleElement.innerHTML
        articleElement.innerHTML = easyReading(originalContent.value)
        isEasyReading.value = true
    }
    else {
        // Restore original content
        articleElement.innerHTML = originalContent.value
        isEasyReading.value = false
    }
}
</script>

<template>
    <Head v-if="article">
        <Title>{{ article.title }}</Title>
        <Meta name="description" :content="article.seo?.description" />
        <Meta name="keywords" :content="article.tags.join(', ')" />
        <Meta property="og:type" content="article" />
        <Meta property="og:title" :content="article.title" />
        <Meta property="og:description" :content="article.seo?.description" />
        <Meta property="og:image" :content="article?.image" />
        <Meta property="og:url" :content="`${config.public.url}${route.path}`" />
        <Meta property="article:published_time" :content="article.date" />
        <Meta property="article:author" content="Joseph Levarato" />
        <Meta property="article:section" :content="article.tags[0]" />
        <Meta property="article:tag" :content="article.tags.join(', ')" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" :content="article.title" />
        <Meta name="twitter:description" :content="article.seo?.description" />
        <Meta name="twitter:image" :content="article?.image" />
        <Meta name="twitter:url" :content="`${config.public.url}${route.path}`" />
        <Meta name="twitter:site" content="@josephlevarato" />
        <Meta name="twitter:creator" content="@josephlevarato" />
        <Meta name="twitter:image:alt" :content="article.title" />
    </Head>
    <div class="banner">
        <VImg
            :src="article?.image"
            cover
        />

        <div class="gradient" />

        <div class="banner-details">
            <VBtn
                to="/articles"
                variant="text"
                class="mb-2"
                prepend-icon="mdi-arrow-left"
            >
                Back to articles
            </VBtn>
            <h1>
                {{ article?.title }}
            </h1>

            <div class="banner-details-meta">
                <VChip
                    :text="dayjs(article?.date).format('DD MMMM YYYY')"
                    variant="text"
                    prepend-icon="mdi-calendar"
                    tag="time"
                />

                <VChip
                    :text="readingTime"
                    variant="text"
                    prepend-icon="mdi-clock"
                />

                <VHover
                    v-for="tag in article?.tags"
                    :key="tag"
                    v-slot="{ isHovering, props: hover }"
                >
                    <VChip
                        v-bind="hover"
                        :text="tag"
                        :to="`/articles?tag=${tag}`"
                        :color="isHovering ? 'primary' : 'default'"
                        variant="text"
                        class="me-2"
                        prepend-icon="mdi-tag"
                    />
                </VHover>
            </div>
        </div>
    </div>
    <VContainer>
        <VRow justify="center">
            <VCol cols="12" md="8">
                <ContentRenderer
                    :value="article!"
                    class="article-content"
                    tag="article"
                />
            </VCol>
        </VRow>
        <VMenu location="top start">
            <template #activator="{ props: menu }">
                <VFab
                    v-bind="menu"
                    icon="mdi-menu"
                    color="primary"
                    size="small"
                    location="bottom right"
                    class="scroll-to-top-fab"
                />
            </template>
            <VList>
                <VListSubheader title="Table of contents" />
                <VListItem
                    v-for="item in toc"
                    :key="item.title"
                    :title="item.title"
                    @click="goTo(item.href)"
                />
                <VDivider />
                <VListItem
                    :title="isEasyReading ? 'Disable easy reading' : 'Enable easy reading'"
                    @click="toggleEasyReading"
                />
            </VList>
        </VMenu>
    </VContainer>
</template>

<style scoped>
.banner {
    height: 40vh;
    position: relative;
}

.banner-details {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 0 1.5rem 2rem 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
}

.gradient {
    inset: 0;
    position: absolute;
    z-index: 1;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}

@media (min-width: 768px) {
    .banner {
        height: 50vh;
    }
}

.scroll-to-top-fab {
    position: fixed !important;
    bottom: 2rem !important;
    right: 2rem !important;
    z-index: 1000;
}
</style>
