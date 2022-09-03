<template>
    <nav>
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
const colorMode = useColorMode()

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