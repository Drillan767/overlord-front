<template>
    <div id="index">
        <Head>
            <Title>{{ t('landing') }}</Title>
        </Head>
        <Navbar />
        <LandingViewport />
        <LandingAbout />
        <LandingFeatured />
        <LandingContactForm />
        <Footer />
        <!-- 
        
        
        <LandingFeatured />
        <LandingContactForm />
        <Footer /> -->
    </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import Footer from '~~/components/layout/Footer.vue'
import Navbar from '~~/components/layout/Navbar.vue'

const { t } = useI18n()
const { url } = useRuntimeConfig()
const homepage = useHomepage()
const { fullname, baseline} = homepage.value

definePageMeta({
    layout: "default",
});

useSeoMeta({
    ogTitle: fullname,
    ogType: 'website',
    ogImage: url + '/icons/logo.svg',
    description: baseline.replace(/_/g, ''),
    ogDescription: baseline.replace(/_/g, ''),
    twitterTitle: fullname,
    twitterImage: url + '/icons/logo.svg',
    twitterDescription: baseline.replace(/_/g, '')
})

</script>

<i18n lang="json">
{
    "en": {
        "landing": "Landing"
    },
    "fr": {
        "landing": "Accueil"
    }
}
</i18n>