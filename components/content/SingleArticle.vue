<template>
    <article
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        :class="{'animate': isHovered}"
    >
        <a :href="`/article/${article.slug}`" class="w-1/5">
            <div class="glitch-thumb">
                <div class="glitch-img" v-for="i in 5" :key="i"
                    :style="`background-image: url('${getThumb(article.illustration)}')`" />
            </div>
        </a>

        <div class="details w-4/5">
            <h2 :data-text="article.title" :class="{'glitch': isHovered}">
                <a :href="`/article/${article.slug}`">
                    {{ article.title }}
                </a>
            </h2>
            <p class="mt-4">
                {{ article.description }}
            </p>

            <p class="time mt-4">
                {{ lastCommit(article.date_created, article.date_updated) }}
            </p>
            <p class="tags mt-3">
                <template v-for="(tag, i) in article.tags" :key="i">
                    <span v-if="i !== 0" class="mx-2 separator">/</span>
                    <span class="cursor-pointer" @click="emit('changeTag', tag.Tag_id.title)"
                        :class="{ 'current': tag.Tag_id.title === activeTag }">
                        {{ tag.Tag_id.title }}
                    </span>
                </template>
            </p>
        </div>
    </article>
</template>

<script setup lang="ts">
import { Article } from '~~/types';

const config = useRuntimeConfig()
const emit = defineEmits(['changeTag'])
const isHovered = ref(false)

defineProps<{article: Article, activeTag: string}>()

const lastCommit = (created: string, updated: string | null) => {
    const date = updated ?? created
    return new Intl.DateTimeFormat('fr-FR').format(new Date(date))
}

const getThumb = (illustration: Article['illustration']) => {
    return `${config.apiUrl}/assets/${illustration.id}?width=300&height=200&fit=cover`
}
</script>

<style scoped lang="scss">
@import '~~/assets/styles/mixins';

article {
    @apply transition-colors flex gap-x-5 mb-10;
    color: var(--font-color);

    h2 {
        line-height: 1;
        font-size: clamp(1.25rem, 0.6338rem + 1.9718vw, 3rem);
    }

    .tags {
        span {
            @apply transition-colors;
            color: var(--font-color);

            &.current,
            &:not(.separator):hover {
                color: var(--purple);
            }
        }
    }

    @include content-item(100%, false);

    &.animate {
        .glitch-thumb {
            @include glitch-items(true);
        }

    }
}
</style>