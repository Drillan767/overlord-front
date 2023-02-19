<template>
    <div class="textarea" :class="{'error': error}">
         <div class="grow-wrap">
            <textarea @input="input" ref="textarea" placeholder=" " :id="identifier">{{ modelValue }}</textarea>
            
            <label :for="identifier">{{ label }}</label>
        </div>
        <p class="text-xs text-red-500" v-if="error">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
const textarea = ref();

defineProps({
    modelValue: String,
    identifier: String,
    label: String,
    error: {
        type: String,
        required: false
    }
})

const emit = defineEmits(['update:modelValue'])

const input = (e: Event) => {
    const target = (<HTMLInputElement>e.target)
    if (textarea.value && e) {
        textarea.value.style = `height: ${target.scrollHeight}px;`
        emit('update:modelValue', target.value)
    }
}
</script>