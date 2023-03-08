<script lang="ts">
    import Live from '$lib/misc/Live.svelte'
    import Modal from '$lib/Modal.svelte'
    import type { PostsResponse } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import { pb } from '$lib/pocketbase'
    import PostList from '$lib/posts/PostList.svelte'
    import Button from '$lib/Button.svelte'

    let posts: PostsResponse<any>[] | undefined

    let page = 1

    async function fetchPage(p: number) {
        if (p < 1) {
            page = 1
        }

        const results = await pb
            .collection('posts')
            .getList<PostsResponse<any>>(p, 50, {
                expand: 'user, community',
                sort: '-created',
            })

        if (p > Math.ceil(results.totalItems / 50)) {
            page--
        }

        posts = results.items
    }

    onMount(async () => {
        fetchPage(page)

        pb.collection('posts').subscribe<PostsResponse<any>>(
            '*',
            async ({ record, action }) => {
                if (action == 'create') {
                    const user = await pb
                        .collection('users')
                        .getOne(record.user)

                    if (record.community) {
                        const community = await pb
                            .collection('communities')
                            .getOne(record.community)

                        record.expand = { user, community }
                    } else {
                        record.expand = { user }
                    }

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
<div class="w-full flex flex-row mx-auto gap-4 items-center justify-center">
    <Button onclick={() => fetchPage(--page)}>Back</Button>
    <span>{page}</span>
    <Button onclick={() => fetchPage(++page)}>Next</Button>
</div>
