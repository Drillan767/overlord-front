export interface Article {
    body: string
    date_created: string
    date_updated?: string
    description: string
    featured: boolean
    id: number
    illustration?: string
    slug: string
    status: string
    tags: any[] | ArticlesTags[]
    title: string
}

export interface ArticlesTags {
    articles_id?: number | Article
    id: number
    tags_id?: number | Tags
}

export interface Comments {
    accepted?: boolean
    article_id?: number | Article
    comment?: string
    date_created?: string
    email_address?: string
    id: number
    status: string
    username?: string
}

export interface Content {
    body?: string
    date_created?: string
    date_updated?: string
    description?: string
    featured?: boolean
    id: number
    illustration?: string
    repository?: string
    slug?: string
    status: string
    tags: any[] | ContentsTags[]
    title?: string
    type?: string
    website?: string
}

export interface ContentsTags {
    contents_id?: number | Content
    id: number
    tags_id?: number | Tags
}

export interface Homepage {
    baseline: string
    description: string
    full_name: string
    id: number
    legal: {
        title: string
        url: string
    }[]
    links: {
        display: string
        logo: string
        url: string
    }[]
    logo: string
    user: string
}

export interface Page {
    body?: string
    id: number
    slug?: string
    title?: string
}

export interface Project {
    body: string
    date_created: string
    date_updated?: string
    description: string
    featured: boolean
    github_repository?: string
    id: number
    illustration: string
    slug: string
    status: string
    tags: any[] | ProjectTag[]
    title: string
    website_link: string
}

export interface ProjectTag {
    id: number
    projects_id?: number | Project
    tags_id?: number | Tags
}

export interface Release {
    description?: string
    id: number
    version?: string
}

export interface Tags {
    id: number
    title?: string
}
