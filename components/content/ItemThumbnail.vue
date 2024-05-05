<script setup lang="ts">
import type { Article, DisplayedProject } from '~~/types'

interface Props {
    itemType: string,
    item: Article|DisplayedProject
}

defineProps<Props>()

const config = useRuntimeConfig()


</script>

<template>
    <VCard
        :to="`/${itemType}/${item.slug}`"
        variant="text"
    >
        <VHover>
            <template #default="{ isHovering, props: hover }">

                <div
                    v-bind="hover"
                    :class="{ 'animate': isHovering }"
                    class="glitch-thumb"
                >
                    <div
                        v-for="i in 5"
                        :key="i"
                        class="glitch-img" 
                        :style="`background-image: url('${config.public.apiUrl}/assets/${item.illustration}?width=300&height=200&fit=cover')`"
                    />
                </div>

                <VCardText v-bind="hover">
                    <span
                        :class="{ 'glitch': isHovering }"
                        :data-text="item.title"
                        class="c-title"
                    >
                        {{ item.title }}
                    </span>
                </VCardText>

                <VCardActions class="d-flex justify-end">
                    <VChip
                        v-for="(tag, i) in item.tags"
                        :key="i"
                        :text="tag.Tag_id.title"
                        class="ml-2"
                        variant="outlined"
                    />
                </VCardActions>
            </template>
        </VHover>
    </VCard>
</template>

<style scoped lang="scss">
@import '../../assets/styles/mixins';

.c-title {
    font-size: clamp(1.5rem,1.3239rem + .5634vw,2rem);
}

.glitch-thumb {
    --gap-vertical: 5px;
    --gap-horizontal: 10px;
    position: relative;
    height: 200px;
    overflow: hidden;
    margin: 0 auto;

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
    &.animate {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 200px;
            z-index: 1;
            background: repeating-linear-gradient(to bottom, transparent 0%, rgba(0, 147, 255, 0.47) 1%, transparent 1%);
        }

        .glitch-img {
            &:nth-child(n+2) {
                opacity: 1;
            }

            &:nth-child(2) {
                transform: translate3d(10px,0,0);
                animation: glitch-anim-1 4s infinite linear alternate;
            }

            &:nth-child(3) {
                transform: translate3d(calc(-1 * 10px),0,0);
                animation: glitch-anim-2 4s infinite linear alternate;
            }

            &:nth-child(4) {
                transform: translate3d(0, calc(-1 * 5px), 0) scale3d(-1,-1,1);
                animation: glitch-anim-3 4s infinite linear alternate;
            }

            // Hover flash animation on last image.
            &:nth-child(5) {
                animation: glitch-anim-flash 0.5s steps(1, end) infinite;
            }
        }
    }
}
</style>