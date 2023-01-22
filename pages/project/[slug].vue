<template>
    <div class="project">

        <Head>
            <Title>{{ project.title }}</Title>
            <Meta property="description" :content="project.description" />
            <Meta property="og:type" content="article" />
            <Meta property="og:title" :content="project.title" />
            <Meta property="og:image" :content="getIllustration()"/>
            <Meta property="twitter:image" :content="getIllustration()"/>
            <Meta property="og:description" :content="project.description" />
            <Meta property="twitter:description" :content="project.description" />
            <Meta property="article:author" content="Joseph Levarato" />
            <Meta property="og:url" :content="`${config.url}/article/${project.slug}`" />
            <Meta property="article:published_time" :content="project.date_created" />
            <Meta property="article:modified_time" v-if="project.date_created" :content="project.date_updated" />
            <Link rel="canonical" :href="`${config.url}/article/${project.slug}`" />
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

        <article v-html="project.body" />

        <div class="links">
            <Button type="link" :link="project.repo_link" content="Github repo" target="_blank" />
            <Button type="link" :link="project.website" content="View site" target="_blank" />
        </div>
    </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'
import projectQuery from '~~/queries/project.gql'
import Button from '~~/components/layout/Button.vue';
import type { Project, ProjectsReceived } from '~~/types';

definePageMeta({
    layout: "blog",
})

const route = useRoute()
const config = useRuntimeConfig()

const project = ref({} as Project)
const tagList = ref('')

const getIllustration = () => {
    return `${config.apiUrl}/assets/${project.value.illustration.id}?width=600&height=800&fit=cover`
}

await useAsyncQuery<ProjectsReceived>(projectQuery, {
    search: route.params.slug.toString()
})
    .then(({data}) => {
        if (data.value && data.value.Project.length) {
            project.value = data.value.Project[0]
            tagList.value = project.value.tags.map((t) => t.Tag_id.title).join(' • ')

        } else {
            throw createError({
                statusCode: 404,
                message: 'Project not found ya idiot'
            })
        }
    })

onMounted(() => {
    setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.prose pre')
            .forEach((block) => hljs.highlightBlock(block))
    }, 1000)
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
    @apply prose lg:prose-xl mx-auto mt-4 prose-img:mx-auto px-2;
    color: var(--font-color);
}

.links {
    @apply max-w-prose mx-auto flex justify-evenly md:justify-between md:text-xl mt-4 flex-row;
}

</style>