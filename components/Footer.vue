<template>
  <footer>
    <div class="first-row">
        <NuxtLink to="/" class="brand">
          <img :src="`${config.apiUrl}/assets/${icon.id}`" :alt="icon.title" />
          <span>{{ fullname }} - {{ colorMode.value }}</span>
        </NuxtLink>
        <div class="links">
          <ul>
            <li v-for="(link, i) in footerLinks" :key="i">
              <NuxtLink :to="link.url">{{ link.title }}</NuxtLink>
            </li>
          </ul>
          <ColorScheme>
            <button class="theme" @click="$colorMode.preference = newTheme">
            <LandingDark v-if="colorMode.value === 'dark'" />
            <LandingLight v-if="colorMode.value === 'light'" />
          </button>
          </ColorScheme>
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
const colorMode = useColorMode()

interface Links {
  url: string,
  svg: string,
}

defineProps({
    links: Array as PropType<Array<Links>>,
    fullname: String,
    icon: Object,
})

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

const newTheme = computed(() => colorMode.value === 'light' ? 'dark' : 'light')

</script>
