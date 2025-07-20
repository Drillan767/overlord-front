<script setup lang="ts">
const { data: about } = await useAsyncData('about', () => queryCollection('about').first())
</script>

<template>
    <section id="about" class="about-section">
        <VContainer>
            <VRow class="mb-8">
                <VCol>
                    <h2 class="text-h2 text-center">
                        About me
                    </h2>
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12" md="6">
                    <div class="about-image-container">
                        <VHover v-slot="{ isHovering, props }">
                            <div v-bind="props" class="image-wrapper">
                                <VImg
                                    src="http://localhost:3000/images/joseph.jpeg"
                                    alt="About me"
                                    class="about-image"
                                    :class="{ 'about-image-hover': isHovering }"
                                    cover
                                    max-height="600"
                                    width="100%"
                                />
                                <VOverlay
                                    :model-value="isHovering ?? false"
                                    contained
                                    scrim="rgba(98, 0, 238, 0.5)"
                                    class="overlay-transition"
                                />
                            </div>
                        </VHover>
                    </div>
                </VCol>
                <VCol
                    cols="12"
                    md="6"
                    class="d-flex align-center"
                >
                    <VCard variant="outlined">
                        <template #text>
                            <ContentRenderer v-if="about" :value="about" />
                        </template>
                    </VCard>
                </VCol>
            </VRow>
        </VContainer>
    </section>
</template>

<style scoped>
.about-section {
    margin: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.about-image-container {
    overflow: hidden;
    border-radius: 0.5rem;
}

.image-wrapper {
    position: relative;
    width: 100%;
}

.about-image {
    transition: transform 0.3s ease-in-out;
    border-radius: 0.5rem;
}

.about-image-hover {
    transform: scale(1.05);
}

.overlay-transition {
    transition: opacity 0.3s ease-in-out;
}
</style>
