<template>
    <div id="index">
        <Head>
            <Title>Landing</Title>
        </Head>
        
        <Navbar
            :icon="Homepage.icon"
            :fullname="Homepage.fullname"
        />

        <LandingViewport
            :full_name="Homepage.fullname"
            :baseline="Homepage.baseline"
        />

        <LandingAbout
            :description="Homepage.description"
            :user="Homepage.user"
        />

        <LandingFeatured />

        <LandingContactForm />

        <Footer
            :links="Homepage.links"
            :icon="Homepage.icon"
            :fullname="Homepage.fullname"
        />

  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('homepage', () => GqlHomepage());
const { Homepage } = data.value;

definePageMeta({
  layout: "default",
});
</script>