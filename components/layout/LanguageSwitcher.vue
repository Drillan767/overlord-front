<template>
   <div class="dropdown">
        <button
            @click="isOpened = !isOpened"
            @blur="isOpened = false"
        >
            <Globe />
            <span>{{ format(locale) }}</span>
            <ArrowDown :class="isOpened ? 'rotate-180' : 'rotate-0'" />
        </button>
        <transition
            enter-active-class="transform transition duration-500 ease-in-out"
            enter-class="-translate-y-1/2 scale-y-0 opacity-0"
            enter-to-class="translate-y-0 scale-y-100 opacity-100"
            leave-active-class="transform transition duration-300 ease-in-out"
            leave-class="translate-y-0 scale-y-100 opacity-100"
            leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
        >
            <ul v-show="isOpened">
                <li
                    v-for="(l, i) in availableLocales"
                    :key="i"
                    @mousedown.prevent="setOption(l)"
                >
                    {{ format(l) }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import Globe from "~~/components/svg/Globe.vue";
import ArrowDown from "~~/components/svg/ArrowDown.vue";

const { locale, locales, setLocale } = useI18n();
const availableLocales = computed(() => {
    const list = locales.value as string[];
    return list.filter((l) => l !== locale.value);
});

const isOpened = ref(false);

const setOption = (l: string) => {
    setLocale(l);
    isOpened.value = false;
}

const format = (text: string) => text.split("-")[0].toUpperCase()
</script>

<style scoped lang="scss">
.dropdown {
    color: var(--font-color);
    @apply relative w-24 text-sm;

    button {
        background-color: var(--bg-footer);
        @apply flex items-center justify-between p-1.5 w-full border border-gray-700 rounded;
    }

    ul {
        @apply absolute left-0 right-0 mb-4 divide-y rounded-lg border border-gray-500 shadow-lg overflow-hidden;

        li {
            background-color: var(--bg-footer);
            @apply px-3 py-2 transition-colors duration-300 cursor-pointer text-center;
        }
    }
}
</style>
