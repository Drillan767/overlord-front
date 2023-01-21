<template>
    <section id="about">
        <div class="content">
            <div class="w-full md:w-1/2">
                <div class="flex justify-center">
                    <nuxt-img format="webp" :src="`${config.apiUrl}/assets/${user.id}`" :alt="user.title" />
                </div>
            </div>
            <div class="text-xl prose w-full md:w-1/2" v-html="description" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    description: String,
    user: {
        type: Object as PropType<{ id: string, title: string }>,
        required: true,
    },
})

const config = useRuntimeConfig()

const randInt = (min: number, max: number) => {
    const random = Math.random() * ((max + 1) - min)
    return Math.floor(random) + 1
}

const updatePositions = () => {
    const words = document.querySelectorAll<HTMLElement>('.words p')

    for (let i = 0; i < words.length; i++) {
        let newX = randInt(30, 150)
        let newY = randInt(20, 80)

        let topValue = `calc(${newY.toString()}% - 1ex)`
        let leftValue = `${newX.toString()}%`

        words[i].style.top = topValue;
        words[i].style.left = leftValue;
    }
}

onMounted(() => {
    updatePositions()
    setInterval(updatePositions, 5000)
})

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
            color: var(--font-color);
        }
    }
}
</style>