<script setup lang="ts">
useHead({
    title: 'Landing',
})

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
    </VMain>
</template>
