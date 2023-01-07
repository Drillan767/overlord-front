<template>
    <NuxtLink :to="`/project/${project.slug}`">
        <article class="content-item">
            <div class="glitch-thumb">
                <div class="glitch-img" v-for="i in 5" :key="i" :style="`background-image: url('${getThumb(project)}')`" />
            </div>
            <div class="details">
                <p :data-text="project.title">
                    {{ project.title }}
                    <span class="cursor"></span>
                </p>
                <div class="tags">
                    <span v-for="(tag, j) in project.tags" :key="j">
                        {{ tag.Tag_id.title }}
                    </span>
                </div>
            </div>
        </article>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Project } from '~~/types'

defineProps<{project: Project, activeTag: string}>()

const config = useRuntimeConfig()

onMounted(() => {
    const article = document.querySelector('article')

    if (article) {
        article.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLDivElement
            const p = target.querySelector('p')
            if (p) p.classList.add('glitch')
        })

        article.addEventListener('mouseleave', (e) => {
            const target = e.target as HTMLDivElement
            const p = target.querySelector('p')
            if (p) p.classList.remove('glitch')
        })
    }
})

const getThumb = (item: Project) => {
    return `${config.apiUrl}/assets/${item.illustration.id}?width=300&height=200&fit=cover`
}
</script>