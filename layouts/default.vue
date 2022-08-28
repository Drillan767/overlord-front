<template>
    <div id="default">
        <slot />
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const ie = new IntersectionObserver((entries, observer) => {
    entries.forEach((e) => {
      if (e.intersectionRatio > 0.25) {
        e.target.classList.add('fade-in')

        observer.unobserve(e.target)
      }
    })
  }, {
    threshold: [0.25]
  })

  const ids = ['viewport', 'about', 'featured', 'contact']

  ids.forEach((id) => {
    const el = document.getElementById(id)
    ie.observe(el)
  })
})

</script>