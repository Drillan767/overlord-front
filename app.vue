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

const { locale } = useI18n()
const color = useTheme()
const homepage = useHomepage()

await useAsyncQuery<HomepageData>(homepageGql, {locale: locale.value})
    .then(({ data }) => {
        if (data.value) {
            homepage.value = data.value.Homepage
        }
    })

useHead({
    bodyAttrs: {
        class: color
    },
})

</script>
