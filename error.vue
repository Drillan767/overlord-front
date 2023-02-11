<template>
    <div :class="`error-${error.statusCode}`" :style="bg">
        <div class="glitch-thumb">
            <div class="glitch-img" v-for="i in 5" :key="i" :style="bg" />
        </div>
        <div>{{ error }}</div>

        <div class="text-xl text-white">ERROR{{ error.statusCode }} CODE</div>

        <Button @click="redirectHome" type="button" :content="t('home')" />
    </div>
</template>

<script setup lang="ts">
import Button from '~~/components/layout/Button.vue'

const { t } = useI18n()
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
})

const redirectHome = () => clearError({redirect: '/'})
</script>

<style scoped lang="scss">
@import '~~/assets/styles/mixins';

.glitch-thumb {
    @include glitch-items(true);
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