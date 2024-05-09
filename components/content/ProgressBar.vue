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

</script>

<template>
    <div class="progress">
        <span class="global">
            {{ displayPercentage }}
        </span>
        <span class="bar">
            {{ progressBar }}
        </span>
    </div>
</template>