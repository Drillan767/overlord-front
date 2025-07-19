<script setup lang="ts">
import Hero from '@/components/landing/Hero.vue'
import About from '@/components/landing/About.vue'
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
