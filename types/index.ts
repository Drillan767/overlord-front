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
        display: string,
    }[],
    user: {
        id: string,
        title: string,
    }
}

export type ReceivedHomepage = {
    Homepage_translations: {
        baseline: string,
        description: string,
        Homepage_id: {
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
    }[]
}

export type ReceivedTranslatedHomepage = {
    Homepage_translations: {
        baseline: string,
        description: string,
    }[]
}

export type Article = {
    title: string,
    slug: string,
    body: string,
    description: string,
    date_created: string,
    date_updated: string,
    illustration: Illustration
    tags: {
        Tag_id: Tag
    }[]
}

export type Project = {
    title: string,
    slug: string,
    body: string,
    description: string,
    website: string,
    repo_link: string,
    date_created: string,
    date_updated: string,
    illustration: Illustration
    tags: {
        Tag_id: Tag
    }[]
}

export type ProjectReceived = {
    Project_translations: {
        title: string,
        slug: string,
        description: string,
        body: string,
        Project_id: {
            date_created: string,
            date_updated: string,
            repo_link: string,
            website: string,
            tags: {
                Tag_id: Tag
            }[],
            illustration: Illustration
        }
    }[]
}

export type DisplayedProject = {
    title: string
    slug: string
    tags: {
        Tag_id: Tag
    }[],
    illustration: Illustration
}

export type DisplayedProjectsReceived = {
    Project_translations: {
        title: string,
        slug: string,
        Project_id: {
            tags: {
                Tag_id: Tag
            }[],
            illustration: Illustration
        }
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
    Articles_translations: {
        title: string,
        slug: string,
        body: string,
        description: string,
        Articles_id: {
            date_created: string,
            date_updated: string,
            illustration: Illustration
            tags: {
                Tag_id: Tag
            }[]
        }
    }[]
}

export type PagesReceived = {
    Pages: Page[]
}

export type TagFilter = {
    title: string,
    nbArticles?: number,
    nbProjects?: number,
}