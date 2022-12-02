<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const color = useTheme()

useHead({
    bodyAttrs: {
        class: color
    },
})

</script>
