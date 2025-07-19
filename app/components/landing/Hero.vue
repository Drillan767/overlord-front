<script setup lang="ts">
import { useGoTo } from 'vuetify'

const goTo = useGoTo()
</script>

<template>
    <section id="hero" class="hero-section">
        <div class="hero-background-overlay">
            <div class="hero-bg-blur-1" />
            <div class="hero-bg-blur-2" />
        </div>

        <div class="hero-container">
            <h1
                class="hero-title layers glitch"
                data-text="Joseph Levarato"
            >
                Joseph Levarato
            </h1>
            <p class="hero-subtitle">
                Full Stack Web Developer
            </p>
        </div>
        <div class="mt-8">
            <VIcon
                icon="mdi-arrow-down"
                @click="goTo('#about')"
            />
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
}

.hero-background-overlay {
    position: absolute;
    inset: 0;
    overflow: hidden;
}

[class^='hero-bg-blur-'] {
    position: absolute;
    border-radius: 50%;
    border-radius: 50%;
    background-color: rgb(var(--v-theme-primary));
    filter: blur(3rem);
}

.hero-bg-blur-1 {
    width: 16rem;
    height: 16rem;
    top: 25%;
    left: -5rem;
    opacity: 0.2;
}

.hero-bg-blur-2 {
    width: 24rem;
    height: 24rem;
    bottom: 25%;
    right: -5rem;
    opacity: 0.15;
}

.hero-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
    margin-bottom: 1rem;
}

.hero-subtitle {
    margin-bottom: 2rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
}

@media (min-width: 768px) {
    .hero-title {
        font-size: 3.75rem;
        line-height: 1;
    }

    .hero-subtitle {
        font-size: 1.5rem;
        line-height: 2rem;
    }
}
@media (min-width: 1024px) {
    .hero-title {
        font-size: 4.5rem;
        line-height: 1;
    }
}
</style>
