import { pb } from '$lib/pocketbase'
import type { BlogResponse } from '$lib/types/pb-types'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    try {
        const post = await pb
            .collection('blog')
            .getList<BlogResponse>(1, 20, {
                sort: '-created'
            })
            .catch((err) => {
                throw error(404, 'Not found')
            })
    
        if (post) return { post: JSON.parse(JSON.stringify(post)) }
    
        throw error(404, 'Not found')
    } catch (err) {
        throw error(500, 'Post ID not found.')
    }
}

