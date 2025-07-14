<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
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