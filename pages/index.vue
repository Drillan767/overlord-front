<template>
    <div id="index">

        <Head>
            <Title>Landing</Title>
        </Head>

        <Navbar :icon="homepage.icon" :fullname="homepage.fullname" />

        <LandingViewport :full_name="homepage.fullname" :baseline="homepage.baseline" />

        <LandingAbout :description="homepage.description" :user="homepage.user" />

        <LandingFeatured />

        <LandingContactForm />

        <Footer :links="homepage.links" :icon="homepage.icon" :fullname="homepage.fullname" />

    </div>
</template>

<script setup lang="ts">
import type { Homepage } from '~~/components/types';
import homepageGql from '../queries/homepage.gql'

type HomepageData = {
    Homepage: Homepage
}

const { data: homepageResponse } = await useAsyncQuery<HomepageData>(homepageGql)
const homepage = homepageResponse.value
    ? homepageResponse.value.Homepage
    : {} as Homepage

definePageMeta({
    layout: "default",
});
</script>