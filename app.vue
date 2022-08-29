<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { $bus } = useNuxtApp()

const switchTheme = (theme) => {
  const oldTheme = theme === 'dark' ? 'light' : 'dark'
  const body = document.querySelector('body')
  body.classList.remove(oldTheme)
  body.classList.add(theme)
  localStorage.setItem('theme', theme)
}

const initTheme = () => {
  const theme = localStorage.getItem('theme')
  const body = document.querySelector('body')
  if (!theme) {
    const preferedTheme = window.matchMedia("(prefers-color-scheme: dark)")
    if (preferedTheme.matches) {
      
    } else {
      body.classList.remove('dark')
      body.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }
}

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme) {
    switchTheme(theme)
  } else {
    const preferedTheme = window.matchMedia("(prefers-color-scheme: dark)")
    const retrievedTheme = preferedTheme.matches ? 'dark' : 'light'
    switchTheme(retrievedTheme)
  }

  $bus.$on('theme-switch', (type) => switchTheme(type))
})

useHead({
  titleTemplate: '%s | Joseph Levarato',

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
