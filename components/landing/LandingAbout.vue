<template>
    <section id="about">
      <div class="flex">
        <div class="container text-white mx-auto text-xl py-20 prose" v-html="description"></div>
      </div>
        <div>
          <img :src="$config.apiUrl + '/' + user.filename_download" :alt="user.title">
          <p>{{ $config.apiUrl }}</p>
        </div>
    </section>

</template>

<script setup lang="ts">
const props = defineProps({
  description: String,
  user: Object,
  words: Array,
})
</script>

<style lang="scss">

#about {
    min-height: 100vh;
    background-color: #121212;
}

</style>
