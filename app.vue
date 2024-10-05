<script setup lang="ts">
import type { Homepage } from './types'
import { marked } from 'marked'
import Footer from './components/layout/Footer.vue'
import Navbar from './components/layout/Navbar.vue'

const { getSingletonItem } = useDirectusItems()
const homepage = await getSingletonItem<Homepage>({
    collection: 'homepage',
})

const markedDescription = marked.parse(homepage.description)

provide('homepage', {
    ...homepage,
    description: markedDescription,
})
</script>

<template>
    <VApp>
        <Navbar />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Footer />
    </VApp>
</template>
