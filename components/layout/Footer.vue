<template>
    <footer>
<!--         <div class="first-row">
            <div class="flex gap-x-5">
                <NuxtLink to="/">
                    <nuxt-img format="webp" :src="`${config.apiUrl}/assets/${icon.id}`" :alt="icon.title" />
                    <span>{{ fullname }}</span>
                </NuxtLink>
            </div>
            <div class="links">
                <ul>
                    <li v-for="(link, i) in footerLinks" :key="i">
                        <NuxtLink :to="{name: link.url}" :class="{ 'current': isCurrentRoute(link.item) }">
                            {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>
                
                <div class="buttons">
                    <LanguageSwitcher />

                    <button @click="toggleTheme" :aria-label="`toggle ${color === 'dark' ? 'light' : 'dark'} theme`">
                        <LandingDark v-if="color === 'dark'" />
                        <LandingLight v-if="color === 'light'" />
                    </button>
                </div>
            </div>
        </div>
        <hr />
        <div class="second-row">
            <span>
                © {{ year }} <NuxtLink href="/">{{ fullname }}</NuxtLink>. All Rights Reserved.
            </span>
            <div class="links">
                <div class="internal">
                    <NuxtLink to="/versions">
                        Versions
                    </NuxtLink>
                    <NuxtLink v-for="(link, i) in legal" :key="i" :to="link.url">
                        {{ link.title }}
                    </NuxtLink>
                </div>

                <span class="separator">|</span>
                <div class="socials">
                    <a v-for="(link, i) in links" :href="link.url" :key="i" :aria-label="link.display" v-html="link.svg"
                    target="_blank" />
                </div>
            </div>
        </div> -->
    </footer>

</template>

<script setup lang="ts">
import LandingLight from '~~/components/svg/Light.vue'
import LandingDark from '~~/components/svg/Dark.vue'
import LanguageSwitcher from '~~/components/layout/LanguageSwitcher.vue'

/* const date = new Date;
const year = ref(date.getFullYear())
const config = useRuntimeConfig()
const { t, locale } = useI18n()
const color = useTheme()
const route = useRoute()
const homepage = useHomepage()
const { fullname, links, icon, legal } = homepage.value

const footerLinks = ref([
    {
        url: `articles___${locale.value}`,
        title: 'Articles',
        item: 'article',
    },
    {
        url: `projects___${locale.value}`,
        title: 'Projects',
        item: 'project',
    }
])

const isCurrentRoute = (link: string) => {
    if (route.name) {
        return route.name.toString().includes(link)
    }

    return false
}

const toggleTheme = () => color.value = color.value === 'dark' ? 'light' : 'dark' */

</script>

<style scoped lang="scss">
footer {
    background-color: var(--bg-footer);
    @apply p-4 sm:p-6;

    .first-row {
        @apply md:flex md:justify-between;

        a {
            @apply flex items-center;

            img {
                @apply mr-3 h-8;
            }

            span {
                color: var(--title-color);
                @apply self-center text-2xl font-semibold whitespace-nowrap;
            }
        }

        .links {
            @apply flex justify-between sm:justify-start gap-x-5 my-4 md:my-0;

            ul {
                @apply flex flex-wrap items-center text-sm text-gray-500 gap-x-5;

                li a {

                    &:not(.current),
                    &:not(.router-link-exact-active) {
                        color: var(--font-color);
                    }

                    &.current,
                    &.router-link-exact-active {
                        color: var(--purple);
                    }
                }
            }

            .buttons {
                @apply flex items-center ml-2 gap-x-5;

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
        color: var(--font-color);
        @apply sm:flex sm:items-center sm:justify-between;

        .links {
            @apply block md:flex gap-x-5;

            .internal {
                @apply flex gap-x-4;

                @media (max-width: 768px) {
                    @apply justify-center my-4;
                }

                a {
                    &:not(.current),
                    &:not(.router-link-exact-active) {
                        color: var(--font-color);
                    }

                    &.current,
                    &.router-link-exact-active {
                        color: var(--purple);
                    }
                }
            }

            .separator {
                @apply hidden md:inline-block;
            }
        }

        .socials {
            @apply flex mt-4 justify-center space-x-6 sm:mt-0;

            

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
