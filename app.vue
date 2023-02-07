<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { ReceivedHomepage } from '~~/types';
import homepageGql from '~~/queries/homepage.gql'

const { locale } = useI18n()
const color = useTheme()
const homepage = useHomepage()
const fullLocale = useFullLocale()


fullLocale.value = locale.value === 'fr' ? 'fr-FR' : 'en-US'

await useAsyncQuery<ReceivedHomepage>(homepageGql, {locale: fullLocale.value, loadHomepage: true })
    .then(({ data }) => {
        if (data.value) {
            const {baseline, description, Homepage_id } = data.value.Homepage_translations[0]
            const { fullname, links, user, icon } = Homepage_id
            homepage.value = {
                fullname,
                baseline,
                description,
                links,
                user,
                icon
            }
        }
    })

useHead({
    htmlAttrs: {
        lang: locale
    },
    bodyAttrs: {
        class: color
    },
})

</script>
