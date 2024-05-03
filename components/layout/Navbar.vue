<template>
    <VAppBar class="nav">
        <VContainer>
            <VRow>
                <VCol>
                    <VAppBarTitle>
                        Joseph Levarato
                    </VAppBarTitle>
                </VCol>
                
                <VCol class="d-none d-md-flex justify-end">
                    <VBtn
                        v-for="(link, i) in navLinks"
                        :key="i"
                        :to="link.to"
                        class="mr-2"
                    >
                        {{ link.title }}
                    </VBtn>
                </VCol>

                <VCol class="d-flex d-md-none justify-end">
                    <VMenu>
                        <template #activator="{ props: menu }">
                            <VBtn
                                v-bind="menu"
                                variant="outlined"
                            >
                                <VIcon icon="mdi-menu" />
                            </VBtn>
                        </template>

                        <VList>
                            <VListItem
                                v-for="(link, i) in navLinks"
                                :key="i"
                                :to="link.to"
                                :title="link.title"
                            />
                        </VList>
                    </VMenu>
                </VCol>

               
            </VRow>
        </VContainer>
    </VAppBar>
    <nav>
        <!-- <div class="container">
            <NuxtLink to="/">
                <nuxt-img format="webp" :src="`${config.apiUrl}/assets/${icon.id}`" :title="icon.title" />
                <span>{{ fullname }}</span>
            </NuxtLink>
            <button data-collapse-toggle="navbar-default" aria-label="Display menu" type="button" @click="showMenu = !showMenu"
                aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <div class="link-wrapper" :class="{ 'hidden': !showMenu }">
                <ul>
                    <li v-for="(link, i) in navLinks" :key="i">
                        <NuxtLink :to="{name: link.url}" :class="{ 'current': isCurrentRoute(link.item) }">{{ link.title }}
                        </NuxtLink>
                    </li>

                    <li class="theme">
                        <button @click="toggleTheme" :aria-label="`toggle ${color === 'dark' ? 'light' : 'dark'} theme`">
                            <LandingDark v-if="color === 'dark'" />
                            <LandingLight v-if="color === 'light'" />
                        </button>
                    </li>
                </ul>
            </div>
        </div> -->
    </nav>
</template>

<script setup lang="ts">
import { VAppBarTitle } from 'vuetify/components';

const navLinks = [
    {
        title: 'Articles',
        to: '/articles',
    },
    {
        title: 'Projects',
        to: '/projects',
    },
    {
        title: 'Gaming',
        to: '/test'
    }
]

/* import { useRoute } from 'vue-router';
import LandingLight from '~~/components/svg/Light.vue'
import LandingDark from '~~/components/svg/Dark.vue'

const config = useRuntimeConfig()
const { locale } = useI18n()
const color = useTheme()
const route = useRoute()
const homepage = useHomepage()

const { fullname, icon } = homepage.value
const toggleTheme = () => color.value = color.value === 'dark' ? 'light' : 'dark'
const showMenu = ref(false)

const navLinks = ref([
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
} */

</script>

<style scoped lang="scss">
//components/layout/~/assets/styles/_variables.scss.scss
@import '../../assets/styles/_variables';

.nav {
    border-bottom: solid 4px var(--purple);
}
/* nav {
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        flex-wrap: wrap;

        >.link-wrapper a {

            &.current,
            &.router-link-exact-active {
                color: var(--purple);
            }
        }

        a {
            display: flex;
            align-items: center;

            img {
                height: 2.25rem;
                margin-right: 0.75rem;
            }

            span {
                white-space: nowrap;
                font-size: 1.25rem;
                line-height: 1.75rem;
                color: #fff;
                font-weight: 600;
            }
        }

        >button {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            border-radius: 0.5rem;

            @apply ring-2 ring-gray-600;

            &:focus {
                outline: none;
            }

            @media (min-width: 768px) {
                display: none;
            }

            svg {
                color: #fff;
            }
        }

        .link-wrapper {
            @apply w-full md:block md:w-auto;

            ul {
                @apply flex flex-col p-4 mt-4 rounded-lg border border-gray-700 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:flex md:items-center;

                li {
                    @apply mb-1;

                    a {
                        @apply block py-2 pr-4 pl-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent;
                    }
                }
            }

            .theme {
                @apply text-center md:text-left;

                button {
                    @apply py-2 pr-4 pl-3 border border-gray-700 rounded;
                }
            }
        }
    }
} */
</style>

