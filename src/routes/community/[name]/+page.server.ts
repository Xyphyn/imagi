import { pb } from '$lib/pocketbase'
import type { CommunitiesResponse } from '$lib/types/pb-types'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const result = await pb
        .collection('communities')
        .getList<CommunitiesResponse<any>>(1, 1, {
            filter: `name = "${params.name}"`,
            expand: 'communityCounts(community),owner',
        })

    if (!result.items[0]) {
        throw error(404, 'User not found')
    }

    return {
        community: JSON.parse(JSON.stringify(result.items[0])),
    }
}
