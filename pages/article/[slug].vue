<script setup lang="ts">
import ProgressBar from '~/components/content/ProgressBar.vue'
import type { Article } from '~/types'

const route = useRoute()

const { data } = await useFetch(`/api/content/articles/${route.params.slug.toString()}`)

console.log({ data })
</script>

<template>
    <p>Bjr</p>
    <MDCRenderer
        v-if="data"
        :data="data.parsedMarkdown.data"
        :body="data.parsedMarkdown.body"
    />
</template>

<style lang="scss">

</style>
