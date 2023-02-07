<template>
    <div :class="`error-${error.statusCode}`">
        <div>{{ error }}</div>

        <div class="text-xl text-white">ERROR{{ error.statusCode }} CODE</div>

        <button @click="redirectHome">
            Revenir à la page d'accueil
        </button>
    </div>
</template>

<script setup lang="ts">
const { error } = defineProps(['error'])

const color = useTheme()

useHead({
    title: error.statusCode,
    bodyAttrs: {
        class: color
    }
})

const redirectHome = () => clearError({redirect: '/'})
</script>