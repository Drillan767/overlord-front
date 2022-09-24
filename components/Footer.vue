<template>
  <footer>
    <div class="first-row">
      <a href="https://flowbite.com/">
        <img :src="`${config.apiUrl}/assets/${icon.id}`" :alt="icon.title" />
        <span>{{ fullname }}</span>
      </a>
      <div class="links">
        <ul>
          <li v-for="(link, i) in footerLinks" :key="i">
            <NuxtLink :to="link.url">{{ link.title }}</NuxtLink>
          </li>
        </ul>
        <div class="theme">
          <ColorScheme>
            <button @click="$colorMode.preference = newTheme">
              <LandingDark v-if="colorMode.value === 'dark'" />
              <LandingLight v-if="colorMode.value === 'light'" />
            </button>
          </ColorScheme>
        </div>
      </div>
    </div>
    <hr />
    <div class="second-row">
      <span>
        © {{ year }} <NuxtLink href="/">{{ fullname }}</NuxtLink>. All Rights Reserved.
      </span>
      <div class="socials">
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

<style scoped lang="scss">
footer {
  background-color: var(--bg-footer);
  @apply p-4 sm:p-6;

  .first-row {
    @apply md:flex md:justify-between;

    a {
      @apply flex items-center mb-6 md:mb-0;

      img {
        @apply mr-3 h-8;
      }

      span {
        color: var(--title-color);
        @apply self-center text-2xl font-semibold whitespace-nowrap;
      }
    }

    .links {
      @apply flex justify-between sm:justify-start;


      ul {
        @apply flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0;

        li a {
          color: var(--font-color);
          @apply mr-4 md:mr-6;
        }
      }

      .theme {
        @apply flex items-center;

        button {
          color: var(--font-color);
          @apply py-2 pr-4 pl-3 border border-gray-700 rounded;
        }
      }
    }
  }

  hr {
    @apply my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8;
  }

  .second-row {
    @apply sm:flex sm:items-center sm:justify-between;

    span {
      color: var(--font-color);
      @apply text-sm sm:text-center;
    }

    .socials {
      @apply flex mt-4 space-x-6 sm:justify-center sm:mt-0;

      a {
        color: var(--font-color);

        svg {
          @apply w-5 h-5;
        }
      }
    }
  }
}
</style>