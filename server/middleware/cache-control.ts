export default defineEventHandler((event) => {
    const res = event.node.res
    const { node: { req: { url } } } = event

    if (url) {
        const maxAge = url.match(/(.+)\.(jpg|jpeg|webp|png|gif|css|js|ico|svg|mjs|ttf)/)
            ? 31536000 // year
            : 3600 // hour

        res.setHeader('Cache-Control', `max-age=${maxAge} s-maxage=${maxAge}`)
    }
})
