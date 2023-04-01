import { pb } from '$lib/pocketbase'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    try {
        const post = await pb
            .collection('blog')
            .getOne(params.id, {
                expand: 'author',
                $autoCancel: false,
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

