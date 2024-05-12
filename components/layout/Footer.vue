<script setup lang="ts">
import type { Homepage } from '~/types'

const router = useRouter()
const config = useRuntimeConfig()
const homepage = useState<Homepage>('homepage')
const year = new Date().getFullYear()

const icon = computed(() => {
    if (!homepage.value) return undefined

    return `${config.public.apiUrl}/assets/${homepage.value.icon}`
})

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

function getHome() {
    router.push('/')
}


</script>

<template>
    <VFooter v-if="homepage">
        <VContainer>
            <VRow>
                <VCol class="text-h4 d-flex align-center">
                    <div>
                        <VImg
                            :src="icon"
                            :width="32"
                            :height="32"
                            @click="getHome"
                        />
                    </div>
                    <h6 class="ml-2">{{ homepage.fullname }}</h6>
                </VCol>
                <VSpacer />
                <VCol class="d-none d-md-flex justify-end">
                    <VBtn
                        v-for="(link, i) in navLinks"
                        :key="i"
                        :to="link.to"
                        class="mr-2"
                        variant="text"
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
            <VDivider class="my-5" />
            <VRow>
                <VCol cols="12" md="4">
                    <span>
                        © {{ year }} {{ homepage.fullname }}. All Rights Reserved.
                    </span>
                </VCol>
                <VSpacer />
                <VCol class="d-flex d-md-block flex-column align-center">
                    <VBtn
                        to="/versions"
                        variant="text"
                    >
                        Versions
                    </VBtn>
                    <VBtn
                        v-for="(link, i) in homepage.legal"
                        :key="i"
                        :to="link.url"
                        variant="text"
                    >
                        {{ link.title }}
                    </VBtn>

                    <VBtn
                        v-for="(link, i) in homepage.links"
                        :key="i"
                        :href="link.url"
                        :icon="true"
                        variant="text"
                    >
                        <span class="svg-container" v-html="link.svg" />
                    </VBtn>
                </VCol>
            </VRow>
        </VContainer>
    </VFooter>
</template>

<style scoped lang="scss">
.svg-container :deep(svg) {
    height: 20px;
}

</style>
