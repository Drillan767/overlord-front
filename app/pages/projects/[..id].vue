<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData('project', () => queryCollection('projects')
    .where('path', '=', route.path)
    .first())
</script>

<template>
    <ContentRenderer
        v-if="project"
        :value="project"
    />
    <div v-else>
        <h1>
            Project not found
        </h1>
    </div>
</template>