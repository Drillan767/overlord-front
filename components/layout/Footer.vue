<template>
    <footer>
        <div class="first-row">
            <div class="flex gap-x-5">
                <NuxtLink to="/">
                    <nuxt-img format="webp" :src="`${config.apiUrl}/assets/${icon.id}`" :alt="icon.title" />
                    <span>{{ fullname }}</span>
                </NuxtLink>
            </div>
            <div class="links">
                <ul>
                    <li v-for="(link, i) in footerLinks" :key="i">
                        <NuxtLink :to="link.url" :class="{ 'current': isCurrentRoute(link.item) }">
                            {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>
                <LanguageSwitcher />
                <div class="theme">
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
                © {{ year }} <NuxtLink href="/">{{ fullname }}</NuxtLink>. {{ t('arr') }}.
            </span>
            <div class="socials">

                <span>Mentions légales</span>
                <span>|</span>
                <a
                    v-for="(link, i) in links"
                    :href="link.url"
                    :key="i"
                    :aria-label="link.display"
                    v-html="link.svg"
                    target="_blank"
                />
            </div>
        </div>
    </footer>

</template>

<script setup lang="ts">
import LandingLight from '~~/components/svg/Light.vue'
import LandingDark from '~~/components/svg/Dark.vue'
import LanguageSwitcher from '~~/components/layout/LanguageSwitcher.vue'

const date = new Date;
const year = ref(date.getFullYear())
const config = useRuntimeConfig()
const { t } = useI18n()
const color = useTheme()
const route = useRoute()
const homepage = useHomepage()
const { fullname, links, icon } = homepage.value

const footerLinks = ref([
    {
        url: '/articles',
        title: 'Articles',
        item: 'article',
    },
    {
        url: '/projects',
        title: t('projects'),
        item: 'project',
    }
])

const isCurrentRoute = (link: string) => {
    if (route.name) {
        return route.name.toString().includes(link)
    }

    return false
}

const toggleTheme = () => color.value = color.value === 'dark' ? 'light' : 'dark'

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
                    @apply mr-4 md:mr-6;

                    &:not(.current), &:not(.router-link-exact-active) {
                        color: var(--font-color);
                    }
                    &.current, &.router-link-exact-active {
                        color: var(--purple);
                    }
                }
            }

            .theme {
                @apply flex items-center ml-2;

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

<i18n lang="json">
{
    "fr": {
        "arr": "Tous Droits Réservés"
    },
    "en": {
        "arr": "All Rights Reserved"
    }
}
</i18n>