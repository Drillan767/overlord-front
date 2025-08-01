<script setup lang="ts">
interface Props {
    content: {
        path: string
        title: string
        description: string
        image: string
        date: string
        tags: string[]
    }
    activeTag?: string
}

defineProps<Props>()

const dayjs = useDayjs()
</script>

<template>
    <VHover v-slot="{ isHovering, props: hover }">
        <VCard
            v-bind="hover"
            :class="{ 'preview-card-hover': isHovering }"
            variant="flat"
            class="border-sm border-grey-darken-2 preview-card"
            min-height="540"
            tag="article"
        >
            <VHover v-slot="{ isHovering: imageHovering, props: imageHover }">
                <div v-bind="imageHover" class="image-wrapper">
                    <NuxtLink :to="content.path">
                        <VImg
                            :src="content.image"
                            :alt="content.title"
                            :class="{ 'image-hover': imageHovering }"
                            max-height="275"
                            class="preview-image"
                            cover
                        />

                        <VOverlay
                            :model-value="imageHovering ?? false"
                            contained
                            scrim="rgba(98, 0, 238, 0.5)"
                            class="overlay-transition"
                        />
                    </NuxtLink>
                </div>
            </VHover>

            <VCardText>
                <NuxtLink :to="content.path">
                    <h2>
                        {{ content.title }}
                    </h2>
                </NuxtLink>

                <div class="mb-6">
                    <VTooltip
                        :text="dayjs(content.date).format('D MMMM YYYY')"
                        location="bottom"
                    >
                        <template #activator="{ props: tooltip }">
                            <time v-bind="tooltip">
                                {{ dayjs(content.date).fromNow() }}
                            </time>
                        </template>
                    </VTooltip>
                </div>

                <p>
                    {{ content.description }}
                </p>

                <div>
                    <VChip
                        v-for="tag in content.tags"
                        :key="tag"
                        :text="tag"
                        :variant="activeTag === tag ? 'flat' : 'tonal'"
                        color="primary"
                        size="small"
                        rounded="xl"
                        class="mr-2"
                    />
                </div>

                <VBtn
                    :to="content.path"
                    class="cta"
                    variant="text"
                    color="primary"
                    append-icon="mdi-arrow-right"
                >
                    Read more
                </VBtn>
            </VCardText>
        </VCard>
    </VHover>
</template>

<style scoped>
h2 {
    margin-bottom: 0.5rem;
}

time {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 2rem;
}

.image-wrapper {
    overflow: hidden;
    position: relative;
}

.preview-image {
    transition: transform 0.3s ease-in-out;
}

.image-hover {
    transform: scale(1.05);
}

.preview-card {
    transition:
        all 0.3s,
        border-color 0.3s;
    border: 1px solid var(--v-theme-grey-darken-2);
}

.preview-card-hover {
    margin-top: -5px;
    border-color: rgb(var(--v-theme-primary));
    box-shadow:
        0 0 0 1px rgba(var(--v-theme-primary), 0.5),
        0 0 16px 4px rgba(var(--v-theme-primary), 0.4);
}

h2:hover {
    color: rgb(var(--v-theme-primary));
}

.cta {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
}
</style>
