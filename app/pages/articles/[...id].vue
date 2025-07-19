<script setup lang="ts">
const route = useRoute()

const { data: article } = await useAsyncData(route.path, () => queryCollection('articles')
    .where('path', '=', route.path)
    .first())

useHead({
    title: () => article.value?.title,
    meta: [
        {
            name: 'description',
            content: article.value?.seo?.description,
        },
    ],
})
</script>

<template>
    <VContainer fluid>
        <VRow class="banner">
            <VCol>
                <h1>
                    {{ article?.title }}
                </h1>
            </VCol>
        </VRow>

        <VRow>
            <VCol>
                <ContentRenderer
                    v-if="article"
                    :value="article"
                />
                <div v-else>
                    <h1>
                        Article not found
                    </h1>
                </div>
            </VCol>
        </VRow>
    </VContainer>
</template>
