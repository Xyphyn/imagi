<script lang="ts">
    import Live from '$lib/misc/Live.svelte'
    import Modal from '$lib/Modal.svelte'
    import { pb } from '../lib/pocketbase'
    import PostList from '../lib/posts/PostList.svelte'
    import {
        Collections,
        type PostsResponse,
        type UsersRecord,
        type UsersResponse,
    } from '../lib/types/pb-types'

    async function fetchPosts() {
        return new Promise<PostsResponse<UsersResponse>[]>(async (res, rej) => {
            const results = await pb
                .collection(Collections.Posts)
                .getList<PostsResponse<UsersResponse>>(1, 50, {
                    sort: '-created',
                    expand: 'user',
                })
            res(results.items)
        })
    }
</script>

<Live />
<PostList posts={fetchPosts()} />
