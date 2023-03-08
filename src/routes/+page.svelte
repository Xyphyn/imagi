<script lang="ts">
    import Live from '$lib/misc/Live.svelte'
    import type { PostsResponse } from '$lib/types/pb-types'
    import { onMount } from 'svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import PostList from '$lib/posts/PostList.svelte'
    import Button from '$lib/Button.svelte'
    import nProgress from 'nprogress'

    let posts: PostsResponse<any>[] | undefined

    let sort: 'recent' | 'following' = 'recent'
    let page = 1

    async function fetchPage(p: number) {
        nProgress.start()

        if (p < 1) {
            page = 1
        }

        let filterString = ''
        if ($currentUser?.communities) {
            filterString = $currentUser?.communities
                .map((community: string) => `community.id = "${community}"`)
                .join(' || ')
        }

        const results = await pb
            .collection('posts')
            .getList<PostsResponse<any>>(p, 50, {
                expand: 'user, community',
                sort: '-created',
                filter: sort == 'following' ? filterString : '',
            })

        if (p > Math.ceil(results.totalItems / 50)) {
            page--
        }

        posts = results.items

        nProgress.done()
    }

    onMount(async () => {
        fetchPage(page)

        pb.collection('posts').subscribe<PostsResponse<any>>(
            '*',
            async ({ record, action }) => {
                if (action == 'create') {
                    if (sort == 'following') {
                        if (
                            !$currentUser?.communities.includes(
                                record.community
                            )
                        ) {
                            return
                        }
                    }

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

<title>Imagi</title>
<div class="flex flex-row gap-4 mb-4 ml-4">
    <Button
        major={sort == 'recent'}
        onclick={() => {
            sort = 'recent'
            fetchPage(page)
        }}>Recent</Button
    >
    <Button
        major={sort == 'following'}
        onclick={() => {
            sort = 'following'
            fetchPage(page)
        }}>Following</Button
    >
</div>

<Live />
<PostList {posts} />
<div
    class="w-full flex flex-row mx-auto gap-4 items-center justify-center box-border"
>
    <Button onclick={() => fetchPage(--page)}>Back</Button>
    <span>{page}</span>
    <Button onclick={() => fetchPage(++page)}>Next</Button>
</div>
