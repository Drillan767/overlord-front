<template>
  <div>
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      {{ locale.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'LangSwitcher',
  computed: {
    availableLocales () {
      const locales = this.$i18n.locales
      return locales.filter(l => l.code !== this.$i18n.locale)
    }
  }
}
</script>
