<template>
    <VContainer id="projects" class="slide-in my-16">
        <VRow class="mt-8">
            <VCol>
                <h1 class="glitch" data-text="PROJECTS">
                    PROJECTS
                </h1>
            </VCol>
        </VRow>
        <VRow>
            <VBreadcrumbs :items="breadcrumb">
                <template #divider>
                    <VIcon icon="mdi-chevron-right" />
                </template>
            </VBreadcrumbs>
        </VRow>
        <VRow>
            <VCol>
                <VCard>
                    <template #text>
                        <VSkeletonLoader
                            :loading="loading"
                            type="chip@3"
                            class="d-flex justify-center"
                        >
                            <VChipGroup
                                v-model="activeTags"
                                :filter="true"
                                :multiple="true"
                                selected-class="bg-purple-darken-2"
                                class="chip-group"
                            >
                                <VChip
                                    v-for="(tag, i) in uniqueTags"
                                    :key="i"
                                    :value="tag.id"
                                    :text="tag.name"
                                    :append-icon="`mdi-numeric-${tag.count > 9 ? '9-plus' : tag.count}-circle`"
                                    variant="flat"
                                />
                            </VChipGroup>
                        </VSkeletonLoader>

                        <VRow
                            v-if="loading"
                            class="mt-8"
                        >
                            <VCol
                                v-for="i in 4"
                                :key="i"
                            >
                                <VSkeletonLoader type="image, text, article" />
                            </VCol>
                        </VRow>

                        <VRow v-else class="mt-8">
                            <VCol
                                v-for="(project, i) in filteredArticles"
                                :key="i"
                                cols="12"
                                md="3"
                                class="mb-4"
                            >
                                <VCard
                                    :to="`/project/${project.slug}`"
                                    variant="text"
                                >
                                    <VImg
                                        :src="`${config.public.apiUrl}/assets/${project.illustration}?width=300&height=200&fit=cover`"
                                    />
                                    <VCardSubtitle class="mt-4">
                                        {{ dayjs(project.date_updated).format('DD/MM/YYYY HH:mm') }}
                                    </VCardSubtitle>
                                    <VCardTitle>
                                        {{ project.title }}
                                    </VCardTitle>

                                    <VCardActions class="justify-end">
                                        <VChip
                                            v-for="(tag, i) in project.tags"
                                            :key="i"
                                            :text="tag.Tag_id.title"
                                            :color="activeTags.includes(tag.Tag_id.id) ? 'purple-darken-2': undefined"
                                            variant="flat"
                                            density="compact"
                                            class="ml-1"
                                        />
                                    </VCardActions>
                                </VCard>
                            </VCol>
                        </VRow>
                    </template>
                </VCard>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import type { Project } from '~/types'
import { useDayjs } from '#dayjs'

interface TagFilter {
    id: number
    name: string
    count: number
}

useHead({
    title: 'Projects',
})

definePageMeta({
    layout: 'blog',
})

const breadcrumb = [
    {
        title: 'Home',
        to: '/'
    },
    {
        title: 'Projects',
    }
]

const { getItems  } = useDirectusItems()
const config = useRuntimeConfig()
const dayjs = useDayjs()

const loading = ref(false)
const activeTags = ref<number[]>([])
const allProjects = ref<Project[]>([])

const uniqueTags = computed<TagFilter[]>(() => allProjects.value.reduce((acc, project) => {
    project.tags.forEach((tag) => {
        const tagName = tag.Tag_id.title
        const tagIndex = acc.findIndex((a) => a.name === tagName)

        if (tagIndex > -1) {
            acc[tagIndex].count++
        } else {
            acc.push({
                name: tagName,
                id: tag.Tag_id.id,
                count: 1,
            })
        }
    })
    return acc
}, [] as TagFilter[]))

const filteredArticles = computed(() => {
    if (activeTags.value.length > 0) {
        return allProjects.value.filter((a) => a.tags.some((t) => activeTags.value.includes(t.Tag_id.id)))
    }

    return allProjects.value
})

const fetchArticles = async () => {
    loading.value = true

    try {
        allProjects.value = await getItems<Project>({
            collection: 'Project',
            params: {
                filter: {
                    status: 'Published'
                },
                fields: ['title, tags, illustration, slug', 'date_updated', 'tags.Tag_id.*']
            }
        })

    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

onMounted(() => fetchArticles())

</script>

<style scoped lang="scss">
.v-skeleton-loader .chip-group :deep(.v-slide-group__content) {
    justify-content: center;
}

.c-title {
    font-size: clamp(1.5rem,1.3239rem + .5634vw,2rem);
}
</style>