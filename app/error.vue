<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError,
})

useHead({
    title: () => `Error ${props.error?.statusCode}`,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <VContainer>
        <VRow>
            <VCol class="h-screen d-flex align-center justify-center">
                <VEmptyState
                    :title="error?.statusCode === 404 ? 'No idea what you were looking for.' : 'Uh... It wasn\'t supposed to do that.'"
                    action-text="Go back home"
                    @click:action="handleError"
                >
                    <template #headline>
                        <h1
                            :data-text="error?.statusCode"
                            class="text-center layers glitch"
                        >
                            {{ error?.statusCode }}
                        </h1>
                    </template>
                </VEmptyState>
            </VCol>
        </VRow>
    </VContainer>
</template>
