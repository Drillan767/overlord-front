<template>
    <div id="default">
        <slot />
    </div>
</template>

<script setup lang="ts">
const ids = ['viewport', 'about', 'featured', 'contact']

onMounted(() => {
    const sections = ids.map((id) => waitForElm(id))
    Promise.all(sections).then(() => revealItems())
})

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

        const observer = new MutationObserver((mutation) => {
            if (document.getElementById(id)) {
                resolve(document.getElementById(id))
                observer.disconnect()
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

</script>
