import type { Homepage } from "~~/types"

export const useHomepage = async () => {
    const { getCollection  } = useDirectusCollections()
    const collectionParams = { collection: 'Homepage' }
    const collections = await getCollection<Homepage>(collectionParams)

    return collections

}


/* export const useHomepage = () => useState<Homepage>('homepage', () => ({
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
    legal: [
        {
        title: '',
        url: '',
        }
    ],
    links: [
        {
            url: '',
            svg: '',
            display: '',
        }
    ]
})) */
