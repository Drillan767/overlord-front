<template>
    <NuxtLink :to="`/project/${project.slug}`">
        <article @mouseenter="isHovered = true" @mouseleave="isHovered = false" :class="{'animate': isHovered}">
            <div class="glitch-thumb">
                <div class="glitch-img" v-for="i in 5" :key="i"
                    :style="`background-image: url('${getThumb(project)}')`" />
            </div>
            <div class="details mt-2">
                <h2>
                    {{ project.title }}
                    <span class="cursor"></span>
                </h2>
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

defineProps<{ project: Project, activeTag: string }>()

const config = useRuntimeConfig()
const isHovered = ref(false)

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

<style scoped lang="scss">
@import '~~/assets/styles/mixins';

article {
    @include content-item(100%);

    h2 {
        height: 56px;
        color: var(--font-color);
        line-height: 1;
        font-size: clamp(1.25rem, 0.9859rem + 0.8451vw, 2rem);
    }

    .tags {
        @apply flex justify-end gap-x-2 mt-2;

        span {
            border: solid 1px var(--title-color);
            background-color: white;
            padding: 2px 4px;
        }
    }

    &.animate {
        .glitch-thumb {
            @include glitch-items(true);
        }
    }
}
</style>