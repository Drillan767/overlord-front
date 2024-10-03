<script setup lang="ts">
import ProgressBar from '~/components/content/ProgressBar.vue'
import type { Article } from '~/types'

const route = useRoute()

const { data } = await useFetch(`/api/content/articles/${route.params.slug.toString()}`)

console.log({ data })
</script>

<template>
    <p>Bjr</p>
</template>

<style lang="scss">

</style>
