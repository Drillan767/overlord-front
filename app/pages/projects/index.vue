<script setup lang="ts">
import Preview from '@/components/content/Preview.vue'

useHead({
    title: 'Projects',
})

const route = useRoute()

const subtitle = 'Stuff I\'ve worked on, or experimented with.'

const { data: projects } = await useAsyncData('projects', () => queryCollection('projects')
    .order('date', 'DESC')
    .select('id', 'title', 'description', 'image', 'date', 'tags', 'path')
    .all())

const activeTag = ref<string>()

const tagsList = computed<string[]>(() => {
    if (!projects.value)
        return []
    return projects.value.reduce<string[]>((acc, project) => {
        project.tags.forEach((tag) => {
            if (!acc.includes(tag)) {
                acc.push(tag)
            }
        })
        return acc
    }, [])
})

const filteredProjects = computed(() => {
    if (!projects.value)
        return []

    return projects.value.filter(project => activeTag.value ? project.tags.includes(activeTag.value) : true)
})

onBeforeMount(() => {
    activeTag.value = route.query.tag as string
})
</script>

<template>
    <VContainer>
        <VRow>
            <VCol>
                <h1
                    class="text-h2 text-center text-md-start mb-4 layers glitch"
                    data-text="Projects"
                >
                    Projects
                </h1>
                <p
                    class="text-body-1 text-center text-md-start"
                >
                    {{ subtitle }}
                </p>
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <VCard
                    color="primary"
                    variant="tonal"
                >
                    <template #text>
                        <div class="d-flex">
                            <VChipGroup
                                v-model="activeTag"
                            >
                                <VChip
                                    v-for="tag in tagsList"
                                    :key="tag"
                                    :value="tag"
                                    :text="tag"
                                    :variant="activeTag === tag ? 'elevated' : 'outlined'"
                                    color="primary"
                                    rounded="lg"
                                    class="mx-1 my-1"
                                />
                            </VChipGroup>
                            <VBtn
                                v-if="activeTag"
                                icon="mdi-close"
                                variant="text"
                                color="primary"
                                class="ml-auto"
                                @click="activeTag = undefined"
                            />
                        </div>
                    </template>
                </VCard>
            </VCol>
        </VRow>
        <VRow>
            <VCol
                v-for="project in filteredProjects"
                :key="project.id"
                cols="12"
                sm="6"
                md="4"
            >
                <Preview
                    :content="project"
                    :active-tag="activeTag"
                />
            </VCol>
        </VRow>
    </VContainer>
</template>
