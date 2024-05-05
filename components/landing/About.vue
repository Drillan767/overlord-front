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
@import '../../assets/styles/_variables';

#about {
    display: flex;
    min-height: 100vh;

    .description :deep(p) {
        margin-bottom: 1.25em;
        font-size: 20px;

        &:last-of-type::after {
            @include cursor;
        }
    }
}
</style>