<template>
   <div class="dropdown">
        <button
            @click="isOpened = !isOpened"
            @blur="isOpened = false"
        >
            <Globe />
            <span>{{ locale.toUpperCase() }}</span>
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
                    {{ l.toUpperCase() }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import Globe from "~~/components/svg/Globe.vue"
import ArrowDown from "~~/components/svg/ArrowDown.vue"
import type { ReceivedHomepage } from '~~/types';
import homepageGql from '~~/queries/homepage.gql'

const { locale, locales, setLocale } = useI18n()

const homepage = useHomepage()
const fullLocale = useFullLocale()

const ids = ['viewport', 'about', 'featured', 'contact']

const availableLocales = computed(() => {
    const list = locales.value as string[]
    return list.filter((l) => l !== locale.value)
})

const isOpened = ref(false)

const setOption = (l: string) => {
    setLocale(l)
    fullLocale.value = l === 'fr' ? 'fr-FR' : 'en-US'
    isOpened.value = false
    loadHomepageTranslation()
}

const revealItems = () => {
    const ie = new IntersectionObserver((entries) => {
        const navbar = document.querySelector('nav')
        if (navbar) {
            entries.forEach((e) => {
                if (e.intersectionRatio > 0.25) {
                    e.target.classList.add('fade-in')

                    if (['about', 'featured', 'contact'].includes(e.target.id)) {
                        navbar.classList.add('display')
                    } else {
                        navbar.classList.remove('display')
                    }
                }
            })
        }

    }, {
        threshold: [0.25]
    })

    ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) ie.observe(el)
    })
}

const waitForElm = (id: string) => {
    return new Promise((resolve) => {
        if (document.getElementById(id)) {
            return resolve(document.getElementById(id))
        }

        const observer = new MutationObserver(() => {
            if (document.getElementById(id)) {
                resolve(document.getElementById(id))
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

const loadHomepageTranslation = async () => {
    const fullLocale = useFullLocale()
    await useAsyncQuery<ReceivedHomepage>(homepageGql, {locale: fullLocale })
        .then(({ data }) => {
            if (data.value) {
                const {baseline, description } = data.value.Homepage_translations[0]
                homepage.value.baseline = baseline
                homepage.value.description = description
            }
        })
}

onMounted(() => {
    const sections = ids.map((id) => waitForElm(id))
    Promise.all(sections).then(() => revealItems())
})

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
