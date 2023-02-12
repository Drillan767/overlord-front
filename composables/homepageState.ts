import type { Homepage } from "~~/types"

export const useHomepage = () => useState<Homepage>('homepage', () => ({
    baseline: '',
    description: '',
    fullname: '',
    icon: {
        id: '',
        title: ''
    },
    user: {
        id: '',
        title: '',
    },
    links: [
        {
            url: '',
            svg: '',
            display: '',
        }
    ]
}))
