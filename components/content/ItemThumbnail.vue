<script setup lang="ts">
import type { Article, DisplayedProject } from '~~/types'

interface Props {
    itemType: string
    item: Article | DisplayedProject
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
                    :class="{ animate: isHovering }"
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
                        :class="{ glitch: isHovering }"
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
.c-title {
    font-size: clamp(1.5rem, 1.3239rem + 0.5634vw, 2rem);
}
</style>
