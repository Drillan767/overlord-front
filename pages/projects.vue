<template>
    <div id="projects" class="slide-in">

       <!--  <Head>
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
                <SingleProject v-for="(project, i) in filteredProjects" :key="i" :activeTag="activeTag"
                    :project="project" @change-tag="handleFilter" />
            </div>

            <p v-if="filteredProjects.length === 0" class="text-center text-white text-xl">
                Nothing to see here for now...
            </p>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import type { TagFilter, DisplayedProjectsReceived, DisplayedProject } from '~~/types'
import SingleProject from '~~/components/content/SingleProject.vue';

definePageMeta({
    layout: 'blog',
})

/* const { url } = useRuntimeConfig()
const homepage = useHomepage()
const fullLocale = useFullLocale()
const { baseline } = homepage.value
const projectList = ref<DisplayedProject[]>([])
const activeTag = ref('')
const params = {
    locale: fullLocale.value,
    filters: {
        status: {_eq: 'published'}
    }
}

useSeoMeta({
    ogTitle: t('projets'),
    ogType: 'website',
    ogImage: url + '/icons/logo.svg',
    description: baseline.replace(/_/g, ''),
    ogDescription: baseline.replace(/_/g, ''),
    twitterTitle: ('projects'),
    twitterImage: url + '/icons/logo.svg',
    twitterDescription: baseline.replace(/_/g, '')
})

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

await useAsyncQuery<DisplayedProjectsReceived>(projectQuery, params)
    .then(({ data }) => {
        if (data.value) {
            projectList.value = data.value.Project_translations.map((project) => {
                const { title, slug } = project
                const { Project_id: {illustration, tags} } = project

                return {
                    title, slug, illustration, tags
                }
            })
        }
    })

const filteredProjects = computed(() => {
    return activeTag.value !== ''
        ? projectList.value.filter((a) => a.tags.some((t) => t.Tag_id.title === activeTag.value))
        : projectList.value
}) */

</script>

<style scoped lang="scss">
.projectsList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
    grid-gap: 25px;
    justify-content: center;
    align-items: baseline;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 400px));
    }
}
</style>