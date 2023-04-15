import { pb } from '$lib/backend/pocketbase'
import { Collections, type BlogResponse } from '$lib/backend/schema'

export async function load() {
    const items = await pb
        .collection(Collections.Blog)
        .getList<BlogResponse>(1, 20, { sort: '-created' })
        .then((results) => results.items)

    return {
        posts: JSON.parse(JSON.stringify(items)),
    }
}
