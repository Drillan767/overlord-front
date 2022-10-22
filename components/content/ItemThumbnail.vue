<template>
    <NuxtLink :to="`/${itemType}/${item.slug}`">
        <article class="content-item">
            <div class="glitch-thumb">
                <div
                    class="glitch-img"
                    v-for="i in 5"
                    :key="i"
                    :style="`background-image: url('${getThumb(item)}')`"
                />
            </div>
            <div class="details">
                <p :data-text="item.title">
                    {{ item.title }}
                    <span class="cursor"></span>
                </p>
                <div class="tags">
                    <span v-for="(tag, j) in item.tags" :key="j">
                    {{ tag.Tag_id.title }}
                    </span>
                </div>
            </div>
        </article>
    </NuxtLink>
</template>

<script setup lang="ts">

type Content = {
    itemType: string
    item: {
        slug?: string,
        title?: string,
        illustration?: {
            id: string,
            title?: string,
        }
        tags?: {
            Tag_id: {
                title?: string
            }
        }[]
    }
}

const config = useRuntimeConfig()
const props = defineProps<Content>()

onMounted(() => {
    const article = document.querySelector('article')
    
    article.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLDivElement
        const p = target.querySelector('p')
        if (p) p.classList.add('glitch')
    })

    article.addEventListener('mouseleave', (e) => {
        const target = e.target as HTMLDivElement
        const p = target.querySelector('p')
        if (p) p.classList.remove('glitch')
    })
})

const getThumb = (item) => {
    return `${config.apiUrl}/assets/${item.illustration.id}?width=300&height=200&fit=cover`
}
</script>