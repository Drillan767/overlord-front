<template>
    <VLayout>
        <slot />
    </VLayout>
    <!-- <div id="default">
        <Html>
            :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir"
            <Head>
                <template v-for="link in head.link" :key="link.id">
                    <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
                </template>
                <template v-for="meta in head.meta" :key="meta.id">
                    <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
                </template>
            </Head>

            <Body>
                <slot />
            </Body>
        </Html>
    </div> -->
</template>

<script setup lang="ts">
import Footer from '~/components/layout/Footer.vue';
import Navbar from '~/components/layout/Navbar.vue';

</script>