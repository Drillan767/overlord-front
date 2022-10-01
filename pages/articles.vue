<template>
    <div id="articles">
      <Head>
        <Title>Articles</Title>
      </Head>

      <h1 class="glitch" data-text="ARTICLES">
        ARTICLES
      </h1>

      <div class="tags">
        <div class="list">
          <div v-for="(tag, i) in uniqueTags" :key="i" class="tag" :class="{'current': tag.Tag_id.title === activeTag}">
            <span @click="handleFilter(tag.Tag_id.title)" class="cursor-pointer">
              {{ tag.Tag_id.title }}
            </span>
            <span @click="handleFilter(null)" class="cursor-pointer" v-if="tag.Tag_id.title === activeTag">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
        </div>

        <p v-if="tagDescription.length" class="text-white italic">
          {{ tagDescription }}
        </p>
      </div>

      <div class="articleList">
        <article v-for="article in filteredArticles" :key="article.id">
          <ItemThumbnail item-type="article" :item="article" />
        </article>
      </div>
    </div>
</template>

<script setup lang="ts">
import ItemThumbnail from '~~/components/content/ItemThumbnail.vue';

definePageMeta({
  layout: "blog",
});

const tagList = await useAsyncGql('Articles_Tag')
const activeTag = ref(null)
const { Articles_Tag } = tagList.data.value

const uniqueTags = computed(() => {
  return Articles_Tag.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.Tag_id.title === value.Tag_id.title
    ))
  )
})

const handleFilter = (filter: string | null) => {
  activeTag.value = filter
}

const { data: articleList } = await useAsyncGql('Articles', {filter: {status: {_eq: 'published'}}})

const filteredArticles = computed(() => {
  const { Articles } = articleList.value
  if (activeTag.value) {
    return Articles.filter((a) => a.tags.some((t) => t.Tag_id.title === activeTag.value))
  }

  return Articles
})

const tagDescription = computed(() => {
  let description = '';
  if (activeTag.value) {
    const matchingTag = Articles_Tag.find((t) => t.Tag_id.title === activeTag.value)
    if (matchingTag) {
      description = matchingTag.Tag_id.description
    }
  }

  return description
})
</script>

<style scoped lang="scss">
#articles {
  h1 {
    color: var(--title-color)
  }

  .tags {
    @apply w-1/2 mx-auto my-8 flex flex-col justify-between;
    height: 150px;

    .list {
      @apply flex justify-center gap-x-5;

      .tag {
      border: solid 1px #fff;
      display: flex;
      padding: 4px;
      line-height: 1;
      align-items: center;

      &:not(.current) {
        color: #fff;
      }

      &.current {
        background-color: #fff;
        color: #000;
      }
    }
    }
  }
  .articleList {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 350px));
    gap: 25px;
    justify-content: center;
    align-items: baseline;

  }
}
</style>
