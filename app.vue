<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { $bus } = useNuxtApp()

onMounted(() => {
  $bus.$on('test', () => console.log('coucou'))
})

useHead({
  titleTemplate: '%s | Joseph Levarato',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'My amazing site.' },
    { name: 'msapplication-Tilecolor', content: '#312b5e' },
    { name: 'theme-color', content: '#312b5e' },
  ],
  link: [
    {rel: 'apple-touch-icon', size: '180x180', href: '/icons/apple-touch-icon.png'},
    {rel: 'icon', type: 'image/png', size: '32x32', href: '/icons/favicon-32x32.png'},
    {rel: 'icon', type: 'image/png', size: '16x16', href: '/icons/favicon-16x16.png'},
    {rel: 'manifest', href: '/site.webmanifest'},
    {rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#312b5e'},
  ],
  bodyAttrs: {
    class: 'dark'
  }
})

</script>
