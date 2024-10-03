import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { Article } from '~/types'

export default defineEventHandler(async (event) => {
    const { slug } = getRouterParams(event)
    const config = useRuntimeConfig(event)

    if (!slug) {
        throw createError({
            statusCode: 404,
            fatal: true,
        })
    }

    const params = new URLSearchParams({
        fields: ['*', 'tags.tags_id.*'].join(','),
        limit: '1',
        filter: `{"slug": "${slug}", "status": "published"}`,
    })

    const response = await fetch(`${config.public.apiUrl}/items/articles?${params.toString()}`)
    const { data } = await response.json()

    if (data.length === 0) {
        throw createError({
            statusCode: 404,
            fatal: true,
        })
    }

    const [article]: [Article] = data

    const parsedMarkdown = await parseMarkdown(article.body)

    return {
        article,
        parsedMarkdown,
    }
})
