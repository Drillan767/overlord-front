import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  },
  toc: {
    depth: 2,
    searchDepth: 2
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: [
            'json',
            'ts',
            'html',
            'vue',
            'css',
            'shell',
            'md',
            'php',
            'yaml',
          ],
        },
        toc: {
          depth: 3,
        }
      }
    }
  }
})