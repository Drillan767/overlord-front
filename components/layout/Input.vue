<template>
    <div class="input">
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
    </div>
</template>

<script setup>
const input = ref(null);
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: String,
    identifier: String,
    label: String,
    type: {
        type: String,
        default: 'text',
    },
})

</script>
