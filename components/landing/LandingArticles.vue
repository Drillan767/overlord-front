<template>
  <p>Landing Articles lezgoooo</p>

  <div v-for="(article, i) in articlesData">
    <pre>
      <code>
        {{ article }}
      </code>
    </pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('articless', () => GqlFeaturedArticles());
const articlesData = data.value.articles.data
</script>
