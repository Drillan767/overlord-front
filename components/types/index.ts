export type Homepage = {
    baseline: string,
    description: string,
    fullname: string,
    icon: {
        id: string
        title: string
    },
    links: {
        url: string,
        svg: string,
    }[],
    user: {
        id: string,
        title: string,
    }
}

export type Article = {
    title: string,
    date_created: string,
    date_updated: string,
    body: string,
    toc: string,
    id: string,
    slug: string,
    illustration: Illustration
    tags: {
        Tag_id: Tag
    }[]
}

export type Project = {
    title: string,
    date_created: string,
    date_updated: string,
    id: string,
    slug: string,
    illustration: Illustration
    tags: Tag[]
}

export type Illustration = {
    id: string,
    title: string
}

export type Tag = {
    title: string,
    description: string,
}

export type ArticlesReceived = {
    Articles: Article[]
}

export type ProjectsReceived = {
    Project: Project[]
}

export type TagsReceived = {
    Articles_Tags: Tag[]
}