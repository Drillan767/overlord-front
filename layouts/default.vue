<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue'
import Header from '@/components/layout/Header.vue'
</script>

<template>
    <VLayout>
        <VMain>
            <Header />
            <VContainer class="pa-0" fluid>
                <NuxtPage />
            </VContainer>
            <Footer />
        </VMain>
    </VLayout>
</template>
