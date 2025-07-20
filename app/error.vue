<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
    error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <VContainer>
        <VRow>
            <VCol>
                <VEmptyState
                    :title="error?.statusCode === 404 ? 'No idea what you were looking for.' : 'Uh... It wasn\'t supposed to do that.'"
                    action-text="Go back home"
                    @click:action="handleError"
                >
                    <template #headline>

                         <h1
                            :data-text="error?.statusCode"
                            class="text-h2 text-center layers glitch"
                            
                        >
                            {{ error?.statusCode }}
                        </h1>
                    </template>
                </VEmptyState>
            </VCol>
        </VRow>
    </VContainer>
    <div>
        <h2>{{ error?.statusCode }}</h2>
        <button @click="handleError">
            Clear errors
        </button>
    </div>
</template>
