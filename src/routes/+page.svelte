<script lang="ts">
    import { pb } from '../lib/pocketbase'
    import PostList from '../lib/posts/PostList.svelte'
    import {
        Collections,
        type PostsResponse,
        type UsersRecord,
    } from '../lib/types/pb-types'

    async function fetchPosts() {
        return new Promise<PostsResponse<UsersRecord>[]>(async (res, rej) => {
            const results = await pb
                .collection(Collections.Posts)
                .getList<PostsResponse<UsersRecord>>(1, 50, {
                    sort: '-created',
                })
            res(results.items)
        })
    }
</script>

<PostList posts={fetchPosts()} />
