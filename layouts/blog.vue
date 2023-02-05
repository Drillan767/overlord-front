<template>
    <Navbar />
    <div id="blog">
        <div class="content">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Footer from '~~/components/layout/Footer.vue'
import Navbar from '~~/components/layout/Navbar.vue'
</script>

<style scoped lang="scss">

#blog {
    background-color: var(--bg-color);
    .content {
        min-height: var(--landing-min-height);
    }
}

</style>