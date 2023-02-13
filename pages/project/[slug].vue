<template>
    <div class="project">

        <Head>
            <Title>{{ project.title }}</Title>
            <Meta property="article:author" content="Joseph Levarato" />
            <Meta property="article:published_time" :content="project.date_created" />
            <Meta property="article:modified_time" v-if="project.date_updated" :content="project.date_updated" />
            <Link rel="canonical" :href="`${url}/article/${project.slug}`" />
        </Head>

        <header >
            <div :style="`background-image: url('${getIllustration()}')`" class="banner "></div>

            <div class="info">
                <h1>
                    {{ project.title }}
                </h1>
                <p class="description">
                    {{ project.description }}
                </p>
                <div class="tags">
                    {{ tagList }}
                </div>
            </div>
        </header>

        <article v-html="project.body" class="prose" />

        <div class="links">
            <Button type="link" :link="project.repo_link" content="Github repo" target="_blank" />
            <Button type="link" :link="project.website" content="View site" target="_blank" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'
import projectQuery from '~~/queries/project.gql'
import Button from '~~/components/layout/Button.vue';
import type { Project, ProjectReceived } from '~~/types';

definePageMeta({
    layout: "blog",
})

const route = useRoute()
const { url, apiUrl } = useRuntimeConfig()
const fullLocale = useFullLocale()

const project = ref({} as Project)
const tagList = ref('')

const filters = {
    languages_code: {code: {_eq: fullLocale.value}},
    Project_id: {
        status: {_eq: 'published'},
        slug: {_eq: route.params.slug.toString()}
    }
}

await useAsyncQuery<ProjectReceived>(projectQuery, filters)
    .then(({data}) => {
        if (!data.value || !data.value.Project_translations.length) {
            throw createError({
                statusCode: 404,
                fatal: true,
            })
        }

        const { title, slug, body, description, Project_id } = data.value.Project_translations[0]
        const { date_created, date_updated, repo_link, website, tags, illustration } = Project_id

        project.value = {
            title, slug, body, description, date_created, date_updated, repo_link, website, tags, illustration
        }

        tagList.value = project.value.tags.map((t) => t.Tag_id.title).join(' • ')

    })

onMounted(() => {
    setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.prose pre')
            .forEach((block) => hljs.highlightBlock(block))
    }, 1000)
})

const getIllustration = () => {
    return `${apiUrl}/assets/${project.value.illustration.id}?width=600&height=800&fit=cover`
}

useSeoMeta({
    ogTitle: project.value.title,
    ogType: 'article',
    ogImage: getIllustration(),
    description: project.value.description,
    ogDescription: project.value.description,
    twitterTitle: project.value.title,
    twitterImage: getIllustration(),
    twitterDescription: project.value.description,
})

</script>

<style scoped lang="scss">
header {
    height: 100vh;
    @apply relative flex items-center justify-center;

    .banner {
        @apply absolute inset-0 z-0 h-full bg-center bg-no-repeat bg-cover;

        &::before {
            content: '';

            @apply absolute inset-0 h-full;

            background: linear-gradient(0deg,#12181b,rgba(31,34,53,.9) 40%,rgba(31,34,53,.9));
        }
    }

    .info {
        @apply relative z-10 w-11/12 md:w-1/2 text-center text-white;

        h1 {
            @apply leading-none mb-2;
        }

        .description {
            @apply text-base md:text-xl;
        }

        .tags {
            color: var(--purple);
            @apply mt-8;
        }
    }
}

article {
    @apply lg:prose-xl mx-auto mt-4 prose-img:mx-auto prose-a:text-violet-600 px-2 dark:prose-invert;
}

.links {
    @apply max-w-prose mx-auto flex justify-evenly md:justify-between md:text-xl mt-4 flex-row;
}

</style>