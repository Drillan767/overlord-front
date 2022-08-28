<template>
    <div class="textarea relative">
         <div class="grow-wrap">
            <textarea @input="input" ref="textarea" placeholder=" " :id="identifier">{{ modelValue }}</textarea>
            
            <label :for="identifier" class="text-violet-800">{{ label }}</label>
        </div>

    </div>
</template>

<script setup lang="ts">
const textarea = ref(null);

const props = defineProps({
    modelValue: String,
    identifier: String,
    label: String,
})

const emit = defineEmits(['update:modelValue'])

const input = (e) => {
    textarea.value.style = `height: ${e.target.scrollHeight}px;`
    emit('update:modelValue', e.target.value)
}
</script>