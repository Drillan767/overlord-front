<template>
    <Navbar />
    <div id="blog">
        <div class="content">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">

#blog {
    background-color: var(--bg-color);
    .content {
        min-height: var(--landing-min-height);
    }
}

</style>