<script setup lang="ts">
const route = useRoute()
import easyReading from '@/utils/easyReading'

const { data: project } = await useAsyncData('project', () => queryCollection('projects')
    .where('path', '=', route.path)
    .first())

useHead({
    title: () => project.value?.title,
})

const originalContent = ref<string>('')
const isEasyReading = ref(false)

function toggleEasyReading() {
    const articleElement = document.querySelector('.article-content')
    if (!articleElement)
        return

    if (!isEasyReading.value) {
        // Store original content and switch to easy reading
        originalContent.value = articleElement.innerHTML
        articleElement.innerHTML = easyReading(originalContent.value)
        isEasyReading.value = true
    }
    else {
        // Restore original content
        articleElement.innerHTML = originalContent.value
        isEasyReading.value = false
    }
}
</script>

<template>
    <VContainer>
        <VRow>
            <VCol>
                <VBtn
                    to="/projects"
                    variant="text"
                    color="primary"
                    rounded="lg"
                    prepend-icon="mdi-arrow-left"
                >
                    Back to projects
                </VBtn>
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <h1
                    :data-text="project?.title"
                    class="layers glitch text-h2"
                >
                    {{ project?.title }}
                </h1>
                <p class="description text-grey-darken-1">
                    {{ project?.description }}
                </p>
                <div class="d-flex justify-space-between">
                    <div class="tags">
                        <VHover
                            v-for="tag in project?.tags"
                            :key="tag"
                            v-slot="{ isHovering, props: hover }"
                        >
                            <VChip
                                v-bind="hover"
                                :text="tag"
                                :to="`/projects?tag=${tag}`"
                                :color="isHovering ? 'primary' : 'default'"
                                variant="text"
                                class="me-2"
                                prepend-icon="mdi-tag"
                            />
                        </VHover>
                    </div>
                    <div class="easy-reading">
                        <VBtn
                            :variant="isEasyReading ? 'flat' : 'outlined'"
                            @click="toggleEasyReading"
                        >
                            {{ isEasyReading ? 'Disable easy reading' : 'Enable easy reading' }}
                        </VBtn>
                    </div>
                </div>
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <VImg
                    :src="project?.image"
                    max-height="600"
                    rounded="lg"
                    cover
                />
            </VCol>
        </VRow>
        <VRow justify="center">
            <VCol cols="12" md="8">
                <ContentRenderer
                    :value="project!"
                    class="article-content"
                    tag="article"
                />
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>
.description {
    font-size: 1.25rem;
    line-height: 1.75rem;
}
</style>