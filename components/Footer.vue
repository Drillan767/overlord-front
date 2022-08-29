<template>
  <footer>
    <div class="first-row">
        <NuxtLink to="/" class="brand">
          <img :src="`${config.apiUrl}/assets/${icon.id}`" :alt="icon.title" />
          <span>{{ fullname }}</span>
        </NuxtLink>
        <div class="links">
          <ul>
            <li v-for="(link, i) in footerLinks" :key="i">
              <NuxtLink :to="link.url">{{ link.title }}</NuxtLink>
            </li>
          </ul>
          <button class="theme" @click="themeSwich">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </button>
        </div>
    </div>
    <hr />
    <div class="second-row">
      <span class="year">
        © {{ year }}
        <NuxtLink href="/">{{ fullname }}</NuxtLink>. All Rights Reserved.
      </span>
      <div class="links">
        <a
          v-for="(link, i) in links"
          :href="link.url"
          :key="i"
          v-html="link.svg"
          target="_blank"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const date = new Date;
const year = ref(date.getFullYear())
const config = useRuntimeConfig()

interface Links {
  url: string,
  svg: string,
}

defineProps({
    links: Array as PropType<Array<Links>>,
    fullname: String,
    icon: Object,
})

const { $bus } = useNuxtApp()

const currentTheme = ref(localStorage.getItem('theme'))

const themeSwich = () => {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  $bus.$emit('theme-switch', newTheme)
  currentTheme.value = newTheme
}

const footerLinks = ref([
  {
      url: '/articles',
      title: 'Articles',
  },
  {
      url: '/projects',
      title: 'Projects',
  }
])

</script>
