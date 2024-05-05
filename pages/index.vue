<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import Footer from '~/components/layout/Footer.vue';

useHead({
    title: 'Landing',
})

definePageMeta({
    layout: 'default',
});

/* useSeoMeta({
    ogTitle: fullname,
    ogType: 'website',
    ogImage: url + '/icons/logo.svg',
    description: baseline.replace(/_/g, ''),
    ogDescription: baseline.replace(/_/g, ''),
    twitterTitle: fullname,
    twitterImage: url + '/icons/logo.svg',
    twitterDescription: baseline.replace(/_/g, '')
}) */

</script>

<template>
    <VMain>
        <LandingViewport />
        <LandingAbout />
        <LandingFeatured />
        <LandingContactForm />
        <Footer />
    </VMain>
</template>