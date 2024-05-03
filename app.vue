<template>
    <VApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </VApp>
</template>

<script setup lang="ts">
import type { ReceivedHomepage } from '~~/types';

// const homepage = useHomepage()

// fullLocale.value = locale.value === 'fr' ? 'fr-FR' : 'en-US'

/* await useAsyncQuery<ReceivedHomepage>(homepageGql, {locale: fullLocale.value, loadHomepage: true })
    .then(({ data }) => {
        if (data.value) {
            const {baseline, description, legal, Homepage_id } = data.value.Homepage_translations[0]
            const { fullname, links, user, icon } = Homepage_id
            homepage.value = {
                fullname,
                baseline,
                description,
                links,
                legal,
                user,
                icon
            }
        }
    }) */

</script>
