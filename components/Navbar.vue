<template>
    <nav>
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
            <svg xmlns="http://www.w3.org/2000/svg" v-if="currentTheme === 'dark'" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" v-if="currentTheme === 'light'" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>

          </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

interface Links {
  url: string,
  svg: string,
}

defineProps({
    links: Array as PropType<Array<Links>>,
    fullname: String,
    icon: Object,
})

const config = useRuntimeConfig()
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