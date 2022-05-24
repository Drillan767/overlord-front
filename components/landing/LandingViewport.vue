<template>
  <div class="viewport">
      <h1 class="title glitch" data-text="Joseph Levarato">Joseph Levarato</h1>
      <p class="subtitle" v-html="subtitle"></p>
  </div>

    
</template>

<script setup lang="ts">

const props = defineProps({
    full_name: String,
    baseline: String,
})

const subtitle = computed(() => {
  const test =  props.baseline.replaceAll(/_([a-zA-Z]*)_/g,  (match, group) => {
    return `<span class="glitch" data-text="${group}">${group}</span>`
  });


  return test
})

</script>

<style scoped lang="scss">
.viewport {
  background-color: black;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-size: 100px;
    font-weight: 800;
  }

  .subtitle {
    color: white;
    font-size: 30px;
  }
}

</style>