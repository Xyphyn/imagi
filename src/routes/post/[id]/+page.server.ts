import { pb } from '$lib/pocketbase'
import { error } from '@sveltejs/kit'
import eventsource from 'eventsource'

//@ts-ignore
global.EventSource = eventsource
pb.autoCancellation(false)

// @ts-ignore
export async function load({ params }) {
    try {
        const post = await pb
            .collection('posts')
            .getOne(params.id, {
                expand: 'user, postCounts(post)',
                $autoCancel: false,
            })
            .catch((err) => {
                throw error(404, 'Not found')
            })

        if (post) return { post: JSON.parse(JSON.stringify(post)) }

        throw error(404, 'Not found')
    } catch (err) {
        throw error(500, 'Something went wrong.')
    }
}
