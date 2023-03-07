<script lang="ts">
    import Live from '$lib/misc/Live.svelte'
    import Modal from '$lib/Modal.svelte'
    import type { PostsResponse } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import { pb } from '$lib/pocketbase'
    import PostList from '$lib/posts/PostList.svelte'

    let posts: PostsResponse<any>[] | undefined

    onMount(async () => {
        const results = await pb
            .collection('posts')
            .getList<PostsResponse<any>>(1, 50, {
                expand: 'user, community',
                sort: '-created',
            })

        posts = results.items

        pb.collection('posts').subscribe<PostsResponse<any>>(
            '*',
            async ({ record, action }) => {
                if (action == 'create') {
                    const user = await pb
                        .collection('users')
                        .getOne(record.user)

                    record.expand = { user }

                    posts = [record, ...posts!]
                }

                if (action == 'delete') {
                    posts = posts?.filter((post) => post.id != record.id)
                }
            }
        )
    })
</script>

<Live />
<PostList {posts} />
