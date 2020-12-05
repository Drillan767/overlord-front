<template>
  <div class="container">
    <div>
      <Logo />
      <LangSwitcher />
      <h1 class="title">
        overlord-front
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        <a href="#" class="button--grey">{{ $t('hello') }}</a>
        <a v-for="(d, i) in $data" :key="i" class="button--grey" :href="i">{{ d }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import LangSwitcher from '~/components/LangSwitcher'
export default {
  components: {
    LangSwitcher
  },

  async asyncData ({ $axios }) {
    const data = await $axios.get('/test')
    return data.data
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
