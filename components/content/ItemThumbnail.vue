<template>
    <NuxtLink :to="`/${itemType}/${item.slug}`">
        <article class="content-item">
            <div class="glitch-thumb">
                <div class="glitch-img" v-for="i in 5" :key="i" :style="`background-image: url('${getThumb(item)}')`" />
            </div>
            <div class="details">
                <p :data-text="item.title">
                    {{ item.title }}
                    <span class="cursor"></span>
                </p>
                <div class="tags">
                    <span v-for="(tag, j) in item.tags" :key="j">
                        {{ tag.Tag_id.title }}
                    </span>
                </div>
            </div>
        </article>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Article, Project } from '~~/types'

type propsType = {
    itemType: string,
    item: Article|Project
}

defineProps<propsType>()

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

const getThumb = (item: Article|Project) => {
    return `${config.apiUrl}/assets/${item.illustration.id}?width=300&height=200&fit=cover`
}
</script>

<style scoped lang="scss">
@import '~~/assets/styles/mixins';

article {
    @include content-item(300px);

    .details {
        padding: 0.5rem 0 0 0.25rem;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
            color: var(--title-color);
            font-size: clamp(1rem, 0.0625rem + 3vw, 1.75rem);;
            line-height: 1;
        }

        .tags {
            span {
                border: solid 1px var(--title-color);
                background-color: white;
                padding: 2px 4px;
                
                &:not(:last-child) {
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>