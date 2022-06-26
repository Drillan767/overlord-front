<template>
    <section id="about">
        <div class="container mx-auto py-20" v-html="description"></div>
    </section>
    
</template>

<script setup lang="ts">
const props = defineProps({description: String})
</script>

<style lang="scss">

#about {
    min-height: 100vh;
    background-color: #121212;

    div {
        color: white;
    }
}

</style>