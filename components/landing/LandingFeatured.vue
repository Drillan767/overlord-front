<template>
    <section id="featured">
        <div class="articles" v-for="(article, i) in articlesData" >
            <pre>
                <code>
                    {{ article }}
                </code>
            </pre>

        </div>

        <div class="projects" v-for="(project, i) in projectsData" >
            <pre>
                <code>
                    {{ project }}
                </code>
            </pre>

        </div>

    </section>
</template>

<script setup lang="ts">
    const FeaturedArticles = await useAsyncData('articles', () => GqlFeaturedArticles());
    const articlesData = FeaturedArticles.data.value.Articles

    const FeaturedProjects = await useAsyncData('projects', () => GqlFeaturedProjects())
    const projectsData = FeaturedProjects.data.value.Project
</script>