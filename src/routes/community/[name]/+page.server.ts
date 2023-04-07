import { pb } from '$lib/pocketbase'
import type { CommunitiesResponse } from '$lib/types/pb-types'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const result = await pb
        .collection('communities')
        .getFirstListItem<CommunitiesResponse<any>>(`name = "${params.name}"`, {
            expand: 'communityCounts(community),owner',
        })
        .catch((err) => {
            throw error(404, 'Community not found')
        })

    return {
        community: JSON.parse(JSON.stringify(result)),
    }
}
