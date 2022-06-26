<template>
      <Head>
        <Title>Accueil</Title>
      </Head>

      <LandingViewport
        :full_name="homepageData.full_name"
        :baseline="homepageData.baseline"
      />

      <LandingAbout :description="homepageData.description" />

      <LandingArticles />

      <LandingProjects />

<!--

          <pre>
        <code>
          {{ homepageData }}
        </code>
      </pre>
 -->

</template>

<script setup lang="ts">

const { data } = await useAsyncData('homepage', () => GqlHomepage());
const homepageData = data.value.homepage.data.attributes

</script>
