export interface Homepage {
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
    legal: {
        title: string,
        url: string,
    }[],
    user: {
        id: string,
        title: string,
    }
}

export interface ReceivedHomepage {
    Homepage_translations: {
        baseline: string,
        description: string,
        legal: {
            title: string,
            url: string,
        }[],
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

export interface ReceivedTranslatedHomepage {
    Homepage_translations: {
        baseline: string,
        description: string,
        legal: {
            title: string,
            url: string,
        }[]
    }[]
}

export interface Article {
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

export interface Project {
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

export interface ProjectReceived {
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

export interface DisplayedProject {
    title: string
    slug: string
    tags: {
        Tag_id: Tag
    }[],
    illustration: Illustration
}

export interface DisplayedProjectsReceived {
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

export interface Illustration {
    id: string,
    title: string
}

export interface Tag {
    id: number
    title: string,
}

export interface Page {
    title: string,
    slug: string,
    body: string,
}

export interface PagesReceived {
    Pages_translations: Page[]
}

export interface ArticlesReceived {
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

export interface Version {
    version: string,
    description: string
}

export interface ReceivedVersion {
    Releases_translations: {
        description: string,
        Releases_id: {
            version: string
        }
    }[]
}

export interface TagFilter {
    title: string,
    nbArticles?: number,
    nbProjects?: number,
}