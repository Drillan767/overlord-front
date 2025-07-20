<script setup>
const route = useRoute()

const isMenuOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
    window.addEventListener('scroll', () => {
        scrolled.value = window.scrollY > 100
    })
})
</script>

<template>
    <VAppBar
        elevation="0"
        class="navbar"
        :class="{ scrolled }"
    >
        <template #default>
            <NuxtLink to="/" class="d-flex align-center">
                <VImg
                    src="/icons/logo.svg"
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
                    :active="route.path.startsWith('/articles')"
                    variant="text"
                    to="/articles"
                >
                    Articles
                </VBtn>
                <VBtn
                    :active="route.path.startsWith('/projects')"
                    variant="text"
                    to="/projects"
                >
                    Projects
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
        </VList>
    </VNavigationDrawer>
</template>

<style scoped>
.navbar {
    transition: all 0.3s ease-in-out;
    background-color: rgb(0, 0, 0);
    padding: 0 1rem;
    border-bottom: 1px solid transparent;
}

.navbar.scrolled {
    border-color: rgb(var(--v-theme-primary));
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
}

.logo {
    filter: drop-shadow(0 0 6px rgb(var(--v-theme-primary)));
    /* _animations.css */
    animation: pulse 2s infinite;
    margin-left: 1rem;
}
</style>
