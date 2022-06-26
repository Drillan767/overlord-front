<template>
      <Head>
        <Title>Accueil</Title>
      </Head>

      <LandingViewport
        :full_name="homepageData.fullname"
        :baseline="homepageData.baseline"
      />

      <LandingAbout
          :description="homepageData.description"
          :user="homepageData.user"
          :words="homepageData.words"
      />

      <LandingArticles />

      <LandingProjects />


<!--  <pre>
        <code>
          {{ homepageData }}
        </code>
      </pre>-->

</template>

<script setup lang="ts">

const { data } = await useAsyncData('homepage', () => GqlHomepage());
const homepageData = data.value.Homepage;

</script>
