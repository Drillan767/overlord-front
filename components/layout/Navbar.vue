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
    {
        title: 'Gaming',
        to: '/test'
    }
]

const homepage = useState<Homepage>('homepage')

const { getSingletonItem  } = useDirectusItems()

async function loadHomepageData() {
    const data = await getSingletonItem<Homepage>({
        collection: 'Homepage'
    })

    homepage.value = data
}

onMounted(() => loadHomepageData())

</script>

<template>
    <VAppBar class="nav">
        <VContainer>
            <VRow>
                <VCol>
                    <VAppBarTitle v-if="homepage">
                        {{ homepage.fullname }}
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
//components/layout/~/assets/styles/_variables.scss.scss
@import '../../assets/styles/_variables';

.nav {
    border-bottom: solid 4px var(--purple);
}
</style>

