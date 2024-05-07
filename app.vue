<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

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
