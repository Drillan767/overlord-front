<script setup lang="ts">
import type { Article, DisplayedProject } from '~~/types'
import Button from '~~/components/layout/Button.vue'
import ItemThumbnail from '../content/ItemThumbnail.vue';

const config = useRuntimeConfig()

const { getItems  } = useDirectusItems()

const featuredArticles = ref<Article[]>([])
const featuredProjects = ref<DisplayedProject[]>([])

const fetchFeatured = async () => {
    featuredArticles.value = await getItems<Article>({
        collection: 'Articles',
        params: {
            filter: {
                featured: true
            },
            fields: ['title, tags, illustration, slug', 'tags.Tag_id.title']
        },
    })

    featuredProjects.value = await getItems<DisplayedProject>({
        collection: 'Project',
        params: {
            filter: {
                featured: true
            },
            fields: ['title, tags, illustration, slug', 'tags.Tag_id.title']
        }
    })
}

onMounted(() => fetchFeatured())
</script>

<template>
    <section id="featured">
        <VContainer>
            <VRow>
                <VCol
                    cols="12"
                    md="2"
                    class="offset-md-1 d-flex flex-column justify-space-between"
                >
                    <h2 class="text-uppercase text-right text-h3">
                        Featured <br>
                        <span class="glitch" data-text="ARTICLES">
                            Articles
                        </span>
                    </h2>

                    <Button
                        type="link"
                        link="/articles"
                        content="View all articles"
                    />
                </VCol>
                <VCol
                    v-for="(article, i) in featuredArticles"
                    :key="i"
                    cols="12"
                    md="3"
                >
                    <ItemThumbnail
                        item-type="article"
                        :item="article"
                    />
                </VCol>
            </VRow>
            <VRow>
                <VCol
                    cols="12"
                    md="2"
                    class="offset-md-1 d-flex flex-column justify-space-between"
                >
                    <h2 class="text-uppercase text-right text-h3">
                        Featured <br>
                        <span class="glitch" data-text="PROJECTS">
                            Projects
                        </span>
                    </h2>

                    <Button
                        type="link"
                        link="/projects"
                        content="View all projects"
                    />
                </VCol>

                <VCol
                    v-for="(project, i) in featuredProjects"
                    :key="i"
                    cols="12"
                    md="3"
                >
                    <ItemThumbnail
                        item-type="project"
                        :item="project"
                    />
                </VCol>
            </VRow>
        </VContainer>
    </section>
</template>

<style scoped lang="scss">
@import '../../assets/styles/mixins';

#featured {
    min-height: 100vh;
    display: flex;
    align-items: center;
}

</style>