<script setup lang="ts">
import type { Homepage } from '~/types'

const navLinks = [
    {
        title: 'Articles',
        to: '/articles',
    },
    {
        title: 'Projects',
        to: '/projects',
    },
/*     {
        title: 'Gaming',
        to: '/test'
    } */
]

const homepage = inject<Homepage>('homepage')

const { mobile } = useDisplay()
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const threshold = computed(() => {
    if (route.name !== 'index')
        return 300
    return mobile ? 1000 : 1100
})

const behavior = computed(() => route.name === 'index' ? 'inverted hide' : undefined)

function getHome() {
    router.push('/')
}

const icon = computed(() => {
    if (!homepage)
        return undefined

    return `${config.public.apiUrl}/assets/${homepage.logo}`
})
</script>

<template>
    <VAppBar
        class="nav"
        :scroll-behavior="behavior"
        :scroll-threshold="threshold"
    >
        <VContainer>
            <VRow>
                <VCol>
                    <VAppBarTitle v-if="homepage">
                        <div class="d-flex">
                            <div>
                                <VImg
                                    :src="icon"
                                    :width="32"
                                    :height="32"
                                    class="cursor-pointer"
                                    @click="getHome"
                                />
                            </div>
                            <span class="ml-2">
                                {{ homepage.full_name }}
                            </span>
                        </div>
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
</template>

<style scoped lang="scss">
@import '~~/assets/styles/_variables';

.nav {
    border-bottom: solid 4px var(--purple);
}
</style>
