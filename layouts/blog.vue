<template>
    <Navbar :links="homepage.links" :icon="homepage.icon" :fullname="homepage.fullname" />
    <div id="blog">
        <div class="content">
            <slot />
        </div>
        <Footer
            :links="homepage.links"
            :icon="homepage.icon"
            :fullname="homepage.fullname"
        />
    </div>
</template>

<script setup lang="ts">
import type { Homepage } from '~~/components/types';
import homepageGql from '../queries/homepage.gql'

type HomepageData = {
    Homepage: Homepage
}

const homepageState = useHomepage()

const homepage = ref({} as Homepage)

await useAsyncQuery<HomepageData>(homepageGql)
    .then(({ data }) => {
        if (data.value) {
            homepage.value = data.value.Homepage
            homepageState.value = homepage.value
        }
    })

</script>

<style scoped lang="scss">

#blog {
    background-color: var(--bg-color);
    .content {
        min-height: var(--landing-min-height);
    }
}

</style>