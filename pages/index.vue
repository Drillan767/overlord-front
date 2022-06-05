<template>
    <div>
      <Head>
        <Title>Accueil</Title>
      </Head>

      <LandingViewport
        :full_name="homepageData.full_name"
        :baseline="homepageData.baseline"
      />

      <LandingArticles />

      <LandingProjects />
<!--

          <pre>
        <code>
          {{ homepageData }}
        </code>
      </pre>
 -->

    </div>
</template>

<script setup lang="ts">
import LandingArticles from "~/components/landing/LandingArticles.vue";
import LandingProjects from "~/components/landing/LandingProjects.vue";

const { data } = await useAsyncData('homepage', () => GqlHomepage());
const homepageData = data.value.homepage.data.attributes

</script>
