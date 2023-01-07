<template>
    <section id="featured" v-if="(featuredArticles.length || featuredProjects.length)">
        <div class="content">
            <div class="articles">
                <div class="title">
                    <h2 class="uppercase">
                        Featured <br />
                        <span class="glitch" data-text="ARTICLES">Articles</span>
                    </h2>

                    <Button type="link" link="/articles" content="View all articles" />
                </div>

                <div class="list" v-for="(article, i) in featuredArticles" :key="i">
                    <ItemThumbnail item-type="article" :item="article" />
                </div>
            </div>
            <div class="projects">
                <div class="title">
                    <h2 class="uppercase">
                        Featured <br />
                        <span class="glitch" data-text="PROJECTS">Projects</span>
                    </h2>

                    <Button type="link" link="/projects" content="View all projects" />
                </div>
                <div class="list" v-for="(project, i) in featuredProjects" :key="i">
                    <ItemThumbnail item-type="project" :item="project" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import articles from '../../queries/articles.gql'
import projects from '../../queries/projects.gql'
import ItemThumbnail from '../content/ItemThumbnail.vue';
import Button from '../layout/Button.vue';
import type { Article, ArticlesReceived, Project, ProjectsReceived } from '~~/types';

const gqlHeaders = {
    filter: {
        featured: { _eq: true },
        status: { _eq: 'published' }
    },
    limit: 3
}

const featuredArticles = ref<Article[]>([])
const featuredProjects = ref<Project[]>([])

await useAsyncQuery<ArticlesReceived>(articles, gqlHeaders)
    .then(({ data }) => {
        if (data.value) {
            featuredArticles.value = data.value.Articles
        }

    })

await useAsyncQuery<ProjectsReceived>(projects, gqlHeaders)
    .then(({ data }) => {
        if (data.value) {
            featuredProjects.value = data.value.Project
        }
    })

onMounted(async () => applyGlitch())

const applyGlitch = () => {
    document.querySelectorAll('article').forEach((item) => {
        item.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLDivElement
            const p = target.querySelector('p')
            if (p) p.classList.add('glitch')
        })

        item.addEventListener('mouseleave', (e) => {
            const target = e.target as HTMLDivElement
            const p = target.querySelector('p')
            if (p) p.classList.remove('glitch')
        })
    })
}

</script>
