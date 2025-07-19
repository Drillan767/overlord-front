<script setup lang="ts">
import Preview from '@/components/content/Preview.vue'

const { data: articles } = await useAsyncData('articles', () => queryCollection('articles')
    .order('date', 'DESC')
    .limit(3)
    .all()
)
</script>

<template>
    <section id="latest-articles" class="mb-16">
        <VContainer>
            <VRow>
                <VCol
                    cols="12"
                    md="6"
                >
                    <h2
                        class="text-h2 text-center text-md-start layers glitch"
                        data-text="Latest articles"
                    >
                        Latest articles
                    </h2>
                </VCol>
                <VCol
                    cols="12"
                    md="6"
                    class="d-flex justify-center justify-md-end align-center"
                >
                    <VBtn
                        to="/articles"
                        variant="outlined"
                        color="primary"
                        append-icon="mdi-arrow-right"
                        rounded="lg"
                    >
                        View all
                    </VBtn>
                </VCol>
            </VRow>
            <VRow>
                <VCol
                    v-for="article in articles"
                    :key="article.id"
                    cols="12"
                    md="4"
                >
                    <Preview :content="article" />
                </VCol>
            </VRow>
        </VContainer>
    </section>
</template>