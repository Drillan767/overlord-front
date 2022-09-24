<template>
    <div id="blog">
        <Navbar
            :icon="Homepage.icon"
            :fullname="Homepage.fullname"
        />
        <div class="content">
            <slot />
        </div>
        <Footer
            :links="Homepage.links"
            :icon="Homepage.icon"
            :fullname="Homepage.fullname"
        />
    </div>
</template>

<script setup lang="ts">

const { data } = await useAsyncData('homepage', () => GqlHomepage({showInfos: false}));
const { Homepage } = data.value;

</script>

<style scoped lang="scss">

#blog {
    background-color: var(--bg-color);
    .content {
        min-height: var(--landing-min-height);
        padding: var(--landing-padding);
    }
}

</style>