<template>
    <div class="text-xl text-white mt-24">
        <h1>{{ route.params.slug }}</h1>
    </div>

</template>

<script setup lang="ts">
const route = useRoute()

</script>