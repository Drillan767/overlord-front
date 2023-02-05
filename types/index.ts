export type Homepage = {

    translations: {
        languages_code: {
            code: string
        },
        baseline: string,
        description: string,
    }[],
    fullname: string,
    icon: {
        id: string
        title: string
    },
    links: {
        url: string,
        svg: string,
        display: string,
    }[],
    user: {
        id: string,
        title: string,
    }
}

interface TranslatedFields {
    title: string,
    slug: string,
    body: string,
    description: string,
}

interface Translation {
    translations: TranslatedFields[]
}

type ArticlesReceivedPayload = ArticleFields & Translation

interface ArticleFields {
    id: string,
    date_created: string,
    date_updated: string,
    illustration: Illustration
    tags: {
        Tag_id: Tag
    }[]
}

export type Article = ArticleFields & TranslatedFields

export type Project = {
    id: string,
    title: string,
    slug: string,
    body?: string,
    description: string,
    website?: string,
    repo_link?: string,
    date_created: string,
    date_updated: string,
    illustration: Illustration
    tags: {
        Tag_id: Tag
    }[]
}

export type Illustration = {
    id: string,
    title: string
}

export type Tag = {
    title: string,
}

export type Page = {
    title: string,
    slug: string,
    body: string,
}

export type ArticlesReceived = {
    Articles: ArticlesReceivedPayload[]
}

export type ProjectsReceived = {
    Project: Project[]
}

export type PagesReceived = {
    Pages: Page[]
}

export type TagFilter = {
    title: string,
    nbArticles?: number,
    nbProjects?: number,
}