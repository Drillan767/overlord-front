<template>
  <div class="viewport">
      <h1 class="title glitch" :data-text="full_name">{{ full_name }}</h1>
      <p class="subtitle" v-html="subtitle"></p>

      <div class="scroll">
        <span class="typed-text" @click="scrollNext">{{ typedText }}</span>
        <span class="input-cursor"></span>
      </div>
  </div>

    
</template>

<script setup lang="ts">

const scrollText = "Let's scroll!"
const typedText = ref('')
let i = 0

const props = defineProps({
    full_name: String,
    baseline: String,
})

onMounted(() => {
  setTimeout(() => {
    document.querySelector('.input-cursor').classList.add('typing')
    typeLetters()

  }, 2000)
})

const scrollNext = () => {
  console.log('oué')
  document.getElementById('about').scrollIntoView({behavior: 'smooth'})
}

const typeLetters = () => {
  if (i < scrollText.length) {
    typedText.value += scrollText.charAt(i)
    i++
    setTimeout(typeLetters, 150)
  } else {
    document.querySelector('.input-cursor').classList.remove('typing')
    document.querySelector('.typed-text').classList.add('underline', 'cursor-pointer')

  }
}

const subtitle = computed(() => {
  return props.baseline.replaceAll(/_([a-zA-Z]*)_/g,  (_match, group) => {
    return `<span class="glitch" data-text="${group}">${group}</span>`
  });
})

</script>

<style scoped lang="scss">
.viewport {
  @apply bg-black text-white relative flex justify-center items-center flex-col;
  height: 100vh;

  .title {
    font-size: clamp(2.25rem, -2.75rem + 16vw, 6.25rem);
    font-weight: 800;
  }

  .subtitle {
    color: white;
    text-align: center;
    font-size: clamp(1.25rem, 0.4688rem + 2.5vw, 1.875rem);
  }

  .scroll {
    position: absolute;
    display: flex;
    top: 70vh;

    p {
      color: white;
    }
  }
}


.input-cursor {
  display: inline-block;
  width: 15px;
  height: 28px;
  background-color: white;
  margin-left: 8px;
  animation: blink .6s linear infinite alternate;
}

.typed-text {
  @apply text-xl text-white font-mono;
}

.typing {
  animation: none;
}

    
@keyframes blink {
  0% {opacity: 1;}
  40% {opacity: 1;}
  60% {opacity: 0;}
  100% {opacity: 0;}
}

</style>