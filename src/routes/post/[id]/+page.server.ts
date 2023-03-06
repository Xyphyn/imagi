import { pb } from '$lib/pocketbase'
import { error } from '@sveltejs/kit'

// @ts-ignore
export async function load({ params }) {
    const post = await pb
        .collection('posts')
        .getOne(params.id, { expand: 'user' })
        .catch((err) => {
            throw error(404, 'Not found')
        })

    if (post) return { post: JSON.parse(JSON.stringify(post)) }

    throw error(404, 'Not found')
}
