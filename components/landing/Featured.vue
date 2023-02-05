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
            <!-- <div class="projects" v-if="featuredProjects.length">
                <div class="title">
                    <h2 class="uppercase" v-html="t('projects.featured')" />

                    <Button type="link" :link="localePath({name: 'projects'})" :content="t('projects.all')" />
                </div>
                <div class="list" v-for="(project, i) in featuredProjects" :key="i">
                    <ItemThumbnail item-type="project" :item="project" />
                </div>
            </div> -->
        </div>
    </section>
</template>

<script setup lang="ts">

import articles from '~~/queries/articles.gql'
import projects from '~~/queries/projects.gql'
import ItemThumbnail from '~~/components/content/ItemThumbnail.vue'
import Button from '~~/components/layout/Button.vue'
import type { Article, ArticlesReceived, Project, ProjectsReceived } from '~~/types'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const fullLocale = locale.value === 'fr' ? 'fr-FR' : 'en-US'

const gqlHeaders = {
    featured: true,
    status: 'published',
    locale: fullLocale,
    limit: 3
}

const featuredArticles = ref<Article[]>([])
const featuredProjects = ref<Project[]>([])

await useAsyncQuery<ArticlesReceived>(articles, gqlHeaders)
    .then(({ data }) => {
        if (data.value) {
            console.log(toRaw(data.value.Articles))
            featuredArticles.value = data.value.Articles.map((article) => {
                const { id, date_created, date_updated, illustration, tags } = article
                const [{ title, slug, description, body }] = article.translations

                return {
                    id,
                    title,
                    slug,
                    description,
                    body,
                    tags,
                    illustration,
                    date_created,
                    date_updated,
                }
            })
        }
    })

/* await useAsyncQuery<ProjectsReceived>(projects, gqlHeaders)
    .then(({ data }) => {
        if (data.value) {
            featuredProjects.value = data.value.Project
        }
    }) */

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