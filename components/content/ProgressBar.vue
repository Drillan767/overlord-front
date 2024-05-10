<script setup lang="ts">
const barWidth = ref(0)
const readPercentage = ref(0)

const progressBar = computed(() => {
    const charWidth = 9.6
    const total = Math.floor(Math.floor(barWidth.value - 10) / charWidth) - 2
    const progress = Math.floor((readPercentage.value / 100) * total)

    let response = '['

    for (let i = 0; i <= total; i++) {
        response += i <= progress ? '#' : '.'
    }

    return response + ']'
})

const displayPercentage = computed(() => {
    let result = 'Progress: ['

    if (readPercentage.value && readPercentage.value >= 0) {
        const spaces = 3 - readPercentage.value.toString().length
        result += ' '.repeat(spaces)
        result += readPercentage.value
    }
    else {
        result += '  0'
    }

    result += '%]'

    return result
})

const getScrollPercent = () => {
    const prose = document.querySelector<HTMLDivElement>('.v-card-text')

    if (prose) {
        const proseTop = prose.getBoundingClientRect().top + document.documentElement.scrollTop
        const proseBottom = proseTop + prose.clientHeight
        const browserBottom = window.scrollY + window.innerHeight

        if (browserBottom < proseTop) {
            return 0
        } else if (browserBottom > proseTop && browserBottom < proseBottom) {
            return Math.floor((browserBottom - proseTop) / prose.offsetHeight * 100)
        } else {
            return 100
        }
    } else {
        return 0
    }
}

onMounted(() => {
    const bar = document.querySelector<HTMLElement>('.progress .bar')

    if (bar) barWidth.value = bar.clientWidth

    document.addEventListener('scroll', () => {
        readPercentage.value = getScrollPercent()
    })
})

</script>

<template>
    <VRow class="progress-container" no-gutters>
        <VCol>
            <div class="progress">
                <span class="global">
                    {{ displayPercentage }}
                </span>
                <span class="bar">
                    {{ progressBar }}
                </span>
            </div>
        </VCol>
    </VRow>
</template>

<style scoped lang="scss">
@import "~~/assets/styles/_variables.scss";

.progress-container {
    position: fixed;
    top: 64px;
    width: 100%;
    z-index: 1;
}

.progress {
    background-color: rgb(var(--v-theme-surface));
    padding: 10px;
    font-family: 'Jetbrains Mono', monospace;
    display: flex;
    gap: 10px;

    .global {
        background-color: green;
        flex: 0 0 auto;
    }

    .bar {
        flex: 1;
        display: inline-block;
    }
}
</style>