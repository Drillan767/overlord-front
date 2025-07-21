<script setup lang="ts">
import easyReading from '@/utils/easyReading'

const route = useRoute()
const config = useRuntimeConfig()

const { data: project } = await useAsyncData('project', () => queryCollection('projects')
    .where('path', '=', route.path)
    .first())

useHead({
    title: () => project.value?.title,
})

const originalContent = ref<string>('')
const isEasyReading = ref(false)

function toggleEasyReading() {
    const projectElement = document.querySelector('.project-content')
    if (!projectElement)
        return

    if (!isEasyReading.value) {
        // Store original content and switch to easy reading
        originalContent.value = projectElement.innerHTML
        projectElement.innerHTML = easyReading(originalContent.value)
        isEasyReading.value = true
    }
    else {
        // Restore original content
        projectElement.innerHTML = originalContent.value
        isEasyReading.value = false
    }
}
</script>

<template>
    <Head v-if="project">
        <Title>{{ project.title }}</Title>
        <Meta name="description" :content="project.seo?.description" />
        <Meta name="keywords" :content="project.tags.join(', ')" />
        <Meta property="og:type" content="article" />
        <Meta property="og:title" :content="project.title" />
        <Meta property="og:description" :content="project.seo?.description" />
        <Meta property="og:image" :content="project?.image" />
        <Meta property="og:url" :content="`${config.public.url}${route.path}`" />
        <Meta property="article:published_time" :content="project.date" />
        <Meta property="article:author" content="Joseph Levarato" />
        <Meta property="article:section" :content="project.tags[0]" />
        <Meta property="article:tag" :content="project.tags.join(', ')" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" :content="project.title" />
        <Meta name="twitter:description" :content="project.seo?.description" />
        <Meta name="twitter:image" :content="project?.image" />
        <Meta name="twitter:url" :content="`${config.public.url}${route.path}`" />
        <Meta name="twitter:site" content="@josephlevarato" />
        <Meta name="twitter:creator" content="@josephlevarato" />
        <Meta name="twitter:image:alt" :content="project.title" />
    </Head>
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
                    class="project-content"
                    tag="article"
                />
            </VCol>
        </VRow>
        <VRow>
            <VCol class="links">
                <VBtn
                    v-if="project?.source"
                    :href="project?.source"
                    target="_blank"
                    variant="flat"
                    prepend-icon="mdi-github"
                    color="primary"
                    rounded="lg"
                >
                    Check the source code
                </VBtn>
                <VBtn
                    v-if="project?.link"
                    :href="project?.link"
                    target="_blank"
                    variant="flat"
                    prepend-icon="mdi-open-in-new"
                    color="primary"
                    rounded="lg"
                >
                    Check the live demo
                </VBtn>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>
.description {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

@media (max-width: 768px) {
    .links {
        flex-direction: column;
    }
}

.links {
    display: flex;
    gap: 1rem;
    justify-content: center;
}
</style>
