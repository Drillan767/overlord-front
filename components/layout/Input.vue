<template>
    <div class="input" :class="{'error': error}">
        <input
            ref="input"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :type="type"
            placeholder=" "
            :id="identifier"
        />
        <label :for="identifier">
            {{ label }}
        </label>
        <p class="text-xs text-red-500" v-if="error">
            {{ error }}
        </p>
    </div>
</template>

<script setup>
const input = ref(null);
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: String,
    identifier: String,
    label: String,
    error: {
        type: String,
        required: false
    },
    type: {
        type: String,
        default: 'text',
    },
})

</script>
