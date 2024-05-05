import type { Homepage } from "~~/types"

export const useHomepage = async () => {
    const { getCollection  } = useDirectusCollections()
    const collectionParams = { collection: 'Homepage' }
    const collections = await getCollection<Homepage>(collectionParams)

    return collections

}