import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        about: defineCollection({
            type: 'page',
            source: 'landing/about.md',
        }),
        articles: defineCollection({
            type: 'page',
            source: 'articles/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                image: z.string(),
                date: z.string(),
                tags: z.array(z.string()),
                content: z.string(),
            }),
        }),
        projects: defineCollection({
            type: 'page',
            source: 'projects/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                image: z.string(),
                date: z.string(),
                tags: z.array(z.string()),
                content: z.string(),
                source: z.string().nullable(),
                link: z.string().nullable(),
            }),
        }),
        releases: defineCollection({
            type: 'page',
            source: 'releases/*.md',
            schema: z.object({
                version: z.string(),
                description: z.string(),
            }),
        }),
    },
})
