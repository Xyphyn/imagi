import { pb } from '$lib/pocketbase'
import { error } from '@sveltejs/kit'
import eventsource from 'eventsource'

// @ts-ignore
export async function load({ params }) {
    //@ts-ignore
    global.EventSource = eventsource
    const post = await pb
        .collection('posts')
        .getOne(params.id, { expand: 'user', $autoCancel: false })
        .catch((err) => {
            throw error(404, 'Not found')
        })

    if (post) return { post: JSON.parse(JSON.stringify(post)) }

    throw error(404, 'Not found')
}
