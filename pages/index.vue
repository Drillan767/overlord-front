<script setup lang="ts">
import Hero from '@/components/landing/Hero.vue'
import About from '@/components/landing/About.vue'
import LatestArticles from '@/components/landing/LatestArticles.vue'

useHead({
    title: 'Joseph Levarato',
    titleTemplate: null,
})
</script>

<template>
    <VRow>
        <VCol>
            <Hero />
            <About />
            <LatestArticles />
        </VCol>
    </VRow>
</template>
