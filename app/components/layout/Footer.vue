<script setup lang="ts">
const dayjs = useDayjs()

const year = dayjs().year()
</script>

<template>
    <VFooter class="flex-column footer">
        <div class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3">
            <VBtn
                variant="text"
                to="/"
            >
                Home
            </VBtn>
            <VBtn
                variant="text"
                to="/articles"
            >
                Articles
            </VBtn>
            <VBtn
                variant="text"
                to="/projects"
            >
                Projects
            </VBtn>
        </div>

        <div class="d-flex align-center justify-center ga-4 flex-wrap flex-grow-1 py-3">
            <a href="https://github.com/drillan767" target="_blank">
                <VImg src="/icons/github.svg" alt="github" width="24" height="24" />
            </a>

            <a href="https://x.com/jlevarato" target="_blank">
                <VImg src="/icons/x.svg" alt="x (twitter)" width="24" height="24" />
            </a>

            <a href="https://www.linkedin.com/in/josephlevarato/" target="_blank" class="d-flex align-center justify-center">
                <VImg src="/icons/linkedin.svg" alt="linkedin" width="24" height="24" />
            </a>
        </div>

        <div class="flex-1-0-100 text-center mt-2 pb-6">
            {{ year }} — <strong>Joseph Levarato</strong>
        </div>
    </VFooter>
</template>

<style scoped>
:deep(.v-img) {
    filter: invert(1);
}
</style>
