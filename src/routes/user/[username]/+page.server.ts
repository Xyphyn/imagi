import { pb } from '$lib/backend/pocketbase'
import type { CountsResponse, UsersResponse } from '$lib/backend/schema'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const result = await pb
        .collection('users')
        .getFirstListItem<
            UsersResponse<{
                'counts(user)': CountsResponse
            }>
        >(`username = "${params.username}"`, { expand: 'counts(user)' })
        .catch((err) => {
            throw error(404, 'User not found')
        })

    return {
        user: JSON.parse(JSON.stringify(result)),
    }
}
