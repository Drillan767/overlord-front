<template>
    <div id="index">
        <Head>
            <Title>Landing</Title>
        </Head>

        <Navbar />
        <LandingViewport />
        <LandingAbout />
        <LandingFeatured />
        <LandingContactForm />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import type { Homepage } from '~~/types';
import homepageGql from '../queries/homepage.gql'

type HomepageData = {
    Homepage: Homepage
}

const homepage = ref({} as Homepage)

await useAsyncQuery<HomepageData>(homepageGql)
    .then(({ data }) => {
        if (data.value) {
            homepage.value = data.value.Homepage
        }
    })

definePageMeta({
    layout: "default",
});
</script>