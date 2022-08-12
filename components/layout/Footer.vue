<template>

<footer class="p-4 md:px-6 md:py-8">
    <div class="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
            <img class="mr-3 h-8" :src="`${config.apiUrl}/assets/${icon.id}`" :alt="icon.title" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ fullname }}</span>
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li v-for="(link, i) in footerLinks" :key="i">
                <NuxtLink :to="link.url" class="mr-4 hover:underline md:mr-6">{{ link.title }}</NuxtLink>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {{ year }}
            <a href="/" class="hover:underline">{{ fullname }}</a>. All Rights Reserved.
        </span>
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0 links">
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

<script setup>
const date = new Date;
const year = ref(date.getFullYear())
const config = useRuntimeConfig()

const props = defineProps({
    links: Array,
    fullname: String,
    icon: Object,
})

const footerLinks = ref([
    {
        url: '/',
        title: 'Home',
    },
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

<style lang="scss">
.links a {
    @apply text-white;

    svg {
        @apply h-5 w-5;
    }
}
</style>