<script setup lang="ts">
import Preview from '@/components/content/Preview.vue'

const { data: projects } = await useAsyncData('projects', () => queryCollection('projects')
    .order('date', 'DESC')
    .limit(3)
    .all()
)
</script>

<template>
    <section id="latest-projects" class="mb-16">
        <VContainer>
            <VRow>
                <VCol
                    cols="12"
                    md="6"
                >
                    <h2
                        class="text-h2 text-center text-md-start layers glitch"
                        data-text="Featured projects"
                    >
                        Featured projects
                    </h2>
                </VCol>
                <VCol
                    cols="12"
                    md="6"
                    class="d-flex justify-center justify-md-end align-center"
                >
                    <VBtn
                        variant="outlined"
                        color="primary"
                        append-icon="mdi-arrow-right"
                        rounded="lg"
                    >
                        View all
                    </VBtn>
                </VCol>
            </VRow>
            <VRow>
                <VCol
                    v-for="project in projects"
                    :key="project.id"
                    cols="12"
                    md="4"
                >
                    <Preview :content="project" />
                </VCol>
            </VRow>
        </VContainer>
    </section>
</template>