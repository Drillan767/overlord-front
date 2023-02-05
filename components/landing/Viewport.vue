<template>
    <header id="viewport">
        <div class="content">
            <h1 class="title glitch" :data-text="fullname">{{ fullname }}</h1>
            <p class="subtitle" v-html="baseline"></p>

            <div class="scroll">
                <span class="typed-text" @click="scrollNext">{{ typedText }}</span>
                <span class="input-cursor"></span>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

const { locale, t } = useI18n() 
const homepage = useHomepage()
const { fullname, translations } = homepage.value
const scrollText = t('scrollText')
const typedText = ref('')

let i = 0

onMounted(() => {
    setTimeout(() => {
        document.querySelector('.input-cursor')?.classList.add('typing')
        typeLetters()

    }, 2000)
})

const baseline = computed(() => {
    const baseline = translations.find((t) => t.languages_code.code === locale.value)?.baseline
    if (baseline) {
        return baseline.replaceAll(/_([a-zA-Zé]*)_/g, (_, g) => `<span class="glitch" data-text="${g}">${g}</span>`)
    }
    return ''
})

const scrollNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

const typeLetters = () => {
    if (i < scrollText.length) {
        typedText.value += scrollText.charAt(i)
        i++
        setTimeout(typeLetters, 150)
    } else {
        document.querySelector('.input-cursor')?.classList.remove('typing')
        document.querySelector('.typed-text')?.classList.add('underline', 'cursor-pointer')

    }
}

</script>

<style scoped lang="scss">
#viewport {
    background-color: var(--bg-color);
    @apply flex flex-col justify-center items-center;
    height: 100vh;

    .content {
        position: relative;

        .title {
            font-size: clamp(2.25rem, -2.75rem + 16vw, 6.25rem);
            font-weight: 800;
            text-align: center;
            color: var(--title-color);
        }

        .subtitle {
            color: var(--font-color);
            text-align: center;
            font-size: clamp(1.25rem, 0.4688rem + 2.5vw, 1.875rem);
        }

        .scroll {
            @apply absolute flex justify-center w-full;
            top: 38vh;

            p {
                color: white;
            }
        }
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

<i18n lang="json">
{
    "fr": {
        "scrollText": "Découvrez..."
    },
    "en": {
        "scrollText": "Discover..."
    }
}
</i18n>