import { pb } from '$lib/pocketbase'
import type { UsersResponse } from '$lib/types/pb-types'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const result = await pb.collection('users').getList<UsersResponse<any>>(1, 1, { filter: `username = "${params.username}"`, expand: 'counts(user)' })

    if (!result.items[0]) {
        throw error(404, 'User not found')
    }

    return {
        user: JSON.parse(JSON.stringify(result.items[0]))
    }
}