<script setup lang="ts">
const { data: releases } = await useAsyncData('releases', () => queryCollection('releases')
    .order('version', 'DESC')
    .all())
</script>

<template>
    <VContainer>
        <VRow>
            <VCol>
                <h1
                    class="text-h2 text-center layers glitch"
                    data-text="Releases"
                >
                    Releases
                </h1>
            </VCol>
        </VRow>
        <VRow
            v-for="release in releases"
            :key="release.id"
        >
            <VCol>
                <VCard
                    :title="release.version"
                    variant="tonal"
                    color="primary"
                    tag="article"
                >
                    <template #title>
                        <h2 class="text-h4">
                            {{ release.version }}
                        </h2>
                    </template>
                    <template #text>
                        <ContentRenderer :value="release" />
                    </template>
                </VCard>
            </VCol>
        </VRow>
    </VContainer>
</template>
