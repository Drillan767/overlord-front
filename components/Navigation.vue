<template>
  <div>
    <h1>Site navigation</h1>
    <nuxt-link :to="localePath('about')">
      {{ $t('about') }}
    </nuxt-link>
  </div>
</template>
