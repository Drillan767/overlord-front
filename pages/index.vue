<template>
    <div id="index">
        <Navbar :icon="homepage.icon" :fullname="homepage.fullname" />

        <LandingViewport :full_name="homepage.fullname" :baseline="homepage.baseline" />

        <LandingAbout :description="homepage.description" :user="homepage.user" />

        <LandingFeatured />

        <LandingContactForm />

        <Footer :links="homepage.links" :icon="homepage.icon" :fullname="homepage.fullname" />
    </div>
</template>

<script setup lang="ts">
import type { Homepage } from '~~/types';
import homepageGql from '../queries/homepage.gql'

type HomepageData = {
    Homepage: Homepage
}

const homepage = ref({} as Homepage)
let baseline = ''

await useAsyncQuery<HomepageData>(homepageGql)
    .then(({ data }) => {
        if (data.value) {
            homepage.value = data.value.Homepage
            baseline = homepage.value.baseline
        }
    })

useHead({
    title: 'Landing',
    meta: [{name: 'description', content: baseline.replace(/_/g, '')}]
})

definePageMeta({
    layout: "default",
});
</script>