<script setup lang="ts">
interface Props {
    class?: string
    filename?: string
}

defineProps<Props>()
</script>

<template>
    <div class="code-block">
        <div v-if="filename" class="filename">
            {{ filename }}
        </div>
        <pre :class="$props.class">
            <slot />
        </pre>
    </div>
</template>

<style scoped>
.code-block {
    margin: 1rem 0;
}

.filename {
    background: rgba(147, 153, 178, 0.1);
    color: #93a5c2;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-family: 'JetBrains Mono', monospace;
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: 1px solid rgba(147, 153, 178, 0.2);
}

.code-block pre {
    margin: 0 !important;
    border-radius: 0 0 0.5rem 0.5rem;
}

.code-block pre:has(+ .filename) {
    border-radius: 0.5rem 0.5rem 0 0;
}

.filename + pre {
    border-radius: 0 0 0.5rem 0.5rem;
}
</style>
