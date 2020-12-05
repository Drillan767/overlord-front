<template>
  <div>
    <h1>Page about</h1>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      fr: '/a-propos',
      en: '/about'
    }
  }
}
</script>
