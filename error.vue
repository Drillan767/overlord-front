<script setup lang="ts">
import Button from '~~/components/layout/Button.vue'

const { error } = defineProps(['error'])

const config = useRuntimeConfig()

const bg = computed(() => `${config.public.url}/img/404.jpg`)

const redirectHome = () => clearError({ redirect: '/' })

useHead({
    title: 'Error',
})
</script>

<template>
    <div class="error">
        <div class="glitch-thumb">
            <div v-for="i in 5" :key="i" class="glitch-img" :style="`background-image: url('${bg}')`" />
        </div>

        <div class="message">
            <h1
                class="glitch"
                :data-text="error.statusCode"
            >
                {{ error.statusCode }}
            </h1>
            <h2>{{ error.statusMessage }}</h2>
            <Button
                type="button"
                content="Head back home"
                @click="redirectHome"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '~~/assets/styles/mixins';

.error {
    height: 100vh;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &::before {
        content: '';
        z-index: 1;
        position: absolute;
        background-color: black;
        opacity: 0.6;
        height: 100%;
        width: 100%;
    }

    .glitch-thumb {
        z-index: 0;
        height: 100vh;
        width: 100%;
        position: absolute;
        @include glitch-items(true);

        &::before {
            height: 100vh;
        }
    }

    .message {
        z-index: 2;
    }
    /*     position: relative;
    height: 100vh;

    .glitch-thumb {
        z-index: 0;
        position: absolute;

        @include glitch-items(true);

        &::before {
            height: 100vh;
        }
    } */

    /* @apply relative h-screen;
    @include content-item(100%);

    .glitch-thumb {
        @apply z-0 h-full cursor-default absolute inset-0;
        @include glitch-items(true);

        &::before {
            @apply h-full;
        }
    }

    .message {
        @apply h-full relative flex flex-col items-center justify-center gap-y-4;

        h1 {
            @apply text-8xl;
        }

        h2 {
            @apply text-4xl;
        }

        &::before {
            content: '';
            @apply absolute inset-0 bg-black opacity-60;
        }
    } */
}
</style>
