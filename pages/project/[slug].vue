<template>
    <VContainer fluid class="slide-in pa-0 mt-16 project">
        <VRow>
            <VCol>
                <VCard
                    :image="illustration"
                    class="banner"
                >
                    <VContainer>
                        <VRow>
                            <VCol>
                                <h1 class="text-center">
                                    {{ project?.title }}
                                </h1>
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol>
                                <p class="text-center">
                                    {{ project?.description }}
                                </p>
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol
                                v-if="project"
                                class="text-center mt-4"
                            >
                                <VChip
                                    v-for="(tag, i) in project.tags"
                                    :key="i"
                                    :text="tag.Tag_id.title"
                                    variant="outlined"
                                    class="mx-1"
                                />
                            </VCol>
                        </VRow>
                    </VContainer>
                </VCard>
            </VCol>
        </VRow>
        <VRow no-gutters v-if="project">
            <VCol>
                <VCard>
                    <VContainer>
                        <VRow>
                            <VCol
                                cols="12"
                                md="8"
                                class="mx-md-auto"
                            >
                                <VBreadcrumbs class="mb-4" :items="breadcrumb">
                                    <template #divider>
                                        <VIcon icon="mdi-chevron-right" />
                                    </template>
                                </VBreadcrumbs>
                                <VCardText v-html="project.body" />
                            </VCol>
                        </VRow>
                        <VRow v-if="project">
                            <VCol
                                cols="12"
                                md="8"
                                class="d-flex justify-space-between mx-md-auto"
                            >
                                <Button
                                    :link="project.repo_link"
                                    type="link"
                                    content="Github repo"
                                    target="_blank"
                                />
                                <Button
                                    :link="project.website"
                                    type="link"
                                    content="View site"
                                    target="_blank"
                                />
                            </VCol>
                        </VRow>
                    </VContainer>
                </VCard>
            </VCol>
        </VRow>

        <!-- <Head>
            <Title>{{ project.title }}</Title>
            <Meta property="article:author" content="Joseph Levarato" />
            <Meta property="article:published_time" :content="project.date_created" />
            <Meta property="article:modified_time" v-if="project.date_updated" :content="project.date_updated" />
            <Link rel="canonical" :href="`${url}/article/${project.slug}`" />
        </Head>
        -->
    </VContainer> 
</template>

<script setup lang="ts">
import type { Project } from '~~/types'
import Button from '~~/components/layout/Button.vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'

definePageMeta({
    layout: 'blog'
})

const route = useRoute()
const { getItems  } = useDirectusItems()
const config = useRuntimeConfig()

const loading = ref(false)
const project = ref<Project>()

useHead({
    title: () => project.value?.title ?? ''
})

const breadcrumb = computed(() => ([
    {
        title: 'Home',
        to: '/'
    },
    {
        title: 'Projects',
        to: '/projects',
    },
    {
        title: project.value?.title ?? ''
    }
]))

const illustration = computed(() => {
    if (!project.value) return undefined
    return `${config.public.apiUrl}/assets/${project.value.illustration}?width=1200&height=627&fit=cover`
})

const fetchProject = async() => {
    loading.value = true
    console.log(route.params.slug)

    try {
        const data = await getItems<Project>({
            collection: 'Project',
            params: {
                limit: 1,
                filter: {
                slug: route.params.slug,
            },
            fields: ['*', 'tags.Tag_id.*']
            }
        })
        project.value = data[0]
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

onMounted(async() => {
    await fetchProject()

    document.querySelectorAll<HTMLElement>('pre').forEach((block) => hljs.highlightBlock(block))
})

/* 

useSeoMeta({
    ogTitle: project.value.title,
    ogType: 'article',
    ogImage: getIllustration(),
    description: project.value.description,
    ogDescription: project.value.description,
    twitterTitle: project.value.title,
    twitterImage: getIllustration(),
    twitterDescription: project.value.description,
}) */

</script>

<style scoped lang="scss">

.project {

    .banner {
        :deep(.v-responsive__sizer) {
            background: linear-gradient(0deg,#12181b,rgba(18,18,18,.9) 40%,rgba(18,18,18,.9)); 
        }

        .v-container {
            height: calc(100vh - 64px);

            .v-row:first-of-type {
                margin-top: 33vh;
            }
        }
    }

    :deep(.v-card-text) {
        p, li {
            font-size: 1.25rem;
            margin: 1.2em 0;
        }

        ol {
            padding-left: 24px;
        }

        pre {
            overflow: scroll;
        }
    }
}

</style>