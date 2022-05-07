<template>
  <p>Landing Articles lezgoooo</p>

  <div v-for="(article, i) in articlesData">
    <p :key="i">{{ article.attributes.title }}</p>
  </div>
</template>

<script setup>
const filter = {featured: {eq: true}}
const { data } = await useAsyncData('articless', () => GqlArticles());
const articlesData = data.value.articles.data
</script>
