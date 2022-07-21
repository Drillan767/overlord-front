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

  <LandingFeatured />

  <Footer
    :links="homepageData.links"
    :icon="homepageData.icon"
    :fullname="homepageData.fullname"
    />
</template>

<script setup lang="ts">
import Footer from "../components/layout/footer.vue";

const { data } = await useAsyncData('homepage', () => GqlHomepage());
const homepageData = data.value.Homepage;

onMounted(() => {
  const ie = new IntersectionObserver((entries, observer) => {
    entries.forEach((e) => {
      if (e.intersectionRatio > 0.5) {
        e.target.classList.add('fade-in')

        observer.unobserve(e.target)
      }
    })
  }, {
    threshold: [0.5]
  })

  const ids = ['viewport', 'about']

  ids.forEach((id) => {
    const el = document.getElementById(id)
    ie.observe(el)
  })
})
</script>
