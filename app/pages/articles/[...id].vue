<script setup lang="ts">
const route = useRoute()

const { data: article } = await useAsyncData('article', () => queryCollection('articles')
    .where('path', '=', route.path)
    .first())
</script>

<template>
    <ContentRenderer
        v-if="article"
        :value="article"
    />
    <div v-else>
        <h1>
            Article not found
        </h1>
    </div>
</template>