<template>
    <section id="featured" v-if="(featuredArticles.length || featuredProjects.length)">
        <div class="content">
            <div class="articles" v-if="featuredArticles.length">
                <div class="title">
                    <h2 class="uppercase" v-html="t('articles.featured')" />

                    <Button type="link" :link="localePath({ name: 'articles' })" :content="t('articles.all')" />
                </div>

                <div class="list" v-for="(article, i) in featuredArticles" :key="i">
                    <ItemThumbnail item-type="article" :item="article" />
                </div>
            </div>
            <div class="projects" v-if="featuredProjects.length">
                <div class="title">
                    <h2 class="uppercase" v-html="t('projects.featured')" />

                    <Button type="link" :link="localePath({name: 'projects'})" :content="t('projects.all')" />
                </div>
                <div class="list" v-for="(project, i) in featuredProjects" :key="i">
                    <ItemThumbnail item-type="project" :item="project" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import articles from '~~/queries/articles.gql'
import projects from '~~/queries/projects.gql'
import ItemThumbnail from '~~/components/content/ItemThumbnail.vue'
import Button from '~~/components/layout/Button.vue'
import type { Article, ArticlesReceived, DisplayedProject, DisplayedProjectsReceived } from '~~/types'

const { t } = useI18n()
const localePath = useLocalePath()
const fullLocale = useFullLocale()

const gqlHeaders = {
    locale: fullLocale.value,
    limit: 3,
    filters: {
        status: {_eq: 'published'},
        featured: {_eq: true}
    }
}

const featuredArticles = ref<Article[]>([])
const featuredProjects = ref<DisplayedProject[]>([])

await useAsyncQuery<ArticlesReceived>(articles, {...gqlHeaders, featured: true})
    .then(({ data }) => {
        if (data.value) {
            featuredArticles.value = data.value.Articles_translations.map((article) => {
            const { title, slug, description, body } = article
            const { Articles_id: { date_created, date_updated, illustration, tags } } = article

                return {
                    title,
                    slug,
                    tags,
                    body,
                    description,
                    illustration,
                    date_created,
                    date_updated,
                }
            })
        }
    })

await useAsyncQuery<DisplayedProjectsReceived>(projects, gqlHeaders)
    .then(({ data }) => {
        if (data.value) {
            featuredProjects.value = data.value.Project_translations.map((project) => {
                const { title, slug } = project
                const { Project_id: {illustration, tags} } = project

                return {
                    title, slug, illustration, tags
                }
            })
        }
    })

</script>

<i18n lang="json">
{
    "fr": {
        "articles": {
            "featured": "<span class=\"glitch\" data-text=\"ARTICLES\">Articles</span><br /> en avant",
            "all": "Tous les articles"
        },
        "projects": {
            "featured": "<span class=\"glitch\" data-text=\"PROJETS\">Projets</span><br /> en avant",
            "all": "Tous les projets"
        }
    },
    "en": {
        "articles": {
            "featured": "Featured <br /><span class=\"glitch\" data-text=\"ARTICLES\">Articles</span>",
            "all": "View all articles"
        },
        "projects": {
            "featured": "Featured <br /><span class=\"glitch\" data-text=\"PROJECTS\">Projects</span>",
            "all": "View all projects"
        }
    }
}
</i18n>