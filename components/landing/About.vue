<template>
    <section id="about">
        <div class="content">
            <div class="w-full md:w-1/2">
                <div class="flex justify-center">
                    <nuxt-img format="webp" :src="`${config.apiUrl}/assets/${user.id}`" :alt="user.title" />
                </div>
            </div>
            <div class="prose" v-html="description" />
        </div>
    </section>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const homepage = useHomepage()
const { user, description } = homepage.value

</script>

<style scoped lang="scss">
#about {
    background-color: var(--bg-about);
    min-height: var(--landing-min-height);
    padding: var(--landing-padding);

    .content {

        @media (min-width: 768px) {
            display: flex;
        }

        .prose {
            @apply text-xl w-full md:w-1/2 prose-a:text-violet-600 dark:prose-invert;
            
            p {
                color: var(--font-color);
            }
        }
    }
}
</style>