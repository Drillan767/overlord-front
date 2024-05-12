export interface Homepage {
    baseline: string
    description: string
    fullname: string
    icon: {
        id: string
        title: string
    }
    links: {
        url: string
        svg: string
        display: string
    }[]
    legal: {
        title: string
        url: string
    }[]
    user: {
        id: string
        title: string
    }
}

export interface Article {
    title: string
    slug: string
    body: string
    description: string
    date_created: string
    date_updated: string
    illustration: Illustration
    tags: {
        Tag_id: Tag
    }[]
}

export interface Project {
    title: string
    slug: string
    body: string
    description: string
    website: string
    repo_link: string
    date_created: string
    date_updated: string
    illustration: Illustration
    tags: {
        Tag_id: Tag
    }[]
}

export interface Illustration {
    id: string
    title: string
}

export interface Tag {
    id: number
    title: string
}

export interface Page {
    title: string
    slug: string
    body: string
}

export interface Version {
    version: string
    description: string
}

export interface TagFilter {
    title: string
    nbArticles?: number
    nbProjects?: number
}
