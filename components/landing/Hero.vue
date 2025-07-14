<script setup lang="ts">

</script>

<template>
    <section id="hero" class="hero-section">
        <div class="hero-background-overlay">
            <div class="hero-bg-blur-1" />
            <div class="hero-bg-blur-2" />
        </div>

        <div class="hero-container">
            <h1 class="hero-title">
                Joseph Levarato
            </h1>
            <p class="hero-subtitle">
                Full Stack Web Developer
            </p>
        </div>
        <div class="hero-bottom-arrow">
            <VIcon icon="mdi-arrow-down" />
        </div>
    </section>
</template>

<style scoped>
#hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: #000000;
}

.hero-background-overlay {
    position: absolute;
    inset: 0;
    overflow: hidden;
}

.hero-bg-blur-1 {
    position: absolute;
    width: 16rem;
    height: 16rem;
    top: 25%;
    left: -5rem;
    border-radius: 50%;
    opacity: 0.2;
    background-color: rgb(var(--v-theme-primary));
    filter: blur(3rem);
}

.hero-bg-blur-2 {
    position: absolute;
    width: 24rem;
    height: 24rem;
    bottom: 25%;
    right: -5rem;
    border-radius: 50%;
    opacity: 0.15;
    background-color: rgb(var(--v-theme-primary));
    filter: blur(3rem);
}

.hero-container {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    z-index: 10;
    text-align: center;
}

.hero-title {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    opacity: 0;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.8));
    transition-delay: 0.2s;
    animation: fade-in 1s ease-in-out 0.2s forwards;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0;
    transition-delay: 0.4s;
    animation: fade-in 1s ease-in-out 0.4s forwards;
}
</style>