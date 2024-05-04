<template>
    <section id="viewport">

        <h1
            v-if="homepage"
            class="title glitch"
            :data-text="homepage.fullname"
        >
            {{ homepage.fullname }}
        </h1>

        <p class="subtitle" v-html="subtitle"></p>

        <div class="scroll">
            <span
                class="typed-text"
                @click="scrollNext"
            >
                {{ typedText }}
            </span>
            <span v-if="homepage" class="input-cursor"></span>
        </div>


        <!-- <div class="content">
            <h1 class="title glitch" :data-text="fullname">{{ fullname }}</h1>
            <p class="subtitle" v-html="subtitle"></p>

            <div class="scroll">
                <span class="typed-text" @click="scrollNext">{{ typedText }}</span>
                <span class="input-cursor"></span>
            </div>
        </div> -->
    </section>
</template>

<script setup lang="ts">
import type { Homepage } from '~/types'
import { useGoTo } from 'vuetify'


const scrollText = 'Scroll down...'

const goTo = useGoTo()
const homepage = useState<Homepage>('homepage')

const typedText = ref('')

const subtitle = computed(() => {
    if (!homepage.value) return ''

    return homepage.value.baseline.replaceAll(/_([a-zA-Zéè]*)_/g, (m, g) =>
        `<span class="glitch" data-text="${g}">${g}</span>`)
})

const scrollNext = () => goTo('#about', {
    duration: 500,
    easing: 'easeInOutCubic'
})

/* const typeLetters = () => {
    document.querySelector('.input-cursor')?.classList.add('typing')

    typedText.value = scrollText.split('').reduce((acc, val) => {
        acc += val
        return acc
    }, '')
} */

const typeLetters = async () => {
    document.querySelector('.input-cursor')?.classList.add('typing');

    const characters = scrollText.split('');
    let typedTextAccumulator = '';

    for (const char of characters) {
        typedTextAccumulator += char;
        typedText.value = typedTextAccumulator;
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    document.querySelector('.input-cursor')?.classList.remove('typing')
    document.querySelector('.typed-text')?.classList.add('text-decoration-underline', 'cursor-pointer')
};


onMounted(() => {
    setTimeout(() => typeLetters(), 2000)
})

</script>

<style scoped lang="scss">
@keyframes blink {
    0% {opacity: 1;}
    40% {opacity: 1;}
    60% {opacity: 0;}
    100% {opacity: 0;}
}

#viewport {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .title {
        font-size: clamp(2.25rem, -2.75rem + 16vw, 6.25rem);
        font-weight: 800;
        text-align: center;
    }

    .subtitle {
        text-align: center;
        font-size: clamp(1.25rem, 0.4688rem + 2.5vw, 1.875rem);
    }

    .scroll {
        font-family: 'JetBrains Mono';
        margin-top: 80px;
        font-size: 20px;
    }

    .content {
        position: relative;


    }

    .input-cursor {
        display: inline-block;
        width: 15px;
        height: 28px;
        background-color: white;
        margin-left: 8px;
        animation: blink .6s linear infinite alternate;
    }

    .typed-text {
        @apply text-xl font-mono;
        color: var(--font-color);
    }

    .typing {
        animation: none;
    }
}
</style>
