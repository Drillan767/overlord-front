<script setup>
const isMenuOpen = ref(false)
</script>

<template>
    <VAppBar
        elevation="0"
        class="px-4 bg-black"
    >
        <template #default>
            <NuxtLink to="/" class="d-flex align-center">
                <VImg
                    src="/images/logo.svg"
                    width="48"
                    height="48"
                    alt="Logo"
                    class="logo"
                />
            </NuxtLink>
        </template>

        <template #append>
            <div class="d-none d-md-flex align-center ga-4">
                <VBtn
                    variant="text"
                    to="/articles"
                    exact
                >
                    Articles
                </VBtn>
                <VBtn
                    variant="text"
                    to="/projects"
                >
                    Projects
                </VBtn>
                <VBtn
                    variant="text"
                    to="/curriculum-vitae"
                >
                    CV
                </VBtn>
            </div>

            <VBtn
                icon
                variant="text"
                class="d-md-none"
                @click="isMenuOpen = !isMenuOpen"
            >
                <VIcon :icon="isMenuOpen ? 'mdi-close' : 'mdi-menu'" />
            </VBtn>
        </template>
    </VAppBar>

    <!-- Mobile Navigation Menu -->
    <VNavigationDrawer
        v-model="isMenuOpen"
        location="top"
        temporary
        class="d-md-none"
    >
        <VList>
            <VListItem
                to="/articles"
                title="Articles"
                @click="isMenuOpen = false"
            />
            <VListItem
                to="/projects"
                title="Projects"
                @click="isMenuOpen = false"
            />
            <VListItem
                to="/curriculum-vitae"
                title="CV"
                @click="isMenuOpen = false"
            />
        </VList>
    </VNavigationDrawer>
</template>

<style scoped>
.logo {
    filter: drop-shadow(0 0 6px rgb(var(--v-theme-primary)));
    animation: pulse 2s infinite;
    margin-left: 1rem;
}
</style>