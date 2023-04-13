import { pb } from '$lib/backend/pocketbase.js'
import {
    Collections,
    type CommunitiesResponse,
    type PostCountsResponse,
    type PostsResponse,
    type UsersResponse,
} from '$lib/backend/schema.js'

export async function load({ params }) {
    const id = params.id

    const post = await pb.collection(Collections.Posts).getOne<
        PostsResponse<{
            user: UsersResponse
            community: CommunitiesResponse
            'postCounts(post)': PostCountsResponse[]
        }>
    >(id, { expand: 'postCounts(post),user,community' })

    return {
        post: JSON.parse(JSON.stringify(post)),
    }
}
