import { pb } from '$lib/backend/pocketbase'
import type {
    CommunitiesResponse,
    CommunityCountsResponse,
    UsersResponse,
} from '$lib/backend/schema'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const result = await pb
        .collection('communities')
        .getFirstListItem<
            CommunitiesResponse<{
                'communityCounts(community)': CommunityCountsResponse[]
                owner: UsersResponse
            }>
        >(`name = "${params.name}"`, {
            expand: 'communityCounts(community),owner',
        })
        .catch((err) => {
            throw error(404, 'Community not found')
        })

    return {
        community: JSON.parse(JSON.stringify(result)),
    }
}
