<script setup lang="ts">
/* const { t } = useI18n()
const { url } = useRuntimeConfig()
const img = useImage()
const { error } = defineProps(['error'])

const color = useTheme()

useHead({
    title: error.statusCode,
    bodyAttrs: {
        class: color
    }
})

const bg = computed(() => {
    const imgUrl = img(url + '/img/404.jpg', { modifiers: { format: 'webp' } })
    return `background-image: url('${imgUrl}')`
}) */

// const redirectHome = () => clearError({ redirect: '/' })
</script>

<template>
    <p>Error</p>
    <!-- <div class="error" :style="bg">
        <div class="glitch-thumb">
            <div class="glitch-img" v-for="i in 5" :key="i" :style="bg" />
        </div>

        <div class="message">
            <h1 class="glitch" :data-text="error.statusCode">{{ error.statusCode }}</h1>
            <h2>{{ error.statusMessage }}</h2>
            <Button @click="redirectHome" type="button" :content="'home'" />
        </div>
    </div> -->
</template>

<style scoped lang="scss">
@import '~~/assets/styles/mixins';

.error {
    @apply relative h-screen;
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
    }
}
</style>

<i18n lang="json">
{
    "fr": {
        "home": "Retourner à l'accueil"
    },
    "en": {
        "home": "Head back home"
    }
}
</i18n>
