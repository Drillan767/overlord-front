<script setup lang="ts">
const { getSingletonItem  } = useDirectusItems()

const test = await getSingletonItem ({
    collection: 'Homepage'
})
</script>

<template>
    <p>Bjr</p>
    {{ test }}
</template>