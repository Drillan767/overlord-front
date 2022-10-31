<template>
    <div class="article">
        <Head>
            <Title>{{ articleData.title }}</Title>
            <Meta property="og:type" content="article" />
            <Meta property="og:title" :content="articleData.title" />
            <Meta property="article:author" content="Joseph Levarato" />
            <Meta property="og:url" :content="`${config.url}/article/${articleData.slug}`" />
            <Meta property="article:published_time" :content="articleData.date_created" />
            <Meta property="article:modified_time" v-if="articleData.date_created" :content="articleData.date_created" />
            <Meta property="article:section" content="PHP" />
            <Meta property="article:tag" content="test" />
            <Link rel="canonical" :href="`${config.url}/article/${articleData.slug}`" />
        </Head>

        <main>
            <aside>
                <div class="glitch-thumb">
                    <div
                        class="glitch-img"
                        v-for="i in 5"
                        :key="i"
                        :style="`background-image: url('${getIllustration()}')`"
                    />
                </div>

                <div class="content">
                    <div class="toc" v-html="articleData.toc" />

                    <div class="progress"></div>

                    <div class="tags">
                        <h2>Tags :</h2>

                        <p>
                            Tag 1, tag 2, tag 3
                        </p>
                    </div>

                    <div class="progress">
                        <div class="global">
                            {{ displayPercentage }}
                        </div>
                        <span class="bar">
                            {{ progressBar }}
                        </span>
                    </div>

                    <h1>{{ articleData.title }}</h1>
                </div>
                
            </aside>
            <article>
                <div v-html="articleData.body" class="prose lg:prose-xl" />
            </article>
        </main>
    </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'

definePageMeta({
  layout: "blog",
});

const route = useRoute()
const config = useRuntimeConfig()
const articleData = ref(null)
const barWidth = ref()
const readPercentage = ref()

const getScrollPercent = () => {
    const h = document.documentElement
    const b = document.body
    const st = 'scrollTop'
    const sh = 'scrollHeight'

    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
}

const bodyHeaders = () => {
    let result = [];

    for (let i = 2; i <= 6; i++) {
        result.push(`.prose h${i}`)
    }

    return result.join(',')
}

const displayPercentage = computed(() => {
    let result = 'Progress: ['

    if (readPercentage.value) {
        let spaces = 3 - readPercentage.value.toString().length
        result += ' '.repeat(spaces)

        result += readPercentage.value
    }
    else {
        result += '  0'
    }

     result += '%]'

    return result
})

const progressBar = computed(() => {
    const charWidth = 9.6
    const total = Math.floor(Math.floor(barWidth.value - 10) / charWidth) - 2
    const progress = Math.floor((readPercentage.value / 100) * total)

    // console.log(progress)
    console.log()

    let response = '['

    for (let i = 0; i <= total; i++) {
        if (i <= progress) {
            response += '#'
        }
        else {
            response += '.'
        }
        
    }

    return response + ']'
    // return '#'
})

const { data } = await useAsyncGql('Article', {search: route.params.slug.toString()})

if (data.value.Articles.length) {
    articleData.value = data.value.Articles[0]
    
} else {
    throw createError({
        statusCode: 404,
        message: 'Article not found ya idiot'
    })
}

const getIllustration = (width = 1200, height = 627) => {
    return `${config.apiUrl}/assets/${articleData.value.illustration.id}?width=${width}&height=${height}&fit=cover`
}

onMounted(() => {

    setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.prose pre')
            .forEach((block) => hljs.highlightBlock(block))
    }, 1000)

    barWidth.value = document.querySelector<HTMLElement>('.progress .bar').clientWidth
    const headers = document.querySelectorAll(bodyHeaders())

    document.addEventListener('scroll', () => {
        readPercentage.value = Math.floor(getScrollPercent())
        

        let scrollTop = window.scrollY;

        document.querySelectorAll(`.toc li`).forEach((li) => li.classList.remove('active')) 

        for (let i = headers.length -1; i >= 0; i--) {
            const currentH = headers[i]
            const offset = currentH.getBoundingClientRect().top + scrollTop

            if (scrollTop > offset - 102) {
                document.querySelector(`.toc li a[href="#${currentH.id}"]`).parentElement.classList.add('active')
                break;
            }
        }
    })
})

</script>

<style lang="scss">

    main {
        position: relative;
        margin: 0 auto;
        display: flex;
        gap: 20px;

        aside {
            position: sticky;
            top: 0;
            z-index: 0;
            width: 40%;
            max-height: 100vh;

            &::before {
                content: "";
                position: absolute;
                inset: 0;
                z-index: 1;
                background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
            }

            .glitch-thumb {
                position: absolute;
                z-index: -1;
                inset: 0;

                .glitch-img {
                    height: auto;
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-color: transparent;
                    background-repeat: no-repeat;
                    background-position: 50% 0;
                    background-blend-mode: initial;

                    &:nth-child(n+2) {
                        opacity: 1;
                    }                  
        
                    &:nth-child(2) {
                        transform: translate3d(10px,0,0);
                        animation: glitch-anim-1 4s infinite linear alternate;
                    }
        
                    &:nth-child(3) {
                        transform: translate3d(calc(-1 * 10px),0,0);
                        animation: glitch-anim-2 4s infinite linear alternate;
                    }
        
                    &:nth-child(4) {
                        transform: translate3d(0, calc(-1 * 5px), 0) scale3d(-1,-1,1);
                        animation: glitch-anim-3 4s infinite linear alternate;
                    }
            
                    &:nth-child(n+2) {
                        opacity: 0;
                    }
                }
            }

            .toc {
                padding: 1em 1.2em;
                margin: 0 auto;
                
                &:before {
                    content: "Table of Contents";
                    color: var(--font-color);
                    font-weight: bold;
                }

                a {
                    font-size: .85em;
                    margin-left: 2px;
                }

                > ul {
                    @apply m-0 p-0;

                    ul {
                        @apply m-0 p-0;
                        margin-left: 1em;
                    }

                    li {
                        margin-left: 0.35em;
                        border-left: solid 1px #fff;

                        &:not(.active) {
                            color: var(--font-color);
                        }

                        &.active {
                            color: var(--purple);
                        }
                        
                        &:last-child {
                            border-left: none;
                            
                            &:before {
                                border-left: solid 1px #fff;

                            }
                        }
                        
                        &:before {
                            width: 0.9em;
                            height: 0.85em;
                            margin-right: 0.1em;
                            vertical-align: top;
                            border-bottom: solid 1px #fff;
                            content: "";
                            display: inline-block;
                        }
                    }
                }
            }

            .content {
                position: relative;
                z-index: 2;
                height: 100%;
                padding: 30px;

                .progress {
                    font-family: 'Jetbrains Mono', monospace;
                    display: flex;
                    gap: 10px;

                    .global {
                        background-color: green;
                        flex: 0 0 auto;
                    }

                    .bar {
                        color: #fff;
                        flex: 1;
                        display: inline-block;
                    }
                }

                h1 {
                    color: var(--title-color);
                    line-height: 1;
                }
            }
        }

        article {
            overflow-y: hidden;

            .prose {
                p {
                    color: var(--font-color);
                }

                h2, h3, h4, h5, h6 {
                    color: var(--title-color);
                }
                
            }
        }
    }

</style>