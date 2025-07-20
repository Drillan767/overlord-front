<script setup lang="ts">
import About from '@/components/landing/About.vue'
import Hero from '@/components/landing/Hero.vue'
import LatestArticles from '@/components/landing/LatestArticles.vue'
import LatestProjects from '@/components/landing/LatestProjects.vue'

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
            <LatestProjects />
        </VCol>
    </VRow>
</template>
