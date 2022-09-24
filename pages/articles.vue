<template>
    <div id="articles">
      <Head>
        <Title>Articles</Title>
      </Head>

      <h1 class="glitch" data-text="ARTICLES">
        ARTICLES
      </h1>

      <NuxtLink to="/">Page d'accueil</NuxtLink><br />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blog",
});

const { data } = useAsyncData('articles', () => GqlArticles())
const Articles = data.value

</script>

<style scoped lang="scss">
#articles {
  h1 {
    color: var(--title-color)
  }
}
</style>
