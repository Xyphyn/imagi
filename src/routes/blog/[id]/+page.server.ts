import { pb } from '$lib/backend/pocketbase.js'
import { Collections, type BlogResponse } from '$lib/backend/schema.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    try {
        const post = await pb
            .collection(Collections.Blog)
            .getOne<BlogResponse>(params.id)

        return { post: JSON.parse(JSON.stringify(post)) }
    } catch (err) {
        throw error(404, 'Not found')
    }
}
