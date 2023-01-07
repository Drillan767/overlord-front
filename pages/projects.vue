<template>
    <div id="projects" class="slide-in">

        <Head>
            <Title>Projects</Title>
        </Head>

        <div class="content">
            <h1 class="glitch" data-text="PROJECTS">
                PROJECTS
            </h1>

            <div class="tagList">
                <template v-for="(tag, i) in uniqueTags" :key="i" class="tag">
                    <span v-if="i !== 0" class="mx-2 separator">/</span>
                    <span :class="{ 'current': tag.title === activeTag }" class="cursor-pointer"
                        @click="handleFilter(tag.title)">
                        {{ tag.title }} ({{ tag.nbProjects }})
                    </span>
                </template>
            </div>

            <div class="projectsList mx-auto">
                <SingleProject
                    v-for="(project, i) in filteredProjects"
                    :key="i"
                    :activeTag="activeTag"
                    :project="project"
                    @change-tag="handleFilter"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TagFilter, Project, ProjectsReceived } from '~~/types'
import projectQuery from '~~/queries/projects.gql'
import SingleProject from '~~/components/content/SingleProject.vue';

definePageMeta({
    layout: "blog",
})

const projectList = ref<Project[]>([])
const activeTag = ref('')

const uniqueTags = computed<TagFilter[]>(() => {
    const allTags: TagFilter[] = []
    projectList.value.forEach((project) => {
        project.tags.forEach((tag) => {
            const { Tag_id: { title } } = tag
            const nbProjects = projectList.value.filter((a) => {
                return a.tags.some((t) => t.Tag_id.title === title)
            }).length

            if (!allTags.some((at) => at.title === title)) {
                allTags.push({ title, nbProjects })
            }
        })
    })

    return allTags
})

const handleFilter = (filter: string) => {
    if (activeTag.value === '') {
        activeTag.value = filter
    } else if (activeTag.value === filter) {
        activeTag.value = ''
    } else {
        activeTag.value = filter
    }
}

await useAsyncQuery<ProjectsReceived>(projectQuery)
    .then(({ data }) => {
        if (data.value) {
            projectList.value = data.value.Project
        }
    })

const filteredProjects = computed(() => {
    return activeTag.value !== ''
        ? projectList.value.filter((a) => a.tags.some((t) => t.Tag_id.title === activeTag.value))
        : projectList.value
})

</script>

<style scoped lang="scss">

</style>