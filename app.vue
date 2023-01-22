<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { Homepage } from '~~/types';
import homepageGql from '~~/queries/homepage.gql'

type HomepageData = {
    Homepage: Homepage
}

const config = useRuntimeConfig()
const color = useTheme()
const homepage = useHomepage()

await useAsyncQuery<HomepageData>(homepageGql)
    .then(({ data }) => {
        if (data.value) {
            homepage.value = data.value.Homepage
        }
    })

useHead({
    bodyAttrs: {
        class: color
    },

    meta: [
        {
            name: 'description',
            content: homepage.value.baseline.replace(/_/g, '')
        },


    ]
})

</script>
