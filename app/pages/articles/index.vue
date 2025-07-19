<script setup lang="ts">
import Preview from '@/components/content/Preview.vue'

useHead({
    title: 'Articles',
})

const route = useRoute()

const subtitle = 'A collection of my thoughts and experiences.'

const { data: articles } = await useAsyncData('articles', () => queryCollection('articles')
    .order('date', 'DESC')
    .select('id', 'title', 'description', 'image', 'date', 'tags', 'path')
    .all())

const activeTag = ref<string>()

const tagsList = computed<string[]>(() => {
    if (!articles.value)
        return [] as string[]
    return articles.value.reduce<string[]>((acc, article) => {
        article.tags.forEach((tag) => {
            if (!acc.includes(tag)) {
                acc.push(tag)
            }
        })
        return acc
    }, [])
})

const filteredArticles = computed(() => {
    if (!articles.value)
        return []

    return articles.value.filter(article => activeTag.value ? article.tags.includes(activeTag.value) : true)
})

onBeforeMount(() => {
    activeTag.value = route.query.tag as string
})
</script>

<template>
    <VContainer>
        <VRow>
            <VCol>
                <h1
                    class="text-h2 text-center text-md-start layers glitch"
                    data-text="Articles"
                >
                    Articles
                </h1>
                <p
                    class="text-body-1 text-center text-md-start"
                >
                    {{ subtitle }}
                </p>
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <VCard
                    color="primary"
                    variant="tonal"
                >
                    <template #text>
                        <div class="d-flex">
                            <VChipGroup
                                v-model="activeTag"
                            >
                                <VChip
                                    v-for="tag in tagsList"
                                    :key="tag"
                                    :value="tag"
                                    :text="tag"
                                    :variant="activeTag === tag ? 'elevated' : 'outlined'"
                                    color="primary"
                                    rounded="lg"
                                    class="mx-1 my-1"
                                />
                            </VChipGroup>
                            <VBtn
                                v-if="activeTag"
                                icon="mdi-close"
                                variant="text"
                                color="primary"
                                class="ml-auto"
                                @click="activeTag = undefined"
                            />
                        </div>
                    </template>
                </VCard>
            </VCol>
        </VRow>
        <VRow>
            <VCol
                v-for="article in filteredArticles"
                :key="article.id"
            >
                <Preview
                    :content="article"
                />
            </VCol>
        </VRow>
    </VContainer>
</template>
