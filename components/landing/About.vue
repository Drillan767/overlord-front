<template>
    <section id="about">
        <VContainer class="d-flex align-center">
            <VRow v-if="homepage" justify="center">
                <VCol
                    cols="12"
                    md="5"
                    class="d-flex justify-center align-center"
                >
                    <div>
                        <VImg
                            :src="`${config.public.apiUrl}/assets/${homepage.user}`"
                            width="320"
                        />
                    </div>
                </VCol>
                <VCol
                    class="description"
                    cols="12"
                    md="5"
                    v-html="homepage.description"
                />
            </VRow>
        </VContainer>
    </section>
</template>

<script setup lang="ts">
import type { Homepage } from '~/types'

const config = useRuntimeConfig()
const homepage = useState<Homepage>('homepage')

</script>

<style scoped lang="scss">
@import '~~/assets/styles/_variables';

#about {
    display: flex;
    min-height: 100vh;

    .description :deep(p) {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.03125em;
        font-family: "Space Grotesk", sans-serif;
        margin-bottom: 1.25em;

        &:last-of-type::after {
            @include cursor;
        }
    }
}
</style>