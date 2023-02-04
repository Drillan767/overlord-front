<template>
    <div class="text-white">
        <p class="text-white text-4xl">Current locale is : {{ locale }}</p>
        <p class="text-white text-4xl">{{ t('hello') }}</p>

        <LanguageSwitcher />
    </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '~~/components/layout/LanguageSwitcher.vue';
const { locale, t } = useI18n();
</script>

<i18n lang="json">
    {
        "fr-FR": {
            "hello": "bjr en frensé"
        },
        "en-US": {
            "hello": "Hello in english"
        }
    }
</i18n>
