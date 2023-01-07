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
article {
    @apply transition-colors flex gap-x-5 mb-10;
    color: var(--font-color);

    h2 {
        line-height: 1;
        font-size: clamp(1.25rem, 0.6338rem + 1.9718vw, 3rem);
    }

    .glitch-thumb {
        position: relative;
        height: 200px;
        overflow: hidden;
        margin: 0 auto;

        @media (min-width: 768px) {
            // width: 350px;
        }

        .glitch-img {
            position: absolute;
            top: calc(-1 * var(--gap-vertical));
            left: calc(-1 * var(--gap-horizontal));
            width: calc(100% + var(--gap-horizontal) * 2);
            height: calc(100% + var(--gap-vertical) * 2);
            background-size: cover;
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: 50% 0;
            background-blend-mode: initial;

            &:nth-child(5) {
                background-color: #af4949;
                background-blend-mode: overlay;
            }

            &:nth-child(n+2) {
                opacity: 0;
            }
        }
    }

    .details {
        .tags {}
    }

    &.animate {
        .glitch-thumb {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 200px;
                z-index: 1;
                background: repeating-linear-gradient(to bottom, transparent 0%, rgba(0, 147, 255, 0.47) 1.75%, transparent 1%);
            }

            .glitch-img {
                &:nth-child(n+2) {
                    opacity: 1;
                }

                &:nth-child(2) {
                    transform: translate3d(10px, 0, 0);
                    animation: glitch-anim-1 4s infinite linear alternate;
                }

                &:nth-child(3) {
                    transform: translate3d(calc(-1 * 10px), 0, 0);
                    animation: glitch-anim-2 4s infinite linear alternate;
                }

                &:nth-child(4) {
                    transform: translate3d(0, calc(-1 * 5px), 0) scale3d(-1, -1, 1);
                    animation: glitch-anim-3 4s infinite linear alternate;
                }

                // Hover flash animation on last image.
                &:nth-child(5) {
                    animation: glitch-anim-flash 0.5s steps(1, end) infinite;
                }
            }
        }

    }
}
</style>