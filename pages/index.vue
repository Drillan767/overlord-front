<template>
    <div>
        <pre>
          <code>
            {{ homepageData }}
          </code>
        </pre>

      <LandingArticles />

      <LandingProjects />
    </div>
</template>

<script setup lang="ts">
import LandingArticles from "~/components/landing/LandingArticles.vue";
import LandingProjects from "~/components/landing/LandingProjects.vue";

const { data } = await useAsyncData('homepage', () => GqlHomepage());
const homepageData = data.value.homepage.data.attributes

</script>
