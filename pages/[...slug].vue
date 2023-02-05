<template>
    <Head>
        <Title>{{ page.title }}</Title>
    </Head>

</template>

<script setup lang="ts">
import type { Page, PagesReceived } from '~~/types';
const route = useRoute()
const slug = route.params.slug.toString()

const page = ref({} as Page)



</script>