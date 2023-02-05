<template>
    <div>
        {{ error }}

        <button @click="redirectHome">
            Revenir à la page d'accueil
        </button>
    </div>
</template>

<script setup lang="ts">
const error = defineProps(['error'])

const redirectHome = () => clearError({redirect: '/'})
</script>