<template>
    <section id="about">
        <div class="content">
            <div class="w-1/2">
                <div class="flex justify-center">
                    <img :src="`${config.apiUrl}/assets/${user.id}`" :alt="user.title" />
                </div>

                <div class="words">
                    <p v-for="(word, i) in words" :key="i" class="text-xl text-white font-bold">
                        {{ word.word }}
                    </p>
                </div>
            </div>
            <div class="text-white text-xl prose w-1/2" v-html="description" />
      </div>
    </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';


interface WordList {
    word: string
}

const props = defineProps({
  description: String,
  user: Object,
  words: Array as PropType<Array<WordList>>,
})

const config = useRuntimeConfig()

const randInt = (min, max) => Math.floor(Math.random() * ((max + 1) - min)) + 1

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
